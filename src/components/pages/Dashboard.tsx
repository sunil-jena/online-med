/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Search, Clock, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Layout } from '../layout/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const BG_IMAGE = '/earth.png';

type Stat = {
    title: string;
    value: string;
    sublabel?: string;
    icon: React.ReactNode; // we store a ready-to-render node
};

const dashboardStats: Stat[] = [
    {
        title: 'To-Do',
        value: '4',
        icon: (
            <Image
                src="/to-do-circle.svg"
                alt="To-Do"
                width={20}
                height={20}
                priority
                draggable={false}
            />
        ),
    },
    {
        title: 'Need Revisions',
        value: '5',
        icon: (
            <Image
                src="/revision.svg"
                alt="Need Revisions"
                width={20}
                height={20}
                priority
                draggable={false}
            />
        ),
    },
    {
        title: 'Avg Response Time',
        value: '3m 47s',
        icon: (
            <Image
                src="/clock.svg"
                alt="Average Response Time"
                width={20}
                height={20}
                priority
                draggable={false}
            />
        ),
    },
    {
        title: 'Pending',
        value: '16',
        sublabel: 'Need Info',
        icon: (
            <Image
                src="/info.svg"
                alt="Pending"
                width={20}
                height={20}
                priority
                draggable={false}
            />
        ),
    },
];


type Case = {
    id: string;
    status: 'todo' | 'completed' | 'pending';
    inProgress?: boolean;
    muted?: boolean;
    timeLeft: string;
    condition: string;
    patient: {
        name: string;
        city: string;
        state: string;
        avatar?: string;
    };
};

