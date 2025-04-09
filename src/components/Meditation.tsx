
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play, Pause, SkipBack, SkipForward, Volume2, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type MeditationType = "calm" | "focus" | "sleep" | "anxiety" | "gratitude";

const meditationOptions = [
  { id: "calm", name: "Calm", description: "Find peace and tranquility", duration: 5 },
  { id: "focus", name: "Focus", description: "Enhance concentration and attention", duration: 10 },
  { id: "sleep", name: "Sleep", description: "Prepare your mind for rest", duration: 15 },
  { id: "anxiety", name: "Anxiety Relief", description: "Reduce worry and stress", duration: 8 },
  { id: "gratitude", name: "Gratitude", description: "Cultivate appreciation", duration: 5 },
];

const Meditation = () => {
  const [selectedType, setSelectedType] = useState<MeditationType>("calm");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(5);
  const [volume, setVolume] = useState([80]);
  const [currentTimeElapsed, setCurrentTimeElapsed] = useState("0:00");
  const [currentTimeRemaining, setCurrentTimeRemaining] = useState("5:00");
  
  const handleMeditationChange = (value: string) => {
    const meditationType = value as MeditationType;
    setSelectedType(meditationType);
    
    const option = meditationOptions.find(opt => opt.id === meditationType);
    if (option) {
      setDuration(option.duration);
      setProgress(0);
      setCurrentTimeElapsed("0:00");
      setCurrentTimeRemaining(`${option.duration}:00`);
    }
    
    setIsPlaying(false);
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // In a real implementation, this would start a timer and update progress
      simulateProgress();
    }
  };
  
  const simulateProgress = () => {
    // Simulate meditation progress with incremental updates
    // In a real implementation, this would be tied to actual audio playback
    let currentProgress = 0;
    const totalSeconds = duration * 60;
    const interval = setInterval(() => {
      currentProgress += 1;
      const progressPercent = (currentProgress / totalSeconds) * 100;
      
      if (progressPercent >= 100) {
        clearInterval(interval);
        setProgress(100);
        setIsPlaying(false);
        setCurrentTimeElapsed(`${duration}:00`);
        setCurrentTimeRemaining("0:00");
        return;
      }
      
      setProgress(progressPercent);
      
      // Calculate time elapsed and remaining
      const elapsedSeconds = currentProgress;
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      const elapsedRemainder = elapsedSeconds % 60;
      
      const remainingSeconds = totalSeconds - currentProgress;
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingRemainder = remainingSeconds % 60;
      
      setCurrentTimeElapsed(`${elapsedMinutes}:${elapsedRemainder.toString().padStart(2, '0')}`);
      setCurrentTimeRemaining(`${remainingMinutes}:${remainingRemainder.toString().padStart(2, '0')}`);
      
    }, 1000); // Update every second
  };
  
  const restart = () => {
    setProgress(0);
    setIsPlaying(false);
    setCurrentTimeElapsed("0:00");
    setCurrentTimeRemaining(`${duration}:00`);
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <Card className="bloom-card sticky top-24">
          <CardHeader>
            <CardTitle>Choose a Meditation</CardTitle>
            <CardDescription>Select a meditation type to begin</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedType} onValueChange={handleMeditationChange} className="space-y-3">
              {meditationOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all ${
                    selectedType === option.id 
                      ? "border-wellness-300 bg-wellness-50" 
                      : "border-border hover:border-wellness-200"
                  }`}
                >
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id}
                    className={selectedType === option.id ? "text-wellness-500" : ""}
                  />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </Label>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <Clock size={14} />
                    <span>{option.duration} min</span>
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Customize</div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Volume</Label>
                    <span className="text-muted-foreground">{volume[0]}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-muted-foreground" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="w-full md:w-2/3">
        <Card className="bloom-card overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-wellness-200 to-wellness-50 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10">
                <h3 className="text-2xl font-bold mb-2 text-wellness-900">
                  {meditationOptions.find(o => o.id === selectedType)?.name} Meditation
                </h3>
                <p className="text-sm text-wellness-700 mb-6">
                  {meditationOptions.find(o => o.id === selectedType)?.description}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={restart}
                    className="rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 border-wellness-200"
                  >
                    <SkipBack size={18} />
                  </Button>
                  <Button
                    size="icon"
                    onClick={togglePlay}
                    className={`h-16 w-16 rounded-full ${
                      isPlaying 
                        ? "bg-wellness-50 text-wellness-700 hover:bg-wellness-100" 
                        : "bg-wellness-600 text-white hover:bg-wellness-700"
                    }`}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled
                    className="rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 border-wellness-200"
                  >
                    <SkipForward size={18} />
                  </Button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-wellness-300/20 filter blur-xl animate-float" />
              <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-wellness-400/20 filter blur-xl animate-float animate-delay-200" />
              <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-wellness-200/30 filter blur-xl animate-float animate-delay-400" />
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{currentTimeElapsed}</span>
              <span>{currentTimeRemaining}</span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="mt-8">
              <h4 className="font-medium mb-4">Current Meditation</h4>
              <div className="prose prose-sm max-w-none">
                <p>
                  This AI-generated meditation is designed to help you {selectedType === "calm" && "find inner peace and tranquility"}
                  {selectedType === "focus" && "enhance your concentration and mental clarity"}
                  {selectedType === "sleep" && "prepare your mind and body for restful sleep"}
                  {selectedType === "anxiety" && "reduce feelings of anxiety and worry"}
                  {selectedType === "gratitude" && "cultivate appreciation and positive emotions"}.
                </p>
                <p className="mt-4">
                  Find a comfortable position, either seated or lying down. Allow your body to relax and your mind to become present. 
                  The guided session will begin when you press play.
                </p>
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-wellness-50 border border-wellness-100">
                <h4 className="font-medium mb-2">AI-Generated Script Preview</h4>
                <p className="text-sm italic text-muted-foreground">
                  "Begin by taking a deep breath in... and slowly exhale. Feel the tension leaving your body with each breath. 
                  Notice the sensations in your body without judgment, simply observing..."
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bloom-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Benefits of {meditationOptions.find(o => o.id === selectedType)?.name} Meditation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {selectedType === "calm" && (
                  <>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Reduces stress and anxiety</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Promotes emotional balance</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Enhances self-awareness</span>
                    </li>
                  </>
                )}
                
                {selectedType === "focus" && (
                  <>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Improves concentration</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Enhances cognitive performance</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Reduces mental fatigue</span>
                    </li>
                  </>
                )}
                
                {selectedType === "sleep" && (
                  <>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Improves sleep quality</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Reduces insomnia symptoms</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Calms an overactive mind</span>
                    </li>
                  </>
                )}
                
                {selectedType === "anxiety" && (
                  <>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Reduces symptoms of anxiety</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Helps manage stress responses</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Promotes emotional regulation</span>
                    </li>
                  </>
                )}
                
                {selectedType === "gratitude" && (
                  <>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Increases positive emotions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Improves relationship satisfaction</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-wellness-500">•</span>
                      <span>Reduces comparison and envy</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bloom-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Practice Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2">
                  <span className="text-wellness-500">•</span>
                  <span>Find a quiet, comfortable space</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-wellness-500">•</span>
                  <span>Try to maintain the same practice time each day</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-wellness-500">•</span>
                  <span>Be patient with yourself and your progress</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-wellness-500">•</span>
                  <span>Start with shorter sessions and gradually increase</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Meditation;
