// components/Layout.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { cn } from '../lib/utils';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    // Mobile drawer state (controls Sidebar mobile drawer)
    const [mobileOpen, setMobileOpen] = useState(false);
    const openMobile = useCallback(() => setMobileOpen(true), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);

    // Desktop minimize state (controls Sidebar width & content offset)
    const [minimized, setMinimized] = useState(false);
    useEffect(() => {
        const v = window.localStorage.getItem('sidebar:minimized');
        if (v) setMinimized(v === '1');
    }, []);
    const toggleMinimize = useCallback(() => {
        setMinimized((p) => {
            const n = !p;
            window.localStorage.setItem('sidebar:minimized', n ? '1' : '0');
            return n;
        });
    }, []);

    // Close mobile drawer on route change
    const pathname = usePathname();
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [mobileOpen]);

    return (
        <div className=" flex w-full bg-gray-50">
            {/* Sidebar controlled from here */}
            <Sidebar
                mobileOpen={mobileOpen}
                onMobileOpen={openMobile}
                onMobileClose={closeMobile}
                minimized={minimized}
                onToggleMinimize={toggleMinimize}
            />

            {/* Page content wrapper — shifts based on sidebar width on desktop */}
            <div
                className={cn(
                    'flex-1 flex flex-col min-w-0 transition-[margin] duration-200',
                    minimized ? 'md:ml-16' : 'md:ml-64'
                )}
            >
                {/* Mobile top bar trigger to open drawer */}
                <div className="md:hidden sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100 px-3 py-2">
                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9"
                            onClick={openMobile}
                            aria-label="Open menu"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <span className="text-sm text-gray-700">OnlineMed</span>
                    </div>
                </div>

                {/* Main content */}
                <main className="flex-1 min-h-screen bg-blue-50">{children}</main>
            </div>
        </div>
    );
}

export default Layout;
