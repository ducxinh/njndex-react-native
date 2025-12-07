/**
 * EAS Local Build Configuration
 * This file is automatically loaded by EAS for local builds
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔧 [Local Build] Setting up Google Services files...\n');

// For local builds, create the files from the files that exist locally
const plistSource = path.join(__dirname, 'GoogleService-Info.plist');
const jsonSource = path.join(__dirname, 'google-services.json');

if (fs.existsSync(plistSource)) {
  console.log('✓ Found GoogleService-Info.plist');
} else {
  console.error('❌ GoogleService-Info.plist NOT FOUND!');
  console.error('   Please make sure the file exists in the project root');
}

if (fs.existsSync(jsonSource)) {
  console.log('✓ Found google-services.json');
} else {
  console.log('⚠️  google-services.json not found (Android build may fail)');
}

console.log('\n✅ Local build configuration loaded\n');

module.exports = {};

