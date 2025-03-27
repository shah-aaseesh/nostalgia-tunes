# Nostalgia Tunes

A beautiful and modern music player application built with React, TypeScript, and Tailwind CSS. This application allows users to create and manage playlists of nostalgic songs, complete with a sleek user interface and smooth animations.

## Features

- 🎵 Modern music player interface
- 🎨 Beautiful UI with glass-morphism design
- 📱 Responsive layout for all devices
- 🎯 Admin panel for playlist management
- 🌈 Particle background effects
- 🔊 Volume control and progress tracking
- ❤️ Song favoriting system

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (for storage and database)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/nostalgia-tunes.git
   ```

2. Navigate to the project directory
   ```sh
   cd nostalgia-tunes
   ```

3. Install dependencies
   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server
   ```sh
   npm run dev
   ```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/          # Page components
  ├── lib/            # Utilities and services
  ├── types/          # TypeScript type definitions
  └── hooks/          # Custom React hooks
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the React community for amazing tools and libraries
- Inspired by modern music streaming platforms
- Built with love ❤️
