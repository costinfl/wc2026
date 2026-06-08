import React, { useState, useEffect, useMemo } from 'react';
import {
  Trophy,
  Users,
  Settings,
  Check,
  Info,
  Compass,
  Unlock,
  Award,
  Star,
  AlertCircle,
  Database,
  Shuffle,
  Clock,
  UserPlus,
  Mail,
  LogIn,
  KeyRound,
  Inbox,
  Share2,
  Copy,
  FileUp,
  Trash2
} from 'lucide-react';

// Firebase Setup
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged
} from 'firebase/auth';

// 12 groups of World Cup 2026
const TEAMS_BY_GROUP = {
  A: { name: 'Group A', teams: ['Mexico', 'South Africa', 'South Korea', 'Czechia'], flags: { 'Mexico': '🇲🇽', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷', 'Czechia': '🇨🇿' } },
  B: { name: 'Group B', teams: ['Canada', 'Switzerland', 'Qatar', 'Bosnia and Herzegovina'], flags: { 'Canada': '🇨🇦', 'Switzerland': '🇨🇭', 'Qatar': '🇶🇦', 'Bosnia and Herzegovina': '🇧🇦' } },
  C: { name: 'Group C', teams: ['Brazil', 'Morocco', 'Haiti', 'Scotland'], flags: { 'Brazil': '🇧🇷', 'Morocco': '🇲🇦', 'Haiti': '🇭🇹', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿' } },
  D: { name: 'Group D', teams: ['United States', 'Paraguay', 'Australia', 'Türkiye'], flags: { 'United States': '🇺🇸', 'Paraguay': '🇵🇾', 'Australia': '🇦🇺', 'Türkiye': '🇹🇷' } },
  E: { name: 'Group E', teams: ['Germany', 'Curaçao', 'Côte d\'Ivoire', 'Ecuador'], flags: { 'Germany': '🇩🇪', 'Curaçao': '🇨🇼', 'Côte d\'Ivoire': '🇨🇮', 'Ecuador': '🇪🇨' } },
  F: { name: 'Group F', teams: ['Netherlands', 'Japan', 'Tunisia', 'Sweden'], flags: { 'Netherlands': '🇳🇱', 'Japan': '🇯🇵', 'Tunisia': '🇹🇳', 'Sweden': '🇸🇪' } },
  G: { name: 'Group G', teams: ['Belgium', 'Egypt', 'Iran', 'New Zealand'], flags: { 'Belgium': '🇧🇪', 'Egypt': '🇪🇬', 'Iran': '🇮🇷', 'New Zealand': '🇳🇿' } },
  H: { name: 'Group H', teams: ['Spain', 'Cabo Verde', 'Saudi Arabia', 'Uruguay'], flags: { 'Spain': '🇪🇸', 'Cabo Verde': '🇨🇻', 'Saudi Arabia': '🇸🇦', 'Uruguay': '🇺🇾' } },
  I: { name: 'Group I', teams: ['France', 'Senegal', 'Norway', 'Iraq'], flags: { 'France': '🇫🇷', 'Senegal': '🇸🇳', 'Norway': '🇳🇴', 'Iraq': '🇮🇶' } },
  J: { name: 'Group J', teams: ['Argentina', 'Algeria', 'Austria', 'Jordan'], flags: { 'Argentina': '🇦🇷', 'Algeria': '🇩🇿', 'Austria': '🇦🇹', 'Jordan': '🇯🇴' } },
  K: { name: 'Group K', teams: ['Portugal', 'Uzbekistan', 'Colombia', 'Congo DR'], flags: { 'Portugal': '🇵🇹', 'Uzbekistan': '🇺🇿', 'Colombia': '🇨🇴', 'Congo DR': '🇨🇩' } },
  L: { name: 'Group L', teams: ['England', 'Croatia', 'Ghana', 'Panama'], flags: { 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Croatia': '🇭🇷', 'Ghana': '🇬🇭', 'Panama': '🇵🇦' } }
};

const ALL_FLAGS = Object.values(TEAMS_BY_GROUP).reduce((acc, current) => {
  return { ...acc, ...current.flags };
}, {});

const getFlag = (team) => ALL_FLAGS[team] || '🏳️';

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

// Deterministic array mappings for compact URL packing
const COMPACT_INDEX_KEYS = [
  'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11', 'm12',
  'm13', 'm14', 'm15', 'm16', 'm17', 'm18', 'm19', 'm20', 'm21', 'm22', 'm23', 'm24',
  'ko_r32_1', 'ko_r32_2', 'ko_r32_3', 'ko_r32_4', 'ko_r16_1', 'ko_r16_2', 'ko_qf_1', 'ko_sf_1', 'ko_final'
];

// Pack predictions map into high-density Base64 string
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

// Unpack high-density Base64 string back into predictions map
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

// Scoring engine
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

// Global Firebase Instantiations
let appInstance = null;
let authInstance = null;
let dbInstance = null;
const appIdentifier = typeof __app_id !== 'undefined' ? __app_id : 'world-cup-prediction-pool-2026';

if (typeof __firebase_config !== 'undefined' && __firebase_config) {
  try {
    const firebaseConfig = typeof __firebase_config === 'string' ? JSON.parse(__firebase_config) : __firebase_config;
    appInstance = initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
    dbInstance = getFirestore(appInstance);
  } catch (err) {
    console.error("Firebase startup failure:", err);
  }
}

export default function App() {
  const [user, setUser] = useState(null);
  const [dbStatus, setDbStatus] = useState('offline');

  // Friends & Standings - Default empty slate
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState('');

  const [groupMatches, setGroupMatches] = useState(INITIAL_GROUP_MATCHES);
  const [knockoutMatches, setKnockoutMatches] = useState(INITIAL_KNOCKOUT_MATCHES);
  const [realResults, setRealResults] = useState({});

  // UI Panels
  const [activeTab, setActiveTab] = useState('predictions');
  const [groupFilter, setGroupFilter] = useState('All');
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

  // Currently focused predicting user
  const selectedFriend = useMemo(() => {
    return friendsList.find(f => f.id === selectedFriendId) || null;
  }, [friendsList, selectedFriendId]);

  // Toast Notification
  const triggerNotification = (message, type = 'success') => {
    setNotification({ text: message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Safe clipboard copying with iframe fallback
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

  // Helper: Persist local browser backup
  const saveLocalUsersState = (updatedList) => {
    if (dbStatus !== 'online') {
      try {
        localStorage.setItem('wc_users', JSON.stringify(updatedList));
      } catch (err) {
        console.error("Local storage save failed", err);
      }
    }
  };

  // EFFECT 1: Handle URL Parameters Auto-Import AND Auth Initialization
  useEffect(() => {
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

      setFriendsList(prev => {
        const alreadyExists = prev.some(f => f.name.toLowerCase() === importedUser.name.toLowerCase() || f.email.toLowerCase() === importedUser.email.toLowerCase());
        if (!alreadyExists) {
          const updated = [...prev, importedUser];
          saveLocalUsersState(updated);

          if (dbInstance && authInstance?.currentUser) {
            const userRef = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'users', importedId);
            setDoc(userRef, importedUser).catch(console.error);
          }
          return updated;
        }
        return prev;
      });

      setSelectedFriendId(importedId);
      triggerNotification(`Teammate "${importedUser.name}" imported with custom prediction slate!`, "success");

      try {
        const cleanURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanURL }, '', cleanURL);
      } catch (e) {
        console.error(e);
      }
    }

    if (authInstance) {
      const initAuth = async () => {
        try {
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(authInstance, __initial_auth_token);
          } else {
            await signInAnonymously(authInstance);
          }
        } catch (err) {
          console.error("Auth process error:", err);
        }
      };
      initAuth();

      const unsubscribe = onAuthStateChanged(authInstance, (usr) => {
        setUser(usr);
        if (usr) {
          setDbStatus('online');
        } else {
          setDbStatus('offline');
        }
      });
      return () => unsubscribe();
    } else {
      try {
        const localUsers = localStorage.getItem('wc_users');
        const localScores = localStorage.getItem('wc_real_scores');
        if (localUsers) {
          const parsed = JSON.parse(localUsers);
          setFriendsList(parsed);
          if (parsed.length > 0 && !selectedFriendId) {
            setSelectedFriendId(parsed[0].id);
          }
        }
        if (localScores) {
          setRealResults(JSON.parse(localScores));
        }
      } catch (err) {
        console.error("Fallback loaders failed", err);
      }
    }
  }, []);

  // EFFECT 2: Listen for Live Sync Database Updates
  useEffect(() => {
    if (!user || !dbInstance) return;

    const userCol = collection(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'users');
    const unsubscribeUsers = onSnapshot(userCol, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setFriendsList(list);
      setSelectedFriendId(prev => {
        if (prev && list.some(item => item.id === prev)) return prev;
        return list[0]?.id || '';
      });
    }, (err) => {
      console.error("Users sync listener failed:", err);
    });

    const outcomeDoc = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'results', 'global');
    const unsubscribeResults = onSnapshot(outcomeDoc, (snap) => {
      if (snap.exists()) {
        setRealResults(snap.data().scores || {});
      }
    }, (err) => {
      console.error("Outcomes listener failed:", err);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeResults();
    };
  }, [user]);

  // Handle manual code parsing from inputs
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
    saveLocalUsersState(updatedFriends);

    if (dbInstance && dbStatus === 'online' && user) {
      const userRef = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'users', selectedFriendId);
      setDoc(userRef, { predictions: decoded }, { merge: true }).catch(console.error);
    }

    setManualShareCode('');
    setShowManualImportField(false);
    triggerNotification(`Successfully loaded predictions onto ${selectedFriend?.name}'s slate!`);
  };

  // Safe Predict Score change
  const savePrediction = async (matchId, team, scoreVal) => {
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
    saveLocalUsersState(updatedFriends);

    if (dbInstance && dbStatus === 'online' && user) {
      try {
        const targetFriend = updatedFriends.find(f => f.id === selectedFriendId);
        const userRef = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'users', selectedFriendId);
        await setDoc(userRef, {
          name: targetFriend.name,
          email: targetFriend.email,
          predictions: targetFriend.predictions,
          totalPoints: targetFriend.totalPoints || 0
        }, { merge: true });
      } catch (err) {
        console.error("Firestore prediction save failed:", err);
      }
    }
  };

  // Submits registration and fires off simulated inbox code
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

    const newId = 'user_' + Math.random().toString(36).substring(2, 9);
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

  // Verification
  const verifyActivationCode = async () => {
    if (enteredActivationCode.trim() !== activationCodeSent) {
      triggerNotification("Incorrect activation number! Check the Simulated Inbox panel.", "error");
      return;
    }

    const updatedList = [...friendsList, pendingUserObj];
    setFriendsList(updatedList);
    setSelectedFriendId(pendingUserObj.id);
    saveLocalUsersState(updatedList);

    if (dbInstance && dbStatus === 'online' && user) {
      try {
        const userRef = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'users', pendingUserObj.id);
        await setDoc(userRef, pendingUserObj);
      } catch (err) {
        console.error("Failed creating cloud user record:", err);
      }
    }

    setShowActivationModal(false);
    setRegName('');
    setRegEmail('');
    setEnteredActivationCode('');
    setPendingUserObj(null);
    triggerNotification(`Welcome, ${pendingUserObj.name}! Your account has been verified and activated.`);
  };

  // Admin triggers User Removal flow
  const handleRequestRemoveUser = (targetFriend) => {
    if (!isAdminMode) {
      triggerNotification("Access Denied! You must be logged in as verified Admin Costin.", "error");
      return;
    }
    setUserToDelete(targetFriend);
  };

  // Execution of Deletion
  const handleExecuteDeleteUser = async () => {
    if (!userToDelete) return;

    const filtered = friendsList.filter(f => f.id !== userToDelete.id);
    setFriendsList(filtered);
    saveLocalUsersState(filtered);

    // If the active viewed user was deleted, switch focus to first available
    if (selectedFriendId === userToDelete.id) {
      setSelectedFriendId(filtered[0]?.id || '');
    }

    // Trigger Cloud Firestore Document Deletion
    if (dbInstance && dbStatus === 'online' && user) {
      try {
        const userDocRef = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'users', userToDelete.id);
        await deleteDoc(userDocRef);
      } catch (err) {
        console.error("Firestore document deletion failed:", err);
      }
    }

    triggerNotification(`Successfully removed ${userToDelete.name} from the pool.`, "info");
    setUserToDelete(null);
  };

  // Gatekeeper trigger for Costin's admin master panel
  const handleToggleAdminMode = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      triggerNotification("Admin Mode deactivated.", "info");
      return;
    }

    if (!selectedFriend) {
      triggerNotification("Access Denied! Register/Login as 'Costin' first to authenticate admin controls.", "error");
      return;
    }

    const nameIsCostin = selectedFriend.name.toLowerCase() === 'costin';
    const emailIsCostin = selectedFriend.email.toLowerCase().includes('costin');

    if (!nameIsCostin && !emailIsCostin) {
      triggerNotification("Access Denied! Only Costin can unlock the simulation master panel.", "error");
      return;
    }

    setShowAdminPasswordPrompt(true);
  };

  const verifyAdminPassword = () => {
    if (adminPasswordInput.trim() === 'costin2026') {
      setIsAdminMode(true);
      setShowAdminPasswordPrompt(false);
      setAdminPasswordInput('');
      triggerNotification("Admin Mode Activated! Welcome back, Costin.", "success");
    } else {
      triggerNotification("Incorrect admin key!", "error");
    }
  };

  // Admin writes real scoreline
  const handleSaveRealResult = async (matchId, team, scoreVal) => {
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

    if (dbStatus !== 'online') {
      try {
        localStorage.setItem('wc_real_scores', JSON.stringify(updatedResults));
      } catch (err) {
        console.error(err);
      }
    }

    if (dbInstance && dbStatus === 'online' && user) {
      try {
        const resultDoc = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'results', 'global');
        await setDoc(resultDoc, { scores: updatedResults }, { merge: true });
      } catch (err) {
        console.error("Firestore result save failed:", err);
      }
    }
    triggerNotification(`Match score updated and recalculations triggered!`);
  };

  // Admin randomized outcomes
  const handleSimulateGroupOutcomes = async () => {
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

    if (dbStatus !== 'online') {
      try {
        localStorage.setItem('wc_real_scores', JSON.stringify(simulated));
      } catch (e) {
        console.error(e);
      }
    }

    if (dbInstance && dbStatus === 'online' && user) {
      try {
        const resultDoc = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'results', 'global');
        await setDoc(resultDoc, { scores: simulated }, { merge: true });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Autocomplete prediction list randomly
  const handleRandomizeCurrentPredictions = () => {
    if (!selectedFriend) {
      triggerNotification("Register or log in a user profile first!", "error");
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
    saveLocalUsersState(updatedFriends);
    triggerNotification(`Randomized predictions for ${selectedFriend.name}!`);

    if (dbInstance && dbStatus === 'online' && user) {
      const userRef = doc(dbInstance, 'artifacts', appIdentifier, 'public', 'data', 'users', selectedFriendId);
      setDoc(userRef, { predictions: randomizedPreds }, { merge: true }).catch(console.error);
    }
  };

  // Standings score calculator
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

  // Generate complete invite link for active competitor
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
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">

        {/* Header element */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-xl text-slate-950 shadow-lg shadow-amber-500/10">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                    WC 2026 Prediction Pool
                  </h1>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-800 text-emerald-400 rounded-full border border-slate-700">
                  Pack Persistence v2.5
                </span>
                </div>
                <p className="text-xs text-slate-400">Collaborative prediction dashboard</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg text-xs border border-slate-700">
                <Database className={`w-3.5 h-3.5 ${dbStatus === 'online' ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span>
                {dbStatus === 'online' ? 'Live Synced' : 'Database Offline'}
              </span>
              </div>

              {/* Profile Dropdown */}
              {friendsList.length > 0 && (
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400 font-medium hidden sm:inline">Active Profile:</label>
                    <select
                        value={selectedFriendId}
                        onChange={(e) => setSelectedFriendId(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-1.5 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-slate-900 transition-colors"
                    >
                      {friendsList.map(friend => (
                          <option key={friend.id} value={friend.id}>
                            👤 {friend.name} ({friend.name.toLowerCase() === 'costin' ? 'Admin' : 'Competitor'})
                          </option>
                      ))}
                    </select>
                  </div>
              )}

              <button
                  onClick={handleToggleAdminMode}
                  className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-lg border transition-all ${
                      isAdminMode
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/5'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{isAdminMode ? 'Exit Admin Mode' : 'Costin Admin Master'}</span>
              </button>

            </div>
          </div>
        </header>

        {/* Floating Alert Notifications */}
        {notification && (
            <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-slate-900 border border-emerald-500/30 text-emerald-100 px-4 py-3.5 rounded-xl shadow-2xl max-w-sm">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold leading-relaxed">{notification.text}</span>
            </div>
        )}

        {/* Main Layout Container */}
        <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 flex flex-col gap-6">

          {/* Costin Verification Screen modal */}
          {showAdminPasswordPrompt && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                  <div className="flex items-center gap-3 text-amber-400 mb-4">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <h3 className="font-extrabold text-lg">Costin Identity Verification</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    You are switching the system into master Admin Mode. To prevent bypass, please provide Costin's administrator verify key.
                  </p>
                  <div className="flex flex-col gap-1 mb-4">
                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Secret Verification Key</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                          type="password"
                          placeholder="Enter admin password..."
                          value={adminPasswordInput}
                          onChange={(e) => setAdminPasswordInput(e.target.value)}
                          className="bg-slate-950 border border-slate-800 text-sm rounded-xl pl-10 pr-4 py-2.5 w-full text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">Hint: Use the administrator setup key <code className="text-amber-400 bg-slate-950 px-1 py-0.5 rounded font-mono">costin2026</code> to verify Costin.</span>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => {
                          setShowAdminPasswordPrompt(false);
                          setAdminPasswordInput('');
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                    >
                      Cancel Access
                    </button>
                    <button
                        onClick={verifyAdminPassword}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl"
                    >
                      Verify Key
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* CUSTOM SECURE REMOVE USER CONFIRMATION MODAL */}
          {userToDelete && (
              <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-slate-900 border-2 border-red-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
                  <div className="p-3 bg-red-500/10 rounded-2xl max-w-max text-red-500 mb-4">
                    <Trash2 className="w-6 h-6" />
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-100">Remove Pool Entry?</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Are you absolutely sure you want to permanently delete teammate <strong className="text-red-400 font-bold">{userToDelete.name}</strong> (<code className="text-[11px] font-mono text-slate-300">{userToDelete.email}</code>) from the active pool?
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2 leading-normal">
                    ⚠️ This will instantly purge all of their 33 match scoreline predictions. This action is irreversible.
                  </p>

                  <div className="flex gap-2.5 mt-6">
                    <button
                        onClick={() => setUserToDelete(null)}
                        className="bg-slate-800 hover:bg-slate-700 text-xs font-bold py-3 text-slate-300 rounded-xl w-full"
                    >
                      Keep Competitor
                    </button>
                    <button
                        onClick={handleExecuteDeleteUser}
                        className="bg-red-600 hover:bg-red-500 text-slate-100 font-extrabold text-xs py-3 rounded-xl w-full text-center"
                    >
                      Yes, Remove User
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Dynamic Warning for Admin actions */}
          {isAdminMode && (
              <div className="bg-amber-950/20 border border-amber-800/60 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-300">
                  <p className="font-bold uppercase tracking-wider">Verified Administrator Mode is Active</p>
                  <p className="mt-1">
                    You are currently setting the <strong>Actual Matches results</strong>. Any score you change below will immediately become the official score, recalculating everyone's leaderboard points in real-time. Use this to simulate real world matches!
                  </p>
                </div>
              </div>
          )}

          {/* REGISTER & ONBOARDING SYSTEM */}
          {friendsList.length === 0 ? (
              <div className="bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 max-w-xl mx-auto w-full text-center shadow-xl my-6">
                <div className="p-4 bg-emerald-500/10 rounded-2xl max-w-max mx-auto text-emerald-400 mb-6">
                  <Trophy className="w-10 h-10" />
                </div>

                <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent tracking-tight">
                  Initialize WC 2026 Pool
                </h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Welcome to the World Cup simulator dashboard! The pool has been initialized clean. Be the first to join by registering your prediction profile below.
                </p>

                <form onSubmit={handleRegisterSubmit} className="mt-6 text-left flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Your Full Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Costin or Daniel"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-sm rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Email Address</label>
                    <input
                        type="email"
                        placeholder="name@domain.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-sm rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                    />
                  </div>

                  <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm py-3.5 rounded-xl w-full flex items-center justify-center gap-2 mt-2 transition-all shadow-lg shadow-emerald-900/20"
                  >
                    <LogIn className="w-4 h-4 text-slate-950" />
                    <span>Register Predictor Entry</span>
                  </button>
                </form>

                <div className="mt-4 text-[10px] text-slate-500 leading-normal">
                  🔒 After registration, you will receive an activation code simulated to your email to confirm the entry.
                </div>
              </div>
          ) : (
              /* MAIN SITE CONTENT */
              <>

                {/* NEW MEMBER SIGNUP PANEL */}
                <section className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex-1">
                    <h2 className="text-sm font-extrabold text-slate-200 flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-emerald-400" />
                      Add Friend Predictor Profile
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                      Allow your friends to join the pool. Once registered, they must activate their entry with the code generated in the simulated inbox.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Friend's Name..."
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                        type="email"
                        placeholder="Friend's Email..."
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 w-full sm:w-44 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1 shrink-0 transition-all shadow-md shadow-emerald-500/5"
                    >
                      <span>Sign Up</span>
                    </button>
                  </form>
                </section>

                {/* TAB SYSTEM NAVIGATION */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-slate-800 pb-2">

                  <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 max-w-max self-start">
                    <button
                        onClick={() => setActiveTab('predictions')}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                            activeTab === 'predictions'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                      <Compass className="w-4 h-4" />
                      Prediction Center
                    </button>
                    <button
                        onClick={() => setActiveTab('leaderboard')}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                            activeTab === 'leaderboard'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                      <Award className="w-4 h-4" />
                      Live Leaderboard
                    </button>
                    <button
                        onClick={() => setActiveTab('bracket')}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                            activeTab === 'bracket'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow'
                                : 'text-slate-400 hover:text-slate-200'
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
                            className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-colors shrink-0"
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
                      <section className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl flex items-start gap-3">
                        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-slate-300">
                          <span className="font-bold text-slate-100 block">🏆 Scoring System Cheat-Sheet:</span>
                          <span className="mt-1 block leading-relaxed">
                      Earn <strong className="text-amber-400">7 pts</strong> for an exact score match (e.g., predicted 2-1, final 2-1).
                      Earn <strong className="text-emerald-400">4 pts</strong> for correct outcome and correct goal difference (e.g. predicted 3-1, final 2-0).
                      Earn <strong className="text-teal-400">3 pts</strong> for guessing just the winner or draw.
                      Earn <strong className="text-indigo-400">1 pt</strong> bonus if you get one team score right but fail the outcome!
                    </span>
                        </div>
                      </section>

                      {/* Selected active user dashboard detail with URL packing / sharing capability */}
                      {selectedFriend ? (
                          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <span className="text-xs text-emerald-400 font-extrabold uppercase tracking-wider block">Active Pool Entry</span>
                                <h3 className="text-lg font-black text-slate-100">
                                  {selectedFriend.name}'s Simulator Board
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">{selectedFriend.email}</p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {/* URL PACK SHARE BUTTONS */}
                                <button
                                    onClick={() => handleCopyText(activeUserShareLink, "Copy Packed Invitation Link! Share it with friends.")}
                                    className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all"
                                    title="Generates a customized browser link containing all your current scoreline predictions inside the URL itself!"
                                >
                                  <Share2 className="w-4 h-4" />
                                  <span>Copy Invite Link (URL Packing)</span>
                                </button>

                                <button
                                    onClick={() => setShowManualImportField(!showManualImportField)}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all"
                                >
                                  <FileUp className="w-4 h-4" />
                                  <span>Import Share Code</span>
                                </button>
                              </div>
                            </div>

                            {/* Manual Import State */}
                            {showManualImportField && (
                                <form onSubmit={handleManualShareCodeImport} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col gap-2.5 animate-fade-in">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paste Friend's Packed Base64 Hash</label>
                                  <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Paste share code string here..."
                                        value={manualShareCode}
                                        onChange={(e) => setManualShareCode(e.target.value)}
                                        className="bg-slate-900 border border-slate-800 text-xs text-slate-200 px-3.5 py-2 rounded-lg flex-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-lg transition-colors"
                                    >
                                      Unpack & Load
                                    </button>
                                  </div>
                                </form>
                            )}

                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-400">
                              <div>
                                <span>Current scoreline progress: </span>
                                <strong className="text-emerald-400">{Object.keys(selectedFriend.predictions).length} / 33 matches predicted</strong>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500">Your Packed Raw Hash:</span>
                                <code className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded font-mono truncate max-w-[200px]" title={activeUserShareCode}>
                                  {activeUserShareCode || 'None'}
                                </code>
                                {activeUserShareCode && (
                                    <button
                                        onClick={() => handleCopyText(activeUserShareCode, "Share code copied!")}
                                        className="text-slate-300 hover:text-slate-100"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                    </button>
                                )}
                              </div>
                            </div>

                          </div>
                      ) : (
                          <div className="bg-amber-950/20 border border-amber-800/40 p-4 rounded-xl text-xs text-amber-300">
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
                                      className="bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-750 transition-all flex flex-col overflow-hidden"
                                  >
                                    <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
                              {match.stage === 'group' ? (
                                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-bold">
                                  Group {match.group}
                                </span>
                              ) : (
                                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full font-bold uppercase">
                                  {match.stage.toUpperCase()}
                                </span>
                              )}
                            </span>
                                      <span className="text-slate-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                                        {match.date}
                            </span>
                                    </div>

                                    <div className="p-4 flex flex-col gap-3 justify-center flex-1">

                                      {/* Team A Line */}
                                      <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 font-bold text-slate-200">
                                          <span className="text-2xl">{getFlag(match.stage === 'group' ? match.home : match.defaultHome)}</span>
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
                                              className="w-12 h-9 text-center font-extrabold bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40"
                                          />

                                          {actual.finished && (
                                              <div className="w-8 h-8 flex items-center justify-center bg-slate-800 border border-slate-700 text-amber-400 font-extrabold text-xs rounded-lg">
                                                {actual.home}
                                              </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Team B Line */}
                                      <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 font-bold text-slate-200">
                                          <span className="text-2xl">{getFlag(match.stage === 'group' ? match.away : match.defaultAway)}</span>
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
                                              className="w-12 h-9 text-center font-extrabold bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40"
                                          />

                                          {actual.finished && (
                                              <div className="w-8 h-8 flex items-center justify-center bg-slate-800 border border-slate-700 text-amber-400 font-extrabold text-xs rounded-lg">
                                                {actual.away}
                                              </div>
                                          )}
                                        </div>
                                      </div>

                                    </div>

                                    <div className="px-4 py-2.5 bg-slate-950/40 border-t border-slate-850 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">
                              {actual.finished ? (
                                  <span className="text-amber-500 font-bold flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Result Settled
                                </span>
                              ) : (
                                  <span className="text-slate-500 flex items-center gap-1">
                                  <Unlock className="w-3.5 h-3.5" /> Predictions open
                                </span>
                              )}
                            </span>

                                      {actual.finished && (
                                          <div className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                              scoreDetails.points === 7 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                                  scoreDetails.points === 4 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                                      scoreDetails.points === 3 ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' :
                                                          scoreDetails.points === 1 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                                              'bg-slate-800 text-slate-505'
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

                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                          <div>
                            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                              <Award className="w-5 h-5 text-amber-400" />
                              Pool Standings
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">Standings scoreline determined using actual locked outcomes and our fair scoring multipliers.</p>
                          </div>

                          <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
                            <span className="text-slate-400">Total participants:</span>
                            <strong className="text-emerald-400">{friendsWithScoredPoints.length}</strong>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="border-b border-slate-800 text-xs text-slate-400 font-bold uppercase">
                              <th className="py-3 px-4 w-16">Rank</th>
                              <th className="py-3 px-4">Friend</th>
                              <th className="py-3 px-4 text-center">Exact (7pts)</th>
                              <th className="py-3 px-4 text-center">Outcome & GD (4pts)</th>
                              <th className="py-3 px-4 text-center">Outcome Only (3pts)</th>
                              <th className="py-3 px-4 text-center">Bonuses (1pt)</th>
                              <th className="py-3 px-4 text-right">Total Score</th>
                              {isAdminMode && <th className="py-3 px-4 text-right w-24">Actions</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {friendsWithScoredPoints.map((friend, index) => {
                              const isCurrentUser = friend.id === selectedFriendId;
                              return (
                                  <tr
                                      key={friend.id}
                                      className={`border-b border-slate-800 hover:bg-slate-800/30 transition-colors ${
                                          isCurrentUser ? 'bg-emerald-950/10' : ''
                                      }`}
                                  >
                                    <td className="py-4 px-4 font-bold">
                                      {index === 0 ? (
                                          <span className="w-7 h-7 bg-amber-500 text-slate-950 flex items-center justify-center rounded-lg text-sm font-extrabold">🥇</span>
                                      ) : index === 1 ? (
                                          <span className="w-7 h-7 bg-slate-300 text-slate-950 flex items-center justify-center rounded-lg text-sm font-extrabold">🥈</span>
                                      ) : index === 2 ? (
                                          <span className="w-7 h-7 bg-amber-700 text-slate-950 flex items-center justify-center rounded-lg text-sm font-extrabold">🥉</span>
                                      ) : (
                                          <span className="text-slate-500 pl-2">{index + 1}</span>
                                      )}
                                    </td>
                                    <td className="py-4 px-4 font-bold">
                                      <div className="flex flex-col">
                                  <span className="text-slate-100 flex items-center gap-1.5 text-sm">
                                    {friend.name}
                                    {friend.name.toLowerCase() === 'costin' && (
                                        <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-black uppercase">
                                        Admin
                                      </span>
                                    )}
                                  </span>
                                        <span className="text-[9px] text-slate-500 font-normal">{friend.email}</span>
                                      </div>
                                    </td>
                                    <td className="py-4 px-4 text-center text-amber-400 font-bold">
                                      {friend.exactMatches || 0}
                                    </td>
                                    <td className="py-4 px-4 text-center text-emerald-400 font-semibold">
                                      {friend.gdMatches || 0}
                                    </td>
                                    <td className="py-4 px-4 text-center text-teal-400">
                                      {friend.outcomeMatches || 0}
                                    </td>
                                    <td className="py-4 px-4 text-center text-blue-400">
                                      {friend.bonusMatches || 0}
                                    </td>
                                    <td className="py-4 px-4 text-right font-extrabold text-slate-100 text-sm">
                                <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                                  {friend.totalPoints || 0} pts
                                </span>
                                    </td>
                                    {/* COSTIN EXCLUSIVE USER REMOVAL COLUMN */}
                                    {isAdminMode && (
                                        <td className="py-4 px-4 text-right">
                                          <button
                                              onClick={() => handleRequestRemoveUser(friend)}
                                              className="p-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-400 hover:text-red-200 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px]"
                                              title={`Purge user ${friend.name}`}
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Remove</span>
                                          </button>
                                        </td>
                                    )}
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
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-x-auto">
                        <div className="min-w-[900px]">

                          <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-emerald-400" />
                            FIFA World Cup 2026 Playoff Path
                          </h3>
                          <p className="text-xs text-slate-400 mb-8">
                            Knockout stages automatically update with advancing seeds as Group matches are finalized.
                          </p>

                          {/* Bracket Layout */}
                          <div className="grid grid-cols-4 gap-6 items-stretch">

                            {/* Round of 32 */}
                            <div className="flex flex-col justify-around gap-6">
                              <div className="text-center font-bold text-xs uppercase text-slate-500 tracking-wider mb-2">Round of 32</div>

                              {knockoutMatches.filter(m => m.stage === 'r32').map(match => (
                                  <div key={match.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-md">
                                    <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">{match.date}</div>

                                    <div className="flex items-center justify-between gap-2 text-xs py-1">
                              <span className="flex items-center gap-1">
                                <span>{getFlag(match.defaultHome)}</span>
                                <span className="truncate max-w-[90px] text-slate-300 font-semibold">{match.defaultHome}</span>
                              </span>
                                      <span className="font-bold text-emerald-400">{realResults[match.id]?.home ?? '-'}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 text-xs py-1 border-t border-slate-900">
                              <span className="flex items-center gap-1">
                                <span>{getFlag(match.defaultAway)}</span>
                                <span className="truncate max-w-[90px] text-slate-300 font-semibold">{match.defaultAway}</span>
                              </span>
                                      <span className="font-bold text-emerald-400">{realResults[match.id]?.away ?? '-'}</span>
                                    </div>
                                  </div>
                              ))}
                            </div>

                            {/* Round of 16 */}
                            <div className="flex flex-col justify-around gap-12">
                              <div className="text-center font-bold text-xs uppercase text-slate-500 tracking-wider mb-2">Round of 16</div>

                              {knockoutMatches.filter(m => m.stage === 'r16').map(match => (
                                  <div key={match.id} className="bg-slate-950 border border-emerald-500/10 p-3 rounded-xl shadow-md relative">
                                    <div className="text-[9px] text-emerald-400 font-bold uppercase mb-1">{match.date}</div>

                                    <div className="flex items-center justify-between gap-2 text-xs py-1">
                              <span className="flex items-center gap-1">
                                <span>{getFlag(match.defaultHome)}</span>
                                <span className="truncate max-w-[95px] text-slate-300 font-semibold">{match.defaultHome}</span>
                              </span>
                                      <span className="font-bold text-emerald-400">{realResults[match.id]?.home ?? '-'}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 text-xs py-1 border-t border-slate-900">
                              <span className="flex items-center gap-1">
                                <span>{getFlag(match.defaultAway)}</span>
                                <span className="truncate max-w-[95px] text-slate-300 font-semibold">{match.defaultAway}</span>
                              </span>
                                      <span className="font-bold text-emerald-400">{realResults[match.id]?.away ?? '-'}</span>
                                    </div>
                                  </div>
                              ))}
                            </div>

                            {/* Quarter & Semifinals */}
                            <div className="flex flex-col justify-around gap-20">
                              <div>
                                <div className="text-center font-bold text-xs uppercase text-slate-500 tracking-wider mb-2">Quarter-Finals</div>
                                {knockoutMatches.filter(m => m.stage === 'qf').map(match => (
                                    <div key={match.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-md">
                                      <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">{match.date}</div>

                                      <div className="flex items-center justify-between gap-2 text-xs py-1">
                                <span className="flex items-center gap-1">
                                  <span>{getFlag(match.defaultHome)}</span>
                                  <span className="truncate max-w-[95px] text-slate-300 font-semibold">{match.defaultHome}</span>
                                </span>
                                        <span className="font-bold text-emerald-400">{realResults[match.id]?.home ?? '-'}</span>
                                      </div>
                                      <div className="flex items-center justify-between gap-2 text-xs py-1 border-t border-slate-900">
                                <span className="flex items-center gap-1">
                                  <span>{getFlag(match.defaultAway)}</span>
                                  <span className="truncate max-w-[95px] text-slate-300 font-semibold">{match.defaultAway}</span>
                                </span>
                                        <span className="font-bold text-emerald-400">{realResults[match.id]?.away ?? '-'}</span>
                                      </div>
                                    </div>
                                ))}
                              </div>

                              <div>
                                <div className="text-center font-bold text-xs uppercase text-slate-500 tracking-wider mb-2">Semi-Finals</div>
                                {knockoutMatches.filter(m => m.stage === 'sf').map(match => (
                                    <div key={match.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-md">
                                      <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">{match.date}</div>

                                      <div className="flex items-center justify-between gap-2 text-xs py-1">
                                <span className="flex items-center gap-1">
                                  <span>{getFlag(match.defaultHome)}</span>
                                  <span className="truncate max-w-[95px] text-slate-300 font-semibold">{match.defaultHome}</span>
                                </span>
                                        <span className="font-bold text-emerald-400">{realResults[match.id]?.home ?? '-'}</span>
                                      </div>
                                      <div className="flex items-center justify-between gap-2 text-xs py-1 border-t border-slate-900">
                                <span className="flex items-center gap-1">
                                  <span>{getFlag(match.defaultAway)}</span>
                                  <span className="truncate max-w-[95px] text-slate-300 font-semibold">{match.defaultAway}</span>
                                </span>
                                        <span className="font-bold text-emerald-400">{realResults[match.id]?.away ?? '-'}</span>
                                      </div>
                                    </div>
                                ))}
                              </div>
                            </div>

                            {/* Grande Final */}
                            <div className="flex flex-col justify-center gap-4">
                              <div className="text-center font-bold text-xs uppercase text-amber-400 tracking-wider mb-2 flex items-center justify-center gap-1">
                                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                                World Cup Final
                              </div>

                              {knockoutMatches.filter(m => m.stage === 'final').map(match => (
                                  <div key={match.id} className="bg-slate-950 border-2 border-amber-500 p-4 rounded-2xl shadow-xl shadow-amber-500/5">
                                    <div className="text-[10px] text-amber-400 font-bold uppercase mb-2 text-center">{match.date} - MetLife Stadium</div>

                                    <div className="flex flex-col gap-3 p-1">
                                      <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 font-bold text-xs text-slate-100">
                                  <span>{getFlag(match.defaultHome)}</span>
                                  <span>{match.defaultHome}</span>
                                </span>
                                        <span className="font-extrabold text-amber-400 text-md">{realResults[match.id]?.home ?? '-'}</span>
                                      </div>

                                      <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                                <span className="flex items-center gap-2 font-bold text-xs text-slate-100">
                                  <span>{getFlag(match.defaultAway)}</span>
                                  <span>{match.defaultAway}</span>
                                </span>
                                        <span className="font-extrabold text-amber-400 text-md">{realResults[match.id]?.away ?? '-'}</span>
                                      </div>
                                    </div>

                                    <div className="mt-4 text-center">
                              <span className="text-[10px] bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full font-bold">
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
                    <div className="bg-slate-900 border border-amber-500/20 p-6 rounded-2xl flex flex-col gap-6">

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Costin's Results Master Console
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Set actual finished match scores below. Everyone's scoreboard points will instantly update according to predictions.
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                              onClick={handleSimulateGroupOutcomes}
                              className="bg-amber-500 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                          >
                            <Shuffle className="w-4 h-4 text-slate-950" />
                            Simulate Random Match Scores
                          </button>
                          <button
                              onClick={() => {
                                setRealResults({});
                                if (dbStatus !== 'online') localStorage.removeItem('wc_real_scores');
                                triggerNotification("All settled match outcomes cleared!", "info");
                              }}
                              className="bg-slate-800 hover:bg-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 transition-colors"
                          >
                            Reset Scorelines
                          </button>
                        </div>
                      </div>

                      {/* USER REMOVAL LIST IN MASTER CONSOLE FOR EASIER POOL CLEANUP */}
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">Quick Teammate Pool Management (Costin-Only)</h4>
                        {friendsList.length === 0 ? (
                            <span className="text-xs text-slate-500">No registered competitors in the pool.</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {friendsList.map(f => (
                                  <div key={f.id} className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                                    <div className="truncate pr-2">
                                      <span className="text-xs font-bold block truncate text-slate-200">{f.name}</span>
                                      <span className="text-[10px] text-slate-500 block truncate">{f.email}</span>
                                    </div>
                                    <button
                                        onClick={() => handleRequestRemoveUser(f)}
                                        className="p-1.5 bg-red-950/30 hover:bg-red-900/60 border border-red-800/40 text-red-400 hover:text-red-200 rounded-lg transition-colors inline-flex items-center"
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

                  {/* HIGH FIDELITY SIMULATED INBOX EMBEDDED INSIDE MODAL TO SOLVE BLURRED BACKDROP BUG */}
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
        <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 mt-auto">
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