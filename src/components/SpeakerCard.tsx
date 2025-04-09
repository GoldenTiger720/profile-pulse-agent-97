
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
      <Card className={`speaker-card w-full overflow-hidden shadow-lg border ${borderClass}`}>
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-14 w-14 rounded-full border-2 border-white/50 shadow-lg flex-shrink-0">
              <AvatarImage src={avatarSrc} alt={name} className="object-cover" />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-1 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{name}</p>
                    {index > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {index % 3 === 1 ? "Featured" : "New"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Category: {category}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Media Outlet: {mediaOutlet}
                  </p>
                </div>
              </div>
              <p className="text-sm">
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
