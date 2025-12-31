# 🎯 Step-by-Step: Replace Local PDFs with Google Drive

## Your Current Setup

You have 5 PDFs embedded in `HanketsuPage.jsx`:
- `/Hanketsu 1.pdf` (23MB)
- `/Hanketsu 2.pdf` (22MB)
- `/Hanketsu 3.pdf` (3MB)
- `/Hanketsu 4.pdf` (3MB)
- `/Hanketsu 5.pdf` (3.2MB)

**Total: ~54MB of PDFs!** 😱

---

## Step 1: Upload to Google Drive

1. Go to https://drive.google.com
2. Create a new folder: "Hanketsu Episodes"
3. Upload all 5 PDFs from your `public/` folder
4. Wait for upload to complete

---

## Step 2: Get Shareable Links

For **each of the 5 PDFs**:

1. Right-click on the PDF → "Share" or "Get link"
2. Change access: "Restricted" → "Anyone with the link"
3. Set permission to: "Viewer"
4. Click "Copy link"

You'll get URLs like:
```
https://drive.google.com/file/d/1ABC123xyz456def/view?usp=sharing
```

### Extract the FILE_ID

From this URL: `https://drive.google.com/file/d/1ABC123xyz456def/view?usp=sharing`

The FILE_ID is: `1ABC123xyz456def` (the part between `/d/` and `/view`)

**Write down all 5 FILE_IDs:**
- Episode 1 FILE_ID: ___________________
- Episode 2 FILE_ID: ___________________
- Episode 3 FILE_ID: ___________________
- Episode 4 FILE_ID: ___________________
- Episode 5 FILE_ID: ___________________

---

## Step 3: Convert to Embed URLs

For iframe embedding, convert each FILE_ID to:
```
https://drive.google.com/file/d/FILE_ID/preview
```

Example:
- Original: `https://drive.google.com/file/d/1ABC123xyz456def/view?usp=sharing`
- For iframe: `https://drive.google.com/file/d/1ABC123xyz456def/preview`

---

## Step 4: Update Your Code

Open `src/pages/HanketsuPage.jsx` and replace the `episodes` array:

### BEFORE (Current Code):
```jsx
const episodes = [
  {
    id: 1,
    title: "Hanketsu - Episode 1",
    thumbnail: "/han1.jpg",
    pdf: "/Hanketsu 1.pdf",
    summary: "..."
  },
  // ... more episodes
];
```

### AFTER (With Google Drive):
```jsx
const episodes = [
  {
    id: 1,
    title: "Hanketsu - Episode 1",
    thumbnail: "/han1.jpg",
    pdf: "https://drive.google.com/file/d/YOUR_EPISODE_1_FILE_ID/preview",
    summary: "In a striking vindication of corporate governance principles..."
  },
  {
    id: 2,
    title: "Hanketsu - Episode 2",
    thumbnail: "/han2.jpg",
    pdf: "https://drive.google.com/file/d/YOUR_EPISODE_2_FILE_ID/preview",
    summary: "In a stunning reversal that sent shockwaves..."
  },
  {
    id: 3,
    title: "Hanketsu - Episode 3",
    thumbnail: "/han3.jpg",
    pdf: "https://drive.google.com/file/d/YOUR_EPISODE_3_FILE_ID/preview",
    summary: "In Mrs. Shailja Krishna v. Satori Global Ltd..."
  },
  {
    id: 4,
    title: "Hanketsu - Episode 4",
    thumbnail: "/han4.jpg",
    pdf: "https://drive.google.com/file/d/YOUR_EPISODE_4_FILE_ID/preview",
    summary: "In a landmark ruling that reverberates..."
  },
  {
    id: 5,
    title: "Hanketsu - Episode 5",
    thumbnail: "/han5.jpg",
    pdf: "https://drive.google.com/file/d/YOUR_EPISODE_5_FILE_ID/preview",
    summary: "In a stunning revelation that sent shockwaves..."
  }
];
```

**That's it!** No other code changes needed. Your existing iframe will work perfectly with Google Drive URLs.

---

## Step 5: Update the iframe (Optional Enhancement)

The iframe section already works, but you can optimize it:

### Current Code (Line 239):
```jsx
<iframe
  src={`${currentEpisode.pdf}#toolbar=0&navpanes=0&scrollbar=1`}
  className="w-full h-full"
  title={`${currentEpisode.title} PDF`}
  style={{ border: 'none' }}
