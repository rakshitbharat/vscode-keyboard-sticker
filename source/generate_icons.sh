#!/bin/bash

# Check for ImageMagick
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is required. Please install it first:"
    echo "Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "macOS: brew install imagemagick"
    exit 1
fi

# Create base directories
mkdir -p public/themes/vscodePurple/{mac,windows,ubuntu}/{svg,png}

# Function to create both SVG and PNG icons
create_icons() {
    local name=$1
    local os=$2
    local color=""
    
    case $os in
        "mac") color="rgb(156, 39, 176)";;      # Purple
        "windows") color="rgb(68, 138, 255)";;   # Blue
        "ubuntu") color="rgb(233, 84, 32)";;     # Orange
    esac
    
    # Create SVG
    cat > "public/themes/vscodePurple/$os/svg/${name}.svg" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
  <style>
    .bg { fill: ${color}; }
    .icon { fill: white; }
    text { fill: white; font-family: Arial, sans-serif; }
  </style>
  <defs>
    <linearGradient id="grad_${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.95"/>
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.85"/>
    </linearGradient>
  </defs>
  <rect class="bg" width="100" height="100" rx="8" fill="url(#grad_${name})"/>
  <text x="50" y="50" font-size="24" text-anchor="middle" dominant-baseline="middle" class="icon">
    ${name}
  </text>
</svg>
EOF

    # Convert SVG to PNG
    convert -background none -size 128x128 "public/themes/vscodePurple/$os/svg/${name}.svg" \
        "public/themes/vscodePurple/$os/png/${name}.png"

    echo "Created: ${name} (SVG + PNG) for ${os}"
}

# List of icons to create
ICONS=(
    "copy"
    "paste"
    "scissors"
    "rotate-left"
    "circle-question"
    "pen-to-square"
    "magnifying-glass"
    "bug"
    "pen"
    "terminal"
    "triangle-exclamation"
    "circle-dot"
    "bars"
    "expand"
    "wrench"
    "floppy-disk"
    "folder-open"
    "table-columns"
)

# Create icons for each OS
for os in mac windows ubuntu; do
    echo "Creating icons for $os..."
    for icon_name in "${ICONS[@]}"; do
        create_icons "$icon_name" "$os"
    done
done

echo "Done! Icons have been created in public/themes/vscodePurple/"