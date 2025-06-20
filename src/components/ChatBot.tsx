
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const responses = {
    en: {
      greeting: "Hello! I'm your DigiPanchayath assistant. How can I help you today?",
      reportIssue: "To report an issue, click on 'Report Issue' from the main menu. You can describe your problem, attach photos/videos, and submit it to the relevant department.",
      trackProgress: "You can track your complaint progress by clicking 'Track Progress' and entering your complaint ID or phone number.",
      schemes: "Government schemes are available under 'Government Schemes' section. You can view details and apply for schemes like Rythu Bandhu, Dalit Bandhu, etc.",
      escalate: "If your complaint is not resolved, you can escalate it through the 'Escalate' option. This will forward your complaint to higher authorities.",
      officerLogin: "Officers can login through 'Officer Login' to manage and respond to complaints in their jurisdiction.",
      contact: "For technical support, you can contact your local Panchayat office or District Collector's office.",
      default: "I'm here to help with questions about DigiPanchayath platform. You can ask about reporting issues, tracking complaints, government schemes, or how to use any features."
    },
    te: {
      greeting: "నమస్కారం! నేను మీ డిజిపంచాయతి సహాయకుడిని. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
      reportIssue: "సమస్యను నివేదించడానికి, ప్రధాన మెనూ నుండి 'సమస్యను నివేదించండి' క్లిక్ చేయండి. మీరు మీ సమస్యను వివరించవచ్చు, ఫోటోలు/వీడియోలను జతచేయవచ్చు మరియు సంబంధిత విభాగానికి సమర్పించవచ్చు.",
      trackProgress: "మీరు 'పురోగతిని ట్రాక్ చేయండి' క్లిక్ చేసి మీ ఫిర్యాదు ID లేదా ఫోన్ నంబర్‌ను నమోదు చేయడం ద్వారా మీ ఫిర్యాదు పురోగతిని ట్రాక్ చేయవచ్చు.",
      schemes: "ప్రభుత్వ పథకాలు 'ప్రభుత్వ పథకాలు' విభాగంలో అందుబాటులో ఉన్నాయి. మీరు రైతు బంధు, దళిత బంధు వంటి పథకాల వివరాలను చూడవచ్చు మరియు దరఖాస్తు చేసుకోవచ్చు.",
      escalate: "మీ ఫిర్యాదు పరిష్కరించబడకపోతే, మీరు 'ఎస్కలేట్ చేయండి' ఎంపిక ద్వారా దానిని ఎస్కలేట్ చేయవచ్చు. ఇది మీ ఫిర్యాదును ఉన్నత అధికారులకు ఫార్వార్డ్ చేస్తుంది.",
      officerLogin: "అధికారులు తమ అధికార పరిధిలోని ఫిర్యాదులను నిర్వహించడానికి మరియు ప్రతిస్పందించడానికి 'అధికారి లాగిన్' ద్వారా లాగిన్ చేయవచ్చు.",
      contact: "సాంకేతిక మద్దతు కోసం, మీరు మీ స్థానిక పంచాయతీ కార్యాలయం లేదా జిల్లా కలెక్టర్ కార్యాలయాన్ని సంప్రదించవచ్చు.",
      default: "నేను డిజిపంచాయతి ప్లాట్‌ఫారమ్ గురించి ప్రశ్నలతో సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీరు సమస్యలను నివేదించడం, ఫిర్యాదులను ట్రాక్ చేయడం, ప్రభుత్వ పథకాలు లేదా ఏవైనా ఫీచర్లను ఎలా ఉపయోగించాలి అనే దాని గురించి అడగవచ్చు."
    },
    hi: {
      greeting: "नमस्ते! मैं आपका डिजिपंचायत सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      reportIssue: "समस्या रिपोर्ट करने के लिए, मुख्य मेनू से 'समस्या रिपोर्ट करें' पर क्लिक करें। आप अपनी समस्या का वर्णन कर सकते हैं, फोटो/वीडियो संलग्न कर सकते हैं, और इसे संबंधित विभाग को सबमिट कर सकते हैं।",
      trackProgress: "आप 'प्रगति ट्रैक करें' पर क्लिक करके और अपनी शिकायत ID या फोन नंबर दर्ज करके अपनी शिकायत की प्रगति को ट्रैक कर सकते हैं।",
      schemes: "सरकारी योजनाएं 'सरकारी योजनाएं' अनुभाग में उपलब्ध हैं। आप रायथु बंधु, दलित बंधु आदि जैसी योजनाओं का विवरण देख सकते हैं और आवेदन कर सकते हैं।",
      escalate: "यदि आपकी शिकायत हल नहीं होती है, तो आप 'एस्केलेट करें' विकल्प के माध्यम से इसे एस्केलेट कर सकते हैं। यह आपकी शिकायत को उच्च अधिकारियों को भेज देगा।",
      officerLogin: "अधिकारी अपने क्षेत्राधिकार में शिकायतों का प्रबंधन और जवाब देने के लिए 'अधिकारी लॉगिन' के माध्यम से लॉगिन कर सकते हैं।",
      contact: "तकनीकी सहायता के लिए, आप अपने स्थानीय पंचायत कार्यालय या जिला कलेक्टर कार्यालय से संपर्क कर सकते हैं।",
      default: "मैं डिजिपंचायत प्लेटफॉर्म के बारे में प्रश्नों में मदद करने के लिए यहां हूं। आप मुद्दों की रिपोर्ट करने, शिकायतों को ट्रैक करने, सरकारी योजनाओं या किसी भी सुविधा का उपयोग कैसे करें, इसके बारे में पूछ सकते हैं।"
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessage: Message = {
        id: '1',
        text: responses[language].greeting,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([greetingMessage]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const currentResponses = responses[language];

    if (message.includes('report') || message.includes('issue') || message.includes('complaint') || 
        message.includes('నివేదించ') || message.includes('समस्या') || message.includes('रिपोर्ट')) {
      return currentResponses.reportIssue;
    }
    
    if (message.includes('track') || message.includes('progress') || message.includes('status') ||
        message.includes('ट्रैक') || message.includes('प्रगति') || message.includes('ట్రాక్') || message.includes('పురోగతి')) {
      return currentResponses.trackProgress;
    }
    
    if (message.includes('scheme') || message.includes('योजना') || message.includes('పథకాలు') ||
        message.includes('rythu') || message.includes('dalit') || message.includes('रायथु') || message.includes('दलित')) {
      return currentResponses.schemes;
    }
    
    if (message.includes('escalate') || message.includes('एस्केलेट') || message.includes('ఎస్కలేట్')) {
      return currentResponses.escalate;
    }
    
    if (message.includes('officer') || message.includes('login') || message.includes('अधिकारी') || 
        message.includes('लॉगिन') || message.includes('అధికారి') || message.includes('లాగిన్')) {
      return currentResponses.officerLogin;
    }
    
    if (message.includes('contact') || message.includes('support') || message.includes('संपर्क') || 
        message.includes('सहायता') || message.includes('సంప్రదించ') || message.includes('మద్దతు')) {
      return currentResponses.contact;
    }

    return currentResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-80 h-96 z-50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot className="w-4 h-4" />
          DigiPanchayath Assistant
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-700">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-80">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    {message.sender === 'user' && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'te' ? 'మీ ప్రశ్న టైప్ చేయండి...' : 
                          language === 'hi' ? 'अपना प्रश्न टाइप करें...' : 
                          'Type your question...'}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
