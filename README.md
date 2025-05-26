# ronnielutaro.com

This is my personal website and blog, built with modern web development standards. It showcases my work, thoughts, and learnings across technical product development, startup acceleration, and ecosystem building in African markets.

## 🌐 Live Preview
You can preview the website at [ronnielutaro.com](https://ronnielutaro.com).

---

## 🛠️ Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Markdown/MDX**: Blog posts and pages are written in MDX for flexibility and interactivity.
- **Database**: Placeholder data is used for blog metadata, views, and unique viewers.
- **Analytics**: Google Analytics (recently migrated from Vercel Analytics).
- **Hosting**: [Vercel](https://vercel.com/) for deployment and serverless functions.
- **Other Tools**:
  - [CodeMirror](https://codemirror.net/) for in-browser Markdown editing.
  - [Reading Time](https://github.com/ngryman/reading-time) for estimating reading durations.

---

## 📂 Project Structure

```plaintext
app/
├── api/                  # API routes
├── blog/                  # Blog-related files
│   ├── [slug]/            # Dynamic route for blog posts
│   └── page.tsx           # Blog index page
├── components/           # Shared components
├── layouts/              # Application layout
├── page.tsx              # Home page
└── styles/               # Global styles
public/
├── images/               # Image assets
└── favicon.ico           # Favicon
```

---

## ⚙️ Environment variables

| Variable                | Description                                      |
|-------------------------|--------------------------------------------------|
| `GA_TRACKING_ID`       | Google Analytics tracking ID                     |
| `NEXT_PUBLIC_VERCEL_URL`| Vercel deployment URL (for analytics)          |

---

## 📝 Notes
- The website is built using the [App Router](https://nextjs.org/docs/app/building-your-application/routing) feature of Next.js 15, which enables a file-based routing system.
- Tailwind CSS is used for styling, allowing for rapid UI development with a utility-first approach.
- MDX is utilized for blog posts, enabling the inclusion of React components and custom layouts within Markdown files.
- Google Analytics is used for tracking and analyzing website traffic and user behavior.
- The project is hosted on Vercel, which provides a platform for frontend frameworks and static sites, with serverless functions.
- Placeholder data is used for blog metadata, views, and unique viewers, replacing the previous Cosmos DB implementation.
