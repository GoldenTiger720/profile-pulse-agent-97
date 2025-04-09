
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
import CaseStudyCard from '@/components/CaseStudyCard';
import VideoPlayer from '@/components/VideoPlayer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  const caseStudies = [
    {
      imageSrc: "/lovable-uploads/bb1df633-b350-4bae-b8cc-1d6606d45a5f.png",
      quote: "Working with Authority Fusion was a game-changer for my career. Doug Crowe and his team didn't just help me publish a book; they helped me articulate my vision for integrating neuroscience in athlete development in a way that was both accessible and engaging.",
      name: "Ryan Schatchner",
      title: "Neuroscience-Based Athlete Development"
    },
    {
      imageSrc: "/lovable-uploads/bb1df633-b350-4bae-b8cc-1d6606d45a5f.png",
      quote: "Writing 'Cancer's Gifts: A Loving Journey Toward the Final Chapter' was a deeply personal endeavor. Authority Fusion treated my story with the utmost respect and sensitivity, guiding me through the publishing process with empathy and expertise.",
      name: "Les Whitney",
      title: "Vistage International, Group Chair"
    },
    {
      imageSrc: "/lovable-uploads/bb1df633-b350-4bae-b8cc-1d6606d45a5f.png",
      quote: "As a CEO and investor, I understand the value of a great partnership. Authority Fusion exceeded my expectations in every way. Their strategic approach to publishing and marketing my insights has not only boosted my professional profile but also allowed me to connect with readers in a meaningful way.",
      name: "Kent Emmons",
      title: "Founding Investor / CEO, Crave News"
    },
    {
      imageSrc: "/lovable-uploads/bb1df633-b350-4bae-b8cc-1d6606d45a5f.png",
      quote: "Authority Fusion gave me the confidence to share my expertise with the world. The process was streamlined and supportive from start to finish, and the results have been transformative for my business.",
      name: "Sarah Johnson",
      title: "Leadership Consultant"
    },
    {
      imageSrc: "/lovable-uploads/bb1df633-b350-4bae-b8cc-1d6606d45a5f.png",
      quote: "The team at Authority Fusion understood exactly what I wanted to achieve with my book. Their guidance helped me create a powerful message that resonates with my audience and establishes my authority in my field.",
      name: "Michael Roberts",
      title: "Financial Wellness Expert"
    },
    {
      imageSrc: "/lovable-uploads/bb1df633-b350-4bae-b8cc-1d6606d45a5f.png",
      quote: "Publishing my book with Authority Fusion opened doors I never thought possible. Within months, I was being invited to speak at conferences and appearing on podcasts. The ROI has been incredible.",
      name: "Jennifer Adams",
      title: "Health & Wellness Coach"
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

      {/* Branded Growth Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-7xl font-bold leading-tight">Branded Growth</h2>
                <h3 className="text-4xl font-medium">20% Business growth with <br />his published book</h3>
                
                <p className="text-lg">
                  Ariel Halevi runs a 140-person consulting firm. With offices in Israel, the USA & Asia, he had the experience & wisdom but no time to write his book. Our sister company, <span className="font-bold">Author Your Brand</span>, interviewed, positioned, wrote, edited, formatted, & published his 1st book. 10 years of "wanting" transformed into a published book in less than 9 months.
                </p>
                
                <Button asChild size="lg" className="rounded-full mt-6 bg-findmystage-green hover:bg-findmystage-green/90">
                  <Link to="/resources">Grow Your Brand <ArrowRight className="ml-2" /></Link>
                </Button>
              </div>
              
              <div className="relative rounded-lg overflow-hidden border shadow-lg">
                <VideoPlayer 
                  videoSrc="/path/to/video.mp4" 
                  posterSrc="/lovable-uploads/1a0f556f-49ec-4143-983f-7a569a217048.png"
                  title="Branded Growth Case Study" 
                />
                <div className="absolute top-0 right-0 z-10 bg-black/70 text-white p-3 rounded-bl-lg">
                  <p className="uppercase text-sm font-medium">
                    BOOK OR IF YOU DON'T HAVE A BOOK <br />
                    AND THE WAY I FEEL <span className="text-findmystage-green">THE MARKET'S</span>
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
                    <Mic size={40} className="text-findmystage-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Media Presence</h3>
                    <p className="text-muted-foreground">Establish yourself as a go-to expert with regular media appearances and features in industry publications.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
