#!/bin/sh

PROJECT_ROOT="$(dirname "$0")/../"

# Ensure at project root
cd "$PROJECT_ROOT" || exit 1

mkdir -p etc
mkdir -p docs

yarn api-extractor run --local

yarn api-documenter markdown --input-folder temp --output-folder docs
