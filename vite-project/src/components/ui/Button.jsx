const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-light dark:bg-primary-dark hover:bg-opacity-90 text-white',
    secondary: 'bg-secondary-light dark:bg-secondary-dark hover:bg-opacity-80 text-gray-800 dark:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    accent: 'bg-accent-light dark:bg-accent-dark hover:bg-opacity-90 text-white'
  };

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`rounded-md transition-all duration-200 hover:scale-105 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;