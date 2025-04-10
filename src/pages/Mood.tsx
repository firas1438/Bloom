
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
          <h1 className="text-3xl font-bold mb-4 text-gradient mt-3 text-gradient leading-tight uppercase tracking-wider font-montserrat">Mood Tracker</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
            Monitor your emotional wellbeing over time, uncover meaningful patterns with AI-driven analysis, and receive tailored advice to support your mental health journey.
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
