import { useState } from 'react';
import { Plus, Check, Trash2, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Plan the week ahead', completed: false },
    { id: '2', text: 'Morning meditation', completed: true },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e: any) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-6 rounded-2xl bg-white shadow-sm border border-zinc-100 flex flex-col h-full">
      <div className="flex items-center gap-2 text-zinc-400 mb-6">
        <ListTodo size={18} />
        <span className="text-xs font-medium uppercase tracking-wider">Tasks</span>
      </div>

      <form onSubmit={addTodo} className="relative mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="w-full pl-4 pr-12 py-3 bg-zinc-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-zinc-200 transition-all placeholder:text-zinc-400"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus size={16} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className={`group flex items-center gap-3 p-3 rounded-xl transition-colors ${
                todo.completed ? 'bg-zinc-50' : 'hover:bg-zinc-50'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  todo.completed 
                    ? 'bg-zinc-900 border-zinc-900 text-white' 
                    : 'border-zinc-300 hover:border-zinc-400'
                }`}
              >
                {todo.completed && <Check size={12} />}
              </button>
              
              <span className={`flex-1 text-sm transition-all ${
                todo.completed ? 'text-zinc-400 line-through' : 'text-zinc-700'
              }`}>
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {todos.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 py-12">
            <p className="text-sm">All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
