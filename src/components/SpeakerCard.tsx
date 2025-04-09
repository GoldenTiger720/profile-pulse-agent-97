
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SpeakerCardProps {
  name: string;
  category: string;
  mediaOutlet: string;
  requirement: string;
  avatarSrc: string;
  logoSrc: string;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  category,
  mediaOutlet,
  requirement,
  avatarSrc,
  logoSrc
}) => {
  return (
    <div className="speaker-card-container">
      <div className="flex items-start gap-4 mb-4">
        <div className="avatar-container">
          <img 
            src={avatarSrc}
            alt={name} 
            className="h-16 w-16 rounded-full object-cover border-2 border-white/50 shadow-lg"
          />
        </div>
        
        <Card className="speaker-card w-full overflow-hidden shadow-lg border">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Name: {name}</p>
                  <p className="text-sm text-muted-foreground">Category: {category}</p>
                  <p className="text-sm text-muted-foreground">Media Outlet: {mediaOutlet}</p>
                </div>
                <div className="ml-2">
                  <img src={logoSrc} alt={`${mediaOutlet} logo`} className="h-7" />
                </div>
              </div>
              <p className="text-sm">
                <span className="font-medium">Requirement:</span> {requirement}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpeakerCard;
