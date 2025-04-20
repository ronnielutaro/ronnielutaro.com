# Ronnie Lutaro's Portfolio Website
[![Deploy Next.js site to Pages](https://github.com/ronnielutaro/ronnielutaro.github.io/actions/workflows/nextjs.yml/badge.svg)](https://github.com/ronnielutaro/ronnielutaro.github.io/actions/workflows/nextjs.yml)
Welcome to my portfolio website! This project showcases my professional work, skills, and experiences through a modern, responsive, and performance-optimized design.

## Features

- **Responsive Design**: Seamlessly adapts to all devices, ensuring a great user experience on desktops, tablets, and mobile devices.
- **Dynamic Blog System**: Supports Markdown for easy content creation and management.
- **Project Portfolio**: Highlights my projects with detailed descriptions, tools used, and visuals.
- **Contact Section**: Provides an easy way for visitors to connect with me.
- **Modern UI/UX**: Clean, professional design with smooth animations and intuitive navigation.
- **Performance Optimized**: Fast loading times and efficient resource usage for a better user experience.

## Live Demo

Check out the live website: [https://ronnielutaro.github.io](https://ronnielutaro.github.io)

## Tech Stack

This project leverages modern web technologies and tools:

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Markdown Processing**: MDX for dynamic content rendering
- **Animations**: Framer Motion for smooth transitions
- **Icons**: React Icons for scalable and customizable icons
- **Deployment**: GitHub Pages with automated CI/CD via GitHub Actions

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ronnielutaro/ronnielutaro.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ronnielutaro.github.io
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`.

## Development Workflow

This project uses a modern development workflow:

- **Custom Build System**: Processes Markdown files into HTML and generates blog posts dynamically.
- **Styling**: Tailwind CSS for rapid UI development and consistent design.
- **Code Quality**: Prettier and ESLint for code formatting and linting.

### Project Structure

```
ronnielutaro.github.io/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── context/          # React context for state management
├── lib/              # Utility functions and hooks
├── public/           # Static assets (images, icons, etc.)
├── projects/         # Markdown files for project content
├── styles/           # Global CSS and Tailwind configuration
└── README.md         # Project documentation
```

### Adding New Projects

1. Create a new `.mdx` file in the `projects/` directory.
2. Add frontmatter metadata:
   ```yaml
   ---
   name: Project Name
   tools: [Tool1, Tool2, Tool3]
   description: Brief description of the project.
   image: "/path/to/image.jpg"
   url: "https://project-link.com"
   ---
   ```
3. Write your content in Markdown.
4. The project will automatically appear on the portfolio page.

## Deployment

This website is deployed using **GitHub Pages** with automated CI/CD pipelines. The deployment process includes:

1. Building the site using Next.js.
2. Uploading the generated static files as artifacts.
3. Deploying the site to GitHub Pages.

To deploy manually, run:
```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome! If you have suggestions or want to improve this project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.
