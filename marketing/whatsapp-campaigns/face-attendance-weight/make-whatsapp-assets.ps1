Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
$assetDir = Join-Path $root "marketing\email-campaigns\bcp-member-outreach"
$staticDir = Join-Path $root "gs_landing\static"
$facePath = Join-Path $assetDir "step1-face-scan.png"
$scalePath = Join-Path $assetDir "step2-weight-capture.png"
$logoPath = Join-Path $assetDir "gardensuite-logo-68.png"
$fieldScalePath = Join-Path $staticDir "img\home\smart-weighing.png"
$faceAppPath = Join-Path $staticDir "screenshots\face-attendance_liveness-check_passed.png"
$weightAppPath = Join-Path $staticDir "screenshots\smart-weighing_harvest-capture_enter-weight.png"

function New-Canvas($width, $height) {
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  return @{ Bitmap = $bitmap; Graphics = $graphics }
}

function New-Brush($hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function New-Pen($hex, $width) {
  return [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml($hex), $width)
}

function New-Font($size, $style = "Regular") {
  $fontStyle = [System.Drawing.FontStyle]::$style
  return [System.Drawing.Font]::new("Arial", $size, $fontStyle, [System.Drawing.GraphicsUnit]::Pixel)
}

function Get-RoundedRectanglePath($rect, $radius) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $radius * 2
  $path.AddArc($rect.X, $rect.Y, $diameter, $diameter, 180, 90)
  $path.AddArc($rect.Right - $diameter, $rect.Y, $diameter, $diameter, 270, 90)
  $path.AddArc($rect.Right - $diameter, $rect.Bottom - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($rect.X, $rect.Bottom - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function Draw-RoundedRect($g, $x, $y, $w, $h, $radius, $fillHex, $strokeHex = $null, $strokeWidth = 1) {
  $rect = New-Object System.Drawing.RectangleF $x, $y, $w, $h
  $path = Get-RoundedRectanglePath $rect $radius
  $brush = New-Brush $fillHex
  $g.FillPath($brush, $path)
  $brush.Dispose()
  if ($strokeHex) {
    $pen = New-Pen $strokeHex $strokeWidth
    $g.DrawPath($pen, $path)
    $pen.Dispose()
  }
  $path.Dispose()
}

function Draw-CroppedImage($g, $image, $x, $y, $w, $h, $radius = 0) {
  $srcRatio = $image.Width / $image.Height
  $destRatio = $w / $h
  if ($srcRatio -gt $destRatio) {
    $srcH = $image.Height
    $srcW = [int]($srcH * $destRatio)
    $srcX = [int](($image.Width - $srcW) / 2)
    $srcY = 0
  } else {
    $srcW = $image.Width
    $srcH = [int]($srcW / $destRatio)
    $srcX = 0
    $srcY = [int](($image.Height - $srcH) / 2)
  }
  $src = New-Object System.Drawing.Rectangle $srcX, $srcY, $srcW, $srcH
  $dest = New-Object System.Drawing.RectangleF $x, $y, $w, $h
  if ($radius -gt 0) {
    $path = Get-RoundedRectanglePath $dest $radius
    $oldClip = $g.Clip
    $g.SetClip($path)
    $g.DrawImage($image, $dest, $src, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Clip = $oldClip
    $oldClip.Dispose()
    $path.Dispose()
  } else {
    $g.DrawImage($image, $dest, $src, [System.Drawing.GraphicsUnit]::Pixel)
  }
}

function Draw-ContainedImage($g, $image, $x, $y, $w, $h, $radius = 0, $fillHex = "#FFFFFF") {
  $frame = New-Object System.Drawing.RectangleF $x, $y, $w, $h
  if ($radius -gt 0) {
    Draw-RoundedRect $g $x $y $w $h $radius $fillHex
  }
  $srcRatio = $image.Width / $image.Height
  $destRatio = $w / $h
  if ($srcRatio -gt $destRatio) {
    $drawW = $w
    $drawH = $w / $srcRatio
    $drawX = $x
    $drawY = $y + (($h - $drawH) / 2)
  } else {
    $drawH = $h
    $drawW = $h * $srcRatio
    $drawX = $x + (($w - $drawW) / 2)
    $drawY = $y
  }
  $dest = New-Object System.Drawing.RectangleF $drawX, $drawY, $drawW, $drawH
  if ($radius -gt 0) {
    $path = Get-RoundedRectanglePath $frame $radius
    $oldClip = $g.Clip
    $g.SetClip($path)
    $g.DrawImage($image, $dest)
    $g.Clip = $oldClip
    $oldClip.Dispose()
    $path.Dispose()
  } else {
    $g.DrawImage($image, $dest)
  }
}

function Draw-Text($g, $text, $font, $hex, $x, $y, $w, $h, $align = "Near") {
  $brush = New-Brush $hex
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::$align
  $format.LineAlignment = [System.Drawing.StringAlignment]::Near
  $format.Trimming = [System.Drawing.StringTrimming]::Word
  $rect = New-Object System.Drawing.RectangleF $x, $y, $w, $h
  $g.DrawString($text, $font, $brush, $rect, $format)
  $format.Dispose()
  $brush.Dispose()
}

function Save-Jpeg($bitmap, $path, $quality = 92) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([int64]$quality)
  $bitmap.Save($path, $codec, $params)
  $params.Dispose()
}

function Draw-Brand($g, $logo, $x, $y, $dark = $true) {
  $g.DrawImage($logo, $x, $y, 48, 48)
  $brandFont = New-Font 29 "Bold"
  $color = if ($dark) { "#111111" } else { "#FFFFFF" }
  Draw-Text $g "GardenSuite" $brandFont $color ($x + 62) ($y + 5) 280 45
  $brandFont.Dispose()
}

function Draw-SquareCreative {
  $fieldScale = [System.Drawing.Image]::FromFile($fieldScalePath)
  $canvas = New-Canvas 1080 1080
  $g = $canvas.Graphics
  $bg = New-Brush "#EEF8F1"
  $g.FillRectangle($bg, 0, 0, 1080, 1080)
  $bg.Dispose()

  $headline = New-Font 118 "Bold"
  Draw-Text $g "Face + Weight" $headline "#101412" 68 70 950 145
  $headline.Dispose()

  Draw-RoundedRect $g 68 240 944 176 30 "#073B28"
  $price = New-Font 118 "Bold"
  Draw-Text $g "Rs. 499" $price "#FFFFFF" 112 274 540 120
  $price.Dispose()
  $month = New-Font 58 "Bold"
  Draw-Text $g "/month*" $month "#FFFFFF" 670 308 260 70
  $month.Dispose()

  Draw-CroppedImage $g $fieldScale 68 470 944 540 36

  Save-Jpeg $canvas.Bitmap (Join-Path $PSScriptRoot "whatsapp-face-weight-square.jpg") 92

  $g.Dispose()
  $canvas.Bitmap.Dispose()
  $fieldScale.Dispose()
}

function Draw-StatusCreative {
  $face = [System.Drawing.Image]::FromFile($facePath)
  $scale = [System.Drawing.Image]::FromFile($scalePath)
  $logo = [System.Drawing.Image]::FromFile($logoPath)
  $canvas = New-Canvas 1080 1920
  $g = $canvas.Graphics
  $bg = New-Brush "#FAFAF7"
  $g.FillRectangle($bg, 0, 0, 1080, 1920)
  $bg.Dispose()

  Draw-Brand $g $logo 76 80 $true

  $small = New-Font 27 "Bold"
  Draw-Text $g "Tea garden field workflow" $small "#1B5E3B" 76 180 760 44
  $small.Dispose()

  $headline = New-Font 66 "Bold"
  Draw-Text $g "Face scan -> leaf weight`n-> Kamjari record" $headline "#111111" 76 258 910 260
  $headline.Dispose()

  $subhead = New-Font 42 "Bold"
  Draw-Text $g "One worker. One record." $subhead "#303136" 76 520 800 70
  $subhead.Dispose()

  Draw-RoundedRect $g 76 640 928 580 38 "#FFFFFF" "#E6E2D8" 2
  Draw-CroppedImage $g $face 104 668 872 440 26
  $copy = New-Font 34 "Bold"
  Draw-Text $g "Face verifies the worker before the record is saved." $copy "#111111" 124 1120 800 72

  Draw-RoundedRect $g 76 1260 928 445 38 "#FFFFFF" "#E6E2D8" 2
  Draw-CroppedImage $g $scale 104 1288 872 330 26
  Draw-Text $g "Leaf weight stays linked to the same worker." $copy "#111111" 124 1635 800 58
  $copy.Dispose()

  Draw-RoundedRect $g 76 1740 928 92 22 "#102D1F"
  $footer = New-Font 34 "Bold"
  Draw-Text $g "GardenSuite by Sarbani Associates" $footer "#FFFFFF" 116 1766 760 50
  $footer.Dispose()

  Save-Jpeg $canvas.Bitmap (Join-Path $PSScriptRoot "whatsapp-face-weight-status.jpg") 92

  $g.Dispose()
  $canvas.Bitmap.Dispose()
  $face.Dispose()
  $scale.Dispose()
  $logo.Dispose()
}

Draw-SquareCreative
Draw-StatusCreative

Write-Host "Created whatsapp-face-weight-square.jpg"
Write-Host "Created whatsapp-face-weight-status.jpg"
