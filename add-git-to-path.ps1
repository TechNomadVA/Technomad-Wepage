# PowerShell script to add Git to PATH
# Run this script as Administrator

$gitPath = "C:\Program Files\Git\cmd"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($currentPath -notlike "*$gitPath*") {
    Write-Host "Adding Git to PATH..." -ForegroundColor Yellow
    [Environment]::SetEnvironmentVariable("Path", $currentPath + ";$gitPath", "User")
    Write-Host "✓ Git has been added to your PATH!" -ForegroundColor Green
    Write-Host "Please restart Cursor for changes to take effect." -ForegroundColor Cyan
} else {
    Write-Host "Git is already in your PATH!" -ForegroundColor Green
}

Write-Host "`nCurrent PATH includes:" -ForegroundColor Cyan
[Environment]::GetEnvironmentVariable("Path", "User") -split ';' | Where-Object { $_ -like "*Git*" }

