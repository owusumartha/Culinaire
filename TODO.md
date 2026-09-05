i# Culinaire — Admin Fixes (Image Upload + Delete + Name Suggestion + Barcode Scan)

## Goal
Fix the admin panel so admins can upload product images, reliably delete custom products, get an auto-suggested product name from the image (accept/reject), and optionally scan a barcode to look up the official product name.

## Steps
- [x] Add a shared image-source helper in `js/products.js` that handles data URLs, full URLs, and local `images/` files.
- [x] Add a real file upload input (with live preview) to the admin form in `admin.html`.
- [x] Add upload handling + image compression in `js/admin.js` so images fit in localStorage and get stored correctly.
- [x] Make delete action robust and re-render correctly in `js/admin.js`.
- [x] Update all product-rendering pages to use the shared helper so uploaded images display everywhere:
  - `js/shop.js`, `product.html`, `index.html`, `wishlist.html`
- [x] **Fix cart & checkout image rendering** to use the shared helper (admin-added products with uploaded images now display correctly in the cart and checkout summaries).
- [x] **Fix data-loss bug:** editing a custom product with an uploaded (data URL) image no longer wipes the image on save (`currentFormImage` tracking in `js/admin.js`).
- [x] Add client-side image recognition (TensorFlow.js + MobileNet) that suggests a product name from the uploaded image.
- [x] Add "Suggest Name from Image" button and a suggestion box (Accept / Reject) in the admin form.
- [x] Show the "Suggest Name" button automatically after an image is uploaded.
- [x] Add barcode question after image upload ("Does this item have a barcode?").
- [x] Add barcode scanning (camera via html5-qrcode + detect barcode in uploaded image via BarcodeDetector).
- [x] Look up the scanned barcode on the Open Food Facts official API to get the proper product name and suggest it.
- [x] Allow manual barcode entry as a fallback.
- [x] Document the client-side storage limitation in `README.md` (SaaS note).

## Decision
- Kept the system **fully client-side** (option 1). Admin-added products and uploaded images are stored in `localStorage` (per-browser/device). Documented the SaaS limitation in the README.
