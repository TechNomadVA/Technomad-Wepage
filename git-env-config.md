# Git Environment Variables Configuration

This document describes the Git authentication environment variables that are automatically set by VS Code/Cursor when using Git operations.

## Environment Variables

These variables enable Git authentication through the IDE's credential helper:

```bash
# Askpass script location for Git credential prompts
GIT_ASKPASS=c:\Program Files\cursor\resources\app\extensions\git\dist\askpass.sh

# Node executable for Git operations
VSCODE_GIT_ASKPASS_NODE=C:\Program Files\cursor\Cursor.exe

# Extra arguments for Git askpass
VSCODE_GIT_ASKPASS_EXTRA_ARGS=

# Main askpass script
VSCODE_GIT_ASKPASS_MAIN=c:\Program Files\cursor\resources\app\extensions\git\dist\askpass-main.js

# IPC handle for Git communication
VSCODE_GIT_IPC_HANDLE=\\.\pipe\vscode-git-8d09cfcdca-sock

# Authentication token for Git IPC
VSCODE_GIT_IPC_AUTH_TOKEN=b2cb1cbea6580a8b1f695e57032c47f7fb4790fb719816960a239137549a67cb
```

## Usage

These variables are automatically set by VS Code/Cursor when you run Git commands in the integrated terminal. You don't need to manually configure them.

### Checking Environment Variables

You can verify these variables are set by running:

```bash
npm run check-git-env
```

Or manually check in your terminal:

```bash
# Windows PowerShell
echo $env:GIT_ASKPASS
echo $env:VSCODE_GIT_ASKPASS_NODE

# Windows CMD
echo %GIT_ASKPASS%
echo %VSCODE_GIT_ASKPASS_NODE%
```

## Notes

- These variables are IDE-specific and may change between sessions
- The `VSCODE_GIT_IPC_AUTH_TOKEN` is a session-specific authentication token
- The IPC handle (`VSCODE_GIT_IPC_HANDLE`) is also session-specific
- These are automatically available in VS Code/Cursor terminals and don't need manual configuration

