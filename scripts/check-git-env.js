#!/usr/bin/env node

/**
 * Check Git Environment Variables
 * Verifies that Git authentication environment variables are set
 */

console.log('Git Environment Variables Check:\n');
console.log('='.repeat(50));

const envVars = [
  'GIT_ASKPASS',
  'VSCODE_GIT_ASKPASS_NODE',
  'VSCODE_GIT_ASKPASS_EXTRA_ARGS',
  'VSCODE_GIT_ASKPASS_MAIN',
  'VSCODE_GIT_IPC_HANDLE',
  'VSCODE_GIT_IPC_AUTH_TOKEN'
];

let allSet = true;

envVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    // Mask sensitive tokens for display
    const displayValue = varName.includes('AUTH_TOKEN') 
      ? value.substring(0, 20) + '...' 
      : value;
    console.log(`✓ ${varName}: ${displayValue}`);
  } else {
    console.log(`✗ ${varName}: Not set`);
    allSet = false;
  }
});

console.log('='.repeat(50));
if (allSet) {
  console.log('\n✓ All Git environment variables are set!');
  process.exit(0);
} else {
  console.log('\n⚠ Some Git environment variables are not set.');
  console.log('These are automatically set by VS Code/Cursor in the integrated terminal.');
  process.exit(1);
}

