import React, { useState, useEffect, useMemo } from 'react';

// Pure, standard SVG Icons to prevent native window constructor clashes
const Trophy = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
        <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
    </svg>
);

const Users = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const Settings = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const Check = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const Info = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);

const Compass = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
);

const Unlock = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
);

const Lock = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const Award = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
);

const Star = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const AlertCircle = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const Shuffle = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
);

const Clock = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const UserPlus = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
);

const Mail = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const LogIn = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
);

const KeyRound = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4M20 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
    </svg>
);

const Inbox = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
);

const Share2 = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
);

const Copy = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

const FileUp = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <polyline points="9 15 12 12 15 15" />
    </svg>
);

const Trash2 = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

const Eye = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M1 12s4-8 11-8 4 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const X = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// 12 groups of World Cup 2026
const TEAMS_BY_GROUP = {
    A: { name: 'Group A', teams: ['Mexico', 'South Africa', 'South Korea', 'Czechia'] },
    B: { name: 'Group B', teams: ['Canada', 'Switzerland', 'Qatar', 'Bosnia and Herzegovina'] },
    C: { name: 'Group C', teams: ['Brazil', 'Morocco', 'Haiti', 'Scotland'] },
    D: { name: 'Group D', teams: ['United States', 'Paraguay', 'Australia', 'Türkiye'] },
    E: { name: 'Group E', teams: ['Germany', 'Curaçao', 'Côte d\'Ivoire', 'Ecuador'] },
    F: { name: 'Group F', teams: ['Netherlands', 'Japan', 'Tunisia', 'Sweden'] },
    G: { name: 'Group G', teams: ['Belgium', 'Egypt', 'Iran', 'New Zealand'] },
    H: { name: 'Group H', teams: ['Spain', 'Cabo Verde', 'Saudi Arabia', 'Uruguay'] },
    I: { name: 'Group I', teams: ['France', 'Senegal', 'Norway', 'Iraq'] },
    J: { name: 'Group J', teams: ['Argentina', 'Algeria', 'Austria', 'Jordan'] },
    K: { name: 'Group K', teams: ['Portugal', 'Uzbekistan', 'Colombia', 'Congo DR'] },
    L: { name: 'Group L', teams: ['England', 'Croatia', 'Ghana', 'Panama'] }
};

const COUNTRY_CODES = {
    'Mexico': 'mx',
    'South Africa': 'za',
    'South Korea': 'kr',
    'Czechia': 'cz',
    'Canada': 'ca',
    'Switzerland': 'ch',
    'Qatar': 'qa',
    'Bosnia and Herzegovina': 'ba',
    'Brazil': 'br',
    'Morocco': 'ma',
    'Haiti': 'ht',
    'Scotland': 'gb-sct',
    'United States': 'us',
    'Paraguay': 'py',
    'Australia': 'au',
    'Türkiye': 'tr',
    'Germany': 'de',
    'Curaçao': 'cw',
    'Côte d\'Ivoire': 'ci',
    'Ecuador': 'ec',
    'Netherlands': 'nl',
    'Japan': 'jp',
    'Tunisia': 'tn',
    'Sweden': 'se',
    'Belgium': 'be',
    'Egypt': 'eg',
    'Iran': 'ir',
    'New Zealand': 'nz',
    'Spain': 'es',
    'Cabo Verde': 'cv',
    'Saudi Arabia': 'sa',
    'Uruguay': 'uy',
    'France': 'fr',
    'Senegal': 'sn',
    'Norway': 'no',
    'Iraq': 'iq',
    'Argentina': 'ar',
    'Algeria': 'dz',
    'Austria': 'at',
    'Jordan': 'jo',
    'Portugal': 'pt',
    'Uzbekistan': 'uz',
    'Colombia': 'co',
    'Congo DR': 'cd',
    'England': 'gb-eng',
    'Croatia': 'hr',
    'Ghana': 'gh',
    'Panama': 'pa'
};

const Flag = ({ team, className = "w-5 h-3.5 object-cover rounded shadow border border-slate-200" }) => {
    const code = COUNTRY_CODES[team];
    if (!code) {
        return <span className="text-xs mr-1 shrink-0">🏳️</span>;
    }
    return (
        <img
            src={`https://flagcdn.com/w40/${code}.png`}
            alt={`${team} flag`}
            className={`${className} inline-block shrink-0`}
            onError={(e) => {
                e.target.style.display = 'none';
            }}
        />
    );
};

const INITIAL_GROUP_MATCHES = [
    { id: 'm1', stage: 'group', group: 'A', home: 'Mexico', away: 'South Africa', date: 'June 11, 2026' },
    { id: 'm2', stage: 'group', group: 'A', home: 'South Korea', away: 'Czechia', date: 'June 11, 2026' },
    { id: 'm3', stage: 'group', group: 'B', home: 'Canada', away: 'Bosnia and Herzegovina', date: 'June 12, 2026' },
    { id: 'm4', stage: 'group', group: 'B', home: 'Qatar', away: 'Switzerland', date: 'June 13, 2026' },
    { id: 'm5', stage: 'group', group: 'C', home: 'Brazil', away: 'Morocco', date: 'June 13, 2026' },
    { id: 'm6', stage: 'group', group: 'C', home: 'Haiti', away: 'Scotland', date: 'June 14, 2026' },
    { id: 'm7', stage: 'group', group: 'D', home: 'United States', away: 'Paraguay', date: 'June 12, 2026' },
    { id: 'm8', stage: 'group', group: 'D', home: 'Australia', away: 'Türkiye', date: 'June 13, 2026' },
    { id: 'm9', stage: 'group', group: 'E', home: 'Germany', away: 'Curaçao', date: 'June 14, 2026' },
    { id: 'm10', stage: 'group', group: 'E', home: 'Côte d\'Ivoire', away: 'Ecuador', date: 'June 14, 2026' },
    { id: 'm11', stage: 'group', group: 'F', home: 'Netherlands', away: 'Japan', date: 'June 14, 2026' },
    { id: 'm12', stage: 'group', group: 'F', home: 'Tunisia', away: 'Sweden', date: 'June 14, 2026' },
    { id: 'm13', stage: 'group', group: 'G', home: 'Belgium', away: 'Egypt', date: 'June 15, 2026' },
    { id: 'm14', stage: 'group', group: 'G', home: 'Iran', away: 'New Zealand', date: 'June 15, 2026' },
    { id: 'm15', stage: 'group', group: 'H', home: 'Spain', away: 'Cabo Verde', date: 'June 15, 2026' },
    { id: 'm16', stage: 'group', group: 'H', home: 'Saudi Arabia', away: 'Uruguay', date: 'June 15, 2026' },
    { id: 'm17', stage: 'group', group: 'I', home: 'France', away: 'Senegal', date: 'June 16, 2026' },
    { id: 'm18', stage: 'group', group: 'I', home: 'Iraq', away: 'Norway', date: 'June 16, 2026' },
    { id: 'm19', stage: 'group', group: 'J', home: 'Argentina', away: 'Algeria', date: 'June 17, 2026' },
    { id: 'm20', stage: 'group', group: 'J', home: 'Austria', away: 'Jordan', date: 'June 17, 2026' },
    { id: 'm21', stage: 'group', group: 'K', home: 'Portugal', away: 'Congo DR', date: 'June 17, 2026' },
    { id: 'm22', stage: 'group', group: 'K', home: 'Uzbekistan', away: 'Colombia', date: 'June 18, 2026' },
    { id: 'm23', stage: 'group', group: 'L', home: 'England', away: 'Croatia', date: 'June 17, 2026' },
    { id: 'm24', stage: 'group', group: 'L', home: 'Ghana', away: 'Panama', date: 'June 17, 2026' },
];

