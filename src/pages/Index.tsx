
import React, { useState, useEffect } from 'react';
import { Calendar, Settings, Plus, List, Star, CheckCircle2, Circle, X, Trash2, Edit2, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SignInPage from '@/components/SignInPage';
import { toast } from '@/hooks/use-toast';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
  dueDate?: string;
  notes?: string;
  listId: string;
}

interface TodoList {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  count: number;
}

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<TodoList[]>([
    { id: 'my-day', name: 'My Day', icon: '☀️', gradient: 'my-day-gradient', count: 0 },
    { id: 'groceries', name: 'Groceries', icon: '🛒', gradient: 'groceries-gradient', count: 0 },
    { id: 'work', name: 'Work', icon: '💼', gradient: 'work-gradient', count: 0 },
    { id: 'personal', name: 'Personal', icon: '👤', gradient: 'personal-gradient', count: 0 },
    { id: 'fitness', name: 'Fitness', icon: '🏃', gradient: 'fitness-gradient', count: 0 },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀', gradient: 'getting-started-gradient', count: 0 },
  ]);
  const [selectedList, setSelectedList] = useState<string>('my-day');
  const [newTaskText, setNewTaskText] = useState('');
  const [newListName, setNewListName] = useState('');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoSort: false,
    theme: 'default'
  });

  // Sample tasks for demonstration
  useEffect(() => {
    const sampleTasks: Task[] = [
      { id: '1', text: 'Clean my room', completed: false, important: true, dueDate: '2025-06-05', listId: 'my-day' },
      { id: '2', text: 'TPS reports', completed: false, important: false, listId: 'work' },
      { id: '3', text: 'Buy milk', completed: false, important: false, listId: 'groceries' },
      { id: '4', text: 'Morning workout', completed: true, important: false, listId: 'fitness' },
      { id: '5', text: 'Set up todo app', completed: false, important: true, listId: 'getting-started' },
    ];
    setTasks(sampleTasks);
  }, []);

  // Update list counts
  useEffect(() => {
    const updatedLists = lists.map(list => ({
      ...list,
      count: tasks.filter(task => task.listId === list.id && !task.completed).length
    }));
    setLists(updatedLists);
  }, [tasks]);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      important: false,
      listId: selectedList
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    toast({ title: "Task added successfully!" });
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleImportant = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, important: !task.important } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({ title: "Task deleted successfully!" });
  };

  const editTask = (taskId: string, newText: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, text: newText } : task
    ));
    setEditingTask(null);
    setEditTaskText('');
    toast({ title: "Task updated successfully!" });
  };

  const addNewList = () => {
    if (!newListName.trim()) return;
    
    const newList: TodoList = {
      id: newListName.toLowerCase().replace(/\s+/g, '-'),
      name: newListName,
      icon: '📝',
      gradient: 'personal-gradient',
      count: 0
    };
    
    setLists([...lists, newList]);
    setNewListName('');
    toast({ title: "New list created successfully!" });
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredTasks = tasks.filter(task => task.listId === selectedList);
  const currentList = lists.find(list => list.id === selectedList);

  if (!isSignedIn) {
    return <SignInPage onSignIn={() => setIsSignedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSignedIn(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign In
            </Button>
          </div>
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="notifications" className="text-sm font-medium">
                    Enable Notifications
                  </label>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, notifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="auto-sort" className="text-sm font-medium">
                    Auto Sort Tasks
                  </label>
                  <Switch
                    id="auto-sort"
                    checked={settings.autoSort}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoSort: checked }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="theme" className="text-sm font-medium">
                    Theme
                  </label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, theme: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="colorful">Colorful</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="p-4">
          <Input placeholder="Search" className="w-full" />
        </div>

        {/* Lists */}
        <div className="flex-1 overflow-y-auto">
          {lists.map((list) => (
            <div
              key={list.id}
              onClick={() => setSelectedList(list.id)}
              className={`sidebar-item cursor-pointer p-3 mx-2 my-1 rounded-lg flex items-center justify-between transition-all ${
                selectedList === list.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{list.icon}</span>
                <span className="font-medium">{list.name}</span>
              </div>
              {list.count > 0 && (
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {list.count}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* New List */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="New list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addNewList()}
            />
            <Button onClick={addNewList} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className={`${currentList?.gradient} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-3">
                <span className="text-4xl">{currentList?.icon}</span>
                <span>{currentList?.name}</span>
              </h1>
              <p className="text-white/80 mt-1">{getCurrentDate()}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Calendar className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Add Task */}
        <div className="p-6 bg-white border-b">
          <div className="flex space-x-3">
            <Input
              placeholder="Add a task"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="flex-1 text-lg"
            />
            <Button onClick={addTask} className="px-6">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tasks */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <List className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl">No tasks yet</p>
              <p>Add a task above to get started!</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`task-hover bg-white rounded-lg p-4 border shadow-sm animate-slide-in ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                    )}
                  </button>
                  
                  {editingTask === task.id ? (
                    <div className="flex-1 flex space-x-2">
                      <Input
                        value={editTaskText}
                        onChange={(e) => setEditTaskText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && editTask(task.id, editTaskText)}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={() => editTask(task.id, editTaskText)}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <span
                      className={`flex-1 ${
                        task.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleImportant(task.id)}
                      className="flex-shrink-0"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          task.important ? 'text-yellow-500 fill-current' : 'text-gray-400'
                        }`}
                      />
                    </button>
                    
                    <button
                      onClick={() => {
                        setEditingTask(task.id);
                        setEditTaskText(task.text);
                      }}
                      className="flex-shrink-0"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                    </button>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
                
                {task.dueDate && (
                  <div className="mt-2 ml-9 text-sm text-blue-600">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
