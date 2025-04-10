import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendHorizonal, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import generateCalmingContent from "@/pages/api/genai";

type Message = {
  id: string;
  content: string;
  displayedContent?: string;
  sender: "user" | "ai";
  timestamp: Date;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your AI wellness companion. How are you feeling today?",
      displayedContent: "Hi there! I'm your AI wellness companion. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const animateMessage = (
    fullText: string,
    callback: (partial: string) => void,
    speed = 20
  ) => {
    let index = 0;
    const interval = setInterval(() => {
      callback(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, speed);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      displayedContent: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    setTimeout(async () => {
      const geminiResponse = await generateCalmingContent(inputMessage);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: geminiResponse,
        displayedContent: "",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Hide loading as soon as animation begins
      setIsLoading(false);

      animateMessage(geminiResponse, (partial) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessage.id ? { ...msg, displayedContent: partial } : msg
          )
        );
      });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[800px] w-full">
      <Card className="flex-1 overflow-hidden flex flex-col w-full md:w-[900px] font-sans shadow-md transition-all hover:shadow-lg hover:border-wellness-200">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[90%] ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="bg-wellness-100">
                  <AvatarFallback>
                    {message.sender === "user" ? (
                      <User size={16} />
                    ) : (
                      <img src="./icons/bot.png"  alt="Bot" className="w-5 h-5 rounded-full" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-2xl px-4 py-2 text-sm ${
                    message.sender === "user"
                      ? "bg-wellness-500 text-white font-normal"
                      : "bg-wellness-100 text-foreground font-normal"
                  }`}
                >
                  {message.sender === "ai" && message.displayedContent
                    ? message.displayedContent
                    : message.content}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <Avatar className="bg-wellness-50">
                  <AvatarFallback>
                    <img src="./icons/bot.png" alt="Bot" className="w-5 h-5 rounded-full" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-wellness-400 border-t-transparent"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-6 w-full">
          <div className="flex items-end gap-4">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[60px] resize-none w-full font-normal"
              maxLength={500}
            />
            <Button
              size="icon"
              disabled={!inputMessage.trim() || isLoading}
              onClick={handleSendMessage}
              className="bg-wellness-500 hover:bg-wellness-600 h-[60px] w-[60px]"
            >
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-right font-light">
            For emotional support, not professional advice. Call 988 for crisis help.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
