import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
          >
            Task Manager
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden sm:flex space-x-2 md:space-x-4">
              <Link to="/">
                <Button variant="secondary" size="small" className="transition-all duration-200 hover:scale-105">
                  Home
                </Button>
              </Link>
              <Link to="/tasks">
                <Button variant="secondary" size="small" className="transition-all duration-200 hover:scale-105">
                  Tasks
                </Button>
              </Link>
              <Link to="/posts">
                <Button variant="secondary" size="small" className="transition-all duration-200 hover:scale-105">
                  Posts
                </Button>
              </Link>
            </nav>
            
            <Button 
              onClick={toggleTheme}
              variant="secondary" 
              size="small"
              className="p-2 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Toggle theme"
            >
              <span className="text-lg">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;