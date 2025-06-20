
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ChatBot from './ChatBot';

const ChatBotToggle: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg z-40"
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
      
      <ChatBot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default ChatBotToggle;
