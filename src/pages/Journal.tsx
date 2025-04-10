
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JournalComponent from "@/components/Journal";

const Journal = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bloom-container py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gradient mt-3 text-gradient leading-tight uppercase tracking-wider font-montserrat">AI-Guided Journaling</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Express your thoughts and feelings through writing, with personalized AI insights to support your emotional wellbeing.
            </p>
          </div>
          
          <JournalComponent />
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Journal;
