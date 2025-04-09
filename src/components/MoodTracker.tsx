
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Meh, Frown, Calendar } from "lucide-react";
import { toast } from "sonner";

type MoodEntry = {
  id: string;
  date: Date;
  mood: "great" | "good" | "okay" | "bad" | "terrible";
  intensity: number;
  notes: string;
};

const MoodTracker = () => {
  const [mood, setMood] = useState<"great" | "good" | "okay" | "bad" | "terrible" | null>(null);
  const [intensity, setIntensity] = useState([5]);
  const [notes, setNotes] = useState("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { id: "1", date: new Date(Date.now() - 86400000 * 2), mood: "good", intensity: 7, notes: "Had a relaxing day with friends." },
    { id: "2", date: new Date(Date.now() - 86400000), mood: "okay", intensity: 5, notes: "Work was stressful but managed okay." },
  ]);

  const handleSubmit = () => {
    if (!mood) {
      toast.error("Please select a mood");
      return;
    }

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: mood,
      intensity: intensity[0],
      notes: notes,
    };

    setMoodHistory(prev => [newEntry, ...prev]);
    toast.success("Mood tracked successfully!");
    
    // Reset form
    setMood(null);
    setIntensity([5]);
    setNotes("");
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "great": return "😄";
      case "good": return "🙂";
      case "okay": return "😐";
      case "bad": return "😔";
      case "terrible": return "😢";
      default: return "😐";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="bloom-card w-full md:w-1/3">
        <CardHeader>
          <CardTitle>How are you feeling?</CardTitle>
          <CardDescription>Track your mood to discover patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Select your mood</Label>
              <RadioGroup
                value={mood || ""}
                onValueChange={(value) => setMood(value as any)}
                className="flex justify-between"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                    ${mood === "great" ? "bg-green-100 border-green-500" : "border-muted bg-background"}`}>
                    <RadioGroupItem value="great" id="great" className="sr-only" />
                    <label htmlFor="great" className="cursor-pointer flex items-center justify-center w-full h-full">
                      <Smile className={`h-6 w-6 ${mood === "great" ? "text-green-500" : "text-muted-foreground"}`} />
                    </label>
                  </div>
                  <span className="text-xs">Great</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                    ${mood === "good" ? "bg-teal-100 border-teal-500" : "border-muted bg-background"}`}>
                    <RadioGroupItem value="good" id="good" className="sr-only" />
                    <label htmlFor="good" className="cursor-pointer flex items-center justify-center w-full h-full">
                      <Smile className={`h-6 w-6 ${mood === "good" ? "text-teal-500" : "text-muted-foreground"}`} />
                    </label>
                  </div>
                  <span className="text-xs">Good</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                    ${mood === "okay" ? "bg-blue-100 border-blue-500" : "border-muted bg-background"}`}>
                    <RadioGroupItem value="okay" id="okay" className="sr-only" />
                    <label htmlFor="okay" className="cursor-pointer flex items-center justify-center w-full h-full">
                      <Meh className={`h-6 w-6 ${mood === "okay" ? "text-blue-500" : "text-muted-foreground"}`} />
                    </label>
                  </div>
                  <span className="text-xs">Okay</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                    ${mood === "bad" ? "bg-amber-100 border-amber-500" : "border-muted bg-background"}`}>
                    <RadioGroupItem value="bad" id="bad" className="sr-only" />
                    <label htmlFor="bad" className="cursor-pointer flex items-center justify-center w-full h-full">
                      <Frown className={`h-6 w-6 ${mood === "bad" ? "text-amber-500" : "text-muted-foreground"}`} />
                    </label>
                  </div>
                  <span className="text-xs">Bad</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                    ${mood === "terrible" ? "bg-red-100 border-red-500" : "border-muted bg-background"}`}>
                    <RadioGroupItem value="terrible" id="terrible" className="sr-only" />
                    <label htmlFor="terrible" className="cursor-pointer flex items-center justify-center w-full h-full">
                      <Frown className={`h-6 w-6 ${mood === "terrible" ? "text-red-500" : "text-muted-foreground"}`} />
                    </label>
                  </div>
                  <span className="text-xs">Terrible</span>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Intensity</Label>
                <span className="text-sm text-muted-foreground">{intensity[0]}/10</span>
              </div>
              <Slider
                value={intensity}
                onValueChange={setIntensity}
                max={10}
                step={1}
                min={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="What's affecting your mood today?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            <Button onClick={handleSubmit} className="w-full bg-wellness-500 hover:bg-wellness-600">
              Save Entry
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bloom-card w-full md:w-2/3">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Mood History</CardTitle>
            <CardDescription>Track your emotional patterns over time</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar size={16} />
            <span>View Calendar</span>
          </Button>
        </CardHeader>
        <CardContent>
          {moodHistory.length > 0 ? (
            <div className="space-y-4">
              {moodHistory.map((entry) => (
                <div 
                  key={entry.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-wellness-100 bg-gradient-to-r from-wellness-50/50 to-transparent"
                >
                  <div className="text-3xl">{getMoodEmoji(entry.mood)}</div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <h4 className="font-medium capitalize">{entry.mood}</h4>
                      <span className="text-xs text-muted-foreground">Intensity: {entry.intensity}/10</span>
                    </div>
                    {entry.notes && <p className="text-sm mt-1">{entry.notes}</p>}
                    <time className="text-xs text-muted-foreground mt-2 block">
                      {formatDate(entry.date)}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No mood entries yet. Start tracking to see your history.</p>
            </div>
          )}
          
          <div className="mt-6 p-4 rounded-lg bg-wellness-50 border border-wellness-100">
            <h4 className="font-medium mb-2">AI Wellness Insight</h4>
            <p className="text-sm">Based on your recent entries, you seem to be managing well overall with some fluctuations. Consider exploring guided meditation to help maintain balance during stressful periods.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
