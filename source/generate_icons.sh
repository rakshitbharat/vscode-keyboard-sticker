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
    
    # Create a full-size SVG with gradient and text
    cat > "public/themes/vscodePurple/$os/${name}.svg" << EOF
<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad_${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.95"/>
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.85"/>
    </linearGradient>
    <filter id="shadow_${name}">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="100" height="100" rx="12" fill="url(#grad_${name})" filter="url(#shadow_${name})"/>
  <g transform="translate(50,50)" text-anchor="middle" dominant-baseline="middle">
    <text 
      y="-10"
      font-family="Arial, sans-serif" 
      font-size="24" 
      font-weight="bold" 
      fill="${text_color}"
      filter="url(#shadow_${name})"
    >${name}</text>
    <text 
      y="15"
      font-family="Arial, sans-serif" 
      font-size="14" 
      fill="${text_color}"
      opacity="0.9"
    >Click</text>
  </g>
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
    
    for icon_name in "${ICONS[@]}"; do
        echo "  Creating $icon_name..."
        create_dummy_icon "$icon_name" "$os"
    done
done

echo "Done! Full-size SVG icons have been created in public/themes/vscodePurple/"

# List created files
echo -e "\nCreated files:"
find public/themes/vscodePurple -type f -name "*.svg" | sort