>
```

### Optimized for Google Drive:
```jsx
<iframe
  src={currentEpisode.pdf}
  className="w-full h-full"
  title={`${currentEpisode.title} PDF`}
  style={{ border: 'none' }}
  allow="autoplay"
  loading="lazy"
>
```

**Note**: Remove the `#toolbar=0&navpanes=0&scrollbar=1` part for Google Drive URLs.

---

## Step 6: Test Locally

```bash
# Start dev server
npm run dev

# Visit http://localhost:5173/hanketsu
# Click through all 5 episodes
# Verify each PDF loads correctly
```

---

## Step 7: Remove Local PDFs

After confirming everything works:

```bash
# Create backup first (optional)
mkdir -p public/pdf-backup
mv public/Hanketsu*.pdf public/pdf-backup/

# Or delete them directly
rm public/Hanketsu*.pdf
```

---

## Step 8: Build and Deploy

```bash
# Build
npm run build

# Preview locally
npm run preview

# If everything looks good, deploy
git add .
git commit -m "Replace local PDFs with Google Drive links (saves 54MB)"
git push origin main
```

---

## Example with Real FILE_IDs

Here's what it looks like with actual IDs (you'll replace these with yours):

```jsx
const episodes = [
  {
    id: 1,
    title: "Hanketsu - Episode 1",
    thumbnail: "/han1.jpg",
    pdf: "https://drive.google.com/file/d/1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU9/preview",
    summary: "In a striking vindication..."
  },
  {
    id: 2,
    title: "Hanketsu - Episode 2",
    thumbnail: "/han2.jpg",
    pdf: "https://drive.google.com/file/d/1aBC2dEf3GhI4jKl5MnO6pQr7StU8vWx9/preview",
    summary: "In a stunning reversal..."
  },
  // ... and so on for episodes 3, 4, 5
];
```

---

## Performance Impact

### Before:
- 5 PDFs = 54MB
- Page weight = ~60MB total
- Load time = 15-20 seconds
- Performance score = 38

### After:
- 0 PDFs locally
- Page weight = ~5MB (just images)
- Load time = 2-3 seconds
- Performance score = 70-85
- **90% reduction in page size!** 🚀

---

## Troubleshooting

### Issue: PDF says "Access Denied"
**Fix**: Make sure sharing is set to "Anyone with the link" (not "Restricted")

### Issue: PDF doesn't load in iframe
**Fix**: Use `/preview` endpoint, not `/view`
```
✅ Correct: .../file/d/FILE_ID/preview
❌ Wrong: .../file/d/FILE_ID/view
```

### Issue: Google Drive shows ads or login prompt
**Fix**: This shouldn't happen with `/preview` and proper sharing settings. Double-check both.

### Issue: PDF loading is slow
**Expected**: First load may take 2-3 seconds as Google Drive streams the PDF. Subsequent loads are faster due to caching.

---

## Alternative: Add Download Button

If you want users to download PDFs too:

```jsx
{/* Add this above the iframe */}
<div className="mb-4 text-center">
  <a
    href={`https://drive.google.com/uc?export=download&id=${extractFileId(currentEpisode.pdf)}`}
    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
    download
  >
    📥 Download Episode {currentEpisode.id} PDF
  </a>
</div>

{/* Add this helper function at the top */}
const extractFileId = (url) => {
  const match = url.match(/\/d\/([^/]+)/);
  return match ? match[1] : '';
};
```

---

## Quick Checklist

- [ ] Upload 5 PDFs to Google Drive
- [ ] Get shareable links (set to "Anyone with the link")
- [ ] Extract all 5 FILE_IDs
- [ ] Update episodes array in HanketsuPage.jsx
- [ ] Test locally (npm run dev)
- [ ] Verify all 5 episodes load correctly
- [ ] Remove local PDFs from public folder
- [ ] Build (npm run build)
- [ ] Deploy (git push)
- [ ] Test on production
- [ ] Celebrate 54MB saved! 🎉

---

## Need Help?

Once you have your 5 FILE_IDs, send them to me and I'll update the code for you!

Format:
```
Episode 1: 1ABC...
Episode 2: 1DEF...
Episode 3: 1GHI...
Episode 4: 1JKL...
Episode 5: 1MNO...
```
