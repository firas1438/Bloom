
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExpressionDetector from "@/components/ExpressionDetector";

const Express = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bloom-container py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gradient mt-3 text-gradient leading-tight uppercase tracking-wider font-montserrat">Expression detector</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
            Detect your mood in real-time through facial expression analysis to help you understand how you're really feeling and support your emotional awareness.
            </p>
          </div>
          
          {/*component here */}
          <ExpressionDetector/>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Express;
