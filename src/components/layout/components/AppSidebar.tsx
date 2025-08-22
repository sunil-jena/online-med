'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  Users,
  FileText,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const navigation: NavItem[] = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Cases', url: '/cases', icon: FileText },
  { title: 'User Profiles', url: '/users', icon: Users },
  { title: 'Doctors', url: '/doctors', icon: UserCheck },
  { title: 'Quality Analysts', url: '/qa', icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Treat / and /dashboard as the same active "Dashboard" page.
  const isActive = useCallback(
    (path: string) => {
      if (path === '/dashboard') {
        return pathname === '/' || pathname === '/dashboard';
      }
      return pathname.startsWith(path);
    },
    [pathname],
  );

  // Optional: close the sidebar on small screens after clicking a nav link.
  const handleAfterNav = useCallback(() => {
    if (typeof window !== 'undefined') {
      const isSmall = window.matchMedia('(max-width: 1024px)').matches;
      if (isSmall && open) toggleSidebar();
    }
  }, [open, toggleSidebar]);

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            {open && (
              <div>
                <h2 className="font-semibold text-lg text-gray-900">OnlineMed</h2>
                <p className="text-xs text-gray-500">Provider</p>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-6 w-6 p-0 hover:bg-gray-100 rounded"
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {open ? (
              <ChevronLeft className="w-3 h-3 text-gray-600" />
            ) : (
              <ChevronRight className="w-3 h-3 text-gray-600" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => {
                const active = isActive(item.url);
                const href = item.url === '/dashboard' ? '/' : item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="rounded-lg h-10">
                      <Link
                        href={href}
                        prefetch={false}
                        onClick={handleAfterNav}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                          }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <item.icon className="w-4 h-4" />
                        {open && <span className="text-sm">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border border-gray-50 shadow-md rounded-xl m-4">
        <Collapsible open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-2 h-auto hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/api/placeholder/40/40" alt="Clara Thompson" />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-xs">
                    CT
                  </AvatarFallback>
                </Avatar>
                {open && (
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Clara Thompson
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      clara@medcare.com
                    </p>
                  </div>
                )}
              </div>
              {open && (
                <div className="text-gray-400">
                  {userMenuOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              )}
            </Button>
          </CollapsibleTrigger>

          {open && (
            <CollapsibleContent className="mt-2">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 px-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 px-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </Button>
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  );
}
