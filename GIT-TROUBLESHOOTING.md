# Git Troubleshooting Guide

## "Failed to Execute Git" Error

This error means that Git is either:
1. **Not installed** on your system
2. **Not in your system PATH** (Windows can't find the Git executable)

### What This Means

When Cursor/VS Code tries to run Git commands (like `git status`, `git commit`, etc.), it looks for the `git` executable in your system's PATH. If Git isn't installed or can't be found, you'll see this error.

### Current Status

✅ **Git is installed** at: `C:\Program Files\Git\cmd\git.exe`  
❌ **Git is NOT in your PATH** - This is why you're getting the error!

### How to Fix It

Since Git is already installed, you just need to add it to your PATH. Here are two methods:

#### Method 1: Using PowerShell Script (Easiest)

I've created a helper script for you. Run this in PowerShell (as Administrator):

```powershell
.\add-git-to-path.ps1
```

Or run this command directly:

```powershell
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "User") + ";C:\Program Files\Git\cmd", "User")
```

Then **restart Cursor** for changes to take effect.

#### Method 2: Manual PATH Addition

1. **Git is already installed at:** `C:\Program Files\Git\cmd\git.exe`

2. **Add Git to your system PATH:**
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find and select "Path", then click "Edit"
   - Click "New" and add: `C:\Program Files\Git\cmd`
   - Click "OK" on all dialogs
   - **Restart Cursor** for changes to take effect

#### Method 3: If Git Wasn't Installed

If Git is not installed at all (rare case):

1. **Download Git for Windows:**
   - Visit: https://git-scm.com/download/win
   - Download and install the latest version

2. **During installation, make sure to select:**
   - ✅ "Add Git to PATH" (very important!)
   - ✅ "Git from the command line and also from 3rd-party software"

### Verify the Fix

After installing or fixing Git, verify it works:

```powershell
# In Cursor's terminal
git --version
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Related: Git Environment Variables

Once Git is installed and working, the Git environment variables we configured earlier will be automatically set by Cursor when you use Git commands. These variables help with authentication:

- `GIT_ASKPASS` - Credential helper
- `VSCODE_GIT_ASKPASS_NODE` - Node executable for Git operations
- `VSCODE_GIT_IPC_HANDLE` - Communication handle
- `VSCODE_GIT_IPC_AUTH_TOKEN` - Authentication token

Check if they're set with: `npm run check-git-env`

### Still Having Issues?

1. **Restart Cursor** after installing Git
2. **Use Cursor's integrated terminal** (not external PowerShell/CMD)
3. **Check Cursor settings:**
   - Open Settings (Ctrl+,)
   - Search for "git.path"
   - Set it to your Git executable path if needed

### Quick Test

Run these commands in Cursor's terminal to diagnose:

```powershell
# Check if Git is found
where.exe git

# Check Git version (if found)
git --version

# Check PATH for Git directories
$env:PATH -split ';' | Select-String -Pattern 'git' -CaseSensitive
```

