
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Database, FileText, Youtube, Search } from 'lucide-react';

const Index = () => {
  return (
    <div className="space-y-16 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-findmystage-blue via-findmystage-purple to-findmystage-pink bg-clip-text text-transparent">
            AI-Powered Speaker Profiling
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          FindMyStage creates comprehensive profiles for speakers and identifies
          the perfect speaking opportunities based on their expertise and personality.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/profile">Create Speaker Profile</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/database">Explore Database</Link>
          </Button>
        </div>
      </section>
      
      {/* Flow Diagram */}
      <section className="max-w-6xl mx-auto rounded-3xl border bg-card p-8">
        <h2 className="text-2xl font-semibold text-center mb-10">How FindMyStage Works</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="input-section space-y-4">
            <h3 className="text-xl font-medium text-center">User Input</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-findmystage-green" />
                <p>Upload PDF documents</p>
              </div>
              <div className="flex items-center gap-2">
                <Youtube size={20} className="text-findmystage-green" />
                <p>Link YouTube channels</p>
              </div>
              <div className="flex items-center gap-2">
                <Search size={20} className="text-findmystage-green" />
                <p>Add website URLs</p>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-findmystage-green" />
                <p>Connect LinkedIn profiles</p>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-findmystage-green" />
                <p>Reference books</p>
              </div>
            </div>
          </div>
          
          {/* AI Processing */}
          <div className="space-y-8">
            <div className="agent-section space-y-4">
              <h3 className="text-xl font-medium text-center">AI Analysis</h3>
              <p className="text-center">Our AI agent processes your content to create comprehensive speaker profiles.</p>
              <div className="flex justify-center mt-4">
                <ArrowRight size={24} className="text-findmystage-blue animate-pulse-slow" />
              </div>
            </div>
            
            <div className="flex justify-center -my-4">
              <ArrowRight size={24} className="transform rotate-90 text-findmystage-blue animate-pulse-slow" />
            </div>
            
            <div className="agent-section space-y-4">
              <h3 className="text-xl font-medium text-center">Event Matching</h3>
              <p className="text-center">The AI identifies relevant speaking opportunities and organizers.</p>
              <div className="flex justify-center mt-4">
                <ArrowRight size={24} className="text-findmystage-blue animate-pulse-slow" />
              </div>
            </div>
          </div>
          
          {/* Output Section */}
          <div className="space-y-8">
            <div className="output-section space-y-4">
              <h3 className="text-xl font-medium text-center">Speaker Profile</h3>
              <p className="text-center">Detailed speaker summary with topic expertise and personality insights.</p>
            </div>
            
            <div className="database-section space-y-4">
              <h3 className="text-xl font-medium text-center">Stage Database</h3>
              <div className="flex items-center gap-2 justify-center">
                <Database size={20} className="text-findmystage-pink" />
                <p>Curated database of speaking opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto py-8">
        <h2 className="text-3xl font-bold">Ready to Find Your Stage?</h2>
        <p className="text-lg text-muted-foreground">
          Let our AI agent analyze your content and match you with the perfect speaking opportunities.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link to="/profile">Get Started</Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
