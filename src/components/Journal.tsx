
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, SparkleIcon, BrainCircuit, FileText } from "lucide-react";
import { toast } from "sonner";

type JournalEntry = {
  id: string;
  date: Date;
  content: string;
  aiReflection?: string;
};

const promptSuggestions = [
  "What made you smile today?",
  "What's something you're looking forward to?",
  "Describe a challenge you're facing and how you might overcome it.",
  "What are three things you're grateful for today?",
  "How did you practice self-care today?",
  "What's one thing you learned recently?",
];

const Journal = () => {
  const [journalContent, setJournalContent] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState(promptSuggestions[0]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: new Date(Date.now() - 86400000 * 3),
      content: "Today I took a long walk in the park and noticed how the changing seasons affected the landscape. The leaves are starting to turn golden, and there's a crisp feeling in the air. It reminded me to appreciate the small changes in life.",
      aiReflection: "Your entry shows mindfulness and appreciation for nature. This connection to the world around you is a positive practice for mental wellbeing, helping you stay grounded in the present moment."
    },
    {
      id: "2",
      date: new Date(Date.now() - 86400000),
      content: "Work has been stressful lately with the new project deadlines. I've been trying to manage by taking short breaks throughout the day and practicing deep breathing when I feel overwhelmed. It seems to help a little.",
      aiReflection: "You're showing good self-awareness by recognizing your stress and implementing healthy coping mechanisms like breaks and breathing exercises. Consider adding a brief mindfulness practice to your routine."
    }
  ]);
  const [showReflection, setShowReflection] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReflection, setAiReflection] = useState("");

  const handleNewPrompt = () => {
    const randomPrompt = promptSuggestions[Math.floor(Math.random() * promptSuggestions.length)];
    setCurrentPrompt(randomPrompt);
  };

  const handleSaveEntry = () => {
    if (!journalContent.trim()) {
      toast.error("Please write something in your journal");
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      content: journalContent,
    };

    setJournalEntries([newEntry, ...journalEntries]);
    toast.success("Journal entry saved!");
    setJournalContent("");
    setShowReflection(false);
    setAiReflection("");
  };

  const handleGenerateReflection = () => {
    if (!journalContent.trim()) {
      toast.error("Please write something first");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generating a reflection
    setTimeout(() => {
      const reflections = [
        "Your entry reveals thoughtful self-reflection. I notice you're acknowledging both challenges and achievements, which is a balanced approach to personal growth.",
        "There's a theme of connection in your writing. Consider how nurturing relationships might further support your emotional wellbeing.",
        "I noticed you're expressing some anxiety. Remember that acknowledging these feelings is an important first step in processing them.",
        "Your writing shows curiosity and openness to new experiences, which are valuable traits for resilience and personal development.",
        "I sense a desire for more balance in your life. Small daily rituals might help you create the stability you're seeking.",
      ];
      
      const randomReflection = reflections[Math.floor(Math.random() * reflections.length)];
      setAiReflection(randomReflection);
      setShowReflection(true);
      setIsGenerating(false);
    }, 2000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3 space-y-6">
        <Card className="bloom-card">
          <CardHeader>
            <CardTitle>Write in Your Journal</CardTitle>
            <CardDescription>Express your thoughts, feelings, and experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays size={16} />
                  <span>{formatDate(new Date())}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNewPrompt}
                  className="text-xs gap-1 border-wellness-200"
                >
                  <SparkleIcon size={14} className="text-wellness-500" />
                  <span>New Prompt</span>
                </Button>
              </div>
              
              <div className="p-3 bg-wellness-50 rounded-md border border-wellness-100 text-sm">
                <p><strong>Prompt:</strong> {currentPrompt}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="journal" className="sr-only">Journal Entry</Label>
                <Textarea
                  id="journal"
                  placeholder="Start writing here..."
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleSaveEntry} className="bg-wellness-500 hover:bg-wellness-600">
                  Save Entry
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleGenerateReflection} 
                  disabled={isGenerating} 
                  className="border-wellness-200 gap-2"
                >
                  <BrainCircuit size={16} className="text-wellness-500" />
                  {isGenerating ? "Generating..." : "Generate AI Reflection"}
                </Button>
              </div>
              
              {showReflection && (
                <div className="mt-4 p-4 bg-wellness-50 rounded-md border border-wellness-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BrainCircuit size={18} className="text-wellness-500" />
                    <h4 className="font-medium">AI Reflection</h4>
                  </div>
                  <p className="text-sm">{aiReflection}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {journalEntries.length > 0 && (
          <Card className="bloom-card">
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
              <CardDescription>Your recent journal entries and reflections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="pb-6 border-b last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{formatDate(entry.date)}</h4>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText size={16} />
                      </Button>
                    </div>
                    <p className="text-sm whitespace-pre-line">{entry.content}</p>
                    
                    {entry.aiReflection && (
                      <div className="mt-3 p-3 bg-wellness-50 rounded-md border border-wellness-100">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <BrainCircuit size={14} className="text-wellness-500" />
                          <span className="text-xs font-medium">AI Reflection</span>
                        </div>
                        <p className="text-xs">{entry.aiReflection}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="w-full md:w-1/3">
        <Card className="bloom-card sticky top-24">
          <CardHeader>
            <CardTitle>Journaling Tips</CardTitle>
            <CardDescription>Get the most out of your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600 text-xs font-medium flex-shrink-0">
                  1
                </div>
                <p className="text-sm">Write without judgment. There are no right or wrong entries.</p>
              </li>
              <li className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600 text-xs font-medium flex-shrink-0">
                  2
                </div>
                <p className="text-sm">Try to journal regularly, even if just for a few minutes.</p>
              </li>
              <li className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600 text-xs font-medium flex-shrink-0">
                  3
                </div>
                <p className="text-sm">Use prompts when you're not sure what to write about.</p>
              </li>
              <li className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600 text-xs font-medium flex-shrink-0">
                  4
                </div>
                <p className="text-sm">Reflect on patterns you notice in your thoughts and feelings.</p>
              </li>
              <li className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600 text-xs font-medium flex-shrink-0">
                  5
                </div>
                <p className="text-sm">Use AI reflections to gain new perspectives on your entries.</p>
              </li>
            </ul>
            
            <div className="mt-6 p-3 bg-wellness-50 rounded-md border border-wellness-100">
              <h4 className="text-sm font-medium flex items-center gap-1.5 mb-2">
                <SparkleIcon size={14} className="text-wellness-500" />
                Journal Prompt Ideas
              </h4>
              <ul className="text-xs space-y-2">
                {promptSuggestions.slice(0, 3).map((prompt, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-wellness-500">•</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Journal;
