# Photo Library

A photo gallery built with Angular. Browse a stream of images, open an individual photo, and save favorites for later.

## Features

- Infinite-scroll gallery that loads photos in batches.
- Photo detail pages.
- Favorites saved in browser storage, so they remain available after a refresh in the same browser.
- Images provided by [Picsum Photos](https://picsum.photos/).

## Requirements

- Node.js and npm
- An internet connection to load photos from Picsum

## Get started

Install dependencies and start the development server:

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). The app reloads when you change source files.

## App routes

| Route | Page |
| --- | --- |
| `/home` | Photo gallery |
| `/photos/:id` | Photo details |
| `/favorites` | Saved favorites |

The root path redirects to `/home`.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm test` | Run unit tests with Karma |
| `npm run watch` | Rebuild when files change, using the development configuration |

## Tech stack

Angular, TypeScript, RxJS, and SCSS.
