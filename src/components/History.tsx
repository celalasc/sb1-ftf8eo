import React, { useState } from 'react';
import { Search, Archive, Trash2, MessageSquare, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatHistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  time: string;
  model: string;
  archived: boolean;
}

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState<ChatHistoryItem[]>([
    {
      id: '1',
      title: 'Project Planning Discussion',
      preview: 'Let's discuss the timeline for the new feature implementation...',
      date: '2024-03-15',
      time: '14:30',
      model: 'GPT-4',
      archived: false
    },
    {
      id: '2',
      title: 'Code Review Session',
      preview: 'Can you help me optimize this database query?',
      date: '2024-03-15',
      time: '11:20',
      model: 'Claude-3',
      archived: false
    },
    {
      id: '3',
      title: 'Bug Analysis',
      preview: 'I'm seeing an error in the authentication flow...',
      date: '2024-03-14',
      time: '16:45',
      model: 'GPT-3.5',
      archived: true
    }
  ]);

  const [showArchived, setShowArchived] = useState(false);

  const filteredChats = chats.filter(chat => 
    (chat.archived === showArchived) &&
    (chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     chat.preview.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleArchive = (id: string) => {
    setChats(chats.map(chat => 
      chat.id === id ? { ...chat, archived: !chat.archived } : chat
    ));
  };

  const handleDelete = (id: string) => {
    setChats(chats.filter(chat => chat.id !== id));
  };

  return (
    <div className="flex-1 p-6">
      <div className="glass rounded-2xl p-6 h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Chat History</h2>
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showArchived 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {showArchived ? 'Show Active' : 'Show Archived'}
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare size={16} className="text-indigo-400" />
                      <h3 className="text-white font-medium">{chat.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                        {chat.model}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{chat.preview}</p>
                    <div className="flex items-center gap-4 text-white/40 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{chat.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{chat.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleArchive(chat.id)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      title={chat.archived ? 'Unarchive' : 'Archive'}
                    >
                      <Archive size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(chat.id)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredChats.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/60">
                {searchTerm 
                  ? 'No chats found matching your search'
                  : showArchived 
                    ? 'No archived chats'
                    : 'No active chats'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;