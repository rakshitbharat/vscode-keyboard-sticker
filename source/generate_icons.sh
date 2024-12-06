#!/bin/bash

# Create base directories
mkdir -p public/themes/vscodePurple/{mac,windows,ubuntu}

# Function to create a dummy SVG icon
create_dummy_icon() {
    local name=$1
    local os=$2
    local color=""
    local text_color="white"
    
    case $os in
        "mac") color="rgb(156, 39, 176)";;      # Purple
        "windows") color="rgb(68, 138, 255)";;   # Blue
        "ubuntu") color="rgb(233, 84, 32)";;     # Orange
    esac
    
    # Create a simple colored rectangle SVG with text
    cat > "public/themes/vscodePurple/$os/${name}.svg" << EOF
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="${color}" rx="8"/>
  <text x="32" y="32" font-family="Arial" font-size="14" fill="${text_color}" text-anchor="middle" dominant-baseline="middle">
    ${name}
  </text>
</svg>
EOF
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
    mkdir -p "public/themes/vscodePurple/$os"
    
    for icon_name in "${ICONS[@]}"; do
        echo "  Creating $icon_name..."
        create_dummy_icon "$icon_name" "$os"
    done
done

echo "Done! Dummy SVG icons have been created in public/themes/vscodePurple/"

# List created files
echo -e "\nCreated files:"
find public/themes/vscodePurple -type f -name "*.svg" | sort