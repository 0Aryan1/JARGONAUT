# 📄 Google Drive PDF Hosting Guide

## Why Use Google Drive for PDFs?

**Benefits:**
- ✅ Remove 50MB+ of PDFs from your website
- ✅ Faster page loads (no PDF download on page load)
- ✅ Easy to update PDFs without redeploying
- ✅ Free hosting with Google Drive
- ✅ Built-in PDF viewer

---

## Step-by-Step Procedure

### Step 1: Upload PDFs to Google Drive

1. **Go to Google Drive**: https://drive.google.com
2. **Create a folder** (Optional but recommended):
   - Click "New" → "New folder"
   - Name it: "Jargonaut PDFs" or "Hanketsu PDFs"
3. **Upload your PDFs**:
   - Drag and drop all 5 PDFs into the folder
   - Or click "New" → "File upload"

### Step 2: Get Shareable Links

For each PDF file:

1. **Right-click on the PDF** → "Get link" (or "Share")
2. **Change access to "Anyone with the link"**
   - Click "Restricted" → Select "Anyone with the link"
   - Make sure it says "Viewer" (not "Editor")
3. **Copy the link** - It will look like:
   ```
   https://drive.google.com/file/d/1ABC123xyz.../view?usp=sharing
   ```
4. **Extract the FILE_ID** from the URL:
   - The ID is the part between `/d/` and `/view`
   - Example: If URL is `https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing`
   - Then FILE_ID is: `1ABC123xyz`

### Step 3: Convert to Direct View/Download Links

You have 3 options for each PDF:

#### Option A: Embedded Viewer (Recommended)
```
https://drive.google.com/file/d/FILE_ID/preview
```
- Opens PDF in Google's viewer
- Good for reading online
- **Use this for embedding in your website**

#### Option B: Direct Download Link
```
https://drive.google.com/uc?export=download&id=FILE_ID
```
- Forces download
- Good for "Download PDF" buttons

#### Option C: Open in New Tab
```
https://drive.google.com/file/d/FILE_ID/view
```
- Opens in Google Drive interface
- User can download from there

---

## Step 4: Update Your Code

### Current Code (HanketsuPage.jsx)

Let's check what you currently have:

```bash
# Search for PDF references
grep -r "\.pdf" src/pages/HanketsuPage.jsx
```

### Updated Code - Method 1: Direct Links

Replace PDF URLs with Google Drive links:

```jsx
// In src/pages/HanketsuPage.jsx

const episodes = [
  {
    id: 1,
    title: 'Hanketsu Episode 1',
    thumbnail: '/han1.jpg',
    pdfUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID_1/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_1'
  },
  {
    id: 2,
    title: 'Hanketsu Episode 2',
    thumbnail: '/han2.jpg',
    pdfUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID_2/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_2'
  },
  // ... add all 5 episodes
];
```

### Updated Code - Method 2: Embedded Viewer

If you want to embed the PDF directly on your page:

```jsx
// In HanketsuPage.jsx
const [selectedPdf, setSelectedPdf] = useState(null);

// PDF Viewer Component
const PdfViewer = ({ pdfUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-900">
        <h3 className="text-white text-xl">PDF Viewer</h3>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-300 text-2xl"
        >
          ✕
        </button>
      </div>
      <iframe
        src={pdfUrl}
        className="w-full h-full"
        title="PDF Viewer"
        frameBorder="0"
      />
    </div>
  );
};

// In your component
{selectedPdf && (
  <PdfViewer 
    pdfUrl={selectedPdf} 
    onClose={() => setSelectedPdf(null)} 
  />
)}

// Button to open PDF
<button 
  onClick={() => setSelectedPdf('https://drive.google.com/file/d/FILE_ID/preview')}
  className="btn"
>
  View PDF
</button>
```

### Updated Code - Method 3: Simple Links (Easiest)

```jsx
// Just use simple links that open in new tab
<a 
  href="https://drive.google.com/file/d/FILE_ID/view" 
  target="_blank" 
  rel="noopener noreferrer"
  className="btn"
>
  View Episode 1 PDF
</a>

<a 
  href="https://drive.google.com/uc?export=download&id=FILE_ID"
  className="btn"
>
  Download Episode 1 PDF
</a>
```

---

## Step 5: Remove Local PDFs

After confirming the Google Drive links work:

```bash
# Backup first (optional)
mkdir -p public/pdf-backup
mv public/*.pdf public/pdf-backup/

# Or just delete them
rm public/Hanketsu*.pdf

# Rebuild and test
npm run build
npm run preview
```

---

## Complete Example Implementation

Here's a complete example you can use:

