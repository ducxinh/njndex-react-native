#!/bin/bash

# Local Build Script for EAS
# This script sets up environment variables and runs a local EAS build

set -e

echo "🚀 Starting Local EAS Build Setup"
echo "=================================="

# Check if Google Services files exist
if [ ! -f "GoogleService-Info.plist" ]; then
  echo "❌ Error: GoogleService-Info.plist not found in project root"
  echo "   Please make sure the file exists before running local build"
  exit 1
fi

if [ ! -f "google-services.json" ]; then
  echo "⚠️  Warning: google-services.json not found (Android build may fail)"
fi

echo "✓ Found GoogleService-Info.plist"

# Encode files to base64 and export as environment variables
echo "📦 Encoding Google Services files..."

export GOOGLE_SERVICES_INFOPLIST=$(base64 -i GoogleService-Info.plist)
export GOOGLE_SERVICES_JSON=$(base64 -i google-services.json 2>/dev/null || echo "")

echo "✓ Environment variables set"

# Verify environment variables
echo ""
echo "🔍 Environment Check:"
echo "  GOOGLE_SERVICES_INFOPLIST: ${#GOOGLE_SERVICES_INFOPLIST} characters"
if [ -n "$GOOGLE_SERVICES_JSON" ]; then
  echo "  GOOGLE_SERVICES_JSON: ${#GOOGLE_SERVICES_JSON} characters"
fi

echo ""
echo "🏗️  Running Local EAS Build..."
echo "=================================="
echo ""

# Run local build with environment variables
eas build --profile preview --platform ios --local --non-interactive

echo ""
echo "✅ Build complete!"

