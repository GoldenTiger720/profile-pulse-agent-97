
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  FileText,
  Youtube,
  Globe,
  Linkedin,
  BookOpen,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import ContentUploader from "@/components/ContentUploader";
import SpeakerProfile from "@/components/SpeakerProfile";
import axios from "axios";
import { extractTextFromPdf } from "@/services/pdfService";
import { 
  analyzePdfContent, 
  extractTopics, 
  extractPersonality, 
  extractSummary 
} from "@/services/openai";

interface ProfileData {
  topics: string[];
  personality: string[];
  summary: string;
  isLoading?: boolean;
  error?: string;
}

const ProfileCreator = () => {
  const { toast } = useToast();
  const [inputUrls, setInputUrls] = useState({
    pdfUrl: "",
    youtubeUrl: "",
    websiteUrl: "",
    linkedinUrl: "",
    bookUrl: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState("input");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputUrls((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (files: File[]) => {
    setPdfFile(files.length > 0 ? files[0] : null);
  };

  const handleAnalyze = async () => {
    const hasInput =
      pdfFile !== null ||
      Object.values(inputUrls).some((url) => url.trim() !== "");
    if (!hasInput) {
      toast({
        title: "Input Required",
        description: "Please provide at least one content source to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProfileData({
      topics: [],
      personality: [],
      summary: "",
      isLoading: true,
    });
    setCurrentStep("profile");

    try {
      let contentToAnalyze = "";
      
      // Extract text from PDF if available
      if (pdfFile) {
        try {
          contentToAnalyze = await extractTextFromPdf(pdfFile);
          console.log("Extracted PDF text:", contentToAnalyze.substring(0, 100) + "...");
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          toast({
            title: "PDF Processing Error",
            description: "Failed to extract text from the PDF document",
            variant: "destructive",
          });
        }
      }
      
      // If we have content to analyze (from PDF), use OpenAI
      if (contentToAnalyze) {
        try {
          const openAIResponse = await analyzePdfContent(contentToAnalyze);
          console.log("OpenAI Response:", openAIResponse);
          
          // Extract structured data from the OpenAI response
          const topics = extractTopics(openAIResponse);
          const personality = extractPersonality(openAIResponse);
          const summary = extractSummary(openAIResponse);
          
          setProfileData({
            summary: summary,
            topics: topics,
            personality: personality,
          });
          
          toast({
            title: "Analysis Complete",
            description: "Speaker profile has been generated successfully",
          });
        } catch (error) {
          console.error("Error analyzing with OpenAI:", error);
          setProfileData({
            topics: [],
            personality: [],
            summary: "",
            error: "Failed to analyze content with AI. Please try again.",
          });
          
          toast({
            title: "AI Analysis Failed",
            description: "Error processing your content with AI",
            variant: "destructive",
          });
        }
      } else {
        // Fallback to backend API if no PDF content (or use mock data)
        const formData = new FormData();

        Object.entries(inputUrls).forEach(([key, value]) => {
          if (value.trim() !== "") {
            formData.append(key, value);
          }
        });

        try {
          const response = await axios.post(
            "http://localhost:8000/api/v1/profiles/create",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setProfileData({
            summary: response.data.summary || "No summary available",
            topics: response.data.topics || [],
            personality: response.data.personality || [],
          });

          toast({
            title: "Analysis Complete",
            description: "Speaker profile has been generated from provided URLs",
          });
        } catch (error) {
          console.error("Error analyzing content with backend API:", error);
          setProfileData({
            topics: [],
            personality: [],
            summary: "",
            error: "Failed to analyze content. Please try again.",
          });
          
          toast({
            title: "Analysis Failed",
            description: "There was an error analyzing your content",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("General error during analysis:", error);
      setProfileData({
        topics: [],
        personality: [],
        summary: "",
        error: "Failed to analyze content. Please try again.",
      });

      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your content",
        variant: "destructive",
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
          Upload content or provide links to generate a comprehensive speaker
          profile. Our AI will analyze your content to identify key topics and
          personality traits.
        </p>
      </div>

      <Tabs
        value={currentStep}
        onValueChange={setCurrentStep}
        className="space-y-6"
      >
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="input">Content Input</TabsTrigger>
            <TabsTrigger value="profile" disabled={!profileData}>
              Speaker Profile
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="input" className="space-y-6 min-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
            <div className="md:col-span-2">
              <ContentUploader
                icon={<FileText className="h-5 w-5 text-findmystage-green" />}
                title="PDF Documents"
                description="Upload a PDF of a presentation, article, or publication"
                onFileChange={handleFileChange}
                type="pdf"
              />
            </div>

            <ContentUploader
              icon={<Youtube className="h-5 w-5 text-findmystage-green" />}
              title="YouTube Content"
              description="Link to your YouTube channel or specific videos"
              inputProps={{
                name: "youtubeUrl",
                value: inputUrls.youtubeUrl,
                onChange: handleInputChange,
                placeholder: "Enter YouTube channel or video URL",
              }}
              type="youtube"
            />

            <ContentUploader
              icon={<Globe className="h-5 w-5 text-findmystage-green" />}
              title="Website"
              description="Link to your personal website or blog"
              inputProps={{
                name: "websiteUrl",
                value: inputUrls.websiteUrl,
                onChange: handleInputChange,
                placeholder: "Enter website URL",
              }}
            />

            <ContentUploader
              icon={<Linkedin className="h-5 w-5 text-findmystage-green" />}
              title="LinkedIn Profile"
              description="Link to your LinkedIn profile"
              inputProps={{
                name: "linkedinUrl",
                value: inputUrls.linkedinUrl,
                onChange: handleInputChange,
                placeholder: "Enter LinkedIn profile URL",
              }}
            />

            <ContentUploader
              icon={<BookOpen className="h-5 w-5 text-findmystage-green" />}
              title="Books"
              description="Link to your published books or articles"
              inputProps={{
                name: "bookUrl",
                value: inputUrls.bookUrl,
                onChange: handleInputChange,
                placeholder: "Enter book URL or ISBN",
              }}
            />
          </div>

          <Alert className="bg-blue-50 dark:bg-blue-950 border-findmystage-blue">
            <AlertCircle className="h-4 w-4 text-findmystage-blue" />
            <AlertTitle>Provide as much content as possible</AlertTitle>
            <AlertDescription>
              The more content you provide, the more accurate your speaker
              profile will be. You don't need to fill all fields, but the AI
              works best with multiple sources.
            </AlertDescription>
          </Alert>

          <div className="flex justify-center mt-8">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              size="lg"
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Generate Speaker Profile
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
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
