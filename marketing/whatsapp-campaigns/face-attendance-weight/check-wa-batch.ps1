param(
  [int]$Limit = 25,
  [int]$DelayMinSeconds = 8,
  [int]$DelayMaxSeconds = 15,
  [switch]$IncludeHold,
  [switch]$Headless,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

if ($Limit -gt 50) {
  throw "Safety stop: Limit is capped at 50 per run."
}

if ($DelayMinSeconds -lt 8) {
  throw "Safety stop: DelayMinSeconds must be at least 8."
}

if ($DelayMaxSeconds -lt $DelayMinSeconds) {
  throw "DelayMaxSeconds must be greater than or equal to DelayMinSeconds."
}

$python = "C:\projects\scripts\extract_garden\.venv\Scripts\python.exe"
if (-not (Test-Path -LiteralPath $python)) {
  throw "Python runtime not found at $python"
}

$script = Join-Path $PSScriptRoot "tools\wa_check_batch.py"
$argsList = @(
  $script,
  "--limit", $Limit,
  "--delay-min", $DelayMinSeconds,
  "--delay-max", $DelayMaxSeconds
)

if ($IncludeHold) { $argsList += "--include-hold" }
if ($Headless) { $argsList += "--headless" }
if ($DryRun) { $argsList += "--dry-run" }

& $python @argsList
