
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, User, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-findmystage-blue to-findmystage-purple bg-clip-text text-transparent">
              FindMyStage.com
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">
                Profile Creator
              </Link>
              <Link to="/database" className="text-sm font-medium hover:text-primary transition-colors">
                Stage Database
              </Link>
            </nav>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {isAuthenticated ? (
                    <Avatar className="h-8 w-8 transition-transform hover:scale-110">
                      <AvatarFallback className="bg-findmystage-purple text-white">
                        {getInitials(user?.name || '')}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User size={20} />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-findmystage-purple text-white">
                          {getInitials(user?.name || '')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={logout}
                      className="text-red-500 focus:text-red-500 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="cursor-pointer flex w-full items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Log in</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/signup" className="cursor-pointer flex w-full items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Sign up</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
