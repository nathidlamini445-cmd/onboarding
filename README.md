# DreamScale Onboarding

A modern onboarding flow application built with Next.js, React, and TypeScript.

## Features

- ✨ Interactive question flow with multiple question types
- 📝 Review page to review and edit answers
- 🎨 Beautiful UI with animations using Framer Motion
- 📱 Responsive design
- 🖼️ Image carousel with entrepreneur stories

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - UI components
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Onboarding
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
Onboarding/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   │   ├── QuestionFlow.tsx
│   │   └── ReviewPage.tsx
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   └── types.ts           # TypeScript types
├── components/            # Shared components
│   └── ui/                # UI components
├── public/                # Static assets (images)
├── lib/                   # Utility functions
└── hooks/                 # Custom React hooks
```

## Available Scripts

- `pnpm dev` - Start development server (port 3001)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## License

This project is private and proprietary.

## Notes

- Images used in this project are not owned by us. Please ensure proper licensing before commercial use.

