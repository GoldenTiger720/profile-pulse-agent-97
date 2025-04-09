
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface SpeakerCardProps {
  name: string;
  category: string;
  mediaOutlet: string;
  requirement: string;
  avatarUrl: string;
  logoUrl?: string;
}

const SpeakerCard = ({
  name,
  category,
  mediaOutlet,
  requirement,
  avatarUrl,
  logoUrl
}: SpeakerCardProps) => {
  return (
    <div className="speaker-card-item">
      <div className="relative">
        <div className="speaker-avatar">
          <Avatar className="w-full h-full">
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <Card className="speaker-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Name: {name}</p>
                <p className="text-sm text-muted-foreground">Category: {category}</p>
                <p className="text-sm text-muted-foreground">Media Outlet: {mediaOutlet}</p>
              </div>
              {logoUrl && (
                <div className="ml-2">
                  <img src={logoUrl} alt={`${mediaOutlet} logo`} className="h-7" />
                </div>
              )}
            </div>
            <p className="text-sm mt-2">
              <span className="font-medium">Requirement:</span> {requirement}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpeakerCard;