const CASES: Case[] = [
    {
        id: 'case_123',
        status: 'todo',
        timeLeft: '15m left',
        condition: 'COVID-19 Symptoms/Exposure',
        patient: { name: 'Noah Brooks', city: 'Austin', state: 'TX', avatar: '/api/placeholder/40/40' },
    },
    {
        id: 'case_124',
        status: 'todo',
        inProgress: true,
        muted: true,
        timeLeft: '42m left',
        condition: 'Stomach Bug',
        patient: { name: 'Mia Sullivan', city: 'Denver', state: 'CO', avatar: '/api/placeholder/40/40' },
    },
    {
        id: 'case_125',
        status: 'todo',
        timeLeft: '60m left',
        condition: 'Common Cold/Flu',
        patient: { name: 'Ethan Zhang', city: 'Seattle', state: 'WA', avatar: '/api/placeholder/40/40' },
    },
    {
        id: 'case_126',
        status: 'todo',
        timeLeft: '72m left',
        condition: 'Mental Health Condition',
        patient: { name: 'Ava Reed', city: 'Charlotte', state: 'NC', avatar: '/api/placeholder/40/40' },
    },
    // extra rows to exercise the tabs
    {
        id: 'case_127',
        status: 'completed',
        timeLeft: '—',
        condition: 'Seasonal Allergies',
        patient: { name: 'Lucas Park', city: 'Portland', state: 'OR' },
    },
    {
        id: 'case_128',
        status: 'pending',
        timeLeft: '—',
        condition: 'Sprained Ankle',
        patient: { name: 'Sofia Ramos', city: 'Miami', state: 'FL' },
    },
];
export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<'todo' | 'completed' | 'pending'>('todo');
    const [range, setRange] = useState<'7' | '30' | '90' | 'all'>('7');
    const [q, setQ] = useState('');

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();

    const filtered = useMemo(() => {
        const byTab = CASES.filter((c) => c.status === activeTab);
        const byQ = q.trim()
            ? byTab.filter((c) =>
                c.patient.name.toLowerCase().includes(q.trim().toLowerCase())
            )
            : byTab;
        return [...byQ].reverse();
    }, [activeTab, q]);

    return (
        <Layout>
            <div className="relative min-h-screen bg-blue-50">
                <div>
                    <Image
                        src={BG_IMAGE}
                        alt="Earth"
                        fill
                        priority
                        sizes="100vw"
                        className="pointer-events-none select-none object-contain object-center opacity-95 !top-24"
                    />

                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex flex-col justify-center items-center gap-4">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src="/cloud.png"
                                        alt="Weather"
                                        width={64}
                                        height={63}
                                        priority
                                        draggable={false}
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center z-50">
                                    <h1 className="text-2xl font-bold text-blue-900 text-center">
                                        Good morning, Clara!
                                    </h1>
                                    <p className="text-gray-600 text-center">
                                        You have 4 new cases today.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto pt-8 px-6 md:px-8 backdrop-blur-lg">
                    {/* stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
                        {dashboardStats.map((stat) => (
                            <div
                                key={stat.title}
                                className="rounded-2xl px-4 py-2 shadow-lg bg-white"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                                        {stat.icon}
                                    </div>
                                    <p className="text-sm font-medium text-primary">{stat.title}</p>
                                </div>
                                <p className="text-end text-2xl font-semibold text-primary mb-1">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* cases */}
                    <div className="rounded-2xl overflow-hidden">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cases</h2>
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-2 bg-white rounded-md">
                                    <Button
                                        onClick={() => setActiveTab('todo')}
                                        variant={activeTab === 'todo' ? 'default' : 'ghost'}
                                        className="bg-blue-600 hover:bg-blue-700
                                             text-white rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2"
                                    >
                                        <Image
                                            src="/to-do-circle.svg"
                                            alt="To-Do"
                                            width={20}
                                            height={20}
                                            priority
                                            draggable={false}
                                        />
                                        To-Do
                                    </Button>
                                    <Button
                                        variant={activeTab === 'completed' ? 'default' : 'ghost'}
                                        onClick={() => setActiveTab('completed')}
                                        className="rounded-md px-4 py-2 text-sm font-medium"
                                    >
                                        <Image
                                            src="/CheckCircle.svg"
                                            alt="check"
                                            width={20}
                                            height={20}
                                            priority
                                            draggable={false}
                                        />
                                        Completed
                                    </Button>
                                    <Button
                                        variant={activeTab === 'pending' ? 'default' : 'ghost'}
                                        onClick={() => setActiveTab('pending')}
                                        className="rounded-md px-4 py-2 text-sm font-medium"
                                    >
                                        <Image
                                            src="/info.svg"
                                            alt="info"
                                            width={20}
                                            height={20}
                                            priority
                                            draggable={false}
                                        />
                                        Pending
                                    </Button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-1">
                                        <Image
                                            src="/MagnifyingGlass.svg"
                                            alt="info"
                                            width={20}
                                            height={20}
                                            priority
                                            draggable={false}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                                        />
                                        <Input
                                            placeholder="Search patient name"
                                            className="pl-10 bg-white border-gray-200 rounded-lg h-10"
                                        />
                                    </div>
                                    <Select value={range} onValueChange={(v: any) => setRange(v)}>
                                        <SelectTrigger className="w-[140px] rounded-lg bg-white">
                                            <SelectValue placeholder="Last 7 Days" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="7">Last 7 Days</SelectItem>
                                            <SelectItem value="30">Last 30 Days</SelectItem>
                                            <SelectItem value="90">Last 90 Days</SelectItem>
                                            <SelectItem value="all">All Time</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>

                        </div>

                        {/* grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filtered.map((c) => {
                                const muted = !!c.muted;

                                return (
                                    <div
                                        key={c.id}
                                        className={[
                                            'rounded-2xl p-4 border border-gray-200 bg-white shadow-sm',
                                            'transition-all duration-200',
                                            'hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,99,235,0.18)] hover:border-blue-200 hover:ring-1 hover:ring-blue-400/30',
                                            muted ? 'opacity-60 pointer-events-none' : '',
                                        ].join(' ')}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="relative">
                                                <Image
                                                    src="/Frame2.png"
                                                    alt="user"
                                                    width={40}
                                                    height={40}
                                                    priority
                                                    draggable={false}
                                                />
                                                {c.inProgress && (
                                                    <div className="absolute -right-1 -bottom-1 rounded-lg bg-white text-balck text-[10px] px-1.5 py-0.5 shadow z-30 w-full flex justify-between items-center">
                                                        <Image
                                                            src="/Frame2.png"
                                                            alt="user"
                                                            width={40}
                                                            height={40}
                                                            priority
                                                            draggable={false}
                                                        />
                                                        <span>
                                                            Progress

                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div className="min-w-0">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 text-sm truncate">
                                                                {c.patient.name}
                                                            </h3>
                                                            <p className="text-xs text-gray-500">
                                                                {c.patient.city}, {c.patient.state}
                                                            </p>

                                                        </div>
                                                    </div>
                                                    <div className="shrink-0 ml-2 rounded-full bg-blue-100 text-blue-600 p-1">
                                                        <Image
                                                            src="/Briefcase.svg"
                                                            alt="Briefcase"
                                                            width={20}
                                                            height={20}
                                                            priority
                                                            draggable={false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-700 mb-3 truncate">{c.condition}</p>

                                        <div className="flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                                <Clock className="w-3 h-3" />
                                                {c.timeLeft}
                                            </span>
                                            <Button className="h-8 px-3 text-xs rounded-lg bg-blue-600 hover:bg-blue-700">
                                                <Image
                                                    src="/Notepad-white.svg"
                                                    alt="Notepad"
                                                    width={20}
                                                    height={20}
                                                    priority
                                                    draggable={false}
                                                    className='text-white'
                                                /> Create note
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
}
