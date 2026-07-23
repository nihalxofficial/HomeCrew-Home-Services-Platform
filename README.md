<div align="center">

# 🛠️ HomeCrew

### *The Crew Your Home Needs.*

**A full-stack home services booking platform connecting customers with verified professionals.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge)](https://homecrew-rosy.vercel.app)
[![Server Repo](https://img.shields.io/badge/Server-Repository-blue?style=for-the-badge)](https://github.com/nihalxofficial/HomeCrew-Server)

</div>

<!-- 📸 Add a banner screenshot or GIF of the app here -->

---

## 📑 Table of Contents

- [About](#-about)
- [Project Overview](#-project-overview)
  - [Objective](#objective)
  - [Target Audience](#target-audience)
  - [Platforms Used](#platforms-used)
  - [Deployments](#deployments)
- [Key Features](#-key-features)
- [AI Integrations](#-ai-integrations)
- [Tech Stack / npm Packages](#-npm-packages-used)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [License](#-license)

---

## 📖 About

HomeCrew is a booking platform for professional home services — cleaning, repairs, pest control, painting, tutoring, installation and more — built to connect customers with verified, background-checked pros in just a few clicks.

The goal was to go beyond a simple "services listing" site and build something that feels like a real consumer marketplace: category-based browsing, real-time availability, two distinct AI-powered flows (a conversational advisor for customers and a listing generator for pros), and a full content layer (blog, FAQ, testimonials) around the core booking experience.

**What makes it different from a typical services-listing clone:**
- **Conversational AI advisor** — a chat-based assistant helps customers describe and diagnose a home/appliance problem through back-and-forth conversation, instead of a static search box.
- **AI-generated service listings** — pros can type a rough one-line idea and get a complete draft listing (title, description, price, duration, tags) generated for them to review and edit, instead of filling out every field by hand.
- **Category-first discovery** — services are organized into browsable categories (Cleaning, Repair & Maintenance, Pest Control, Electrical, Tutoring, Installation, and more), each with live service counts.
- **Real-time availability & price comparison** — customers can compare pros by price, rating, and real-time availability before booking, rather than a static contact-request form.
- **Trust-first booking flow** — verified/background-checked pros, a satisfaction guarantee, and "pay only after the service is completed" reduce booking friction.
- **Dual-sided platform** — a dedicated "For Pros" path exists alongside the customer-facing experience, positioning HomeCrew as a two-sided marketplace rather than a single-audience app.
- **Content & trust layer** — an on-site blog with maintenance tips, a testimonials section, and a detailed FAQ back up the booking flow with real content instead of placeholder text.

---

## 🎯 Project Overview

### Objective
To design and build a complete home-services marketplace — from category browsing and AI-assisted service discovery, through comparing and booking a pro, to post-service payment — while practicing production-level concerns like authentication, role-based access, multi-provider AI integration, and a clean separation between a Next.js client and a dedicated backend server.

### Target Audience
- **Customers** looking to find, compare, and book vetted professionals for home services.
- **Service Professionals ("Pros")** who want to list their services and get discovered by customers.
- **Admins/Platform Operators** who oversee listings, categories, and platform-wide activity.
- **Developers/Recruiters** reviewing this project as a demonstration of full-stack, marketplace-style application development.

### Platforms Used
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, HeroUI
- **Backend:** Node.js/Express server (see [server repository](https://github.com/nihalxofficial/HomeCrew-Server))
- **Database:** MongoDB
- **Auth:** better-auth (JWT-based)
- **AI:** Google Gemini (conversational advisor) + Groq (listing generation)
- **Hosting:** Vercel (client)

### Deployments
| Component | Link |
|---|---|
| 🌐 Live App | [homecrew-rosy.vercel.app](https://homecrew-rosy.vercel.app) |
| 📁 Server Repo | [HomeCrew-Server](https://github.com/nihalxofficial/HomeCrew-Server) |

---

## ✨ Key Features

> Only the features that set HomeCrew apart are listed here — standard auth/CRUD basics are covered later in the docs.

- **AI Advisor Chatbot** — a conversational assistant that helps customers describe a home/appliance problem and surfaces matching service listings.
- **AI Service Listing Generator** — pros type a rough idea and get a full draft listing generated for review before publishing.
- **Category-based browsing** — services grouped into categories (Cleaning, Repair & Maintenance, Home Improvement, Pest Control, Tutoring, Installation, Electrical, TV Mounting, Gardening) with per-category service counts.
- **Service search & comparison** — customers can search, filter, and compare pros by price, rating, and real-time availability.
- **For Pros onboarding path** — a dedicated flow for professionals to join the platform and list their services.
- **Reviews & testimonials** — verified customer reviews surfaced on the homepage and per-service pages.
- **Blog / content hub** — categorized articles (maintenance tips, guides) tied to service categories.
- **FAQ & support center** — structured FAQ plus live chat, email, and 24/7 support entry points.
- **Newsletter subscription** — capture flow for exclusive offers and early access to new services.

---

## 🤖 AI Integrations

HomeCrew uses two separate AI providers, each matched to the shape of the task rather than a one-size-fits-all model:

| Feature | Provider | Model | Why this provider |
|---|---|---|---|
| **AI Advisor Chatbot** — multi-turn conversation with customers to diagnose their problem | Google Gemini | `gemini-flash-latest` | Native multi-turn chat session handling, well suited to back-and-forth conversation |
| **AI Service Listing Generator** — single-shot draft generation for pros adding a new service | Groq | `openai/gpt-oss-120b` | Very fast single-shot inference, ideal for structured JSON output with no conversation state needed |

Both AI calls are made **server-side only** (Express), never from the Next.js client directly — the client just calls HomeCrew's own `/api/chat` and `/api/services/generate` endpoints, keeping both provider API keys off the browser entirely.

---

## 📦 npm Packages Used

| Package | Purpose |
|---|---|
| `next` | React framework with App Router, SSR, and API routes |
| `react` / `react-dom` | Core UI library |
| `typescript` | Type safety across the client |
| `@heroui/react` | Primary component library (HeroUI) |
| `tailwindcss` | Utility-first CSS framework |
| `better-auth` | Authentication (JWT-based) |
| `react-icons` | Icon library |
| `react-toast` | Toast notifications |

> AI SDKs (`@google/generative-ai`, `groq-sdk`) live in the [server repository](https://github.com/nihalxofficial/HomeCrew-Server), not here — the client never talks to Gemini or Groq directly.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Used server-side (API routes, server components, server actions)
API_URL=your_server_base_url

# Used in the browser (client components) — must be reachable from the user's machine
NEXT_PUBLIC_API_URL=your_server_base_url

BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=your_app_url
MONGO_URI=your_mongodb_connection_string
```

> Never commit `.env.local` to version control.
>
> ⚠️ `NEXT_PUBLIC_*` variables are baked into the JavaScript bundle at **build time**. If you change one, rebuild the app rather than just restarting it.
>
> Gemini/Groq API keys are configured on the server side only — see the [server README](https://github.com/nihalxofficial/HomeCrew-Server) for those variables.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/nihalxofficial/HomeCrew-Home-Services-Platform.git
cd HomeCrew-Home-Services-Platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

<!-- Add your chosen license, e.g. MIT -->
This project is licensed under the MIT License.
