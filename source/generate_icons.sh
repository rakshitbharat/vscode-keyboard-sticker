#!/bin/bash

# Create base directories
mkdir -p public/themes/vscodePurple/{mac,windows,ubuntu}

# Function to create colored SVG icon
create_icon() {
    local name=$1
    local os=$2
    local color=""
    
    case $os in
        "mac") color="rgb(156, 39, 176)";;      # Purple
        "windows") color="rgb(68, 138, 255)";;   # Blue
        "ubuntu") color="rgb(233, 84, 32)";;     # Orange
    esac
    
    # Download Font Awesome icon
    curl -L "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/${name}.svg" \
        | sed "s/currentColor/${color}/g" \
        > "public/themes/vscodePurple/$os/${name}.svg"
    
    # Convert to PNG
    convert -background none \
        -resize 64x64 \
        "public/themes/vscodePurple/$os/${name}.svg" \
        "public/themes/vscodePurple/$os/${name}.png"
    
    rm "public/themes/vscodePurple/$os/${name}.svg"
}

# List of icons to create
declare -A ICONS=(
    ["copy"]="copy"
    ["paste"]="paste"
    ["cut"]="cut"
    ["undo"]="undo"
    ["help"]="question-circle"
    ["rename"]="edit"
    ["find_next"]="search"
    ["find_previous"]="search-minus"
    ["debug"]="bug"
    ["editor"]="edit"
    ["terminal"]="terminal"
    ["problems"]="exclamation-circle"
    ["breakpoint"]="circle"
    ["menu"]="bars"
    ["fullscreen"]="expand"
    ["developer_tools"]="code"
)

# Create icons for each OS
for os in mac windows ubuntu; do
    for icon_name in "${!ICONS[@]}"; do
        echo "Creating $icon_name for $os..."
        create_icon "${ICONS[$icon_name]}" "$os"
    done
done

echo "Done! Icons have been created in public/themes/vscodePurple/"