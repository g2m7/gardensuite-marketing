$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$zipPath = Join-Path (Split-Path $projectRoot -Parent) "gs_landing_deploy.zip"
$remote = "root@gardensuite.in"
$remoteZip = "/tmp/gs_landing_deploy.zip"

$excludeDirs = @(
  "node_modules",
  ".svelte-kit",
  "build",
  ".git"
)

$excludeFiles = @(
  ".DS_Store"
)

function Get-RelativeProjectPath($basePath, $targetPath) {
  $baseFullPath = (Get-Item -LiteralPath $basePath).FullName.TrimEnd("\") + "\"
  $targetFullPath = (Get-Item -LiteralPath $targetPath).FullName
  $baseUri = New-Object System.Uri $baseFullPath
  $targetUri = New-Object System.Uri $targetFullPath
  return [System.Uri]::UnescapeDataString($baseUri.MakeRelativeUri($targetUri).ToString()).Replace("/", "\")
}

Write-Host "Packaging gs_landing..."
if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  $files = Get-ChildItem -LiteralPath $projectRoot -Recurse -Force -File | Where-Object {
    $relative = Get-RelativeProjectPath $projectRoot $_.FullName
    $parts = $relative -split '[\\/]+'
    -not ($parts | Where-Object { $excludeDirs -contains $_ }) -and
    -not ($excludeFiles -contains $_.Name)
  }

  foreach ($file in $files) {
    $entryName = (Get-RelativeProjectPath $projectRoot $file.FullName).Replace("\", "/")
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $zip,
      $file.FullName,
      $entryName,
      [System.IO.Compression.CompressionLevel]::Optimal
    ) | Out-Null
  }
}
finally {
  $zip.Dispose()
}

Write-Host "Uploading to VPS..."
scp $zipPath "${remote}:${remoteZip}"

Write-Host "Deploying on VPS..."
$remoteScript = @'
mkdir -p /root/gs_landing
cd /root/gs_landing
unzip -o /tmp/gs_landing_deploy.zip
rm /tmp/gs_landing_deploy.zip
echo "Installing dependencies..."
npm install
echo "Building SvelteKit app..."
npm run build
echo "Restarting PM2 process..."
pm2 restart gardensuite-landing || pm2 start server.cjs --name 'gardensuite-landing'
pm2 save
'@

$remoteScript | ssh $remote "bash -s"

Write-Host "Done! App deployed and restarted."
