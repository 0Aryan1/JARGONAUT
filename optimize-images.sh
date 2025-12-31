#!/bin/bash

# Image Optimization Script for Jargonaut
# This script helps compress images to improve website performance

echo "🖼️  Image Optimization Script"
echo "================================"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick is not installed!"
    echo "Install it with: brew install imagemagick"
    echo ""
fi

# Check if cwebp (WebP converter) is installed
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  WebP tools not installed!"
    echo "Install it with: brew install webp"
    echo ""
fi

echo "📊 Current Image Sizes:"
echo "================================"
du -sh public/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null | sort -h

echo ""
echo "💡 Recommendations:"
echo "================================"
echo "1. wlogo.png (1.9MB) → Compress to <100KB"
echo "   Command: convert wlogo.png -quality 85 -resize 800x wlogo-optimized.png"
echo ""
echo "2. Hanketsu images (1.2-2MB) → Convert to WebP"
echo "   Command: cwebp -q 80 han1.jpg -o han1.webp"
echo ""
echo "3. Video file (7.1MB) → Compress using FFmpeg"
echo "   Command: ffmpeg -i hanketsu.MP4 -vcodec libx264 -crf 28 hanketsu-compressed.mp4"
echo ""
echo "4. Hero background → Use blur placeholder"
echo ""

# Offer to create optimized versions
echo ""
read -p "Would you like to create optimized versions? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 Creating optimized versions..."
    
    # Create backup directory
    mkdir -p public/originals
    
    # Optimize PNG logo if ImageMagick is available
    if command -v convert &> /dev/null; then
        if [ -f "public/wlogo.png" ]; then
            echo "Optimizing wlogo.png..."
            cp public/wlogo.png public/originals/
            convert public/wlogo.png -quality 85 -resize 800x public/wlogo-optimized.png
            echo "✅ Created wlogo-optimized.png"
        fi
    fi
    
    # Convert JPGs to WebP if cwebp is available
    if command -v cwebp &> /dev/null; then
        for img in public/han*.jpg; do
            if [ -f "$img" ]; then
                filename=$(basename "$img" .jpg)
                echo "Converting $filename.jpg to WebP..."
                cp "$img" public/originals/
                cwebp -q 80 "$img" -o "public/${filename}.webp"
                echo "✅ Created ${filename}.webp"
            fi
        done
    fi
    
    echo ""
    echo "✅ Optimization complete!"
    echo "📁 Original files backed up to public/originals/"
    echo ""
    echo "⚠️  Remember to update your code to use the optimized files!"
else
    echo "Skipped optimization."
fi

echo ""
echo "================================"
echo "For video compression, run:"
echo "ffmpeg -i public/hanketsu.MP4 -vcodec libx264 -crf 28 public/hanketsu-compressed.mp4"
