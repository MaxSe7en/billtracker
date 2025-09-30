"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { ExternalLink, Calendar, Users, FileText, History, Building2, AlertCircle, CheckCircle2, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

// Type definitions remain the same
type BillDetailProps = {
  bill: {
    id: number;
    bill_number: string;
    title: string;
    description: string;
    ai_summary?: string;
    ai_impacts?: any[];
    ai_pro_con?: any[];
    status: number;
    status_date: string;
    last_updated: string;
    url: string;
    state_link: string;
    state: string;
    bill_type: string;
    session: any; // Assuming a type for session exists
    sponsors: any[]; // Assuming a type for sponsors exists
    history: any[]; // Assuming a type for history exists
    texts: any[]; // Assuming a type for texts exists
    referrals: any[]; // Assuming a type for referrals exists
  };
};

// Status Map - Simplified colors, assuming standard contrast in compact mode
const statusMap: Record<number, { label: string; color: string; icon: any }> = {
  0: { label: "Unknown", color: "bg-gray-500", icon: AlertCircle },
  1: { label: "Active", color: "bg-emerald-500", icon: Clock },
  2: { label: "Passed", color: "bg-blue-500", icon: CheckCircle2 },
  3: { label: "Failed", color: "bg-red-500", icon: XCircle }
};


// The component now explicitly accepts 'bill' for better type safety, though the
// existing implementation was using a hardcoded 'bill' sample. I'll adapt the 
// function signature to use the hardcoded sample data as before but keep the 
// types defined.

