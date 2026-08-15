param(
  [Parameter(Mandatory = $true)]
  [string]$ResultsCsv
)

$ErrorActionPreference = "Stop"

$python = "C:\projects\scripts\extract_garden\.venv\Scripts\python.exe"
if (-not (Test-Path -LiteralPath $python)) {
  throw "Python runtime not found at $python"
}

$script = Join-Path $PSScriptRoot "tools\apply_wa_check_results.py"
& $python $script $ResultsCsv
