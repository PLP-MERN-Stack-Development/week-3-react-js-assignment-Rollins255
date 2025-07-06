import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="primary">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;