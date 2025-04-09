
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SpeakerCardProps {
  name: string;
  category: string;
  mediaOutlet: string;
  requirement: string;
  avatarSrc: string;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  category,
  mediaOutlet,
  requirement,
  avatarSrc,
}) => {
  return (
    <div className="speaker-card-container">
      <Card className="speaker-card w-full overflow-hidden shadow-lg border border-border/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 rounded-full border-2 border-white/50 shadow-lg flex-shrink-0">
              <AvatarImage src={avatarSrc} alt={name} className="object-cover" />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Name: {name}</p>
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
