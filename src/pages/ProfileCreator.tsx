
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Youtube, Globe, Linkedin, BookOpen, ArrowRight, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useApiKey } from '@/contexts/ApiKeyContext';
import { useToast } from '@/hooks/use-toast';
import ContentUploader from '@/components/ContentUploader';
import SpeakerProfile from '@/components/SpeakerProfile';

interface ProfileData {
  topics: string[];
  personality: string[];
  summary: string;
  isLoading?: boolean;
  error?: string;
}

const ProfileCreator = () => {
  const { apiKey } = useApiKey();
  const { toast } = useToast();
  const [inputUrls, setInputUrls] = useState({
    pdfUrl: '',
    youtubeUrl: '',
    websiteUrl: '',
    linkedinUrl: '',
    bookUrl: '',
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState('input');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputUrls(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setPdfFile(file);
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please provide your OpenAI API key to continue",
        variant: "destructive"
      });
      return;
    }

    // Check if at least one input is provided
    const hasInput = pdfFile || Object.values(inputUrls).some(url => url.trim() !== '');
    if (!hasInput) {
      toast({
        title: "Input Required",
        description: "Please provide at least one content source to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setProfileData({ topics: [], personality: [], summary: '', isLoading: true });
    setCurrentStep('profile');

    // Simulate API call and processing for demonstration
    try {
      // In a real implementation, you would upload the file and process inputs here
      // For now, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock data for demonstration
      setProfileData({
        summary: "Dr. Jane Smith is an accomplished speaker with expertise in artificial intelligence ethics and technology policy. Her communication style is engaging, clear, and thought-provoking, appealing to both technical and non-technical audiences.",
        topics: [
          "AI Ethics",
          "Technology Policy",
          "Future of Work",
          "Digital Transformation",
          "Data Privacy"
        ],
        personality: [
          "Analytical",
          "Insightful",
          "Engaging",
          "Authoritative",
          "Approachable"
        ]
      });

      toast({
        title: "Analysis Complete",
        description: "Speaker profile has been generated successfully",
      });
    } catch (error) {
      console.error("Error analyzing content:", error);
      setProfileData({
        topics: [],
        personality: [],
        summary: '',
        error: "Failed to analyze content. Please try again."
      });
      
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your content",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Speaker Profile Creator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload content or provide links to generate a comprehensive speaker profile.
          Our AI will analyze your content to identify key topics and personality traits.
        </p>
      </div>

      <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="input">Content Input</TabsTrigger>
            <TabsTrigger value="profile" disabled={!profileData}>Speaker Profile</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="input" className="space-y-6 min-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PDF Upload */}
            <ContentUploader 
              icon={<FileText className="h-5 w-5 text-findmystage-green" />}
              title="PDF Documents"
              description="Upload PDFs of presentations, articles, or publications"
              onFileChange={handleFileChange}
              inputProps={{
                name: "pdfUrl",
                value: inputUrls.pdfUrl,
                onChange: handleInputChange,
                placeholder: "Or paste a link to a PDF document"
              }}
            />

            {/* YouTube */}
            <ContentUploader 
              icon={<Youtube className="h-5 w-5 text-findmystage-green" />}
              title="YouTube Content"
              description="Link to your YouTube channel or specific videos"
              inputProps={{
                name: "youtubeUrl",
                value: inputUrls.youtubeUrl,
                onChange: handleInputChange,
                placeholder: "Enter YouTube channel or video URL"
              }}
            />

            {/* Website */}
            <ContentUploader 
              icon={<Globe className="h-5 w-5 text-findmystage-green" />}
              title="Website"
              description="Link to your personal website or blog"
              inputProps={{
                name: "websiteUrl",
                value: inputUrls.websiteUrl,
                onChange: handleInputChange,
                placeholder: "Enter website URL"
              }}
            />

            {/* LinkedIn */}
            <ContentUploader 
              icon={<Linkedin className="h-5 w-5 text-findmystage-green" />}
              title="LinkedIn Profile"
              description="Link to your LinkedIn profile"
              inputProps={{
                name: "linkedinUrl",
                value: inputUrls.linkedinUrl,
                onChange: handleInputChange,
                placeholder: "Enter LinkedIn profile URL"
              }}
            />

            {/* Book */}
            <ContentUploader 
              icon={<BookOpen className="h-5 w-5 text-findmystage-green" />}
              title="Books"
              description="Link to your published books or articles"
              inputProps={{
                name: "bookUrl",
                value: inputUrls.bookUrl,
                onChange: handleInputChange,
                placeholder: "Enter book URL or ISBN"
              }}
            />
          </div>

          <Alert className="bg-blue-50 dark:bg-blue-950 border-findmystage-blue">
            <AlertCircle className="h-4 w-4 text-findmystage-blue" />
            <AlertTitle>Provide as much content as possible</AlertTitle>
            <AlertDescription>
              The more content you provide, the more accurate your speaker profile will be.
              You don't need to fill all fields, but the AI works best with multiple sources.
            </AlertDescription>
          </Alert>

          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              size="lg"
              className="flex items-center gap-2"
            >
              {isAnalyzing ? "Analyzing..." : "Generate Speaker Profile"}
              {!isAnalyzing && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="min-h-[60vh]">
          {profileData && <SpeakerProfile data={profileData} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileCreator;
