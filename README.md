# Yacine Ouardi | Frontend Developer Portfolio

This is the personal portfolio of **Yacine Ouardi**, a frontend developer specializing in **React**, **Next.js**, **TypeScript**, and **CSS/SCSS**. The portfolio showcases my work, projects, and blog, providing a glimpse into my development journey and expertise.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to my portfolio! This website showcases my skills, projects, blog posts, and more. Built with **Next.js** and **Tailwind CSS**, it’s optimized for performance and SEO, featuring smooth animations and responsive layouts across all screen sizes.

**Sections:**

- **Home** (Hero, About, Projects, etc.)
- **Blog** (Dynamically loaded blog posts from Sanity)
- **Testimonials**
- **Technologies**
- **Experience**
- **Contact**

The portfolio demonstrates my expertise as a **Frontend Developer** and is fully responsive to ensure a seamless experience on mobile and desktop devices.

## Technologies Used

This portfolio uses the following technologies:

- **Next.js** (React framework for server-side rendering)
- **React** (UI library)
- **TypeScript** (Static typing for JavaScript)
- **Tailwind CSS** (Utility-first CSS framework)
- **Sanity.io** (Headless CMS for managing blog posts)
- **Framer Motion** (Animations for UI elements)
- **React Syntax Highlighter** (Syntax highlighting for code snippets)
- **Nodemailer** (Backend email functionality)
- **Styled Components** (CSS-in-JS for styling components)

## Setup

To run this project locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio.git
```

### 2. Install dependencies

```bash
cd portfolio
npm install
```

### 3. Run the development server

```bash
npm run dev
```

You can now access the portfolio locally at [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm run start
```

This will create a production build and run the app on a production server.

## Project Structure

Here's a high-level overview of the project structure:

```
/portfolio
│
├── /app                  # Pages and layouts (Next.js app directory)
│   ├── /blog             # Blog-related pages
│   ├── /api              # API routes (e.g., contact form)
│   └── layout.tsx        # Global layout for all pages
│
├── /components           # Reusable UI components
│   ├── Nav.tsx           # Navigation bar component
│   ├── Hero.tsx          # Hero section component
│   ├── post.tsx          # Blog post component
│   └── reading-progressbar.tsx  # Progress bar component
│
├── /constants            # Constants like API calls and types
│   └── fetch.tsx         # Data fetching utilities
│
├── /public               # Static assets (images, robots.txt, etc.)
├── /styles               # Global styles (TailwindCSS setup)
├── /tools                # Utility files (e.g., sanity client setup)
│
└── README.md             # Project documentation
```

## Features

- **Responsive Design**: The site is fully responsive and mobile-first, ensuring smooth performance on all devices.
- **SEO Optimized**: Built with SEO in mind, the website includes meta tags, structured data, and server-side rendering.
- **Dynamic Blog**: Blog posts are dynamically loaded using **Sanity.io**, which allows easy content management.
- **Performance Optimized**: Lazy loading, Framer Motion for animations, and Tailwind CSS for efficient styling.
- **Contact Form**: Users can contact you directly through an API route using **Nodemailer** for email functionality.
- **Testimonials**: Displaying client feedback and project testimonials.
- **Tech Stack Showcase**: Section showcasing the technologies you are proficient in.

## Dependencies

The project uses the following dependencies:

### Dependencies:

- `@sanity/image-url` - For handling images from Sanity.
- `@tailwindcss/typography` - Tailwind Typography plugin for rich text styling.
- `framer-motion` - For animations.
- `lucide-react` - Icon library for React.
- `next-sanity` - Integrates Next.js with Sanity.io.
- `nodemailer` - For email sending.
- `react-syntax-highlighter` - Syntax highlighting for code snippets.

### DevDependencies:

- `eslint` - For linting the JavaScript/TypeScript code.
- `tailwindcss` - For utility-first CSS styling.
- `typescript` - For TypeScript support.

## Contributing

Feel free to fork this repository and submit issues or pull requests. If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
