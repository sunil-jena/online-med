'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import PronounsPopover from '../cases/PronounsPopover';
import DotsMenu from '../cases/DotsMenu';
import { Comment } from '../cases/Comment';
import { DetailRow } from '../cases/DetailRow';
import { RightTab } from '../cases/RightTab';

type HistoryItem = {
    id: string;
    title: string;
    city: string;
    state: string;
    start: string;
    end: string;
    submitted: string;
    icon?: string;
};

const PATIENT = {
    name: 'Noah Brooks',
    age: 33,
    city: 'Austin',
    state: 'Texas',
    avatar: '/Frame2.png',
    menuIcon: '/DotsThreeVertical.svg',
};

const DETAILS = {
    pronouns: 'He/Him/His',
    dob: '24 July 1991',
    reason: 'COVID-19 Symptoms/Exposure',
    symptoms: 'Coughing',
    startLeave: '19 July 2025',
    returnDate: '23 July 2025',
    noteFor: 'Work',
    submittedAt: '18 July, 8:02 AM',
    status: 'Pending',
};

const HISTORY: HistoryItem[] = [
    {
        id: 'h1',
        title: 'Common Cold/Flu',
        city: 'Austin',
        state: 'TX',
        start: '20 May, 2025',
        end: '23 May, 2025',
        submitted: '19 May, 2025',
        icon: '/Briefcase.svg',
    },
    {
        id: 'h2',
        title: 'Mental Health Condition',
        city: 'Austin',
        state: 'TX',
        start: '14 Feb, 2018',
        end: '16 Feb, 2018',
        submitted: '19 May, 2025',
        icon: '/GraduationCap.svg',
    },
];

const NOTE_TEXT = `To Whom It May Concern,

Noah Brooks was evaluated on the above date and reported experiencing mild symptoms consistent with a viral illness, including fatigue, low-grade fever, and congestion. Based on his symptoms and recent exposure risk, a presumptive diagnosis of COVID-19 was considered.

At this time, his symptoms are mild and manageable at home. He has been advised to rest, stay hydrated, and self-isolate in accordance with CDC guidelines. A COVID-19 test was recommended.

We recommend excusing him from work responsibilities from July 19 to July 23, 2025 to allow for recovery and prevent possible transmission. If symptoms worsen or do not improve, he has been advised to seek further medical evaluation.`;

