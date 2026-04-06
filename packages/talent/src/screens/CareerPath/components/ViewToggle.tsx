/**
 * View Toggle Component (Prototype Feature)
 * Allows switching between 5 user perspectives for testing
 */

import React from 'react';
import { ChevronDown, User, Briefcase, Target, Building, Settings } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { useCareerPath } from '../../../lib/career-path/CareerPathContext';
import type { UserRole } from '../../../types/careerPath';

// Test users for each role
const TEST_USERS = [
  {
    id: "EMP004",
    name: "Budi Santoso",
    role: "EMPLOYEE" as UserRole,
    position: "Staff HR Operations",
    grade: 13,
    icon: User,
    label: "KARYAWAN",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: "EMP003",
    name: "Ratna Wijaya",
    role: "SUPERVISOR" as UserRole,
    position: "Manager HR Operations",
    grade: 15,
    icon: Briefcase,
    label: "ATASAN LANGSUNG",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: "EMP001",
    name: "Sri Mulyani",
    role: "JOB_HOLDER" as UserRole,
    position: "Director SDM",
    grade: 21,
    icon: Target,
    label: "PEMEGANG JABATAN",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: "EMP010",
    name: "Bambang Sugiarto",
    role: "UNIT_LEADER" as UserRole,
    position: "Head of HC Division",
    grade: 18,
    icon: Building,
    label: "PIMPINAN UNIT",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: "EMP014",
    name: "Linda Sari",
    role: "ADMIN" as UserRole,
    position: "HC Admin",
    grade: 13,
    icon: Settings,
    label: "HC ADMIN",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export function ViewToggle() {
  const { currentView, setCurrentView } = useCareerPath();

  const currentTestUser = TEST_USERS.find(u => u.id === currentView.userId);
  const IconComponent = currentTestUser?.icon || User;

  const handleUserSwitch = (userId: string, role: UserRole) => {
    setCurrentView(userId, role);
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <Badge 
        variant="outline" 
        className="bg-[var(--color-primary-light)] border-[var(--color-primary)] text-[var(--color-primary)] px-3 py-1 font-medium"
      >
        PROTOTYPE MODE
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 min-w-[200px] justify-start bg-[var(--color-card)] border-[var(--color-border)] hover:bg-[var(--color-muted)]"
          >
            <Avatar className="w-6 h-6 flex-shrink-0">
              <AvatarImage src={currentTestUser?.image} alt={currentTestUser?.name} />
              <AvatarFallback className="bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs">
                <IconComponent className="w-3 h-3" />
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 text-left truncate">{currentTestUser?.name}</span>
            <ChevronDown className="w-4 h-4 text-[var(--color-muted-foreground)] flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          align="end" 
          className="w-[320px] bg-[var(--color-popover)] border-[var(--color-border)] shadow-md"
          sideOffset={8}
        >
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Switch View</span>
              <p className="text-xs text-[var(--color-muted-foreground)] font-normal">
                Select a user perspective to test
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[var(--color-border)]" />

          <DropdownMenuGroup>
            {TEST_USERS.map((user) => {
              const UserIcon = user.icon;
              const isActive = user.id === currentView.userId;

              return (
                <DropdownMenuItem
                  key={user.id}
                  onClick={() => handleUserSwitch(user.id, user.role)}
                  className={`
                    cursor-pointer p-3 mb-1 rounded-md transition-colors
                    ${isActive ? 'bg-[var(--color-primary-light)]' : 'hover:bg-[var(--color-muted)]'}
                  `}
                >
                  <div className="flex items-start gap-3 w-full">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback 
                        className={isActive ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]" : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"}
                      >
                        <UserIcon className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-muted)] text-[var(--color-muted-foreground)] font-medium">
                          {user.label}
                        </span>
                        {isActive && (
                          <Badge className="text-[10px] px-2 py-0.5 bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="font-semibold text-sm leading-tight mb-0.5 text-[var(--color-foreground)]">
                        {user.name}
                      </p>
                      <p className="text-xs text-[var(--color-muted-foreground)] truncate">
                        {user.position} • Grade {user.grade}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