const BillDetail = ({ billsa }) => {
  const [expandedSections, setExpandedSections] = useState({
    impacts: true,
    arguments: true,
    sponsors: false,
    history: false,
    texts: false,
    referrals: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Sample data based on the schema
  const bill = {
    id: 1234,
    bill_number: "HB 1234",
    title: "An Act Relating to Education Funding and Technology Infrastructure",
    description: "This bill establishes new guidelines for public school technology funding, creates a grant program for rural districts, and mandates cybersecurity standards.",
    ai_summary: "This legislation aims to modernize education infrastructure by allocating $50M for technology upgrades in public schools, with priority given to underserved rural districts. It also establishes mandatory cybersecurity protocols for all educational institutions receiving state funding.",
    ai_impacts: [
      { category: "Education", description: "Provides $50M in funding for technology infrastructure in public schools" },
      { category: "Rural Communities", description: "Creates dedicated grant program for rural school districts" },
      { category: "Cybersecurity", description: "Mandates security standards for all state-funded educational institutions" }
    ],
    ai_pro_con: [
      { type: "pro", argument: "Addresses critical technology gaps in underserved communities" },
      { type: "pro", argument: "Enhances student access to modern learning tools" },
      { type: "con", argument: "Implementation costs may exceed allocated budget" },
      { type: "con", argument: "Cybersecurity requirements could burden smaller districts" }
    ],
    status: 1,
    status_date: "2025-09-15",
    last_updated: "2025-09-28",
    url: "https://legiscan.com/CA/bill/HB1234/2025",
    state_link: "https://legislature.ca.gov/bill/HB1234",
    state: "CA",
    bill_type: "House Bill",
    session: {
      session_title: "2025-2026 Regular Session",
      year_start: 2025,
      year_end: 2026
    },
    sponsors: [
      { name: "Jane Smith", party: "Democrat", role: "Representative", district: "12th", sponsor_type_id: 1 },
      { name: "John Doe", party: "Republican", role: "Representative", district: "34th", sponsor_type_id: 2 }
    ],
    history: [
      { date: "2025-09-28", action: "Referred to Committee on Education", importance: 1 },
      { date: "2025-09-20", action: "First reading", importance: 2 },
      { date: "2025-09-15", action: "Introduced", importance: 3 }
    ],
    texts: [
      { date: "2025-09-15", type: "Introduced", url: "https://example.com/text1.pdf" }
    ],
    referrals: [
      { name: "Education Committee", chamber: "House", date: "2025-09-28" }
    ]
  };

  const statusMap = {
    0: { label: "Unknown", color: "bg-gray-500", icon: AlertCircle },
    1: { label: "Active", color: "bg-emerald-500", icon: Clock },
    2: { label: "Passed", color: "bg-blue-500", icon: CheckCircle2 },
    3: { label: "Failed", color: "bg-red-500", icon: XCircle }
  };

  const statusInfo = statusMap[bill.status] || statusMap[0];
  const StatusIcon = statusInfo.icon;

  const proArgs = (bill.ai_pro_con || []).filter(arg => arg.type === "pro");
  const conArgs = (bill.ai_pro_con || []).filter(arg => arg.type === "con");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 border border-slate-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {bill.bill_number}
                  </span>
                  <span className="text-sm opacity-90">{bill.state}</span>
                </div>
                <h1 className="text-3xl font-bold leading-tight">{bill.title}</h1>
              </div>
              <div className={`flex items-center gap-2 ${statusInfo.color} px-4 py-2 rounded-full text-sm font-semibold`}>
                <StatusIcon size={16} />
                {statusInfo.label}
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Updated: {new Date(bill.last_updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={16} />
                <span>{bill.bill_type}</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex gap-3">
              <a
                href={bill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <ExternalLink size={16} />
                View on LegiScan
              </a>
              <a
                href={bill.state_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <ExternalLink size={16} />
                State Legislature
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="px-8 py-6 border-b border-slate-200">
            <p className="text-slate-700 leading-relaxed">
              {bill.description}
            </p>
          </div>

          {/* AI Summary */}
          <div className="px-8 py-6 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex items-start gap-3">
              <div className="bg-amber-500 p-2 rounded-lg mt-1">
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">AI Summary</h2>
                <p className="text-slate-700 leading-relaxed">
                  {bill.ai_summary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impacts Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-slate-200">
          <button
            onClick={() => toggleSection('impacts')}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <h2 className="text-xl font-semibold text-slate-900">Key Impacts</h2>
            {expandedSections.impacts ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections.impacts && (
            <div className="px-8 pb-6">
              <div className="grid gap-4">
                {(bill.ai_impacts || []).map((impact, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="bg-blue-500 text-white font-semibold text-sm px-3 py-1 rounded-lg mt-1 whitespace-nowrap">
                      {impact.category}
                    </div>
                    <p className="text-slate-700 flex-1">
                      {impact.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Arguments Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-slate-200">
          <button
            onClick={() => toggleSection('arguments')}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <h2 className="text-xl font-semibold text-slate-900">Arguments</h2>
            {expandedSections.arguments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections.arguments && (
            <div className="px-8 pb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pro Arguments */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-emerald-500" size={24} />
                    <h3 className="text-lg font-semibold text-emerald-600">Supporting Arguments</h3>
                  </div>
                  {proArgs.map((arg, idx) => (
                    <div key={idx} className="p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                      <p className="text-slate-700">{arg.argument}</p>
                    </div>
                  ))}
                </div>

                {/* Con Arguments */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="text-red-500" size={24} />
                    <h3 className="text-lg font-semibold text-red-600">Opposing Arguments</h3>
                  </div>
                  {conArgs.map((arg, idx) => (
                    <div key={idx} className="p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                      <p className="text-slate-700">{arg.argument}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sponsors Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-slate-200">
          <button
            onClick={() => toggleSection('sponsors')}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users size={24} className="text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Sponsors ({bill.sponsors.length})</h2>
            </div>
            {expandedSections.sponsors ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections.sponsors && (
            <div className="px-8 pb-6">
              <div className="space-y-3">
                {bill.sponsors.map((sponsor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-slate-900">{sponsor.name}</p>
                      <p className="text-sm text-slate-600">
                        {sponsor.role} • District {sponsor.district} • {sponsor.party}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      idx === 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {idx === 0 ? 'Primary' : 'Co-sponsor'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <button
            onClick={() => toggleSection('history')}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <History size={24} className="text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Legislative History</h2>
            </div>
            {expandedSections.history ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections.history && (
            <div className="px-8 pb-6">
              <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200"></div>
                <div className="space-y-6">
                  {bill.history.map((event, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 pl-10">
                      <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        idx === 0 ? 'bg-blue-500' : 'bg-slate-300'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-white' : 'bg-slate-500'}`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{event.action}</p>
                        <p className="text-sm text-slate-600">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BillDetail;