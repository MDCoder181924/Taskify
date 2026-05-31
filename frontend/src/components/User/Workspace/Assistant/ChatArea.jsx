import { useState } from 'react';
import { Sparkles, History, MoreVertical, Send, Calendar, Clock, Terminal } from 'lucide-react';

export default function ChatArea() {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Good morning! I\'ve analyzed your upcoming week. You have 3 critical deadlines overlapping with deep work blocks. Would you like me to suggest a reallocation of these tasks to maximize your cognitive energy?',
      time: 'Just now'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'Yes, please. Especially the project migration task. It feels like it\'s taking too much of my Friday.',
      time: 'Just now'
    },
    {
      id: 'msg-3',
      sender: 'assistant',
      text: 'Understood. Friday\'s capacity is currently at 115%. Based on your historical productivity peaks, I recommend moving the "Backend Migration Docs" to Wednesday morning at 9:00 AM.',
      time: 'Just now',
      recommendation: {
        title: 'Confirm Reallocation',
        details: 'Wednesday, Oct 24 • 09:00 AM',
        icon: Terminal
      }
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const newUserMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      time: 'Just now'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');

    // Simulate AI typing response
    setTimeout(() => {
      const aiResponse = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: 'Syncing query with cognitive core... Recommendation formulated successfully.',
        time: 'Just now'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <section className="flex-1 flex flex-col relative px-6 lg:px-12 pb-6 z-10">
      
      {/* Top Header contexts */}
      <header className="h-16 flex items-center justify-between border-b border-white/5 mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[#4cd7f6] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-black shadow-[0_0_8px_#22c55e]" />
          </div>
          <h2 className="font-display font-extrabold text-white text-base">
            AI Assistant 
            <span className="text-[#4cd7f6]/50 font-mono text-[9px] ml-2 tracking-widest uppercase bg-[#4cd7f6]/5 px-2 py-0.5 rounded border border-[#4cd7f6]/10 font-bold">
              V4.2-NEURAL
            </span>
          </h2>
        </div>

        <div className="flex gap-2">
          <button 
            className="p-2 rounded-lg glass-card hover:bg-white/10 text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
            onClick={() => alert('Accessing neural conversation history...')}
          >
            <History className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-lg glass-card hover:bg-white/10 text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
            onClick={() => alert('Opening assistant options...')}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Chat scroll box */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6 py-4 max-h-[62vh] scroll-smooth">
        {messages.map((msg) => {
          const isAI = msg.sender === 'assistant';
          return (
            <div 
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${isAI ? 'items-start' : 'items-end self-end'}`}
            >
              <div className="flex items-center gap-2 mb-1.5 px-1.5">
                <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${isAI ? 'text-[#ffa8a5]/70' : 'text-[#EF2F29]/70'}`}>
                  {isAI ? 'Assistant' : 'You'}
                </span>
              </div>

              <div 
                className={`p-4 rounded-2xl ${
                  isAI 
                    ? 'bg-[#5c0402]/10 border border-[#ffa8a5]/20 rounded-tl-none text-[#f3f4f6]' 
                    : 'bg-[#b81b16]/15 border border-[#EF2F29]/20 rounded-tr-none text-white'
                } backdrop-blur-md shadow-lg shadow-black/10`}
              >
                <p className="text-xs font-sans font-medium leading-relaxed">{msg.text}</p>

                {/* Confirm Reallocation interactive widget */}
                {isAI && msg.recommendation && (
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <div className="bg-black/30 rounded-xl p-3 border border-white/5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#ffa8a5]/10 flex items-center justify-center border border-[#ffa8a5]/20">
                          <Clock className="w-4 h-4 text-[#ffa8a5]" />
                        </div>
                        <div>
                          <p className="text-xs text-white font-bold leading-none">{msg.recommendation.title}</p>
                          <p className="text-[9px] text-[#c7c4d7]/70 font-mono mt-1 font-bold">{msg.recommendation.details}</p>
                        </div>
                      </div>
                      <button 
                        className="px-3.5 py-1.5 bg-[#ffa8a5]/20 hover:bg-[#ffa8a5]/30 text-[#ffa8a5] rounded-lg text-[10px] font-mono font-bold border border-[#ffa8a5]/50 transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                        onClick={() => alert('AI Suggestion Applied! Database sync active.')}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input controls pane */}
      <div className="mt-auto pt-4 relative">
        <form onSubmit={handleSendMessage} className="relative max-w-2xl mx-auto z-10">
          
          {/* Input box */}
          <div className="glass-card rounded-2xl flex items-center p-2.5 border border-white/10 focus-within:border-[#EF2F29]/50 transition-all shadow-xl shadow-black/30">
            <Sparkles className="w-5 h-5 text-[#ffa8a5] ml-3 shrink-0 animate-pulse" />
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a command or ask Taskify AI..."
              className="bg-transparent border-none focus:ring-0 outline-none flex-1 text-white placeholder-[#c7c4d7]/40 px-4 py-2.5 text-xs font-medium font-sans"
            />
            <button 
              type="submit"
              className="w-10 h-10 rounded-xl bg-[#EF2F29] hover:bg-[#b81b16] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer shadow-md shadow-[#EF2F29]/20"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex justify-center gap-6 mt-3 text-[9px] font-mono text-[#c7c4d7]/45 uppercase tracking-widest font-bold">
            <span>⌘K for Quick Actions</span>
            <span>/ for Templates</span>
          </div>

        </form>
      </div>

    </section>
  );
}
