
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MoodTracker from "@/components/MoodTracker";

const Mood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bloom-container py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gradient">Mood Tracker</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Monitor your emotional wellbeing over time and gain insights from your mood patterns with AI-powered analysis.
            </p>
          </div>
          
          <MoodTracker />
          
         
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mood;
