# Culinaire — Premium Kitchenware Store

A complete e-commerce website for the **Culinaire** kitchenware business.

## 🎨 Design
- Premium charcoal/black + gold + cream color scheme
- Fully responsive (mobile, tablet, desktop)
- Prices in Ghana Cedis (₵ GHS)

## 📄 Pages
| Page | Description |
|------|-------------|
| `index.html` | Home — hero, features, featured products, testimonials, brand story, newsletter |
| `shop.html` | Full catalog with category filters & search |
| `product.html` | Product detail with reviews/ratings & related products |
| `cart.html` | Shopping cart with quantity controls |
| `checkout.html` | Delivery & payment form with validation |
| `confirmation.html` | Order placed confirmation with order number |
| `wishlist.html` | Save & manage favourite products |
| `track.html` | Order tracking by order number |
| `wholesale.html` | Bulk & wholesale order enquiries |
| `about.html` | Brand story |
| `contact.html` | Contact form & business info |

## 🛠️ Tools / Features Built In
- **Shopping cart** — saved in browser storage (localStorage), persists between pages
- **Product search** — instant filtering as you type
- **Category filters** — Cookware, Knives, Dinnerware, Utensils, Appliances, Bakeware, Decor
- **Reviews & ratings** — customers can rate and review products (saved in localStorage)
- **Wishlist** — save favourite products with a click of the ♥ heart
- **Order placement** — validated checkout form, generates order number, saves orders
- **Order confirmation** — shows order summary after checkout
- **Order tracking** — search order status using your order number
- **WhatsApp QR code** — scan a QR code to instantly chat with Culinaire on WhatsApp (0596800734) — appears in a popup on the floating button and on the Contact page
- **Floating WhatsApp & Call buttons** — quick contact via WhatsApp or phone (0596800734)
- **Testimonials** — customer reviews displayed on the home page
- **Bulk / Wholesale enquiry** — dedicated form for bulk orders & restaurant supplies
- **Toast notifications** — feedback when adding items to cart
- **Mobile navigation** — hamburger menu on small screens
- **Related products** — smart suggestions on product pages
- **🛠️ Admin Panel** — add, edit, and delete products with custom names & prices (stored in localStorage, no server needed). See the Admin section below.

## Run Locally

The complete storefront is served by the Next.js app from one local host. From the `Culinaire` folder, run:

```bash
npm run dev
```

Then open `http://localhost:3000`. The clean routes `/shop`, `/product?id=16`, `/cart`, `/checkout`, `/about`, `/contact`, `/wishlist`, `/track`, `/wholesale`, and `/admin` are all served by the same app. Browser storage continues to handle the cart, wishlist, orders, and admin products locally.

## 🌐 How to Make It Live (FREE Hosting Options)

### Option A — Netlify (easiest)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the **Culinaire** folder onto the page
3. Your site goes live instantly at a free URL like `https://culinaire.netlify.app`
4. You can connect a custom domain later (e.g. `www.culinaire.com`) if you buy one

### Option B — GitHub Pages (great for a permanent free site)
1. Create a free account at [github.com](https://github.com)
2. Create a new repository named `culinaire`
3. Upload all files from the `Culinaire` folder
4. Go to repo **Settings → Pages**
5. Select branch `main` / folder `/root` and click Save
6. Your site is live at `https://YOURUSERNAME.github.io/culinaire`

### Option C — Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up and click **New Project**
3. Import the `Culinaire` folder
4. Deploy — you get a free URL immediately

## 📞 Business Contact Details
- **Phone:** 0596800734
- **Email:** owusumartha2005@gmail.com
- **Location:** Konongo, Ghana

## 📝 Before Going Live — Customize These
1. **Products & prices** — edit `js/products.js` (names, prices in GHS, images, descriptions)
2. **WhatsApp business number** — add a floating WhatsApp button if you use it
3. **Working hours** — update the hours shown on the contact page if needed

## 🔐 Admin Panel (Separate from Client Area)
Manage your store's products from a simple admin page — no server or database required.

> **Important:** The system is split into two separate parts. The **client area** (all store pages) has **no link** to the admin panel, so customers never see or access it. The admin area is a **private section** reachable only by typing the URL directly (`admin.html`) and entering the admin password.

1. Navigate directly to **`admin.html`** (do not link it anywhere in the client-facing pages).
2. Enter the admin password: **`admin123`**
3. You can now:
   - **Add** new products (name, category, price, old price, rating, badge, image, description)
   - **Upload** a product image from your computer (auto-compressed & previewed) or paste an image URL
   - **Auto-suggest a name** from the uploaded image (on-device AI via TensorFlow.js + MobileNet) and Accept or Reject it
   - **Scan a barcode** (camera or from the uploaded image, or enter it manually) to look up the official product name on the Open Food Facts database
   - **Edit** products you've added
   - **Delete** products you've added
   - View all products (built-in + custom) with live stats

> **Note:** Custom products are stored in your browser's `localStorage`, so they persist on that device/browser.

### ⚠️ Important — Client-side storage limitation (SaaS note)
This is a **fully client-side** app (no backend/database). Admin-added products and uploaded images are stored in the **browser's `localStorage`**, so:
- Custom products added by the admin are only visible on **that same browser/device**.
- A customer browsing from their own device will **not** see admin-added custom products — they only see the built-in catalog in `js/products.js`.
- For a true multi-user SaaS where the admin-managed catalog is visible to **all** customers, you would need to connect a shared backend (e.g., Supabase, Firebase, or a Node/Express API). This is not included in the current setup.

To change the admin password, edit the `ADMIN_PASSWORD` constant in `js/admin.js`.

## 🔀 Admin / Client Separation
- **Client area** — `index.html`, `shop.html`, `product.html`, `cart.html`, `checkout.html`, `confirmation.html`, `wishlist.html`, `track.html`, `wholesale.html`, `about.html`, `contact.html`. These are visible and accessible to all customers. No admin link appears in any client footer or navigation.
- **Admin area** — `admin.html` + `js/admin.js`. This is a private panel, hidden from customers. It is only reachable via the direct URL `admin.html` and protected by the admin password. Admin-added products still appear across the store, but the management interface itself is not exposed to clients.

## 📁 Files
```
Culinaire/
├── index.html          # Home page
├── shop.html           # Product catalog
├── product.html        # Product detail
├── cart.html           # Shopping cart
├── checkout.html       # Checkout form
├── confirmation.html   # Order confirmation
├── wishlist.html       # Wishlist page
├── track.html          # Order tracking page
├── wholesale.html      # Wholesale enquiry page
├── about.html          # About page
├── contact.html        # Contact page
├── admin.html          # Admin panel (login, add/edit/delete products)
├── css/style.css       # Styles (incl. features: wishlist, reviews, testimonials, floating contact, admin)
├── js/
│   ├── products.js     # Product data & admin-product storage (getAllProducts, etc.)
│   ├── main.js         # Cart & navigation logic
│   ├── shop.js         # Filters & search
│   ├── cart.js         # Cart rendering
│   ├── checkout.js     # Order placement
│   ├── confirmation.js # Confirmation rendering
│   ├── features.js     # Wishlist, reviews & floating contact buttons
│   └── admin.js        # Admin login, product upload & management
└── images/             # Product images
```

## 🖥️ Preview
Open `index.html` in your browser to see the website locally before going live.

© 2025 Culinaire. All rights reserved.

