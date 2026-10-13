# Realtor360 Dashboard

A TypeScript and React frontend based on the Realtor360 Figma design.

## Design Updates

- Added notification and account dropdowns to the header.
- Made Active Listing rows interactive with property details, including address, price, occupancy, available units, active leads, and description.
- Added a plus-button form for creating listings, with validation and selectable property photos.
- Made Leads Contacts interactive with profile photos and detail popups containing email, phone, and address.
- Added global search across listings, contacts, reminders, and scheduled items.

Listing addresses, descriptions, and contact details are sample data where the Figma design did not provide them. Newly created listings stay in the current browser session and are not backed by a server.

## Run Locally

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

The GitHub Actions workflow builds and deploys the site when changes are pushed to `main`. The repository is configured for the project path `Realtor360-internship-assignment-`.

After the workflow completes, the site URL will be:

`https://not-thea-man.github.io/Realtor360-internship-assignment-/`
