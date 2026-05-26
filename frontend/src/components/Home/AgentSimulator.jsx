import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Cpu, Sparkles, Terminal } from 'lucide-react';

export default function AgentSimulator() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Hello. I've analyzed your team's velocity. Project \"Aether\" is currently tracking 14% ahead of schedule. Would you like me to reallocate the surplus hours to \"Quantum\" testing?",
      time: '10:42 AM'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Yes, prioritize the high-risk modules first.',
      time: '10:43 AM'
    },
    {
      id: 3,
      sender: 'agent',
      text: "Optimization complete. 42 task dependencies updated. I've also notified the QA lead about the shift in focus.",
      time: '10:43 AM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Agent response after delay
    setTimeout(() => {
      let agentText = "I've received your instruction. Commencing systems audit and priority restructuring. All team schedules synced successfully.";
      const query = userMessage.text.toLowerCase();

      if (query.includes('optimize') || query.includes('reallocate')) {
        agentText = "Restructuring algorithms deployed. I have reassigned 8 hours of QA buffer to critical UI modules. Sync logs updated.";
      } else if (query.includes('bottleneck') || query.includes('status')) {
        agentText = "Anomaly detected in Aether cluster: node 4.2 has pending code reviews blocking QA flow. Flagged to engineering lead.";
      } else if (query.includes('hello') || query.includes('hi')) {
        agentText = "Greetings. I am ready to automate your operational flows. Ask me to 'reallocate buffer', 'find bottlenecks', or 'optimize schedule'.";
      }

      const agentMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: agentText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, agentMessage]);
    }, 1500);
  };

  return (
    <section className="relative px-6 md:px-12 py-24 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Neural Net Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c0c1ff" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center reveal reveal-fade-up">
        
        {/* Terminal Chat Box Container */}
        <div className="max-w-3xl w-full glass-card rounded-[2.5rem] border-white/10 shadow-[0_0_100px_rgba(73,75,214,0.12)] overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ffb4ab]" />
              <div className="w-3 h-3 rounded-full bg-[#fbabff]" />
              <div className="w-3 h-3 rounded-full bg-[#4cd7f6]" />
            </div>
            
            <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant font-medium uppercase tracking-wider select-none">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              Taskify Intelligence Agent v4.2
            </div>
            
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>

          {/* Chat Pane */}
          <div className="p-8 space-y-6 h-[400px] overflow-y-auto bg-surface-lowest/20">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                
                {/* Agent Icon */}
                {msg.sender === 'agent' && (
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 shadow-lg">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}

                {/* Message Bubble */}
                <div 
                  className={`p-4.5 rounded-2xl border text-sm max-w-[80%] leading-relaxed shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary text-[#0b1326] font-medium border-transparent rounded-tr-none'
                      : 'bg-surface-high/60 backdrop-blur border-white/5 text-on-surface rounded-tl-none'
                  }`}
                >
                  <div>{msg.text}</div>
                  <div 
                    className={`text-[9px] mt-2.5 font-mono ${
                      msg.sender === 'user' ? 'text-[#0b1326]/60' : 'text-on-surface-variant/50'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {/* User Icon */}
                {msg.sender === 'user' && (
                  <div className="w-10 h-10 rounded-xl bg-surface-variant border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                    <User className="w-5 h-5 text-on-surface" />
                  </div>
                )}

              </div>
            ))}

            {/* Simulated typing dot indicator */}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-surface-high/60 border border-white/5 p-4.5 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Form input */}
          <form 
            onSubmit={handleSend}
            className="p-4 bg-surface-lowest/70 border-t border-white/10 flex gap-3 items-center"
          >
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Try asking: 'optimize buffer' or 'locate bottleneck'..."
              className="flex-1 bg-surface-high/40 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-on-surface-variant/40"
            />
            <button 
              type="submit"
              className="bg-primary text-[#0b1326] p-3.5 rounded-xl hover:scale-105 transition-transform active:scale-95 flex items-center justify-center shadow-lg"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

        </div>

      </div>

    </section>
  );
}
