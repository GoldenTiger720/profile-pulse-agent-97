
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SpeakerCardProps {
  name: string;
  category: string;
  mediaOutlet: string;
  requirement: string;
  avatarSrc: string;
  index?: number; // Add index prop to create visual variety
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  category,
  mediaOutlet,
  requirement,
  avatarSrc,
  index = 0,
}) => {
  // Use the index to create subtle visual differences between cards
  const cardVariants = [
    "border-border/50", 
    "border-findmystage-green/30", 
    "border-findmystage-purple/30"
  ];
  
  const borderClass = cardVariants[index % cardVariants.length];
  
  return (
    <div className="speaker-card-container">
      <Card className={`speaker-card w-full overflow-hidden shadow-md border ${borderClass}`}>
        <CardContent className="p-2">
          <div className="flex items-start gap-2">
            <Avatar className="h-12 w-12 rounded-full border-2 border-white/50 shadow-md flex-shrink-0">
              <AvatarImage src={avatarSrc} alt={name} className="object-cover" />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-0.5 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-medium text-sm">{name}</p>
                    {index % 3 === 1 && (
                      <Badge variant="outline" className="text-xs py-0 px-1.5 h-4">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Category: {category}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Media Outlet: {mediaOutlet}
                  </p>
                </div>
              </div>
              <p className="text-xs">
                <span className="font-medium">Requirement:</span> {requirement}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeakerCard;
