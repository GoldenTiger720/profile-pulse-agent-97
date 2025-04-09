import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Globe, CheckCircle, BarChart3, Mic } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import SpeakerCard from '@/components/SpeakerCard';

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
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
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
    
    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.y += star.speed;
        
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

  // Sample speaker data
  const speakers = [
    {
      name: "Lisa Street Rogers",
      category: "Education",
      mediaOutlet: "Harnham Inc.",
      requirement: "Answer the question, \"What trends, if any, are solving for ways to overcome dyslexia?\"",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      logoUrl: "https://placehold.co/80x30/f77/FFFFFF/png?text=harnham"
    },
    {
      name: "David Parker",
      category: "Technology",
      mediaOutlet: "TechCrunch",
      requirement: "Looking for experts to comment on the latest AI developments in healthcare.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      logoUrl: "https://placehold.co/80x30/3c3/FFFFFF/png?text=TechCrunch"
    },
    {
      name: "Sarah Johnson",
      category: "Business",
      mediaOutlet: "Forbes",
      requirement: "Seeking insights on sustainable business practices for our upcoming special issue.",
      avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      logoUrl: "https://placehold.co/80x30/333/FFFFFF/png?text=Forbes"
    },
    {
      name: "Michael Chang",
      category: "Health",
      mediaOutlet: "WebMD",
      requirement: "Looking for mental health professionals to discuss work-life balance post-pandemic.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      logoUrl: "https://placehold.co/80x30/36a/FFFFFF/png?text=WebMD"
    }
  ];

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 -z-10 pointer-events-none"
      />
      
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
                  <h2 className="text-3xl font-bold">AUTHORITY FUSION</h2>
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

      <section className="py-16 bg-card/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">WHAT IS AUTHORITY FUSION?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              FindMyStage helps you build authority in your niche by connecting you with the right speaking opportunities, 
              media outlets, and communities to showcase your expertise.
            </p>
          </div>
          
          {/* New Speaker Cards Section in single row */}
          <div className="max-w-6xl mx-auto mt-12">
            <h3 className="text-2xl font-bold mb-6">Featured Speakers</h3>
            <div className="speaker-card-container">
              {speakers.map((speaker, index) => (
                <SpeakerCard
                  key={index}
                  name={speaker.name}
                  category={speaker.category}
                  mediaOutlet={speaker.mediaOutlet}
                  requirement={speaker.requirement}
                  avatarUrl={speaker.avatarUrl}
                  logoUrl={speaker.logoUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-7xl font-bold">Media</h2>
                <h3 className="text-4xl font-medium">Become a Media Maven.</h3>
                
                <p className="text-lg">
                  Being interviewed by the media not only increases your outreach, but can establish your brand and 
                  create high-powered connections.
                </p>

                <p className="text-lg">
                  <span className="font-bold">Author</span><sup>*</sup><span className="font-bold">ity Fusion</span> members get FREE access to
                  over 700 journalists, 769 radio producers, and get <span className="font-bold">DAILY inquiries from reporters</span> who need your
                  expertise for their News stories.
                </p>

                <p className="text-lg">
                  All members can access professional media training and "hot seat" reviews at no cost.
                </p>
                
                <Button asChild size="lg" className="rounded-full mt-4 bg-findmystage-green hover:bg-findmystage-green/90">
                  <Link to="/profile">Become a Media Maven <ArrowRight className="ml-2" /></Link>
                </Button>
              </div>
              
              <div className="relative h-[500px] border-l border-gray-200">
                <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-background px-4 py-2">
                  <p className="text-lg font-medium text-muted-foreground">1,469 JOURNALISTS SEEKING EXPERTS</p>
                </div>
                
                <div className="absolute top-[50px] left-[50px] animate-[fade-in_1s,float-up-down_15s_ease-in-out_infinite]">
                  <Card className="w-[350px] overflow-hidden shadow-lg border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3"
                            alt="Meguire Hennes" 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Name: Meguire Hennes</p>
                              <p className="text-sm text-muted-foreground">Category: Biotech and Healthcare</p>
                              <p className="text-sm text-muted-foreground">Media Outlet: Elite Daily</p>
                            </div>
                            <div className="ml-2">
                              <img src="https://placehold.co/80x30/000000/FFFFFF/png?text=Elite+DAILY" alt="Elite Daily logo" className="h-7" />
                            </div>
                          </div>
                          <p className="text-sm">
                            <span className="font-medium">Requirement:</span> Please answer the question: What is pheromone perfume/oil?
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute top-[200px] left-[80px] animate-[fade-in_1s_0.2s,float-down-up_18s_ease-in-out_infinite]">
                  <Card className="w-[350px] overflow-hidden shadow-lg border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3"
                            alt="Andre O. Newsbreak" 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Name: Andre O. Newsbreak</p>
                              <p className="text-sm text-muted-foreground">Category: Business and Finance</p>
                              <p className="text-sm text-muted-foreground">Media Outlet: Newsbreak</p>
                            </div>
                            <div className="ml-2">
                              <img src="https://placehold.co/80x30/FF5555/FFFFFF/png?text=NEWSBREAK" alt="Newsbreak logo" className="h-7" />
                            </div>
                          </div>
                          <p className="text-sm">
                            <span className="font-medium">Requirement:</span> I am looking for the best LinkedIn Company Page optimization tips from experts.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute top-[350px] left-[50px] animate-[fade-in_1s_0.4s,float-up-down_20s_ease-in-out_infinite]">
                  <Card className="w-[350px] overflow-hidden shadow-lg border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3"
                            alt="Nick Cullen" 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Name: Nick Cullen</p>
                              <p className="text-sm text-muted-foreground">Category: Business and Finance</p>
                              <p className="text-sm text-muted-foreground">Media Outlet: SolutionSuggest.com</p>
                            </div>
                            <div className="ml-2">
                              <img src="https://placehold.co/80x30/333333/FFFFFF/png?text=SOLUTION" alt="Solution logo" className="h-7" />
                            </div>
                          </div>
                          <p className="text-sm">
                            <span className="font-medium">Requirement:</span> We are looking for Founders, CEOs, and Presidents to share their compelling brand stories.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img 
                  src="/lovable-uploads/1dbe0683-8daa-4375-9185-bfaa23aff8c9.png" 
                  alt="Speaker addressing an audience" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="w-40 h-1 bg-findmystage-green mb-2"></div>
                  <p className="text-white text-sm font-medium">AUTHORITY FUSION</p>
                </div>
              </div>
              
              <div className="space-y-6 px-4 md:px-8">
                <h2 className="text-5xl font-bold">Speakers</h2>
                <p className="text-3xl font-medium">We find targeted stages for you.</p>
                
                <div className="space-y-4">
                  <p className="text-lg">
                    We send you upcoming speaker opportunities <span className="font-bold">before they are announced</span>. 
                    Save yourself from countless hours of research, dead end opportunities, and stop 
                    spending thousands of dollars "chasing."
                  </p>
                  
                  <p className="text-lg">
                    With over 70,000 targeted speaking opportunities, your stage is just a phone call away.
                  </p>
                </div>
                
                <Button asChild size="lg" className="rounded-full mt-4 bg-findmystage-green hover:bg-findmystage-green/90">
                  <Link to="/profile">Find Your Stage <ArrowRight className="ml-2" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

      <section className="py-16 bg-card/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">DOES AUTHORITY FUSION WORK?</h2>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
