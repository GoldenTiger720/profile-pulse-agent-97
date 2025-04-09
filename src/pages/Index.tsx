
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Globe, CheckCircle, BarChart3, Mic } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Star properties
    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    const generateStars = () => {
      stars.length = 0;
      const starCount = Math.floor(window.innerWidth * window.innerHeight / 1500);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: 0.1 + Math.random() * 0.3
        });
      }
    };
    
    generateStars();
    
    // Animation
    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move star
        star.y += star.speed;
        
        // Reset star position if it moves off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animateStars);
    };
    
    animateStars();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "Thank you for signing up. We'll be in touch soon!",
      });
      setName('');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Starry background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 -z-10 pointer-events-none"
      />
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Your Brand <span className="block">deserves to be seen.</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  FindMyStage helps speakers, authors, podcasters, and experts get booked on stages 
                  that match their expertise, grow their audience, and increase their revenue.
                </p>
                
                {/* Sign Up Form */}
                <div className="max-w-md bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="sr-only">Your Name</Label>
                      <Input 
                        id="name"
                        type="text"
                        placeholder="Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-background/70 backdrop-blur-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="sr-only">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="john.doe@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background/70 backdrop-blur-sm"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-findmystage-green hover:bg-findmystage-green/90 text-white rounded-md flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      SIGN UP
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="rounded-full px-8 animate-pulse-slow">
                    <Link to="/profile">Get Started</Link>
                  </Button>
                </div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="p-6 bg-findmystage-green/10 rounded-2xl border border-findmystage-green/30">
                  <h2 className="text-3xl font-bold text-findmystage-green mb-4">
                    AUTHORITY FUSION
                  </h2>
                  <p className="text-muted-foreground">
                    The AI-powered platform that helps you discover speaking opportunities
                    and grow your personal brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is FindMyStage Section */}
      <section className="py-16 bg-card/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">WHAT IS AUTHORITY FUSION?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              FindMyStage helps you build authority in your niche by connecting you with the right speaking opportunities, 
              media outlets, and communities to showcase your expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Three Column Features */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Speakers Column */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-3xl font-bold">Speakers</h2>
                <p className="text-muted-foreground">
                  We find speaking opportunities that are the perfect fit for you, 
                  matched to your expertise and audience.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-findmystage-green shrink-0 mt-1" size={20} />
                    <span>Personalized speaking opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-findmystage-green shrink-0 mt-1" size={20} />
                    <span>AI-matched audience profiles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-findmystage-green shrink-0 mt-1" size={20} />
                    <span>Direct connections with event organizers</span>
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/profile">Get Started <ArrowRight size={16} /></Link>
                </Button>
              </div>

              {/* Media Column */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold">Media</h2>
                <p className="text-muted-foreground">
                  Become a Media Maven. Get featured on podcasts, publications, and other media outlets.
                </p>
                <div className="space-y-4">
                  {[1, 2, 3].map((index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Users size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Media Opportunity</p>
                            <p className="text-xs text-muted-foreground">Podcast • 5k listeners</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Community Column */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-3xl font-bold">Community</h2>
                <p className="text-muted-foreground">
                  Network with industry experts to expand your reach and collaborate on opportunities.
                </p>
                <div className="rounded-lg border p-4 bg-muted/50">
                  <h3 className="font-semibold mb-2">YOUR EXPERTISE MEETS:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight size={14} className="text-findmystage-green" />
                      <span>Active event organizers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight size={14} className="text-findmystage-green" />
                      <span>Podcast hosts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight size={14} className="text-findmystage-green" />
                      <span>Publication editors</span>
                    </li>
                  </ul>
                </div>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/database">Explore Community <ArrowRight size={16} /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-card/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">DOES AUTHORITY FUSION WORK?</h2>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left column */}
              <div className="space-y-12">
                <div className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="w-28 h-36 bg-muted rounded-lg border flex items-center justify-center">
                    <BookOpen size={40} className="text-findmystage-purple" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Keynotes</h3>
                    <p className="text-muted-foreground">Find keynotes in the first 30 days with our AI matching technology that connects you with events looking for your expertise.</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-28 h-36 bg-muted rounded-lg border flex items-center justify-center">
                    <BarChart3 size={40} className="text-findmystage-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Branded Growth</h3>
                    <p className="text-muted-foreground">90% Business growth with highly publishable content and speaking opportunities that establish you as an authority.</p>
                  </div>
                </div>
              </div>
              
              {/* Right column */}
              <div className="space-y-12">
                <div className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="w-28 h-36 bg-muted rounded-lg border flex items-center justify-center">
                    <Users size={40} className="text-findmystage-pink" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Personal Brand</h3>
                    <p className="text-muted-foreground">Build a strong personal brand by appearing on stages and media outlets that position you as a thought leader in your industry.</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="w-28 h-36 bg-muted rounded-lg border flex items-center justify-center">
                    <Globe size={40} className="text-findmystage-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Your Network = Your Net Worth</h3>
                    <p className="text-muted-foreground">Connect with industry leaders who can help you grow your influence and create new opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Case Studies</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              See how speakers, authors, and experts have used FindMyStage to grow their personal brand and business.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-card rounded-xl p-6 border animate-fade-in" style={{ animationDelay: `0.${index}s` }}>
                  <div className="h-40 bg-muted rounded-lg mb-6 flex items-center justify-center">
                    <Users size={40} className="text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Client Name</h3>
                  <p className="text-muted-foreground mb-4">
                    "FindMyStage helped me book 12 speaking engagements in my first year and grow my email list by 400%."
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Speaker & Author</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="#">Read More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Money Tree Section */}
      <section className="py-16 bg-card/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-3xl font-bold">Money does not grow on trees</h2>
                <h3 className="text-xl italic text-muted-foreground">...But it just might now.</h3>
                <p className="text-lg">
                  Maximize your speaking revenue by connecting with high-paying opportunities that value your expertise.
                </p>
                <Button asChild size="lg" className="rounded-full px-8 mt-4">
                  <Link to="/profile">Get Started Today</Link>
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-muted flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="w-48 h-48 rounded-full bg-findmystage-green/20 flex items-center justify-center">
                    <Mic size={60} className="text-findmystage-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Ready to Find Your Stage?</h2>
            <p className="text-lg text-muted-foreground">
              Let our AI agent analyze your content and match you with the perfect speaking opportunities.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 animate-pulse-slow">
              <Link to="/profile">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