const INITIAL_KNOCKOUT_MATCHES = [
    { id: 'ko_r32_1', stage: 'r32', homePlaceholder: 'Winner Group A', awayPlaceholder: 'Runner-up Group B', defaultHome: 'Mexico', defaultAway: 'Switzerland', date: 'June 29, 2026' },
    { id: 'ko_r32_2', stage: 'r32', homePlaceholder: 'Winner Group C', awayPlaceholder: '3rd Place G/H/I', defaultHome: 'Brazil', defaultAway: 'Norway', date: 'June 29, 2026' },
    { id: 'ko_r32_3', stage: 'r32', homePlaceholder: 'Winner Group E', awayPlaceholder: 'Runner-up Group F', defaultHome: 'Germany', defaultAway: 'Japan', date: 'June 30, 2026' },
    { id: 'ko_r32_4', stage: 'r32', homePlaceholder: 'Winner Group G', awayPlaceholder: '3rd Place A/B/C', defaultHome: 'Belgium', defaultAway: 'South Korea', date: 'June 30, 2026' },
    { id: 'ko_r16_1', stage: 'r16', homePlaceholder: 'Winner Match 32-1', awayPlaceholder: 'Winner Match 32-2', defaultHome: 'Mexico', defaultAway: 'Brazil', date: 'July 4, 2026' },
    { id: 'ko_r16_2', stage: 'r16', homePlaceholder: 'Winner Match 32-3', awayPlaceholder: 'Winner Match 32-4', defaultHome: 'Germany', defaultAway: 'Belgium', date: 'July 5, 2026' },
    { id: 'ko_qf_1', stage: 'qf', homePlaceholder: 'Winner R16-1', awayPlaceholder: 'Winner R16-2', defaultHome: 'Brazil', defaultAway: 'Germany', date: 'July 10, 2026' },
    { id: 'ko_sf_1', stage: 'sf', homePlaceholder: 'Winner QF-1', awayPlaceholder: 'Winner QF-2', defaultHome: 'Brazil', defaultAway: 'Argentina', date: 'July 14, 2026' },
    { id: 'ko_final', stage: 'final', homePlaceholder: 'Winner SF-1', awayPlaceholder: 'Winner SF-2', defaultHome: 'Brazil', defaultAway: 'France', date: 'July 19, 2026' }
];

const COMPACT_INDEX_KEYS = [
    'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11', 'm12',
    'm13', 'm14', 'm15', 'm16', 'm17', 'm18', 'm19', 'm20', 'm21', 'm22', 'm23', 'm24',
    'ko_r32_1', 'ko_r32_2', 'ko_r32_3', 'ko_r32_4', 'ko_r16_1', 'ko_r16_2', 'ko_qf_1', 'ko_sf_1', 'ko_final'
];

