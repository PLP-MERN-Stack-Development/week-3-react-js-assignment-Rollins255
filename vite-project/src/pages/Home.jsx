import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Task Manager</h1>
        <p className="mb-6">Manage your tasks efficiently with this simple application.</p>
        <div className="flex gap-4">
          <Button as="a" href="/tasks" variant="primary">
            Get Started
          </Button>
          <Button variant="secondary">
            Learn More
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;