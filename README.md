# Keystone Digital Strategy

Official website for Keystone Digital Strategy — a boutique digital consultancy offering brand identity, web development, and cybersecurity testing.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Font:** Schibsted Grotesk (Google Fonts)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Global styles + CSS variables
│   ├── admin/
│   │   └── page.tsx          # Admin panel (password protected)
│   └── api/
│       ├── contact/route.ts  # POST - saves contact form submissions
│       └── admin/route.ts    # GET/PATCH/DELETE - admin API
├── components/
│   ├── Navigation.tsx        # Sticky navbar
│   ├── Footer.tsx            # Site footer
│   ├── Logo.tsx              # Logo mark + wordmark components
│   ├── SplashScreen.tsx      # Intro animation on page load
│   ├── AnimatedBackground.tsx # Floating orb background
│   └── sections/
│       ├── Hero.tsx          # Hero section
│       ├── WhyStructure.tsx  # What we do (3 disciplines)
│       ├── Practice.tsx      # Services (4 cards)
│       ├── Portfolio.tsx     # Selected work
│       ├── About.tsx         # About + team
│       └── Contact.tsx       # Contact form
└── lib/
    ├── utils.ts              # cn() utility
    └── motion.ts             # Shared Framer Motion easings
data/
└── submissions.json          # Contact form submissions (auto-created)
```

---

## Admin Panel

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

- **Password:** `keystoneadmin1`
- View, read, reply to, and delete contact form submissions
- Unread submissions are highlighted with a gold dot
- Reply button opens your email client pre-addressed to the sender

---

## Contact Form

Submissions from the contact form are saved to `data/submissions.json` via the `/api/contact` endpoint. This file is created automatically on first submission.

---

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com). Connect the GitHub repository and Vercel will handle builds automatically.

> **Note:** The `data/submissions.json` file is written to the local filesystem. For production deployments on serverless platforms (Vercel, Netlify), replace the file-based storage with a database such as [Supabase](https://supabase.com) or [PlanetScale](https://planetscale.com).

---

## Brand

- **Primary colour:** `#0C2340` (Navy)
- **Accent:** `#AD8A52` (Muted Gold)
- **Background:** `#F6F7F9` (Paper)
- **Font:** Schibsted Grotesk — SemiBold (600) for headings, Medium (500) for body

---

## License

Private. All rights reserved. Keystone Digital Strategy.
