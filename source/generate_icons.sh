#!/bin/bash

# Create base directories
mkdir -p public/themes/vscodePurple/{mac,windows,ubuntu}

# Function to create command key SVG
create_command_svg() {
    local os=$1
    local color=""
    
    case $os in
        "mac") color="rgb(156, 39, 176)";;      # Purple
        "windows") color="rgb(68, 138, 255)";;   # Blue
        "ubuntu") color="rgb(233, 84, 32)";;     # Orange
    esac
    
    cat > "public/themes/vscodePurple/$os/command.svg" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" style="background-color: ${color}; border-radius: 8px;">
  <style>
    .icon { fill: white; }
  </style>
  <rect width="100" height="100" rx="8" fill="${color}"/>
  <path class="icon" d="M35 25 L65 25 L65 35 L75 35 L75 65 L65 65 L65 75 L35 75 L35 65 L25 65 L25 35 L35 35 Z"/>
</svg>
EOF
}

# Function to create a dummy SVG icon
create_dummy_icon() {
    local name=$1
    local os=$2
    local color=""
    
    case $os in
        "mac") color="rgb(156, 39, 176)";;      # Purple
        "windows") color="rgb(68, 138, 255)";;   # Blue
        "ubuntu") color="rgb(233, 84, 32)";;     # Orange
    esac
    
    cat > "public/themes/vscodePurple/$os/${name}.svg" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" style="background-color: ${color}; border-radius: 8px;">
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

    echo "Created: public/themes/vscodePurple/$os/${name}.svg"
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
    create_command_svg "$os"
    
    for icon_name in "${ICONS[@]}"; do
        echo "  Creating $icon_name..."
        create_dummy_icon "$icon_name" "$os"
    done
done

echo "Done! SVG icons have been created in public/themes/vscodePurple/"

# List created files
echo -e "\nCreated files:"
find public/themes/vscodePurple -type f -name "*.svg" | sort