export default function CaseDetails() {
    const [leftTab, setLeftTab] = useState<'details' | 'history'>('details');
    const [rightTab, setRightTab] = useState<'note' | 'activity' | 'comments'>('note');

    const [editingPronoun, setEditingPronoun] = useState(false);
    const [pronouns, setPronouns] = useState(DETAILS.pronouns);

    const [dotsOpen, setDotsOpen] = useState(false);

    const [note, setNote] = useState(NOTE_TEXT);

    const history = useMemo(() => HISTORY, []);

    return (
        <Layout>
            <div className="px-6 md:px-8 py-6">
                {/* Breadcrumbs */}
                <div className="text-sm leading-4 mb-4 flex items-center gap-3">
                    <span>Cases</span>
                    <Image src="/CaretRight.svg" alt="" width={16} height={16} className="w-4 h4" />
                    <span className="text-blue-900 font-medium text-sm leading-[18px]">{PATIENT.name}</span>
                </div>

                {/* 2-column layout (equal height on desktop) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mx-auto lg:items-stretch">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-5">
                        <div className="rounded-[28px] bg-white shadow-sm border border-gray-100 overflow-hidden h-full">
                            {/* Header */}
                            <div className="p-5 flex items-start gap-4 border-b-2 border-gray-100 ">
                                <Image
                                    src={PATIENT.avatar}
                                    alt={PATIENT.name}
                                    width={56}
                                    height={56}
                                    className="rounded-xl object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 relative">
                                        <div className="min-w-0">
                                            <h1 className="text-2xl font-semibold text-gray-900 truncate">{PATIENT.name}</h1>
                                            <div className="mt-1 flex flex-wrap items-center gap-3 text-gray-600 text-sm">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <Image src="/Balloon.svg" alt="" width={16} height={16} />
                                                    <span>{PATIENT.age} yrs</span>
                                                </div>
                                                <div className="inline-flex items-center gap-1.5">
                                                    <Image src="/MapPin.svg" alt="" width={16} height={16} className="w-4 h-4" />
                                                    <span>
                                                        {PATIENT.city}, {PATIENT.state}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dots menu anchor */}
                                        <div className="relative">
                                            <button
                                                className="shrink-0 rounded-lg p-1.5 hover:bg-gray-50"
                                                onClick={() => setDotsOpen((v) => !v)}
                                                aria-label="Open actions"
                                            >
                                                <Image src={PATIENT.menuIcon} alt="More" width={20} height={20} />
                                            </button>
                                            <DotsMenu
                                                open={dotsOpen}
                                                onClose={() => setDotsOpen(false)}
                                                patientName={PATIENT.name}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="px-5">
                                <div className="flex items-center gap-8 border-b border-gray-100">
                                    <button
                                        className={`py-3 text-sm leading-6 font-medium ${leftTab === 'details'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        onClick={() => setLeftTab('details')}
                                    >
                                        Patient details
                                    </button>
                                    <button
                                        className={`py-3 text-sm font-medium ${leftTab === 'history'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        onClick={() => setLeftTab('history')}
                                    >
                                        Patient history
                                    </button>
                                </div>
                            </div>

                            {/* Tab content */}
                            {leftTab === 'details' ? (
                                <div className="min-h-[720px] flex flex-col justify-between">
                                    <div className="flex flex-col gap-3 p-5 space-y-4 relative">
                                        {/* Preferred pronouns (anchor is this card) */}
                                        <div className="relative rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="shrink-0 rounded-xl bg-white border border-gray-200 w-10 h-10 flex items-center justify-center">
                                                    <Image src="/gender-male.svg" alt="" width={18} height={18} />
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-sm">Preferred Pronouns</p>
                                                    <p className="text-gray-900 font-medium">{pronouns}</p>
                                                </div>
                                            </div>
                                            <button
                                                aria-label="Edit pronouns"
                                                onClick={() => setEditingPronoun((v) => !v)}
                                                className="rounded-full bg-white shadow-sm border border-gray-200 p-2 hover:bg-gray-50"
                                            >
                                                <Image src="/edit-pencil.svg" alt="Edit" width={18} height={18} />
                                            </button>

                                            {/* Popover below the pencil */}
                                            <PronounsPopover
                                                open={editingPronoun}
                                                value={pronouns}
                                                onClose={() => setEditingPronoun(false)}
                                                onSave={(v) => setPronouns(v)}
                                            />
                                        </div>

                                        {/* Rest rows (unchanged) */}
                                        <DetailRow icon="/dob-cake.svg" label="Date of birth" value={DETAILS.dob} />
                                        <DetailRow icon="/reason-doctor-hospital.svg" label="Reason for absence" value={DETAILS.reason} />
                                        <DetailRow icon="/current-symptoms.svg" label="Current symptoms" value={DETAILS.symptoms} />
                                        <DetailRow icon="/start-of-leave-calendar.svg" label="Start of leave" value={DETAILS.startLeave} />
                                        <DetailRow
                                            icon="/expected-return-date-calendar.svg"
                                            label="Expected return date"
                                            value={DETAILS.returnDate}
                                        />
                                        <DetailRow icon="/notes-cases.svg" label="Note for" value={DETAILS.noteFor} />
                                        <p className="text-md text-blue-900 pt-4">Submitted on {DETAILS.submittedAt}</p>
                                    </div>

                                    <div className="rounded-b-2xl border-dashed border-t-2 border-gray-100 bg-gray-100">
                                        <div className="p-8 ">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <p className="text-sm text-gray-600">Note Status</p>
                                                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600">
                                                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                                                        Pending
                                                    </span>
                                                </div>
                                                <Image src="/CaretDown.svg" alt="" width={16} height={16} className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-5 space-y-4 min-h-[720px]">
                                    {history.map((h) => (
                                        <div
                                            key={h.id}
                                            className="rounded-4xl border border-gray-100 bg-white p-4 shadow-[0_1px_0_#EEF2FF] hover:shadow-sm transition"
                                        >
                                            <div className="flex items-start gap-3">
                                                <Image src={PATIENT.avatar} alt={PATIENT.name} width={40} height={40} className="rounded-lg" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-blue-900">{PATIENT.name}</p>
                                                            <p className="text-sm text-blue-900">
                                                                {h.city}, {h.state}
                                                            </p>
                                                        </div>
                                                        <div className="rounded-full bg-blue-50 p-1">
                                                            <Image src={h.icon || '/Briefcase.svg'} alt="" width={18} height={18} />
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <span className="inline-flex items-center rounded-lg bg-blue-50 text-blue-900 text-sm px-2 py-1">
                                                            {h.title}
                                                        </span>
                                                    </div>

                                                    <div className="mt-3 flex items-center flex-wrap gap-3 text-sm">
                                                        <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs text-gray-700">
                                                            <Image src="/CalendarPlus.svg" alt="" width={14} height={14} />
                                                            {h.start}
                                                        </span>
                                                        <span className="text-gray-400">-</span>
                                                        <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs text-gray-700">
                                                            <Image src="/CalendarCheck.svg" alt="" width={14} height={14} />
                                                            {h.end}
                                                        </span>
                                                    </div>

                                                    <div className="mt-3 flex items-center justify-between">
                                                        <p className="text-md text-blue-900">Submitted on {h.submitted}</p>
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-900 text-xs font-medium px-2 py-1 border border-green-100">
                                                            <Image src="/CheckCircle.svg" alt="" width={16} height={16} className="w-4 h-4" />
                                                            Completed
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-6 justify-between">
                                    <RightTab
                                        active={rightTab === 'note'}
                                        onClick={() => setRightTab('note')}
                                        icon="/Notepad.svg"
                                        label="Doctor's Note"
                                    />
                                    <span className="h-6 w-px bg-gray-200" />
                                    <RightTab
                                        active={rightTab === 'activity'}
                                        onClick={() => setRightTab('activity')}
                                        icon="/Pulse.svg"
                                        label="Activity"
                                    />
                                    <span className="h-6 w-px bg-gray-200" />
                                    <RightTab
                                        active={rightTab === 'comments'}
                                        onClick={() => setRightTab('comments')}
                                        icon="/ChatCenteredText.svg"
                                        label="Comments"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-[#DDE3FF] min-h-[720px] h-full">
                            {rightTab === 'note' && (
                                <div className="flex flex-col justify-between h-full">
                                    <div
                                        className="rounded-3xl p-6 md:p-8"
                                        style={{
                                            backgroundImage: 'url(/dot-grid.svg)', backgroundRepeat: 'repeat'
                                        }}
                                    >
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            className="w-full min-h-screen bg-transparent outline-none resize-none text-[15px] leading-7 text-[#0E3B8A] font-medium"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end gap-3 p-4 border-t border-[#DDE3FF] bg-white rounded-b-3xl">
                                        <Button variant='outline' className="rounded-xl px-4 py-2 bg-white text-blue-700 border border-blue-100 hover:bg-blue-50 inline-flex items-center">
                                            <Image src="/CloudCheck.svg" alt="" width={18} height={18} className="mr-2" />
                                            Save
                                        </Button>
                                        <Button variant="gradient" className='rounded-xl px-4 py-2' onClick={() => console.log('pdf')}>
                                            <Image src="/FilePdf.svg" alt="" width={18} height={18} className="mr-2" />

                                            Generate PDF
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {rightTab === 'activity' && (
                                <div className=" h-full rounded-2xl border bg-white border-gray-100 p-6 text-md text-bule-900 text-center font-semibold">
                                    <p>No recent activity.</p>
                                </div>
                            )}

                            {rightTab === 'comments' && (
                                <div className="rounded-3xl border border-gray-100 bg-white p-8 min-h-[720px] flex flex-col h-full">
                                    <h3 className="text-gray-900 font-semibold mb-4">Comments</h3>

                                    <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4 ">
                                        <Comment
                                            avatar="/Frame1.png"
                                            name="Clara Thompson"
                                            badge="You"
                                            time="18 July, 10:18 AM"
                                            text="Thanks, updated the evaluated date to match the intake submission timestamp (July 18, 8:02 AM). Let me know if further edits are needed."
                                        />
                                        <Comment
                                            initials="HS"
                                            name="Harper Scott"
                                            badge="QA"
                                            time="18 July, 10:17 AM"
                                            text="Ensure that the evaluated date mentioned matches the actual intake submission date (not shown above)."
                                            color="purple"
                                        />
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-dashed border-gray-100">
                                        <div className="rounded-2xl bg-[#F8FAFF]">
                                            <Input
                                                placeholder="Leave a comment..."
                                                className="h-12 bg-transparent border-0 shadow-none px-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