```jsx
// src/pages/HanketsuPage.jsx

import React, { useState } from 'react';

const HANKETSU_EPISODES = [
  {
    id: 1,
    title: 'Hanketsu - Episode 1',
    description: 'First episode description...',
    thumbnail: '/han1.jpg',
    pdfPreview: 'https://drive.google.com/file/d/YOUR_ID_1/preview',
    pdfDownload: 'https://drive.google.com/uc?export=download&id=YOUR_ID_1'
  },
  {
    id: 2,
    title: 'Hanketsu - Episode 2',
    description: 'Second episode description...',
    thumbnail: '/han2.jpg',
    pdfPreview: 'https://drive.google.com/file/d/YOUR_ID_2/preview',
    pdfDownload: 'https://drive.google.com/uc?export=download&id=YOUR_ID_2'
  },
  {
    id: 3,
    title: 'Hanketsu - Episode 3',
    thumbnail: '/han3.jpg',
    pdfPreview: 'https://drive.google.com/file/d/YOUR_ID_3/preview',
    pdfDownload: 'https://drive.google.com/uc?export=download&id=YOUR_ID_3'
  },
  {
    id: 4,
    title: 'Hanketsu - Episode 4',
    thumbnail: '/han4.jpg',
    pdfPreview: 'https://drive.google.com/file/d/YOUR_ID_4/preview',
    pdfDownload: 'https://drive.google.com/uc?export=download&id=YOUR_ID_4'
  },
  {
    id: 5,
    title: 'Hanketsu - Episode 5',
    thumbnail: '/han5.jpg',
    pdfPreview: 'https://drive.google.com/file/d/YOUR_ID_5/preview',
    pdfDownload: 'https://drive.google.com/uc?export=download&id=YOUR_ID_5'
  }
];

function HanketsuPage() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Hanketsu Episodes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HANKETSU_EPISODES.map((episode) => (
          <div key={episode.id} className="bg-white/10 rounded-lg overflow-hidden">
            <img 
              src={episode.thumbnail} 
              alt={episode.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{episode.title}</h3>
              <p className="text-white/70 mb-4">{episode.description}</p>
              
              <div className="flex gap-2">
                {/* View Button - Opens in new tab */}
                <a
                  href={episode.pdfPreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center transition"
                >
                  View PDF
                </a>
                
                {/* Download Button */}
                <a
                  href={episode.pdfDownload}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
                  download
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Embedded PDF Viewer Modal */}
      {selectedEpisode && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          <div className="flex justify-between items-center p-4 bg-gray-900">
            <h3 className="text-white text-xl">{selectedEpisode.title}</h3>
            <button 
              onClick={() => setSelectedEpisode(null)}
              className="text-white hover:text-gray-300 text-2xl"
            >
              ✕ Close
            </button>
          </div>
          <iframe
            src={selectedEpisode.pdfPreview}
            className="w-full flex-1"
            title="PDF Viewer"
            frameBorder="0"
          />
        </div>
      )}
    </div>
  );
}

export default HanketsuPage;
```

---

## Step 6: Test Everything

1. **Test each link** - Make sure all 5 PDFs open correctly
2. **Test on mobile** - Google Drive viewer is mobile-friendly
3. **Test download buttons** - Ensure downloads work
4. **Check page load time** - Should be MUCH faster without PDFs

---

## Performance Impact

### Before (with local PDFs):
- Page weight: ~58MB (23MB + 22MB + 3MB + 3MB + 3MB + 4MB other)
- Performance score: 38
- Load time: 10-15 seconds

### After (with Google Drive):
- Page weight: ~5MB (just images and code)
- Performance score: 70-85 (depends on image optimization)
- Load time: 2-3 seconds
- **Improvement: 85% smaller, 5x faster!**

---

## Troubleshooting

### Issue 1: "Access Denied" when opening PDF
**Solution**: Make sure sharing is set to "Anyone with the link"

### Issue 2: PDF doesn't load in iframe
**Solution**: Use the `/preview` endpoint, not `/view`

### Issue 3: Download button doesn't work
**Solution**: Use the `uc?export=download` format

### Issue 4: PDF opens in Drive interface instead of viewer
**Solution**: Use `/preview` for embedded viewing

---

## Alternative: Use Cloudflare R2 or AWS S3

If you want more control:

1. **Upload to Cloudflare R2** (Free tier: 10GB)
2. **Get public URL**
3. **Use in your code**

But Google Drive is simpler and free! 🚀

---

## Quick Reference: URL Formats

| Purpose | URL Format |
|---------|------------|
| Embed in iframe | `https://drive.google.com/file/d/FILE_ID/preview` |
| Open in new tab | `https://drive.google.com/file/d/FILE_ID/view` |
| Direct download | `https://drive.google.com/uc?export=download&id=FILE_ID` |
| Thumbnail | `https://drive.google.com/thumbnail?id=FILE_ID` |

---

## Next Steps

1. ✅ Upload PDFs to Google Drive
2. ✅ Get shareable links and extract FILE_IDs
3. ✅ Update your code with the new URLs
4. ✅ Remove local PDFs from public folder
5. ✅ Test all links
6. ✅ Rebuild and deploy
7. ✅ Enjoy 85% smaller website! 🎉

Need help with the code changes? Let me know which episode IDs you get and I'll update the code for you!
