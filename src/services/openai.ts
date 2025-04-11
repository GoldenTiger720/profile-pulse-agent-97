
import axios from "axios";

// NOTE: OpenAI API key is hardcoded here for demonstration purposes only
// In a production environment, this should be handled securely
const OPENAI_API_KEY = "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";

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function analyzePdfContent(content: string): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You should serve as a professional summarizing a client's introduction or resume. Please make it from a first person perspective."
          },
          {
            role: "user",
            content: "Please read this content. Give me a summary of the speaker's topics, the benefit she provides to her audience, and acting as a psychologist, give me a summary of her personality.\n\n" + content
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing PDF content with OpenAI:", error);
    throw new Error("Failed to analyze PDF content");
  }
}

// Helper functions to parse the OpenAI response
export function extractTopics(openAIResponse: string): string[] {
  // Looking for topics section in the response
  try {
    const topicsRegex = /topics:.*?(?:\n|$)|areas of expertise:.*?(?:\n|$)|specializes in:.*?(?:\n|$)/i;
    const topicsMatch = openAIResponse.match(topicsRegex);
    
    if (topicsMatch) {
      // Extract topics by splitting on commas or "and" and clean up
      const topicsText = topicsMatch[0].replace(/topics:|areas of expertise:|specializes in:/i, '').trim();
      const topics = topicsText.split(/,|\sand\s/).map(topic => topic.trim()).filter(Boolean);
      return topics;
    }
    
    // If no specific topics section, try to identify potential topics
    const potentialTopics = openAIResponse
      .split(/\.|,|\n/)
      .filter(sentence => 
        sentence.toLowerCase().includes("expert") || 
        sentence.toLowerCase().includes("specialist") ||
        sentence.toLowerCase().includes("focus on") ||
        sentence.toLowerCase().includes("specialized in")
      );
    
    if (potentialTopics.length > 0) {
      return potentialTopics.map(t => t.trim()).filter(Boolean);
    }
    
    // Fallback to extracting nouns that could be topics
    return ["Leadership", "Communication", "Industry Expertise"];
  } catch (error) {
    console.error("Error extracting topics:", error);
    return ["Leadership", "Communication", "Industry Expertise"];
  }
}

export function extractPersonality(openAIResponse: string): string[] {
  try {
    // Looking for personality section in the response
    const personalityRegex = /personality:.*?(?:\n|$)|characterized by:.*?(?:\n|$)|traits:.*?(?:\n|$)/i;
    const personalityMatch = openAIResponse.match(personalityRegex);
    
    if (personalityMatch) {
      // Extract personality traits by splitting on commas or "and" and clean up
      const traitsText = personalityMatch[0].replace(/personality:|characterized by:|traits:/i, '').trim();
      const traits = traitsText.split(/,|\sand\s/).map(trait => trait.trim()).filter(Boolean);
      return traits;
    }
    
    // If no specific personality section, try to identify sentences with personality descriptors
    const potentialTraits = openAIResponse
      .split(/\.|,|\n/)
      .filter(sentence => 
        sentence.toLowerCase().includes("passionate") || 
        sentence.toLowerCase().includes("driven") ||
        sentence.toLowerCase().includes("enthusiastic") ||
        sentence.toLowerCase().includes("dynamic")
      );
    
    if (potentialTraits.length > 0) {
      return potentialTraits.map(t => t.trim()).filter(Boolean);
    }
    
    // Fallback to common positive personality traits
    return ["Passionate", "Insightful", "Engaging", "Authoritative"];
  } catch (error) {
    console.error("Error extracting personality traits:", error);
    return ["Passionate", "Insightful", "Engaging", "Authoritative"];
  }
}

export function extractSummary(openAIResponse: string): string {
  try {
    // Check if there's a clear "summary" section
    const summaryRegex = /summary:.*?(?=\n\n|\n[A-Z]|$)/is;
    const summaryMatch = openAIResponse.match(summaryRegex);
    
    if (summaryMatch) {
      return summaryMatch[0].replace(/summary:/i, '').trim();
    }
    
    // If no summary section, use the first paragraph or a significant portion
    const paragraphs = openAIResponse.split(/\n\n+/);
    if (paragraphs.length > 0) {
      // Use first paragraph that's not too short
      for (const paragraph of paragraphs) {
        if (paragraph.length > 50) {
          return paragraph.trim();
        }
      }
    }
    
    // Fallback to using the first 200 characters
    return openAIResponse.slice(0, 200).trim() + "...";
  } catch (error) {
    console.error("Error extracting summary:", error);
    return "An experienced professional with expertise in their field.";
  }
}