const packPredictionsString = (predictions) => {
    if (!predictions) return '';
    let packed = '';
    COMPACT_INDEX_KEYS.forEach(key => {
        const scoreObj = predictions[key];
        if (scoreObj && scoreObj.home !== undefined && scoreObj.away !== undefined && scoreObj.home !== '' && scoreObj.away !== '') {
            const h = Math.min(9, Math.max(0, parseInt(scoreObj.home)));
            const a = Math.min(9, Math.max(0, parseInt(scoreObj.away)));
            packed += `${h}${a}`;
        } else {
            packed += 'xx';
        }
    });
    try {
        return btoa(packed).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (err) {
        return '';
    }
};

const unpackPredictionsString = (hash) => {
    if (!hash) return {};
    try {
        let rawB64 = hash.replace(/-/g, '+').replace(/_/g, '/');
        while (rawB64.length % 4) {
            rawB64 += '=';
        }
        const decoded = atob(rawB64);
        const parsed = {};
        for (let i = 0; i < COMPACT_INDEX_KEYS.length; i++) {
            const key = COMPACT_INDEX_KEYS[i];
            const charPos = i * 2;
            if (charPos >= decoded.length) break;
            const hChar = decoded[charPos];
            const aChar = decoded[charPos + 1];
            if (hChar !== 'x' && aChar !== 'x') {
                parsed[key] = {
                    home: parseInt(hChar, 10),
                    away: parseInt(aChar, 10)
                };
            }
        }
        return parsed;
    } catch (err) {
        console.error("Failed to unpack string", err);
        return {};
    }
};

export const calculatePoints = (prediction, actual) => {
    if (!actual || actual.home === undefined || actual.away === undefined || !actual.finished) {
        return { points: 0, reason: '-' };
    }
    const predH = parseInt(prediction?.home);
    const predA = parseInt(prediction?.away);
    const actH = parseInt(actual.home);
    const actA = parseInt(actual.away);

    if (isNaN(predH) || isNaN(predA)) {
        return { points: 0, reason: 'No prediction' };
    }
    if (predH === actH && predA === actA) {
        return { points: 7, reason: 'Exact Score (+7)' };
    }
    const predOutcome = Math.sign(predH - predA);
    const actOutcome = Math.sign(actH - actA);
    const correctOutcome = predOutcome === actOutcome;

    if (correctOutcome) {
        const predGD = predH - predA;
        const actGD = actH - actA;
        if (predGD === actGD) {
            return { points: 4, reason: 'Correct Outcome & GD (+4)' };
        }
        return { points: 3, reason: 'Correct Outcome (+3)' };
    }
    if (predH === actH || predA === actA) {
        return { points: 1, reason: 'Exact Single Team Score (+1)' };
    }
    return { points: 0, reason: 'Incorrect' };
};

export default function App() {
    // Friends list & local states
    const [friendsList, setFriendsList] = useState([]);
    const [selectedFriendId, setSelectedFriendId] = useState('');

    const [groupMatches, setGroupMatches] = useState(INITIAL_GROUP_MATCHES);
    const [knockoutMatches, setKnockoutMatches] = useState(INITIAL_KNOCKOUT_MATCHES);
    const [realResults, setRealResults] = useState({});

    // UI Panels
    const [activeTab, setActiveTab] = useState('predictions');
    const [groupFilter, setGroupFilter] = useState('A'); // Default to Group A to keep UI concise
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [notification, setNotification] = useState(null);

    // New Registration Flow
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [activationCodeSent, setActivationCodeSent] = useState('');
    const [enteredActivationCode, setEnteredActivationCode] = useState('');
    const [pendingUserObj, setPendingUserObj] = useState(null);
    const [showActivationModal, setShowActivationModal] = useState(false);

    // Costin Admin Gate
    const [adminPasswordInput, setAdminPasswordInput] = useState('');
    const [showAdminPasswordPrompt, setShowAdminPasswordPrompt] = useState(false);

    // Manual Share Code import
    const [manualShareCode, setManualShareCode] = useState('');
    const [showManualImportField, setShowManualImportField] = useState(false);

    // Custom User Deletion Confirmation modal state
    const [userToDelete, setUserToDelete] = useState(null);

    // Comparison Panel / Read Only viewer state
    const [comparisonTargetFriend, setComparisonTargetFriend] = useState(null);

    // Currently focused predicting user
    const selectedFriend = useMemo(() => {
        return friendsList.find(f => f.id === selectedFriendId) || null;
    }, [friendsList, selectedFriendId]);

    const triggerNotification = (message, type = 'success') => {
        setNotification({ text: message, type });
        setTimeout(() => {
            setNotification(null);
        }, 4500);
    };

    const handleCopyText = (text, successMsg = 'Copied to clipboard!') => {
        try {
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            triggerNotification(successMsg, "success");
        } catch (err) {
            console.error("Clipboard copy failed", err);
            triggerNotification("Copy failed. Please copy the text manually.", "error");
        }
    };

    useEffect(() => {
        let loadedUsers = [];
        try {
            const localUsers = localStorage.getItem('wc_users');
            const localScores = localStorage.getItem('wc_real_scores');
            if (localUsers) {
                loadedUsers = JSON.parse(localUsers);
                setFriendsList(loadedUsers);
            }
            if (localScores) {
                setRealResults(JSON.parse(localScores));
            }
        } catch (err) {
            console.error("Fallback loaders failed", err);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const importName = urlParams.get('importName');
        const importEmail = urlParams.get('importEmail') || 'shared-pool-member@domain.com';
        const predsHash = urlParams.get('preds');

        if (importName && predsHash) {
            const unpackedPreds = unpackPredictionsString(predsHash);
            const importedId = 'imported_' + Math.random().toString(36).substring(2, 7);
            const importedUser = {
                id: importedId,
                name: decodeURIComponent(importName),
                email: decodeURIComponent(importEmail),
                predictions: unpackedPreds,
                totalPoints: 0
            };

            const nameCheck = decodeURIComponent(importName).toLowerCase();
            const alreadyExists = loadedUsers.some(f => f.name.toLowerCase() === nameCheck);

            if (!alreadyExists) {
                const updatedList = [...loadedUsers, importedUser];
                setFriendsList(updatedList);
                localStorage.setItem('wc_users', JSON.stringify(updatedList));
                setSelectedFriendId(importedId);
                triggerNotification(`Teammate "${importedUser.name}" imported with custom predictions!`, "success");
            } else {
                const existing = loadedUsers.find(f => f.name.toLowerCase() === nameCheck);
                if (existing) {
                    setSelectedFriendId(existing.id);
                    triggerNotification(`Focused on "${existing.name}" (already imported previously).`, "info");
                }
            }

            try {
                const cleanURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({ path: cleanURL }, '', cleanURL);
            } catch (e) {
                console.error(e);
            }
        } else {
            if (loadedUsers.length > 0) {
                setSelectedFriendId(loadedUsers[0].id);
            }
        }
    }, []);

    const saveStateToLocal = (list) => {
        try {
            localStorage.setItem('wc_users', JSON.stringify(list));
        } catch (e) {
            console.error(e);
        }
    };

    const handleManualShareCodeImport = (e) => {
        e.preventDefault();
        if (!manualShareCode.trim()) return;

        const decoded = unpackPredictionsString(manualShareCode.trim());
        if (Object.keys(decoded).length === 0) {
            triggerNotification("Invalid prediction share code!", "error");
            return;
        }

        if (!selectedFriendId) {
            triggerNotification("Register or Select an active profile to apply predictions to!", "error");
            return;
        }

        const updatedFriends = friendsList.map(f => {
            if (f.id === selectedFriendId) {
                return {
                    ...f,
                    predictions: decoded
                };
            }
            return f;
        });

        setFriendsList(updatedFriends);
        saveStateToLocal(updatedFriends);
        setManualShareCode('');
        setShowManualImportField(false);
        triggerNotification(`Successfully loaded predictions onto ${selectedFriend?.name}'s slate!`);
    };

    const savePrediction = (matchId, team, scoreVal) => {
        if (!selectedFriendId) {
            triggerNotification("Please register or select a user first before predicting!", "error");
            return;
        }
        const numericScore = scoreVal === '' ? '' : parseInt(scoreVal);
        if (isNaN(numericScore) && scoreVal !== '') return;

        const updatedFriends = friendsList.map(f => {
            if (f.id === selectedFriendId) {
                const currentPreds = { ...f.predictions };
                if (!currentPreds[matchId]) currentPreds[matchId] = {};
                currentPreds[matchId][team] = numericScore;

                return {
                    ...f,
                    predictions: currentPreds
                };
            }
            return f;
        });

        setFriendsList(updatedFriends);
        saveStateToLocal(updatedFriends);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (!regName.trim() || !regEmail.trim()) {
            triggerNotification("Both Name and Email are strictly required!", "error");
            return;
        }

        const userExists = friendsList.some(
            f => f.email.toLowerCase() === regEmail.trim().toLowerCase()
        );
        if (userExists) {
            triggerNotification("A user with this email is already registered!", "error");
            return;
        }

        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setActivationCodeSent(generatedCode);

        const newId = 'user_' + Math.random().toString(36).substring(2, 7);
        setPendingUserObj({
            id: newId,
            name: regName.trim(),
            email: regEmail.trim().toLowerCase(),
            predictions: {},
            totalPoints: 0
        });

        setShowActivationModal(true);
        triggerNotification(`Activation code dispatched to ${regEmail}!`, "info");
    };

    const verifyActivationCode = () => {
        if (enteredActivationCode.trim() !== activationCodeSent) {
            triggerNotification("Incorrect activation number! Check the Simulated Inbox panel.", "error");
            return;
        }

        const updatedList = [...friendsList, pendingUserObj];
        setFriendsList(updatedList);
        setSelectedFriendId(pendingUserObj.id);
        saveStateToLocal(updatedList);

        setShowActivationModal(false);
        setRegName('');
        setRegEmail('');
        setEnteredActivationCode('');
        setPendingUserObj(null);
        triggerNotification(`Welcome, ${pendingUserObj.name}! Your account has been verified and activated.`);
    };

    const handleRequestRemoveUser = (targetFriend) => {
        if (!isAdminMode) {
            triggerNotification("Access Denied! You must be logged in as verified Admin Costin.", "error");
            return;
        }
        setUserToDelete(targetFriend);
    };

    const handleExecuteDeleteUser = () => {
        if (!userToDelete) return;

        const filtered = friendsList.filter(f => f.id !== userToDelete.id);
        setFriendsList(filtered);
        saveStateToLocal(filtered);

        if (selectedFriendId === userToDelete.id) {
            setSelectedFriendId(filtered[0]?.id || '');
        }

        triggerNotification(`Successfully removed ${userToDelete.name} from the pool.`, "info");
        setUserToDelete(null);
    };

    const handleToggleAdminMode = () => {
        if (isAdminMode) {
            setIsAdminMode(false);
            triggerNotification("Admin Mode deactivated.", "info");
            return;
        }
        setShowAdminPasswordPrompt(true);
    };

    const verifyAdminPassword = () => {
        if (adminPasswordInput.trim() === 'costin_secure_2026') {
            setIsAdminMode(true);
            setShowAdminPasswordPrompt(false);
            setAdminPasswordInput('');
            triggerNotification("Admin Mode Activated! Welcome back, Costin.", "success");
        } else {
            triggerNotification("Incorrect admin key!", "error");
        }
    };

    const handleSaveRealResult = (matchId, team, scoreVal) => {
        const numericScore = scoreVal === '' ? '' : parseInt(scoreVal);
        if (isNaN(numericScore) && scoreVal !== '') return;

        const updatedResults = {
            ...realResults,
            [matchId]: {
                ...realResults[matchId],
                [team]: numericScore,
                finished: true
            }
        };

        setRealResults(updatedResults);
        try {
            localStorage.setItem('wc_real_scores', JSON.stringify(updatedResults));
        } catch (err) {
            console.error(err);
        }
        triggerNotification(`Match score updated and recalculations triggered!`);
    };

    const handleSimulateGroupOutcomes = () => {
        const simulated = { ...realResults };
        groupMatches.forEach(match => {
            simulated[match.id] = {
                home: Math.floor(Math.random() * 4),
                away: Math.floor(Math.random() * 3),
                finished: true
            };
        });
        setRealResults(simulated);
        triggerNotification("All Group stage matches simulated randomly!", "info");
        try {
            localStorage.setItem('wc_real_scores', JSON.stringify(simulated));
        } catch (e) {
            console.error(e);
        }
    };

    const handleRandomizeCurrentPredictions = () => {
        if (!selectedFriend) {
            triggerNotification("Register or select a profile first!", "error");
            return;
        }
        const randomizedPreds = {};

        groupMatches.forEach(match => {
            randomizedPreds[match.id] = {
                home: Math.floor(Math.random() * 4),
                away: Math.floor(Math.random() * 3)
            };
        });

        knockoutMatches.forEach(match => {
            randomizedPreds[match.id] = {
                home: Math.floor(Math.random() * 3),
                away: Math.floor(Math.random() * 3)
            };
        });

        const updatedFriends = friendsList.map(f => {
            if (f.id === selectedFriendId) {
                return { ...f, predictions: randomizedPreds };
            }
            return f;
        });

        setFriendsList(updatedFriends);
        saveStateToLocal(updatedFriends);
        triggerNotification(`Randomized predictions for ${selectedFriend.name}!`);
    };

    const friendsWithScoredPoints = useMemo(() => {
        return friendsList.map(friend => {
            let total = 0;
            let exactMatches = 0;
            let gdMatches = 0;
            let outcomeMatches = 0;
            let bonusMatches = 0;

            groupMatches.forEach(match => {
                const pred = friend.predictions?.[match.id];
                const actual = realResults[match.id];

                if (pred && actual && actual.finished) {
                    const res = calculatePoints(pred, actual);
                    total += res.points;
                    if (res.points === 7) exactMatches++;
                    else if (res.points === 4) gdMatches++;
                    else if (res.points === 3) outcomeMatches++;
                    else if (res.points === 1) bonusMatches++;
                }
            });

            knockoutMatches.forEach(match => {
                const pred = friend.predictions?.[match.id];
                const actual = realResults[match.id];

                if (pred && actual && actual.finished) {
                    const res = calculatePoints(pred, actual);
                    total += res.points;
                    if (res.points === 7) exactMatches++;
                    else if (res.points === 4) gdMatches++;
                    else if (res.points === 3) outcomeMatches++;
                    else if (res.points === 1) bonusMatches++;
                }
            });

            return {
                ...friend,
                totalPoints: total,
                exactMatches,
                gdMatches,
                outcomeMatches,
                bonusMatches
            };
        }).sort((a, b) => b.totalPoints - a.totalPoints);
    }, [friendsList, realResults, groupMatches, knockoutMatches]);

    const activeUserShareLink = useMemo(() => {
        if (!selectedFriend) return '';
        const cleanUrl = window.location.origin + window.location.pathname;
        const packed = packPredictionsString(selectedFriend.predictions);
        return `${cleanUrl}?importName=${encodeURIComponent(selectedFriend.name)}&importEmail=${encodeURIComponent(selectedFriend.email)}&preds=${packed}`;
    }, [selectedFriend]);

    const activeUserShareCode = useMemo(() => {
        if (!selectedFriend) return '';
        return packPredictionsString(selectedFriend.predictions);
    }, [selectedFriend]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">

            {/* Light Clean Header */}
            <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40 px-4 py-3 shadow-xs">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-md shadow-emerald-600/10">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-extrabold text-lg md:text-xl tracking-tight text-slate-900">
                                    WC 2026 Prediction Pool
                                </h1>
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                  Static Client
                </span>
                            </div>
                            <p className="text-xs text-slate-500">Elegant tournament predictor & leaderboard</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">

                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>URL Code Packing Enabled</span>
                        </div>

                        {/* Profile Dropdown switcher */}
                        {friendsList.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label className="text-xs text-slate-500 font-semibold hidden sm:inline">Active User:</label>
                                <select
                                    value={selectedFriendId}
                                    onChange={(e) => setSelectedFriendId(e.target.value)}
                                    className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-1.5 font-bold shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    {friendsList.map(friend => (
                                        <option key={friend.id} value={friend.id}>
                                            👤 {friend.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button
                            onClick={handleToggleAdminMode}
                            className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-lg border transition-all ${
                                isAdminMode
                                    ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                            }`}
                        >
                            {isAdminMode ? <Unlock className="w-3.5 h-3.5 text-amber-600" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
                            <span>{isAdminMode ? 'Exit Admin Mode' : 'Admin Portal'}</span>
                        </button>

                    </div>
                </div>
            </header>

            {/* Toast Notification */}
            {notification && (
                <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-white border border-slate-200 text-slate-800 px-4 py-3.5 rounded-xl shadow-xl max-w-sm animate-fade-in">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-xs font-bold leading-relaxed">{notification.text}</span>
                </div>
            )}

            {/* Main Layout Container */}
            <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 flex flex-col gap-6">

                {/* Costin Verification Screen modal */}
                {showAdminPasswordPrompt && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                            <div className="flex items-center gap-3 text-amber-600 mb-4">
                                <AlertCircle className="w-6 h-6 shrink-0" />
                                <h3 className="font-extrabold text-lg">Admin Authentication</h3>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                Please provide your secure administrator passkey to activate master outcome simulation controls.
                            </p>
                            <div className="flex flex-col gap-1.5 mb-4">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Secret Verification Key</label>
                                <div className="relative">
                                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                    <input
                                        type="password"
                                        placeholder="Enter passkey..."
                                        value={adminPasswordInput}
                                        onChange={(e) => setAdminPasswordInput(e.target.value)}
                                        className="bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 w-full text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => {
                                        setShowAdminPasswordPrompt(false);
                                        setAdminPasswordInput('');
                                    }}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={verifyAdminPassword}
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                                >
                                    Unlock Admin
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* CUSTOM SECURE REMOVE USER CONFIRMATION MODAL */}
                {userToDelete && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
                            <div className="p-3 bg-red-50 text-red-650 rounded-2xl max-w-max mb-4">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>

                            <h3 className="font-extrabold text-lg text-slate-950">Remove Pool Entry?</h3>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                Are you absolutely sure you want to permanently delete competitor <strong className="text-red-600 font-bold">{userToDelete.name}</strong> (<code className="text-[11px] font-mono text-slate-600 bg-slate-50 px-1 py-0.5 rounded">{userToDelete.email}</code>)?
                            </p>
                            <p className="text-[10px] text-slate-400 mt-2 leading-normal">
                                ⚠️ This will instantly purge all of their scoreline predictions. This action is irreversible.
                            </p>

                            <div className="flex gap-2.5 mt-6">
                                <button
                                    onClick={() => setUserToDelete(null)}
                                    className="bg-slate-100 hover:bg-slate-200 text-xs font-bold py-3 text-slate-600 rounded-xl w-full transition-colors"
                                >
                                    Keep Profile
                                </button>
                                <button
                                    onClick={handleExecuteDeleteUser}
                                    className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-3 rounded-xl w-full text-center transition-colors shadow-sm"
                                >
                                    Yes, Delete Teammate
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* HEAD-TO-HEAD READ-ONLY PREDICTIONS COMPARISON PANEL */}
                {comparisonTargetFriend && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative flex flex-col max-h-[85vh] overflow-hidden">

                            <button
                                onClick={() => setComparisonTargetFriend(null)}
                                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="border-b border-slate-100 pb-4 mb-4">
                                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest block mb-0.5">Competitor Slate comparison</span>
                                <h3 className="text-lg font-black text-slate-900 flex flex-wrap items-center gap-2">
                                    <span>{selectedFriend ? selectedFriend.name : 'You'}</span>
                                    <span className="text-slate-400 text-xs font-semibold">vs</span>
                                    <span className="text-emerald-700">{comparisonTargetFriend.name}</span>
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    View how {comparisonTargetFriend.name}&apos;s predictions differ from yours, match-by-match.
                                </p>
                            </div>

                            {/* Scrollable matchup container */}
                            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 py-1">
                                {[...groupMatches, ...knockoutMatches].map(match => {
                                    const isKo = match.stage !== 'group';
                                    const activePred = selectedFriend?.predictions?.[match.id] || { home: '-', away: '-' };
                                    const comparisonPred = comparisonTargetFriend.predictions?.[match.id] || { home: '-', away: '-' };
                                    const actual = realResults[match.id] || { home: null, away: null, finished: false };

                                    const activeScoreDetails = calculatePoints(activePred, actual);
                                    const targetScoreDetails = calculatePoints(comparisonPred, actual);

                                    return (
                                        <div key={match.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shadow-xs">

                                            {/* Left: Match Metadata */}
                                            <div className="w-full sm:w-1/3 flex flex-col justify-center">
                        <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">
                          {isKo ? `${match.stage.toUpperCase()}` : `Group ${match.group}`}
                        </span>
                                                <span className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5 mt-0.5">
                          <Flag team={isKo ? match.defaultHome : match.home} className="w-4 h-3 rounded-xs" />
                          <span className="truncate max-w-[80px]">{isKo ? match.defaultHome : match.home}</span>
                          <span className="text-slate-400 text-[10px] font-normal">v</span>
                          <Flag team={isKo ? match.defaultAway : match.away} className="w-4 h-3 rounded-xs" />
                          <span className="truncate max-w-[80px]">{isKo ? match.defaultAway : match.away}</span>
                        </span>
                                            </div>

                                            {/* Middle: Prediction Comparison side-by-side */}
                                            <div className="flex-1 grid grid-cols-3 items-center gap-2 text-center bg-white border border-slate-100 p-2.5 rounded-xl">

                                                {/* Active competitor guess */}
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[9px] text-slate-400 font-bold block mb-0.5">You</span>
                                                    <span className="font-extrabold text-xs text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-150">
                            {activePred.home === undefined || activePred.home === '-' ? '-' : activePred.home} - {activePred.away === undefined || activePred.away === '-' ? '-' : activePred.away}
                          </span>
                                                    {actual.finished && (
                                                        <span className="text-[9px] text-slate-400 font-bold mt-1">+{activeScoreDetails.points}pts</span>
                                                    )}
                                                </div>

                                                {/* Actual Score column */}
                                                <div className="flex flex-col items-center justify-center border-x border-slate-100">
                                                    <span className="text-[9px] text-slate-400 font-bold block mb-0.5">Actual</span>
                                                    {actual.finished ? (
                                                        <span className="font-black text-xs text-emerald-700">
                              {actual.home} - {actual.away}
                            </span>
                                                    ) : (
                                                        <span className="text-xs text-slate-400 font-medium">TBD</span>
                                                    )}
                                                </div>

                                                {/* Friend's guess */}
                                                <div className="flex flex-col items-center">
                          <span className="text-[9px] text-slate-400 font-bold block truncate max-w-[70px] mb-0.5">
                            {comparisonTargetFriend.name}
                          </span>
                                                    <span className="font-extrabold text-xs text-slate-900 bg-emerald-50/50 border border-emerald-100 px-2 py-0.5 rounded">
                            {comparisonPred.home === undefined || comparisonPred.home === '-' ? '-' : comparisonPred.home} - {comparisonPred.away === undefined || comparisonPred.away === '-' ? '-' : comparisonPred.away}
                          </span>
                                                    {actual.finished && (
                                                        <span className="text-[9px] text-emerald-600 font-bold mt-1">+{targetScoreDetails.points}pts</span>
                                                    )}
                                                </div>

                                            </div>

                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between items-center text-xs text-slate-400">
                                <span>Pool Scoring Rules apply.</span>
                                <button
                                    onClick={() => setComparisonTargetFriend(null)}
                                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl transition-colors shadow-xs"
                                >
                                    Close Compare
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {/* Dynamic Warning for Admin actions */}
                {isAdminMode && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 shadow-xs">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-800">
                            <p className="font-bold uppercase tracking-wider">Verified Administrator Mode is Active</p>
                            <p className="mt-1">
                                You are currently setting the **Actual World Cup match scorelines**. Any score changed in the console below will dynamically recalculate the competitor rankings on the Standings Board.
                            </p>
                        </div>
                    </div>
                )}

                {/* REGISTER & ONBOARDING SYSTEM */}
                {friendsList.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl mx-auto w-full text-center shadow-md my-6">
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl max-w-max mx-auto mb-6 shadow-xs">
                            <Trophy className="w-10 h-10" />
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            Initialize WC 2026 Pool
                        </h2>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Welcome to the World Cup prediction simulator! Start by registering your prediction profile below.
                        </p>

                        <form onSubmit={handleRegisterSubmit} className="mt-6 text-left flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Your Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Costin or Daniel"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="name@domain.com"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-xl w-full flex items-center justify-center gap-2 mt-2 transition-all shadow-sm"
                            >
                                <LogIn className="w-4 h-4 text-white" />
                                <span>Register Predictor Entry</span>
                            </button>
                        </form>
                    </div>
                ) : (
                    /* MAIN SITE CONTENT */
                    <>

                        {/* NEW MEMBER SIGNUP PANEL */}
                        <section className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs">
                            <div className="flex-1">
                                <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 text-emerald-600" />
                                    Add Friend Predictor Profile
                                </h2>
                                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                                    Allow your friends to join the pool. Once registered, they must activate their entry with the code generated in the simulated inbox.
                                </p>
                            </div>

                            <form onSubmit={handleRegisterSubmit} className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Friend&apos;s Name..."
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <input
                                    type="email"
                                    placeholder="Friend&apos;s Email..."
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 w-full sm:w-44 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1 shrink-0 transition-all shadow-xs"
                                >
                                    <span>Sign Up</span>
                                </button>
                            </form>
                        </section>

                        {/* TAB SYSTEM NAVIGATION */}
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-slate-200 pb-2">

                            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 max-w-max self-start shadow-inner">
                                <button
                                    onClick={() => setActiveTab('predictions')}
                                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                        activeTab === 'predictions'
                                            ? 'bg-white text-emerald-700 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    <Compass className="w-4 h-4" />
                                    Prediction Center
                                </button>
                                <button
                                    onClick={() => setActiveTab('leaderboard')}
                                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                        activeTab === 'leaderboard'
                                            ? 'bg-white text-emerald-700 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    <Award className="w-4 h-4" />
                                    Live Leaderboard
                                </button>
                                <button
                                    onClick={() => setActiveTab('bracket')}
                                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                        activeTab === 'bracket'
                                            ? 'bg-white text-emerald-700 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    <Trophy className="w-4 h-4" />
                                    Playoffs Bracket
                                </button>
                            </div>

                            {activeTab === 'predictions' && (
                                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                                    <span className="text-xs text-slate-400 shrink-0 font-medium">Filter Stage:</span>
                                    <select
                                        value={groupFilter}
                                        onChange={(e) => setGroupFilter(e.target.value)}
                                        className="bg-white border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    >
                                        <option value="All">All Stages Combined</option>
                                        <option value="group_A">Group A Matches</option>
                                        <option value="group_B">Group B Matches</option>
                                        <option value="group_C">Group C Matches</option>
                                        <option value="group_D">Group D Matches</option>
                                        <option value="group_E">Group E Matches</option>
                                        <option value="group_F">Group F Matches</option>
                                        <option value="group_G">Group G Matches</option>
                                        <option value="group_H">Group H Matches</option>
                                        <option value="group_I">Group I Matches</option>
                                        <option value="group_J">Group J Matches</option>
                                        <option value="group_K">Group K Matches</option>
                                        <option value="group_L">Group L Matches</option>
                                        <option value="knockouts">Playoffs (Round of 32 onwards)</option>
                                    </select>

                                    <button
                                        onClick={handleRandomizeCurrentPredictions}
                                        title="Automatically fill in random predictions"
                                        className="p-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-colors shrink-0"
                                    >
                                        <Shuffle className="w-3.5 h-3.5" />
                                        <span>Quick Autocomplete</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* TAB SECTION: PREDICTIONS PANEL */}
                        {activeTab === 'predictions' && (
                            <div className="flex flex-col gap-6">

                                {/* Info Guide Sheet */}
                                <section className="bg-white border border-slate-200 p-4 rounded-xl flex items-start gap-3 shadow-xs">
                                    <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <div className="text-xs text-slate-600 font-medium">
                                        <span className="font-bold text-slate-800 block">🏆 Scoring System Cheat-Sheet:</span>
                                        <span className="mt-1 block leading-relaxed">
                      Earn **7 pts** for an exact score match (e.g., predicted 2-1, final 2-1).
                      Earn **4 pts** for correct outcome and correct goal difference (e.g. predicted 3-1, final 2-0).
                      Earn **3 pts** for guessing just the winner or draw.
                      Earn **1 pt** bonus if you get one team score right but fail the outcome!
                    </span>
                                    </div>
                                </section>

                                {/* Selected active user dashboard detail with URL packing / sharing capability */}
                                {selectedFriend ? (
                                    <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col gap-4 shadow-xs">

                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <span className="text-xs text-emerald-600 font-extrabold uppercase tracking-wider block">Active Pool Entry</span>
                                                <h3 className="text-lg font-black text-slate-900 font-sans">
                                                    {selectedFriend.name + "'s Board"}
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-0.5">{selectedFriend.email}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {/* URL PACK SHARE BUTTONS */}
                                                <button
                                                    onClick={() => handleCopyText(activeUserShareLink, "Copy Packed Invitation Link! Share it with friends.")}
                                                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-xs"
                                                    title="Generates a customized browser link containing all your current scoreline predictions inside the URL itself!"
                                                >
                                                    <Share2 className="w-4 h-4" />
                                                    <span>Copy Invite Link (URL Packing)</span>
                                                </button>

                                                <button
                                                    onClick={() => setShowManualImportField(!showManualImportField)}
                                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-xs"
                                                >
                                                    <FileUp className="w-4 h-4" />
                                                    <span>Import Share Code</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Manual Import State */}
                                        {showManualImportField && (
                                            <form onSubmit={handleManualShareCodeImport} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-2.5 animate-fade-in shadow-inner">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paste Friend&apos;s Packed Base64 Hash</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Paste share code string here..."
                                                        value={manualShareCode}
                                                        onChange={(e) => setManualShareCode(e.target.value)}
                                                        className="bg-white border border-slate-200 text-xs text-slate-800 px-3.5 py-2 rounded-lg flex-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2 rounded-lg transition-colors shadow-sm"
                                                    >
                                                        Unpack & Load
                                                    </button>
                                                </div>
                                            </form>
                                        )}

                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-500 shadow-inner">
                                            <div>
                                                <span>Current scoreline progress: </span>
                                                <strong className="text-emerald-700 font-extrabold">{Object.keys(selectedFriend.predictions).length} / 33 matches predicted</strong>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-400">Your Packed Raw Hash:</span>
                                                <code className="bg-white text-amber-700 px-2 py-0.5 rounded font-mono truncate max-w-[200px]" title={activeUserShareCode}>
                                                    {activeUserShareCode || 'None'}
                                                </code>
                                                {activeUserShareCode && (
                                                    <button
                                                        onClick={() => handleCopyText(activeUserShareCode, "Share code copied!")}
                                                        className="text-slate-500 hover:text-slate-800 transition-colors"
                                                    >
                                                        <Copy className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 shadow-xs">
                                        No active user selected! Create a profile above or choose one from the selector header.
                                    </div>
                                )}

                                {/* Match Cards List */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[...groupMatches, ...knockoutMatches]
                                        .filter(match => {
                                            if (groupFilter === 'All') return true;
                                            if (groupFilter === 'knockouts') return match.stage !== 'group';
                                            if (groupFilter.startsWith('group_')) {
                                                const g = groupFilter.replace('group_', '');
                                                return match.stage === 'group' && match.group === g;
                                            }
                                            return true;
                                        })
                                        .map(match => {
                                            const prediction = selectedFriend?.predictions?.[match.id] || { home: '', away: '' };
                                            const actual = realResults[match.id] || { home: null, away: null, finished: false };
                                            const scoreDetails = calculatePoints(prediction, actual);

                                            return (
                                                <div
                                                    key={match.id}
                                                    className="bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-all flex flex-col overflow-hidden shadow-xs"
                                                >
                                                    <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                              {match.stage === 'group' ? (
                                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-bold border border-emerald-100">
                                  Group {match.group}
                                </span>
                              ) : (
                                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-bold uppercase border border-amber-100">
                                  {match.stage.toUpperCase()}
                                </span>
                              )}
                            </span>
                                                        <span className="text-slate-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                                                            {match.date}
                            </span>
                                                    </div>

                                                    <div className="p-4 flex flex-col gap-3 justify-center flex-1">

                                                        {/* Team A Line */}
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="flex items-center gap-2 font-bold text-slate-800">
                                                                <Flag team={match.stage === 'group' ? match.home : match.defaultHome} />
                                                                <span className="text-xs truncate max-w-[140px]">
                                  {match.stage === 'group' ? match.home : match.defaultHome}
                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="-"
                                                                    value={prediction.home === undefined ? '' : prediction.home}
                                                                    onChange={(e) => savePrediction(match.id, 'home', e.target.value)}
                                                                    disabled={isAdminMode || !selectedFriendId}
                                                                    className="w-12 h-9 text-center font-extrabold bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40 shadow-inner"
                                                                />

                                                                {actual.finished && (
                                                                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 border border-slate-200 text-amber-600 font-extrabold text-xs rounded-lg shadow-sm">
                                                                        {actual.home}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Team B Line */}
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="flex items-center gap-2 font-bold text-slate-800">
                                                                <Flag team={match.stage === 'group' ? match.away : match.defaultAway} />
                                                                <span className="text-xs truncate max-w-[140px]">
                                  {match.stage === 'group' ? match.away : match.defaultAway}
                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="-"
                                                                    value={prediction.away === undefined ? '' : prediction.away}
                                                                    onChange={(e) => savePrediction(match.id, 'away', e.target.value)}
                                                                    disabled={isAdminMode || !selectedFriendId}
                                                                    className="w-12 h-9 text-center font-extrabold bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40 shadow-inner"
                                                                />

                                                                {actual.finished && (
                                                                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 border border-slate-200 text-amber-600 font-extrabold text-xs rounded-lg shadow-sm">
                                                                        {actual.away}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="px-4 py-2.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">
                              {actual.finished ? (
                                  <span className="text-amber-600 font-bold flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Result Settled
                                </span>
                              ) : (
                                  <span className="text-slate-400 flex items-center gap-1">
                                  <Unlock className="w-3.5 h-3.5" /> Predictions open
                                </span>
                              )}
                            </span>

                                                        {actual.finished && (
                                                            <div className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                                                scoreDetails.points === 7 ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                                                    scoreDetails.points === 4 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                                                        scoreDetails.points === 3 ? 'bg-teal-100 text-teal-800 border border-teal-200' :
                                                                            scoreDetails.points === 1 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                                                                'bg-slate-100 text-slate-400'
                                                            }`}>
                                                                {scoreDetails.reason}
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                            );
                                        })}
                                </div>

                            </div>
                        )}

                        {/* TAB SECTION: LEADERBOARD STANDINGS */}
                        {activeTab === 'leaderboard' && (
                            <div className="flex flex-col gap-6">

                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                                <Award className="w-5 h-5 text-amber-500" />
                                                Pool Standings
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1">Standings scoreline determined using actual locked outcomes and our fair scoring multipliers.</p>
                                        </div>

                                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-800 text-xs">
                                            <span className="text-slate-400">Total participants:</span>
                                            <strong className="text-emerald-700 font-extrabold">{friendsWithScoredPoints.length}</strong>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                            <tr className="border-b border-slate-200 text-xs text-slate-400 font-bold uppercase">
                                                <th className="py-3 px-4 w-16">Rank</th>
                                                <th className="py-3 px-4">Friend</th>
                                                <th className="py-3 px-4 text-center">Exact (7pts)</th>
                                                <th className="py-3 px-4 text-center">Outcome & GD (4pts)</th>
                                                <th className="py-3 px-4 text-center">Outcome Only (3pts)</th>
                                                <th className="py-3 px-4 text-center">Bonuses (1pt)</th>
                                                <th className="py-3 px-4 text-right">Total Score</th>
                                                <th className="py-3 px-4 text-right w-36">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {friendsWithScoredPoints.map((friend, index) => {
                                                const isCurrentUser = friend.id === selectedFriendId;
                                                return (
                                                    <tr
                                                        key={friend.id}
                                                        className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                                                            isCurrentUser ? 'bg-emerald-50/30' : ''
                                                        }`}
                                                    >
                                                        <td className="py-4 px-4 font-bold">
                                                            {index === 0 ? (
                                                                <span className="w-7 h-7 bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center rounded-lg text-sm font-extrabold shadow-xs">🥇</span>
                                                            ) : index === 1 ? (
                                                                <span className="w-7 h-7 bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center rounded-lg text-sm font-extrabold shadow-xs">🥈</span>
                                                            ) : index === 2 ? (
                                                                <span className="w-7 h-7 bg-amber-50 border border-amber-100 text-amber-900 flex items-center justify-center rounded-lg text-sm font-extrabold shadow-xs">🥉</span>
                                                            ) : (
                                                                <span className="text-slate-500 pl-2">{index + 1}</span>
                                                            )}
                                                        </td>
                                                        <td className="py-4 px-4 font-bold">
                                                            <div className="flex flex-col">
                                  <span className="text-slate-800 flex items-center gap-1.5 text-sm">
                                    {friend.name}
                                      {friend.name.toLowerCase() === 'costin' && (
                                          <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-black uppercase shadow-xs">
                                        Admin
                                      </span>
                                      )}
                                  </span>
                                                                <span className="text-[9px] text-slate-500 font-normal">{friend.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4 text-center text-amber-600 font-bold">
                                                            {friend.exactMatches || 0}
                                                        </td>
                                                        <td className="py-4 px-4 text-center text-emerald-600 font-semibold">
                                                            {friend.gdMatches || 0}
                                                        </td>
                                                        <td className="py-4 px-4 text-center text-teal-600">
                                                            {friend.outcomeMatches || 0}
                                                        </td>
                                                        <td className="py-4 px-4 text-center text-blue-600">
                                                            {friend.bonusMatches || 0}
                                                        </td>
                                                        <td className="py-4 px-4 text-right font-extrabold text-slate-900 text-sm">
                                <span className="bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
                                  {friend.totalPoints || 0} pts
                                </span>
                                                        </td>
                                                        {/* ACTION COLUMN FOR VIEWING/DELETING */}
                                                        <td className="py-4 px-4 text-right flex items-center justify-end gap-1.5 font-bold">
                                                            <button
                                                                onClick={() => setComparisonTargetFriend(friend)}
                                                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-bold shadow-xs"
                                                                title={`Compare predictions with ${friend.name}`}
                                                            >
                                                                <Eye className="w-3.5 h-3.5" />
                                                                <span>Compare</span>
                                                            </button>

                                                            {isAdminMode && (
                                                                <button
                                                                    onClick={() => handleRequestRemoveUser(friend)}
                                                                    className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-bold shadow-xs"
                                                                    title={`Purge user ${friend.name}`}
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5 text-red-505" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>
                        )}

                        {/* TAB SECTION: PLAYOFF BRACKET */}
                        {activeTab === 'bracket' && (
                            <div className="flex flex-col gap-6">
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 overflow-x-auto shadow-xs">
                                    <div className="min-w-[900px]">

                                        <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-emerald-600" />
                                            FIFA World Cup 2026 Playoff Path
                                        </h3>
                                        <p className="text-xs text-slate-400 mb-8">
                                            Knockout stages automatically update with advancing seeds as Group matches are finalized.
                                        </p>

                                        {/* Bracket Layout */}
                                        <div className="grid grid-cols-4 gap-6 items-stretch">

                                            {/* Round of 32 */}
                                            <div className="flex flex-col justify-around gap-6">
                                                <div className="text-center font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">Round of 32</div>

                                                {knockoutMatches.filter(m => m.stage === 'r32').map(match => (
                                                    <div key={match.id} className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                                                        <div className="text-[9px] text-slate-400 font-bold uppercase mb-1">{match.date}</div>

                                                        <div className="flex items-center justify-between gap-2 text-xs py-1">
                              <span className="flex items-center gap-1">
                                <Flag team={match.defaultHome} />
                                <span className="truncate max-w-[90px] text-slate-700 font-semibold">{match.defaultHome}</span>
                              </span>
                                                            <span className="font-bold text-emerald-600">{realResults[match.id]?.home ?? '-'}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between gap-2 text-xs py-1 border-t border-slate-100">
                              <span className="flex items-center gap-1">
                                <Flag team={match.defaultAway} />
                                <span className="truncate max-w-[90px] text-slate-700 font-semibold">{match.defaultAway}</span>
                              </span>
                                                            <span className="font-bold text-emerald-600">{realResults[match.id]?.away ?? '-'}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Round of 16 */}
                                            <div className="flex flex-col justify-around gap-12">
                                                <div className="text-center font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">Round of 16</div>

                                                {knockoutMatches.filter(m => m.stage === 'r16').map(match => (
                                                    <div key={match.id} className="bg-white border border-emerald-105 p-3 rounded-xl relative shadow-xs">
                                                        <div className="text-[9px] text-emerald-600 font-bold uppercase mb-1">{match.date}</div>

                                                        <div className="flex items-center justify-between gap-2 text-xs py-1">
                              <span className="flex items-center gap-1">
                                <Flag team={match.defaultHome} />
                                <span className="truncate max-w-[95px] text-slate-700 font-semibold">{match.defaultHome}</span>
                              </span>
                                                            <span className="font-bold text-emerald-600">{realResults[match.id]?.home ?? '-'}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between gap-2 text-xs py-1 border-t border-slate-100">
                              <span className="flex items-center gap-1">
                                <Flag team={match.defaultAway} />
                                <span className="truncate max-w-[95px] text-slate-700 font-semibold">{match.defaultAway}</span>
                              </span>
                                                            <span className="font-bold text-emerald-600">{realResults[match.id]?.away ?? '-'}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Quarter & Semifinals */}
                                            <div className="flex flex-col justify-around gap-20">
                                                <div>
                                                    <div className="text-center font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">Quarter-Finals</div>
                                                    {knockoutMatches.filter(m => m.stage === 'qf').map(match => (
                                                        <div key={match.id} className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                                                            <div className="text-[9px] text-slate-400 font-bold uppercase mb-1">{match.date}</div>

                                                            <div className="flex items-center justify-between gap-2 text-xs py-1">
                                <span className="flex items-center gap-1">
                                  <Flag team={match.defaultHome} />
                                  <span className="truncate max-w-[95px] text-slate-700 font-semibold">{match.defaultHome}</span>
                                </span>
                                                                <span className="font-bold text-emerald-600">{realResults[match.id]?.home ?? '-'}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between gap-2 text-xs py-1 border-t border-slate-100">
                                <span className="flex items-center gap-1">
                                  <Flag team={match.defaultAway} />
                                  <span className="truncate max-w-[95px] text-slate-700 font-semibold">{match.defaultAway}</span>
                                </span>
                                                                <span className="font-bold text-emerald-600">{realResults[match.id]?.away ?? '-'}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div>
                                                    <div className="text-center font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">Semi-Finals</div>
                                                    {knockoutMatches.filter(m => m.stage === 'sf').map(match => (
                                                        <div key={match.id} className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                                                            <div className="text-[9px] text-slate-400 font-bold uppercase mb-1">{match.date}</div>

                                                            <div className="flex items-center justify-between gap-2 text-xs py-1">
                                <span className="flex items-center gap-1">
                                  <Flag team={match.defaultHome} />
                                  <span className="truncate max-w-[95px] text-slate-700 font-semibold">{match.defaultHome}</span>
                                </span>
                                                                <span className="font-bold text-emerald-600">{realResults[match.id]?.home ?? '-'}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between gap-2 text-xs py-1 border-t border-slate-100">
                                <span className="flex items-center gap-1">
                                  <Flag team={match.defaultAway} />
                                  <span className="truncate max-w-[95px] text-slate-700 font-semibold">{match.defaultAway}</span>
                                </span>
                                                                <span className="font-bold text-emerald-600">{realResults[match.id]?.away ?? '-'}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Grande Final */}
                                            <div className="flex flex-col justify-center gap-4">
                                                <div className="text-center font-bold text-xs uppercase text-amber-600 tracking-wider mb-2 flex items-center justify-center gap-1">
                                                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                                                    World Cup Final
                                                </div>

                                                {knockoutMatches.filter(m => m.stage === 'final').map(match => (
                                                    <div key={match.id} className="bg-white border-2 border-amber-400 p-4 rounded-2xl shadow-md">
                                                        <div className="text-[10px] text-amber-600 font-bold uppercase mb-2 text-center">{match.date} - MetLife Stadium</div>

                                                        <div className="flex flex-col gap-3 p-1">
                                                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 font-bold text-xs text-slate-800">
                                  <Flag team={match.defaultHome} />
                                  <span>{match.defaultHome}</span>
                                </span>
                                                                <span className="font-extrabold text-amber-500 text-sm">{realResults[match.id]?.home ?? '-'}</span>
                                                            </div>

                                                            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                <span className="flex items-center gap-2 font-bold text-xs text-slate-800">
                                  <Flag team={match.defaultAway} />
                                  <span>{match.defaultAway}</span>
                                </span>
                                                                <span className="font-extrabold text-amber-400 text-md">{realResults[match.id]?.away ?? '-'}</span>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 text-center">
                              <span className="text-[10px] bg-amber-500/10 text-amber-700 border border-amber-205 px-3 py-1 rounded-full font-bold">
                                Championship Match
                              </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB SECTION: VERIFIED MASTER ADMIN CONTROLS */}
                        {isAdminMode && (
                            <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-6 shadow-xs">

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
                                            <Settings className="w-5 h-5" />
                                            Costin&apos;s Results Master Console
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Set actual finished match scores below. Everyone&apos;s scoreboard points will instantly update according to predictions.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={handleSimulateGroupOutcomes}
                                            className="bg-amber-500 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                                        >
                                            <Shuffle className="w-4 h-4 text-slate-955" />
                                            Simulate Random Match Scores
                                        </button>
                                        <button
                                            onClick={() => {
                                                setRealResults({});
                                                localStorage.removeItem('wc_real_scores');
                                                triggerNotification("All settled match outcomes cleared!", "info");
                                            }}
                                            className="bg-slate-800 hover:bg-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 transition-colors"
                                        >
                                            Reset Scorelines
                                        </button>
                                    </div>
                                </div>

                                {/* USER REMOVAL LIST IN MASTER CONSOLE FOR EASIER POOL CLEANUP */}
                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                                    <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Quick Teammate Pool Management (Costin-Only)</h4>
                                    {friendsList.length === 0 ? (
                                        <span className="text-xs text-slate-400">No registered competitors in the pool.</span>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                            {friendsList.map(f => (
                                                <div key={f.id} className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                                                    <div className="truncate pr-2">
                                                        <span className="text-xs font-bold block truncate text-slate-800">{f.name}</span>
                                                        <span className="text-[10px] text-slate-500 block truncate">{f.email}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRequestRemoveUser(f)}
                                                        className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-lg transition-colors inline-flex items-center"
                                                        title={`Purge user ${f.name}`}
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-slate-800 pt-6">
                                    {[...groupMatches, ...knockoutMatches].map(match => {
                                        const res = realResults[match.id] || { home: '', away: '' };
                                        const isKo = match.stage !== 'group';
                                        return (
                                            <div key={match.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col gap-3">
                                                <div className="flex justify-between items-center text-xs text-slate-500">
                          <span className="font-bold">
                            {isKo ? `PLAYOFFS: ${match.stage.toUpperCase()}` : `GROUP ${match.group}`}
                          </span>
                                                    <span>{match.date}</span>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                              <span>{getFlag(isKo ? match.defaultHome : match.home)}</span>
                              <span>{isKo ? match.defaultHome : match.home}</span>
                            </span>
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            value={res.home === undefined ? '' : res.home}
                                                            onChange={(e) => handleSaveRealResult(match.id, 'home', e.target.value)}
                                                            className="w-12 h-8 text-center bg-slate-900 border border-slate-800 rounded-lg text-sm text-amber-400 font-extrabold focus:outline-none focus:ring-1 focus:ring-amber-500"
                                                        />
                                                    </div>

                                                    <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                              <span>{getFlag(isKo ? match.defaultAway : match.away)}</span>
                              <span>{isKo ? match.defaultAway : match.away}</span>
                            </span>
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            value={res.away === undefined ? '' : res.away}
                                                            onChange={(e) => handleSaveRealResult(match.id, 'away', e.target.value)}
                                                            className="w-12 h-8 text-center bg-slate-900 border border-slate-800 rounded-lg text-sm text-amber-400 font-extrabold focus:outline-none focus:ring-1 focus:ring-amber-500"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>

                            </div>
                        )}
                    </>
                )}

                {/* VERIFICATION MODAL FORM COMPONENT */}
                {showActivationModal && pendingUserObj && (
                    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl max-w-max text-emerald-400 mb-4">
                                <Mail className="w-6 h-6" />
                            </div>

                            <h3 className="font-extrabold text-lg text-slate-100">Verification Code Required</h3>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                We have dispatched a simulated activation code to <strong className="text-emerald-400 font-mono">{pendingUserObj.email}</strong>.
                            </p>

                            {/* HIGH FIDELITY SIMULATED INBOX EMBEDDED INSIDE MODAL */}
                            <div className="mt-4 bg-slate-950 border border-slate-800/80 p-4 rounded-xl text-left">
                                <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-2 border-b border-slate-800 pb-2">
                                    <Inbox className="w-3.5 h-3.5" />
                                    <span>Simulated Email Delivery Client</span>
                                </div>
                                <div className="font-mono text-[10px] text-slate-400 leading-relaxed">
                                    <p className="text-slate-500"><strong className="text-slate-400">To:</strong> {pendingUserObj.email}</p>
                                    <p className="text-slate-500"><strong className="text-slate-400">Subject:</strong> Activation Code</p>
                                    <div className="mt-3 text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-slate-850 text-center">
                                        <span className="text-slate-400 text-[10px] block mb-1">Your 6-digit code:</span>
                                        <span className="text-xl font-black tracking-widest text-emerald-400 select-all">
                      {activationCodeSent}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 mt-5">
                                <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">6-Digit Activation Code</label>
                                <input
                                    type="text"
                                    maxLength="6"
                                    placeholder="Enter Code..."
                                    value={enteredActivationCode}
                                    onChange={(e) => setEnteredActivationCode(e.target.value)}
                                    className="bg-slate-950 border border-slate-800 text-lg rounded-xl tracking-widest text-center py-3 text-emerald-400 placeholder:text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                                />
                            </div>

                            <div className="flex gap-2.5 mt-6">
                                <button
                                    onClick={() => {
                                        setShowActivationModal(false);
                                        setPendingUserObj(null);
                                    }}
                                    className="bg-slate-800 hover:bg-slate-700 text-xs font-bold py-3.5 rounded-xl w-full text-slate-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={verifyActivationCode}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs py-3.5 rounded-xl w-full text-center"
                                >
                                    Verify & Activate Entry
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>

            {/* Footer Element */}
            <footer className="border-t border-slate-200 bg-white py-8 px-4 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <span>⚽ 2026 World Cup pool simulator - costin setup</span>
                    </div>
                    <div className="flex gap-4">
                        <a href="#predictions" onClick={() => setActiveTab('predictions')} className="hover:text-slate-300 transition-colors">Predictions</a>
                        <a href="#leaderboard" onClick={() => setActiveTab('leaderboard')} className="hover:text-slate-300 transition-colors">Leaderboard</a>
                        <a href="#rules" onClick={() => triggerNotification("Score: Exact (7pts), Goal diff (4pts), Outcome (3pts), Single team match (1pt).")} className="hover:text-slate-300 transition-colors">Pool Rules</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}