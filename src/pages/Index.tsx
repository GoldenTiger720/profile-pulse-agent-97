import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Globe, CheckCircle, BarChart3, Mic } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import SpeakerCard from '@/components/SpeakerCard';
import { Separator } from '@/components/ui/separator';

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

  const speakerData = [
    {
      name: "Meguire Hennes",
      category: "Biotech and Healthcare",
      mediaOutlet: "Elite Daily",
      requirement: "Please answer the question: What is pheromone perfume/oil?",
      avatarSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3",
      logoSrc: "https://placehold.co/80x30/000000/FFFFFF/png?text=Elite+DAILY"
    },
    {
      name: "Andre O. Newsbreak",
      category: "Business and Finance",
      mediaOutlet: "Newsbreak",
      requirement: "I am looking for the best LinkedIn Company Page optimization tips from experts.",
      avatarSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3",
      logoSrc: "https://placehold.co/80x30/FF5555/FFFFFF/png?text=NEWSBREAK"
    },
    {
      name: "Nick Cullen",
      category: "Business and Finance",
      mediaOutlet: "SolutionSuggest.com",
      requirement: "We are looking for Founders, CEOs, and Presidents to share their compelling brand stories.",
      avatarSrc: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3",
      logoSrc: "https://placehold.co/80x30/333333/FFFFFF/png?text=SOLUTION"
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
              
              <div className="relative">
                <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-background px-4 py-2">
                  <p className="text-lg font-medium text-muted-foreground">1,469 JOURNALISTS SEEKING EXPERTS</p>
                </div>
                
                <div className="speakers-display">
                  <div className="speakers-row">
                    {speakerData.map((speaker, index) => (
                      <SpeakerCard 
                        key={`row1-${index}`}
                        name={speaker.name}
                        category={speaker.category}
                        mediaOutlet={speaker.mediaOutlet}
                        requirement={speaker.requirement}
                        avatarSrc={speaker.avatarSrc}
                        logoSrc={speaker.logoSrc}
                      />
                    ))}
                  </div>
                  <div className="speakers-row">
                    {speakerData.map((speaker, index) => (
                      <SpeakerCard 
                        key={`row2-${index}`}
                        name={speaker.name}
                        category={speaker.category}
                        mediaOutlet={speaker.mediaOutlet}
                        requirement={speaker.requirement}
                        avatarSrc={speaker.avatarSrc}
                        logoSrc={speaker.logoSrc}
                      />
                    ))}
                  </div>
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

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 items-center">
              <div className="relative image-container-3d">
                <img 
                  src="/lovable-uploads/9a8aad2a-1034-43a4-a02d-32e8efb59701.png" 
                  alt="Conference audience looking at a presenter" 
                  className="w-full rounded-lg shadow-xl rotate-3d"
                />
              </div>
              
              <div className="space-y-6">
                <h2 className="text-7xl font-bold">Community</h2>
                <h3 className="text-3xl font-medium">Network with <span className="font-bold">industry experts.</span></h3>
                
                <p className="text-xl">
                  Gain access to our <span className="font-bold">community of excellence</span> where you can network and collaborate with over thousands of successful CEO's and Founders who understand and live the core principles of servant leadership.
                </p>
                
                <div className="pt-6">
                  <h4 className="text-2xl font-bold mb-4">YOUR EVENTS INCLUDE:</h4>
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-start">
                      <span className="text-findmystage-green mr-2">•</span>
                      Monthly <span className="font-bold">CEO roundtable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-findmystage-green mr-2">•</span>
                      Weekly "Ask anything," open forum
                    </li>
                    <li className="flex items-start">
                      <span className="text-findmystage-green mr-2">•</span>
                      Monthly media "hot seat" session
                    </li>
                    <li className="flex items-start">
                      <span className="text-findmystage-green mr-2">•</span>
                      <span className="font-bold">2 live events</span> each year (by invitation only)
                    </li>
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Button asChild size="lg" className="rounded-full px-8 bg-findmystage-green hover:bg-findmystage-green/90">
                    <Link to="/database">Join Our Community <ArrowRight className="ml-2" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16">
          <Separator className="max-w-6xl mx-auto h-px bg-border/60" />
        </div>
      </section>

      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-card/70 backdrop-blur-sm text-sm inline-block py-1 px-3 rounded-md mb-2">저자 리소스</div>
                <h2 className="text-6xl font-bold">Author Resources</h2>
                <h3 className="text-3xl font-medium">Live trainings from <br />industry experts.</h3>
                
                <p className="text-xl">
                  <span className="font-bold">Become an Author of Impact.</span> We provide authors with dozens of resources, training, & assets to make your book a platform of influence.
                </p>
                
                <p className="text-xl font-bold">
                  Ghostwriting. Publishing. Marketing.
                </p>
                
                <p className="text-xl mt-8">
                  DIY or 100% Done for you.
                </p>
                
                <Button asChild size="lg" className="rounded-full mt-6 bg-findmystage-green hover:bg-findmystage-green/90">
                  <Link to="/resources">Access Resources <ArrowRight className="ml-2" /></Link>
                </Button>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/6d71aadd-0330-4009-b36a-987933fd15bc.png" 
                  alt="Author resources with laptop, books and coffee cup" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16">
          <Separator className="max-w-6xl mx-auto h-px bg-border/60" />
        </div>
      </section>

      {/* New Success Stories Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">DOES AUTHOR<span className="relative">*<span className="absolute -top-1 text-sm">ITY</span></span> FUSION WORK?</h2>
            <p className="text-xl text-muted-foreground">
              Here are a few success stories from our community.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/0ddcf5f3-5362-48ef-a866-0c9fd55fde15.png" 
                  alt="Les Whitney's book - Cancer's Gifts" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="space-y-8">
                <h3 className="text-6xl font-bold">Keynotes</h3>
                <h4 className="text-3xl font-medium">Two keynotes in the first 40 days</h4>
                
                <div className="space-y-4">
                  <p className="text-lg">
                    Les Whitney was a former Vistage chair who is living with brain and lung cancer. His incredible message of perseverance, acceptance, life & death caught the attention of Vistage international and the <span className="font-bold">American Cancer Society.</span>
                  </p>
                  
                  <p className="text-lg">
                    Within 2 months of publishing his first book, he landed 2 major keynotes at these organizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16">
          <Separator className="max-w-6xl mx-auto h-px bg-border/60" />
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

      <section className="py-16 relative z-10">
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

      <section className="py-16 relative z-10">
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

      {/* New Branded Growth Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-6xl font-bold">Branded Growth</h3>
                <h4 className="text-3xl font-medium">20% Business growth with his published book</h4>
                
                <div className="space-y-4">
                  <p className="text-lg">
                    Ariel Halevi runs a 140-person consulting firm. With offices in Israel, the USA & Asia, he had the experience & wisdom but no time to write his book. Our sister company, <span className="font-bold">Author Your Brand</span>, interviewed, positioned, wrote, edited, formatted, & published his 1st book.
                  </p>
                  
                  <p className="text-lg">
                    10 years of "wanting" transformed into a published book in less than 9 months.
                  </p>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-xl border border-border">
                <div className="absolute inset-0 bg-black/5 z-10"></div>
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/lovable-uploads/a6930e95-a726-4208-b410-0a293d6bfe23.png"
                >
                  <source src="https://example.com/placeholder-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="w-20 h-1 bg-findmystage-green mb-2"></div>
                      <p className="text-white text-xs">AUTHOR YOUR BRAND</p>
                    </div>
                    <div className="flex items-center gap-2 text-white text-xs">
                      <span className="font-medium">2:34</span>
                      <div className="h-5 flex items-center gap-2">
                        <button className="hover:text-findmystage-green transition-colors">
                          <span className="sr-only">Closed Captions</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="M8 9h8"/><path d="M8 13h6"/><path d="M8 17h4"/></svg>
                        </button>
                        <button className="hover:text-findmystage-green transition-colors">
                          <span className="sr-only">Mute</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                        </button>
                        <button className="hover:text-findmystage-green transition-colors">
                          <span className="sr-only">Settings</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button className="hover:text-findmystage-green transition-colors">
                          <span className="sr-only">Fullscreen</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1 rounded-md text-sm font-medium">
                    I FELT LIKE A PERSON THAT WAS <span className="text-findmystage-green font-bold">PREGNANT</span> FOR 10 YEARS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16">
          <Separator className="max-w-6xl mx-auto h-px bg-border/60" />
        </div>
      </section>

      {/* New Personal Brand Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/a1284e51-8125-407c-a8be-392bcc3a3013.png" 
                  alt="Wooden blocks representing growth of authority and brand" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              
              <div className="space-y-8">
                <h3 className="text-6xl font-bold">Per<span className="text-findmystage-green">$</span>onal Brand</h3>
                <h4 className="text-3xl font-medium">$200,0000 increase in revenue</h4>
                
                <div className="space-y-4">
                  <p className="text-lg italic">
                    "Doug helped me publish two books. My first book, Super Hero Single Dad, took second place in Christian writers awards. My second book, ROL (Return on Life) with a foreword by Les Brown, became a Amazon <span className="font-bold">#1 bestseller</span>. Because of these two books, I've placed millions more under management, increased my revenue by $200K, and seen a measurable boost in my credibility."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16">
          <Separator className="max-w-6xl mx-auto h-px bg-border/60" />
        </div>
      </section>

    </div>
  );
};

export default Index;
