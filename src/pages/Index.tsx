import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "That sounds like an amazing destination! I'd love to help you plan your trip. What dates are you considering?",
        "Great choice! I can suggest some incredible activities and hidden gems in that area. Would you like recommendations for accommodations as well?",
        "Perfect! Let me help you create an unforgettable itinerary. What's your travel style - adventure, relaxation, or cultural exploration?",
        "Excellent! I have some fantastic suggestions for you. What's your budget range for this trip?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: randomResponse,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    simulateAIResponse(text);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-ocean">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm shadow-soft">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <h2 className="text-xl font-semibold bg-gradient-sky bg-clip-text text-transparent">
            Travel AI Assistant
          </h2>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="container max-w-4xl mx-auto px-4 py-6">
            {messages.length === 0 ? (
              <WelcomeScreen />
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={scrollRef} />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm shadow-soft">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default Index;
