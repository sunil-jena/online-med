/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '../layout/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const BG_IMAGE = '/earth.png';

type Stat = {
    title: string;
    value: string;
    sublabel?: string;
    icon: React.ReactNode;
};

const dashboardStats: Stat[] = [
    {
        title: 'To-Do',
        value: '4',
        icon: <Image src="/to-do-circle.svg" alt="To-Do" width={20} height={20} priority draggable={false} />,
    },
    {
        title: 'Need Revisions',
        value: '5',
        icon: <Image src="/revision.svg" alt="Need Revisions" width={20} height={20} priority draggable={false} />,
    },
    {
        title: 'Avg Response Time',
        value: '3m 47s',
        icon: <Image src="/clock.svg" alt="Average Response Time" width={20} height={20} priority draggable={false} />,
    },
    {
        title: 'Pending',
        value: '16',
        sublabel: 'Need Info',
        icon: <Image src="/info.svg" alt="Pending" width={20} height={20} priority draggable={false} />,
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
        avatar?: any;
    };
};

const CASES: Case[] = [
    {
        id: 'case_123',
        status: 'todo',
        timeLeft: '15m left',
        condition: 'COVID-19 Symptoms/Exposure',
        patient: {
            name: 'Noah Brooks', city: 'Austin', state: 'TX', avatar: <Image
                src="/Frame1.png"
                alt="user"
                width={40}
                height={40}
                priority
                draggable={false}
                className="rounded-md w-10 h-10"
            />
        },
    },
    {
        id: 'case_124',
        status: 'todo',
        inProgress: true,
        muted: true,
        timeLeft: '42m left',
        condition: 'Stomach Bug',
        patient: {
            name: 'Mia Sullivan', city: 'Denver', state: 'CO', avatar: <Image
                src="/Frame2.png"
                alt="user"
                width={40}
                height={40}
                priority
                draggable={false}
                className="rounded-md w-10 h-10"
            />
        },
    },
    {
        id: 'case_125',
        status: 'todo',
        timeLeft: '60m left',
        condition: 'Common Cold/Flu',
        patient: {
            name: 'Ethan Zhang', city: 'Seattle', state: 'WA', avatar: <Image
                src="/Frame3.png"
                alt="user"
                width={40}
                height={40}
                priority
                draggable={false}
                className="rounded-md w-10 h-10"
            />
        },
    },
    {
        id: 'case_126',
        status: 'todo',
        timeLeft: '72m left',
        condition: 'Mental Health Condition',
        patient: {
            name: 'Ava Reed', city: 'Charlotte', state: 'NC', avatar: <Image
                src="/Frame2.png"
                alt="user"
                width={40}
                height={40}
                priority
                draggable={false}
                className="rounded-md w-10 h-10"
            />
        },
    },
    {
        id: 'case_127',
        status: 'completed',
        timeLeft: '60m left',
        condition: 'Seasonal Allergies',
        patient: {
            name: 'Lucas Park', city: 'Portland', state: 'OR', avatar: <Image
                src="/Frame3.png"
                alt="user"
                width={40}
                height={40}
                priority
                draggable={false}
                className="rounded-md w-10 h-10"
            />
        },
    },
    {
        id: 'case_128',
        status: 'pending',
        timeLeft: '72m left',
        condition: 'Sprained Ankle',
        patient: {
            name: 'Sofia Ramos', city: 'Miami', state: 'FL', avatar: <Image
                src="/Frame1.png"
                alt="user"
                width={40}
                height={40}
                priority
                draggable={false}
                className="rounded-md w-10 h-10"
            />
        },
    },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<'todo' | 'completed' | 'pending'>('todo');
    const [range, setRange] = useState<'7' | '30' | '90' | 'all'>('7');
    const [q, setQ] = useState('');

    const filtered = useMemo(() => {
        const byTab = CASES.filter((c) => c.status === activeTab);
        const byQ = q.trim()
            ? byTab.filter((c) => c.patient.name.toLowerCase().includes(q.trim().toLowerCase()))
            : byTab;
        return [...byQ].reverse();
    }, [activeTab, q]);

    return (
        <Layout>
            <div className="relative">
                {/* HERO / EARTH (KEEPING top-32 AS YOU ASKED) */}
                <div className="relative h-[420px] md:h-[500px] top-44">
                    {/* Earth image centered; exact 840px width */}
                    <Image
                        src={BG_IMAGE}
                        alt="Earth"
                        width={1600}
                        height={900}
                        priority
                        draggable={false}
                        className="
              pointer-events-none select-none
              absolute left-1/2 -translate-x-1/2
              -top-10 sm:-top-12 md:-top-16
              w-[840px]
              object-contain opacity-95
            "
                    />

                    {/* Bottom glow */}
                    {/* <div
                        className="
              absolute left-1/2 -translate-x-1/2 bottom-[38px]
              w-[88%] md:w-[70%] h-24
              rounded-[40px] blur-sm
              bg-[radial-gradient(80%_120%_at_50%_50%,rgba(37,99,235,0.28),rgba(37,99,235,0.06),transparent_70%)]
              pointer-events-none
            "
                    /> */}

                </div>
                <div className="absolute z-10 top-2 md:top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <Image src="/cloud.png" alt="Weather" width={64} height={63} priority draggable={false} />
                    <div className="mt-3 md:mt-4 text-center">
                        <h1 className="text-3xl font-bold text-blue-900">Good morning, Clara!</h1>
                        <p className="text-blue-900 font-medium text-xl">You have 4 new cases today.</p>
                    </div>
                </div>

                <section className="max-w-full py-8 px-6 md:px-8 backdrop-blur-lg">
                    {/* Stats */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {dashboardStats.map((stat) => (
                                <div
                                    key={stat.title}
                                    className="
                      rounded-2xl px-4 py-3 bg-white shadow-lg border border-white/60
                      hover:border-blue-200 transition
                    "
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                                            {stat.icon}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-md font-medium text-blue-900">{stat.title}</p>
                                            {stat.sublabel && (
                                                <span className="text-sm px-2 py-1 rounded-md bg-gray-200 text-gray-900">
                                                    {stat.sublabel}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-end text-2xl font-semibold text-blue-900 mt-1">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cases header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4">Cases</h2>

                        <div className="flex justify-between items-center">
                            {/* Tabs */}
                            <div className="flex items-center gap-2 bg-white rounded-md p-1 shadow-sm">
                                <Button
                                    onClick={() => setActiveTab('todo')}
                                    variant={activeTab === 'todo' ? 'default' : 'ghost'}
                                    className="rounded-md px-4 py-2 text-sm font-medium
                               data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                                    data-state={activeTab === 'todo' ? 'active' : 'inactive'}
                                >
                                    <Image src="/to-do-circle.svg" alt="To-Do" width={20} height={20} priority draggable={false} />
                                    <span className="ml-2">To-Do</span>
                                </Button>

                                <Button
                                    onClick={() => setActiveTab('completed')}
                                    variant={activeTab === 'completed' ? 'default' : 'ghost'}
                                    className="rounded-md px-4 py-2 text-sm font-medium
                               data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                                    data-state={activeTab === 'completed' ? 'active' : 'inactive'}
                                >
                                    <Image src="/CheckCircle.svg" alt="Completed" width={20} height={20} priority draggable={false} />
                                    <span className="ml-2">Completed</span>
                                </Button>

                                <Button
                                    onClick={() => setActiveTab('pending')}
                                    variant={activeTab === 'pending' ? 'default' : 'ghost'}
                                    className="rounded-md px-4 py-2 text-sm font-medium
                               data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                                    data-state={activeTab === 'pending' ? 'active' : 'inactive'}
                                >
                                    <Image src="/info.svg" alt="Pending" width={20} height={20} priority draggable={false} />
                                    <span className="ml-2">Pending</span>
                                </Button>
                            </div>

                            {/* Search + Range */}
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Image
                                        src="/MagnifyingGlass.svg"
                                        alt="Search"
                                        width={20}
                                        height={20}
                                        priority
                                        draggable={false}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                                    />
                                    <Input
                                        placeholder="Search patient name"
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        className="pl-10 bg-white border-gray-200 rounded-lg h-10 w-[240px]"
                                    />
                                </div>

                                <div className="relative">
                                    {/* icon */}
                                    <Image
                                        src="/Clock.svg"
                                        alt="Search"
                                        width={20}
                                        height={20}
                                        priority
                                        draggable={false}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />

                                    <Select value={range} onValueChange={(v: any) => setRange(v)}>
                                        {/* add left padding to make room for the icon */}
                                        <SelectTrigger className="pl-9 w-[140px] rounded-lg bg-white">
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
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-visible">
                        {filtered.map((c) => {
                            const muted = !!c.muted;

                            return (
                                <div key={c.id} className='relative'>
                                    <div

                                        className={[
                                            ' group rounded-2xl p-4 bg-white border border-transparent',
                                            'transition-all duration-200',
                                            'hover:shadow-[0_16px_40px_rgba(37,99,235,0.18)] hover:border-blue-200',
                                            'before:content-[\'\'] before:absolute before:inset-0 before:rounded-2xl before:-z-10 before:opacity-0',
                                            'before:bg-[radial-gradient(90%_80%_at_50%_0%,rgba(37,99,235,0.30),transparent_60%)]',
                                            'group-hover:before:opacity-100',
                                            muted ? 'opacity-60 pointer-events-none' : '',
                                        ].join(' ')}
                                        style={{ overflow: 'visible' }}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="relative">
                                                {c.patient.avatar}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div className="min-w-0">
                                                        <h3 className="font-semibold text-gray-900 text-sm truncate">{c.patient.name}</h3>
                                                        <p className="text-xs text-gray-500">
                                                            {c.patient.city}, {c.patient.state}
                                                        </p>
                                                    </div>
                                                    <div className="shrink-0 ml-2 rounded-full bg-blue-100 text-blue-600 p-1">
                                                        <Image src="/Briefcase.svg" alt="Briefcase" width={20} height={20} priority draggable={false} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-3'>

                                            <span className="px-[4px] text-sm text-gray-800 truncate border bg-gray-200 rounded-xl">
                                                {c.condition}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                                <Image
                                                    src="/Hourglass.svg"
                                                    alt="Hourglass"
                                                    width={16}
                                                    height={16}
                                                    priority
                                                    draggable={false}
                                                    className="text-white w-4 h-4"
                                                />
                                                {c.timeLeft}
                                            </span>
                                            <Button variant='gradient' className="h-8 px-3 text-xs rounded-lg">
                                                <Image
                                                    src="/Notepad-white.svg"
                                                    alt="Notepad"
                                                    width={16}
                                                    height={16}
                                                    priority
                                                    draggable={false}
                                                    className="text-white w-4 h-4"

                                                />
                                                &nbsp;Create note
                                            </Button>
                                        </div>
                                    </div>
                                    {c.inProgress && (
                                        <div
                                            className="absolute top-0 right-2 translate-y-1/2 rounded-xl bg-white/95 text-gray-800 text-[10px] px-2 py-1 shadow-md border border-gray-100 flex items-center gap-1"
                                            style={{ filter: 'drop-shadow(0 6px 18px rgba(37,99,235,0.25))' }}
                                        >
                                            <Image
                                                src="/Frame2.png"
                                                alt="user"
                                                width={40}
                                                height={40}
                                                priority
                                                draggable={false}
                                                className="rounded-md w-5 h-5"
                                            />
                                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                                            In&nbsp;Progress
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
