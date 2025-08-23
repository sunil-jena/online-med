// components/Sidebar.tsx
'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronDown,
    ChevronUp,
    X,
    LogOut,
    Settings,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/components/lib/utils';
import Image from 'next/image';

type FlatNavItem = {
    title: string;
    href: string;
    icon?: React.ReactNode;
    label?: string;
    disabled?: boolean;
};

const NAV_MAIN: FlatNavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: <Image src="/SquaresFour.svg" alt="To-Do" width={20} height={20} priority draggable={false} /> },
    { title: 'User Profiles', href: '/users', icon: <Image src="/AddressBook.svg" alt="To-Do" width={20} height={20} priority draggable={false} /> },
    { title: 'Cases', href: '/cases', icon: <Image src="/Notepad.svg" alt="To-Do" width={20} height={20} priority draggable={false} /> },
    { title: 'Doctors', href: '/doctors', icon: <Image src="/Hospital.svg" alt="To-Do" width={20} height={20} priority draggable={false} /> },
    { title: 'Quality Analysts', href: '/qa', icon: <Image src="/Pentagram.svg" alt="To-Do" width={20} height={20} priority draggable={false} /> },
];

const BRAND = { name: 'OnlineMed', sub: 'Provider', logoUrl: '' };


export default function Sidebar({
    mobileOpen,
    onMobileOpen,
    onMobileClose,
    minimized,
    onToggleMinimize,
}: {
    mobileOpen: boolean;
    onMobileOpen: () => void;
    onMobileClose: () => void;
    minimized: boolean;
    onToggleMinimize: () => void;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const asideWidth = minimized ? 'w-16' : 'w-64';
    const sidebarOpen = !minimized;

    const isActive = useCallback(
        (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)),
        [pathname]
    );

    const prefetch = useCallback(
        (href: string) => {
            try {
                router.prefetch?.(href);
            } catch { }
        },
        [router]
    );

    const navTo = useCallback(
        (href: string) => {
            if (pathname !== href) router.push(href);
            onMobileClose?.();
        },
        [router, pathname, onMobileClose]
    );

    const Header = (
        <div className="p-4 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image src="/image.svg" alt="logo" width={40} height={40} priority />
                    {!minimized && (
                        <div className="flex flex-col items-end justify-end">
                            <h2 className="font-bold text-lg text-blue-900">{BRAND.name}</h2>
                            {BRAND.sub && <p className="text-xs text-blue-900 font-semibold">{BRAND.sub}</p>}
                        </div>
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleMinimize}
                    className="h-7 w-7 p-0 hover:bg-gray-100 rounded hidden md:inline-flex"
                    aria-label={minimized ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <Image src="/ArrowLineLeft.svg" alt="arrow-left" width={24} height={24} priority />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 md:hidden"
                    onClick={onMobileOpen}
                    aria-label="Open menu"
                >
                    <svg className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    const List = useMemo(
        () => (
            <ul className="space-y-1">
                {NAV_MAIN.map((item) => {
                    const active = isActive(item.href);
                    const classes = cn(
                        'flex items-center gap- px-3 py-3 space-x-3 rounded-xl text-sm transition-colors duration-200 w-full text-left',
                        active ? 'border border-gray-200 shadow-sm font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
                        item.disabled && 'pointer-events-none opacity-60',
                        minimized && 'justify-center'
                    );

                    const content = (
                        <>
                            {item.icon}
                            {!minimized && (
                                <>
                                    <span className="truncate">{item.title}</span>
                                    {item.label && (
                                        <span className="ml-auto text-[11px] font-medium bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                                            {item.label}
                                        </span>
                                    )}
                                </>
                            )}
                        </>
                    );

                    return minimized ? (
                        <TooltipProvider key={item.title} delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <li>
                                        <button
                                            type="button"
                                            aria-current={active ? 'page' : undefined}
                                            className={classes}
                                            onClick={() => navTo(item.href)}
                                            onMouseEnter={() => prefetch(item.href)}
                                            onFocus={() => prefetch(item.href)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') navTo(item.href);
                                            }}
                                        >
                                            {content}
                                        </button>
                                    </li>
                                </TooltipTrigger>
                                <TooltipContent side="right">{item.title}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <li key={item.title}>
                            <button
                                type="button"
                                aria-current={active ? 'page' : undefined}
                                className={classes}
                                onClick={() => navTo(item.href)}
                                onMouseEnter={() => prefetch(item.href)}
                                onFocus={() => prefetch(item.href)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') navTo(item.href);
                                }}
                            >
                                {content}
                            </button>
                        </li>
                    );
                })}
            </ul>
        ),
        [isActive, minimized, navTo, prefetch]
    );

    /* --------------------------- Footer (Collapsible) --------------------------- */
    const Footer = (
        <div className="border border-gray-100 m-4 shadow-md rounded-2xl">
            <Collapsible open={userMenuOpen} onOpenChange={setUserMenuOpen} >
                <CollapsibleTrigger asChild className='p-4' >
                    <Button
                        variant="ghost"
                        className="w-full justify-between p-2 h-auto hover:bg-gray-50 rounded-lg"
                    >
                        <div className="flex items-center gap-3">
                            <Image
                                src="/Frame1.png"
                                alt="user"
                                width={40}
                                height={40}
                                priority
                                draggable={false}
                                className="rounded-md w-10 h-10"
                            />
                            {sidebarOpen && (
                                <div className="flex-1 text-left min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">Clara Thompson</p>
                                    <p className="text-xs text-gray-500 truncate">clara@medcare.com</p>
                                </div>
                            )}
                        </div>
                        {sidebarOpen && (
                            <div className="text-gray-400">
                                {userMenuOpen ? <ChevronUp className="w-4 h-4 text-blue-900" /> : <ChevronDown className="w-4 h-4 text-blue-900" />}
                            </div>
                        )}
                    </Button>
                </CollapsibleTrigger>

                {sidebarOpen && (
                    <CollapsibleContent className="mt-2 border-t p-4">
                        <div className="space-y-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start h-8 px-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                                onClick={() => navTo('/settings')}
                                onMouseEnter={() => prefetch('/settings')}
                            >
                                <Image src="/Gear.svg" alt="arrow-left" width={20} height={20} priority />
                                Settings
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start h-8 px-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                                onClick={() => navTo('/')}
                            >
                                <Image src="/SignOut.svg" alt="arrow-left" width={20} height={20} priority />
                                Log out
                            </Button>
                        </div>
                    </CollapsibleContent>
                )}
            </Collapsible>
        </div>
    );

    const DesktopAside = (
        <aside
            className={cn(
                'hidden md:flex fixed inset-y-0 left-0 bg-white border-r border-gray-200 flex-col z-30',
                'transition-[width] duration-200 ease-linear',
                asideWidth
            )}
            aria-label="Sidebar"
        >
            {Header}
            <div className="flex-1 overflow-hidden px-2 py-3">
                <ScrollArea className="h-full px-1">{List}</ScrollArea>
            </div>
            {Footer}
        </aside>
    );

    /* --------------------------- Mobile Drawer --------------------------- */
    const MobileDrawer = (
        <AnimatePresence>
            {mobileOpen && (
                <>
                    <motion.div
                        key="overlay"
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onMobileClose}
                    />
                    <motion.aside
                        key="drawer"
                        className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 flex flex-col z-50 md:hidden"
                        initial={{ x: -320 }}
                        animate={{ x: 0 }}
                        exit={{ x: -320 }}
                        transition={{ type: 'tween', duration: 0.2 }}
                    >
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Image src="/image.svg" alt="logo" width={40} height={40} priority />
                                <div className="flex flex-col items-end justify-end">
                                    <h2 className="font-bold text-lg text-blue-900">{BRAND.name}</h2>
                                    {BRAND.sub && <p className="text-xs text-blue-900 font-semibold">{BRAND.sub}</p>}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={onMobileClose}
                                aria-label="Close menu"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-hidden px-2 py-3">
                            <ScrollArea className="h-full px-1">
                                <ul className="space-y-1">
                                    {NAV_MAIN.map((item) => {
                                        const active = isActive(item.href);
                                        return (
                                            <li key={item.title}>
                                                <button
                                                    type="button"
                                                    className={cn(
                                                        'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 w-full text-left',
                                                        active ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
                                                        item.disabled && 'pointer-events-none opacity-60'
                                                    )}
                                                    aria-current={active ? 'page' : undefined}
                                                    onClick={() => navTo(item.href)}
                                                    onMouseEnter={() => prefetch(item.href)}
                                                >
                                                    {item.icon}
                                                    <span className="truncate">{item.title}</span>
                                                    {item.label && (
                                                        <span className="ml-auto text-[11px] font-medium bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                                                            {item.label}
                                                        </span>
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </ScrollArea>
                        </div>

                        {/* Mobile footer (non-collapsible for simplicity) */}
                        <div className="p-4 border-t border-gray-100">
                            <div className="w-full justify-between p-2 h-auto rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/Frame1.png"
                                        alt="user"
                                        width={40}
                                        height={40}
                                        priority
                                        draggable={false}
                                        className="rounded-md w-10 h-10"
                                    />
                                    <div className="flex-1 text-left min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">Clara Thompson</p>
                                        <p className="text-xs text-gray-500 truncate">clara@medcare.com</p>
                                    </div>
                                </div>
                                <div className="mt-2 space-y-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start h-8 px-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                                        onClick={() => {
                                            prefetch('/settings');
                                            navTo('/settings');
                                        }}
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start h-8 px-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                                        onClick={() => window.location.reload()}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Log out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {/* Desktop aside */}
            {DesktopAside}

            {/* Mobile drawer */}
            {MobileDrawer}
        </>
    );
}
