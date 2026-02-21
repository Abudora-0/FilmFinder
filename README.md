# FilmFinder 🎬

A modern, responsive movie discovery and recommendation web application that helps you find, search, and save your favorite films.

![FilmFinder](https://img.shields.io/badge/status-active-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Version](https://img.shields.io/badge/version-1.0-blueviolet)

## Features

- 🎞️ **Browse Movies** - Explore Popular, Top Rated, and Upcoming movies
- 🔍 **Search Functionality** - Find movies by title with real-time search
- ❤️ **Favorites Management** - Save your favorite movies with persistent storage
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🎯 **Movie Details** - View comprehensive information including ratings, release date, and synopsis
- 🎬 **Featured Hero Section** - Displays a featured movie with quick access to details
- 🔔 **Toast Notifications** - Get feedback on all your actions
- ⚡ **Fast & Optimized** - Debounced search, lazy loading, and smooth performance

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **JavaScript (Vanilla)** - DOM manipulation and API integration
- **The Movie Database (TMDB) API** - Content and movie data
- **Font Awesome 6** - Icon library
- **LocalStorage** - Client-side data persistence for favorites

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to fetch data from TMDB API)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/filmfinder.git
cd filmfinder
```

2. Open the application:
   - Simply open `index.html` in your web browser, or
   - Use a local server for best experience:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## Usage

### Browsing Movies
- Click on **Popular**, **Top Rated**, or **Upcoming** buttons in the navigation bar to browse different categories
- Scroll through the movie grid to discover films

### Searching
- Enter a movie title in the search box
- Results update automatically as you type
- Clear the search to return to the current category

### Saving Favorites
- Click the heart icon on any movie card to add it to favorites
- Click the favorites button (❤️) in the navbar to view all saved movies
- Remove movies from favorites by clicking the heart icon again

### Viewing Details
- Click on any movie card to view full details
- See rating, release date, language, and complete synopsis
- Add/remove from favorites directly from the detail modal
- Close with the X button or press Escape

## Project Structure

```
filmfinder/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## Features in Detail

### Responsive Design
- **Desktop (1200px+)**: Full-width layout with large movie cards
- **Tablet (768px - 1199px)**: Adjusted spacing and card sizes
- **Mobile (< 480px)**: Single-column layout with optimized touch targets
- Favorites button properly centered and sized on mobile

### API Integration
- Fetches data from The Movie Database (TMDB) API
- Live API key configured for instant use
- Comprehensive error handling with user-friendly messages

### Local Storage
- Favorites are saved automatically to browser's localStorage
- Persistent across browser sessions
- Data stored as JSON for easy management

### Performance
- Debounced search input (500ms delay) to reduce API calls
- Optimized animations with CSS transitions
- Lazy loading of images with proper alt text
- Minimal JavaScript footprint

## Color Scheme

- **Primary**: Indigo (#6366f1)
- **Secondary**: Pink (#ec4899)
- **Tertiary**: Cyan (#06b6d4)
- **Background**: Dark slate (#0f172a)
- **Text**: White with various opacity levels

## Keyboard Shortcuts

- `Escape` - Close any open modal

## API Reference

This application uses [The Movie Database (TMDB) API](https://www.themoviedb.org/settings/api)

### Endpoints Used
- `/movie/popular` - Get popular movies
- `/movie/top_rated` - Get top rated movies
- `/movie/upcoming` - Get upcoming movies
- `/search/movie` - Search for movies by query

## Future Enhancements

- [ ] User authentication and cloud sync
- [ ] Movie ratings and reviews
- [ ] Genre filtering
- [ ] Personalized recommendations
- [ ] Watchlist feature
- [ ] Movie ratings from users
- [ ] Share favorites with friends
- [ ] Dark/Light theme toggle
- [ ] PWA support
- [ ] Multi-language support

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| IE 11   | ❌ Not supported |

## Known Issues

None at the moment. Please report any issues in the GitHub Issues section.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Attribution

- **Movie Data**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Fonts**: System fonts with fallbacks

## Author

**Your Name** - [GitHub Profile](https://github.com/yourusername)

## Support

If you encounter any issues or have questions, please:
1. Check existing [GitHub Issues](https://github.com/yourusername/filmfinder/issues)
2. Create a new issue with detailed information
3. Include your browser and OS information

## Screenshots

### Desktop View
- Navigation bar with category buttons and favorites
- Hero section with featured movie
- Movie grid with cards
- Detailed modal for movie information

### Mobile View
- Optimized navbar with centered favorites button
- Single-column movie grid
- Touch-friendly buttons and interactions
- Full responsiveness across all screen sizes

---

**Happy movie hunting! 🍿🎬**

Made with ❤️ using vanilla JavaScript
