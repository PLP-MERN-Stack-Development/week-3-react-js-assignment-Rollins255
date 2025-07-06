import { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const TaskManager = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setTasks([...tasks, {
      id: Date.now(),
      text: newTask,
      completed: false,
      createdAt: new Date().toISOString()
    }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
      
      {/* Add Task Form */}
      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-2 border rounded ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        />
        <Button type="submit" variant="primary">
          Add
        </Button>
      </form>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
          size="small"
        >
          All ({tasks.length})
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          onClick={() => setFilter('active')}
          size="small"
        >
          Active ({tasks.filter(t => !t.completed).length})
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          onClick={() => setFilter('completed')}
          size="small"
        >
          Completed ({tasks.filter(t => t.completed).length})
        </Button>
        {tasks.some(task => task.completed) && (
          <Button
            variant="danger"
            onClick={clearCompleted}
            size="small"
          >
            Clear Completed
          </Button>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            {filter === 'all' 
              ? 'No tasks yet. Add your first task!'
              : filter === 'active'
                ? 'No active tasks'
                : 'No completed tasks'}
          </p>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`flex items-center justify-between p-4 border rounded ${
                task.completed 
                  ? (theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200')
                  : (theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300')
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 rounded"
                />
                <span className={task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
                  {task.text}
                </span>
              </div>
              <Button 
                onClick={() => deleteTask(task.id)}
                variant="danger"
                size="small"
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default TaskManager;