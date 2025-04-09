
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, LineChart, BookOpen, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bloom-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient leading-tight animate-float">
              Your AI Guide to Mental Wellness
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto animate-pulse-gentle animate-delay-200">
              Discover personalized support, insights and exercises powered by AI to help you cultivate mental wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-pulse-gentle animate-delay-400">
              <Button asChild size="lg" className="bg-wellness-500 hover:bg-wellness-600">
                <Link to="/chat">
                  Start Chatting
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-wellness-200 hover:bg-wellness-50">
                <Link to="/mood">
                  Track Your Mood
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 bloom-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">How Bloom Supports Your Wellbeing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bloom-card">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-wellness-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-wellness-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">AI Companion</h3>
                <p className="text-foreground/70">Chat with an AI trained to provide compassionate mental health support and guidance.</p>
                <Button asChild variant="link" className="p-0 mt-4 text-wellness-500">
                  <Link to="/chat">Start chatting</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bloom-card">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-calm-100 flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-calm-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Mood Tracking</h3>
                <p className="text-foreground/70">Record and visualize your emotional patterns with AI-powered insights and recommendations.</p>
                <Button asChild variant="link" className="p-0 mt-4 text-calm-500">
                  <Link to="/mood">Track now</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bloom-card">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-wellness-100 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-wellness-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">AI-Guided Journaling</h3>
                <p className="text-foreground/70">Express yourself with thoughtful prompts and receive meaningful reflections on your entries.</p>
                <Button asChild variant="link" className="p-0 mt-4 text-wellness-500">
                  <Link to="/journal">Start writing</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bloom-card">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-mint-100 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-mint-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Guided Meditation</h3>
                <p className="text-foreground/70">Experience personalized meditation sessions generated for your specific emotional needs.</p>
                <Button asChild variant="link" className="p-0 mt-4 text-mint-500">
                  <Link to="/meditate">Meditate now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-12 md:py-20 bloom-container bg-wellness-50 rounded-3xl my-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-wellness-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-wellness-600">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Your Support</h3>
              <p className="text-foreground/70">Select from our various AI-powered tools designed to support different aspects of mental wellness.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-wellness-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-wellness-600">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Share Your Thoughts</h3>
              <p className="text-foreground/70">Interact with our AI through conversation, journaling, or mood tracking to express your feelings.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-wellness-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-wellness-600">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Receive Personalized Guidance</h3>
              <p className="text-foreground/70">Get AI-generated insights, exercises, and content tailored to your unique emotional needs.</p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-16 bloom-container">
          <div className="bg-gradient-to-r from-wellness-500 to-wellness-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Begin Your Wellness Journey Today</h2>
            <p className="mb-8 md:max-w-2xl md:mx-auto">
              Take the first step toward improved mental wellbeing with our AI-powered tools and resources.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-wellness-600 hover:bg-wellness-50">
              <Link to="/chat">
                Get Started Now
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
