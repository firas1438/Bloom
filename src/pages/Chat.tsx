import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIChat from "@/components/AIChat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("chat");
  
  useEffect(() => {
    toast({
      title: "Welcome to the AI Chat",
      description: "Share what's on your mind, and I'll do my best to support you.",
      duration: 5000,
    });
  }, [toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bloom-container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gradient">AI Wellness Companion</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              A judgment-free space where you can express your thoughts and feelings. 
              Our AI is here to listen, support, and provide guidance.
            </p>
          </div>
          
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="chat" className="flex gap-2 items-center">
                <Heart size={16} />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex gap-2 items-center">
                <Info size={16} />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex gap-2 items-center">
                <HelpCircle size={16} />
                <span>FAQ</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <AIChat />
            </TabsContent>
            
            <TabsContent value="resources">
              <Card className="bloom-card">
                <CardHeader>
                  <CardTitle>Mental Health Resources</CardTitle>
                  <CardDescription>Professional support services and tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg border border-wellness-100 bg-wellness-50">
                      <h3 className="font-medium mb-2">Crisis Support</h3>
                      <p className="text-sm mb-3">
                        If you're in crisis or experiencing thoughts of self-harm, please reach out for immediate help.
                      </p>
                      <ul className="text-sm space-y-2">
                        <li className="flex flex-col">
                          <span className="font-semibold">988 Suicide & Crisis Lifeline</span>
                          <span>Call or text 988 (24/7)</span>
                        </li>
                        <li className="flex flex-col">
                          <span className="font-semibold">Crisis Text Line</span>
                          <span>Text HOME to 741741 (24/7)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="font-medium">Professional Support</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border border-wellness-100">
                        <h4 className="font-medium mb-1">Find a Therapist</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Connect with licensed mental health professionals
                        </p>
                        <Button variant="outline" size="sm">Search Providers</Button>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-wellness-100">
                        <h4 className="font-medium mb-1">Support Groups</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Find community with others facing similar challenges
                        </p>
                        <Button variant="outline" size="sm">Find Groups</Button>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-wellness-100">
                        <h4 className="font-medium mb-1">Self-Help Tools</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Access resources for managing your mental health
                        </p>
                        <Button variant="outline" size="sm">View Resources</Button>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-wellness-100">
                        <h4 className="font-medium mb-1">Educational Content</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Learn about mental health conditions and treatments
                        </p>
                        <Button variant="outline" size="sm">Read Articles</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card className="bloom-card">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Common questions about our AI wellness companion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Is the AI a replacement for therapy?</h3>
                      <p className="text-sm text-muted-foreground">
                        No. Our AI wellness companion is designed to provide support and guidance, but it is not
                        a substitute for professional mental health care. It cannot diagnose conditions or provide
                        treatment. If you're experiencing significant distress, please consult a qualified healthcare provider.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Is my conversation with the AI private?</h3>
                      <p className="text-sm text-muted-foreground">
                        We take your privacy seriously. All conversations with our AI are confidential. No human
                        reviews your specific conversations. Data is only used in aggregate and anonymized form
                        to improve the service.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">How does the AI generate its responses?</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI uses advanced language models trained on mental health resources and guidelines.
                        It's designed to provide supportive, empathetic responses based on best practices in
                        supportive communication and basic mental wellness principles.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">What should I do in a crisis situation?</h3>
                      <p className="text-sm text-muted-foreground">
                        If you're experiencing a mental health crisis or having thoughts of self-harm, please
                        contact emergency services immediately. In the US, you can call or text 988 to reach the
                        Suicide & Crisis Lifeline, or text HOME to 741741 for Crisis Text Line.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">How can I get the most out of the AI companion?</h3>
                      <p className="text-sm text-muted-foreground">
                        Be open and specific about your feelings and situation. The more context you provide,
                        the more tailored the AI's responses can be. Try different features like journaling and
                        mood tracking alongside the chat for a more comprehensive wellness experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
