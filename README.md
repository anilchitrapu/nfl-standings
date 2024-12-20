# NFL Power Rankings Visualization

A mobile-friendly, responsive web application that displays NFL team power rankings over time with an interactive visualization. Built with Next.js, TailwindCSS, and Recharts.

## Features

- 📱 Responsive Design: Mobile-first interface using TailwindCSS
- 📊 Interactive Chart: Dynamic power rankings visualization using Recharts
- 🏈 Real-time Data: Integration with ESPN NFL API
- 🔄 Auto-updating: Data refreshes every 5 minutes
- 📤 Native Sharing: Share rankings via Web Share API with clipboard fallback
- ⚡ Performance Optimized: Caching and lazy-loading implemented

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Data Fetching**: SWR
- **Charts**: Recharts
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:
bash
git clone https://github.com/anilchitrapu/nfl-standings.git
cd nfl-standings

2. Install dependencies:

bash
npm install

3. Run the development server:

bash
npm run dev



4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

nfl-standings/
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── src/
│ ├── components/ # React components
│ ├── lib/ # Utility functions and data
│ ├── services/ # API services
│ └── types/ # TypeScript types
└── public/ # Static assets


## Deployment

The application is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy with default settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.