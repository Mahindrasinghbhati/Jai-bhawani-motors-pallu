# Jai Bhawani Motors — website (GitHub Pages ready)

Plain HTML, CSS and JavaScript. No build step, no Node.js.

## Deploy on GitHub Pages
1. Create a repository and upload **everything in this folder** (keep the folder structure).
2. Repository **Settings → Pages → Deploy from a branch → main / (root)** → Save.
3. Open the link GitHub shows (it can take a minute).

## Pages
`index.html` Home · `collection.html` all 23 bikes (search, filter, compare) · `featured.html` 4 key bikes · `exclusive.html` Xtreme 160R 4V showcase · `bike.html?id=…` detail page for every bike · `offers.html` offers and EMI · `contact.html` test ride, service, about, FAQ, contact.

## Editing (no coding needed)
Open **js/data.js**. Change a `price`, spec, or name and every page updates.
- `featured: true` decides the 4 key bikes. `exclusive: true` decides the exclusive bike (only one).
- Offers, services, warranty, FAQ, phone, hours and address are in the same file.

## Replacing a bike photo
Save a new image as `images/bikes/<id>.jpg` at **960 × 640 px (3:2)**, bike centred on a dark background, same file name.
The current photos were cut from the low-resolution PDF, so higher-resolution originals will look sharper.
