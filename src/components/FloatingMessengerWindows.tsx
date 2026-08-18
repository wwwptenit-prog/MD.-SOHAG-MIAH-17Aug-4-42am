import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import {
  X,
  Lock,
  Send,
  Video,
  ExternalLink,
  ShieldCheck,
  Paperclip,
  ThumbsUp,
  Smile,
  CheckCheck,
  Search,
  Settings,
  ChevronLeft,
  Phone,
  Plus,
  MessageCircle,
  Sparkles,
  Star,
  CheckCircle2,
  Mic,
  MicOff,
  Volume2,
  PhoneOff,
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  BadgeCheck,
  Sparkle,
  Home,
  Globe,
  ShoppingBag,
  BookOpen,
  Mail,
  Bell,
  Heart,
  PhoneCall
} from 'lucide-react';

interface ConversationItem {
  id: string;
  name: string;
  avatar: string;
  role: string;
  badge?: string;
  rating?: number;
  ordersCount?: number;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline: boolean;
  onlineTimeAgo?: string;
  category?: string;
}

export const FloatingMessengerWindows: React.FC = () => {
  const {
    activeChatWindows,
    closeChatWindow,
    toggleMinimizeChatWindow,
    sendChatMessage,
    createGoogleMeetCall,
    currentUser,
    directMessages,
    openChatWindow,
    isMessengerInboxOpen,
    closeMessengerInbox,
    activeMessengerConversationId,
    setActiveMessengerConversationId
  } = useData();

  // Full Screen Messenger State
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'sellers' | 'online' | 'orders'>('all');
  
  // Interactive Modals
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [userNote, setUserNote] = useState('Available for hire 💼');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeCallState, setActiveCallState] = useState<{
    active: boolean;
    callerName: string;
    callerAvatar: string;
    muted: boolean;
    duration: number;
  } | null>(null);

  // Settings toggles
  const [settings, setSettings] = useState({
    activeStatus: true,
    messageSound: true,
    orderAlerts: true,
    readReceipts: true
  });

  const isOpen = isMessengerInboxOpen || isFullScreenOpen;

  // Synchronize selected conversation ID whenever messenger opens or activeMessengerConversationId changes
  useEffect(() => {
    setSelectedConversationId(activeMessengerConversationId || null);
  }, [activeMessengerConversationId, isMessengerInboxOpen]);

  const handleCloseAll = () => {
    setIsFullScreenOpen(false);
    setSelectedConversationId(null);
    if (setActiveMessengerConversationId) setActiveMessengerConversationId(null);
    closeMessengerInbox();
  };

  // Call timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeCallState?.active) {
      interval = setInterval(() => {
        setActiveCallState(prev => prev ? { ...prev, duration: prev.duration + 1 } : null);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCallState?.active]);

  // Professional Marketplace Sellers & Freelancer Profiles
  const defaultHistory: ConversationItem[] = [
    {
      id: 'chat-tanvir-ahmed',
      name: 'Tanvir Ahmed',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      role: 'Top Rated • Full-Stack Web',
      badge: 'Top Rated',
      rating: 5.0,
      ordersCount: 142,
      lastMessage: 'প্রজেক্টের সোর্স কোড ও লাইভ প্রিভিউ লিংক পাঠিয়েছি, চেক করে জানাবেন।',
      time: '১০ মিনিট আগে',
      unreadCount: 2,
      isOnline: true,
      category: 'sellers'
    },
    {
      id: 'chat-creative-pixels',
      name: 'Creative Pixels Agency',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      role: 'Level 2 • UI/UX Designer',
      badge: 'Level 2',
      rating: 4.9,
      ordersCount: 89,
      lastMessage: 'Figma ডিজাইন ফাইল আপডেট করা হয়েছে, ক্লায়েন্ট রিভিশন রেডি।',
      time: '৪৫ মিনিট আগে',
      isOnline: true,
      category: 'sellers'
    },
    {
      id: 'chat-piten-support',
      name: 'PiTen Marketplace Official',
      avatar: 'https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=120&q=80',
      role: 'অফিসিয়াল সাপোর্ট ও এসক্রো সিকিউরিটি',
      badge: 'Verified Official',
      rating: 5.0,
      ordersCount: 999,
      lastMessage: 'অর্ডার #PT-8942 এর এস্ক্রো পেমেন্ট ভেরিফিকেশন সফল হয়েছে।',
      time: '২ ঘণ্টা আগে',
      unreadCount: 1,
      isOnline: true,
      category: 'orders'
    },
    {
      id: 'chat-shahinur-rahman',
      name: 'Shahinur Rahman',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      role: 'Pro Seller • React & Node Specialist',
      badge: 'Verified Pro',
      rating: 5.0,
      ordersCount: 65,
      lastMessage: 'পেমেন্ট গেটওয়ে এবং ডাটাবেস এপিআই ইন্টিগ্রেশন সম্পন্ন।',
      time: '৩ ঘণ্টা আগে',
      isOnline: false,
      onlineTimeAgo: '৩ ঘণ্টা আগে',
      category: 'sellers'
    },
    {
      id: 'chat-zubair-hossain',
      name: 'Zubair Hossain',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
      role: 'Level 2 • Mobile App Dev',
      badge: 'Level 2',
      rating: 4.9,
      ordersCount: 78,
      lastMessage: 'Android APK ও iOS টেস্টফ্লাইট বিল্ড ডাউনলোড লিংক পাঠানো হয়েছে।',
      time: '৫ ঘণ্টা আগে',
      isOnline: false,
      onlineTimeAgo: '৫ ঘণ্টা আগে',
      category: 'sellers'
    },
    {
      id: 'chat-sadia-afrin',
      name: 'Sadia Afrin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      role: 'Top Rated • SEO & Marketing',
      badge: 'Top Rated',
      rating: 4.8,
      ordersCount: 54,
      lastMessage: 'অন-পেজ এসইও ও কিওয়ার্ড র‍্যাংকিং অডিট রিপোর্ট পাঠানো হয়েছে।',
      time: '১ দিন আগে',
      isOnline: true,
      category: 'sellers'
    },
    {
      id: 'chat-mouson-art',
      name: 'Mouson Branding Studio',
      avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=120&q=80',
      role: 'Level 2 • Logo & Graphics',
      badge: 'Level 2',
      rating: 5.0,
      ordersCount: 112,
      lastMessage: 'লোগো ভেক্টর ফাইল ও ব্র্যান্ডিং কিট প্যাকেজ রেডি।',
      time: '১ দিন আগে',
      isOnline: false,
      onlineTimeAgo: '১ দিন আগে',
      category: 'sellers'
    }
  ];

  // Dynamic list merging active chat windows
  const activeWindowsAsConversations: ConversationItem[] = (activeChatWindows || []).map(w => ({
    id: w.id,
    name: w.senderName,
    avatar: w.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    role: w.senderRole || 'সেলার • ভেরিফাইড প্রফেশনাল',
    badge: 'Verified Seller',
    rating: 4.9,
    ordersCount: 35,
    lastMessage: w.messages[w.messages.length - 1]?.text || 'চ্যাট শুরু হয়েছে...',
    time: w.messages[w.messages.length - 1]?.time || 'এখন',
    isOnline: true,
    category: 'sellers'
  }));

  const allConversationsMap = new Map<string, ConversationItem>();
  activeWindowsAsConversations.forEach(c => allConversationsMap.set(c.id, c));
  defaultHistory.forEach(c => {
    if (!allConversationsMap.has(c.id)) {
      allConversationsMap.set(c.id, c);
    }
  });

  const conversationList = Array.from(allConversationsMap.values()).filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeCategoryFilter === 'sellers') return c.category === 'sellers';
    if (activeCategoryFilter === 'online') return c.isOnline;
    if (activeCategoryFilter === 'orders') return c.category === 'orders' || c.name.includes('Official');
    return true;
  });

  // Top seller stories / online status cards
  const topSellers = [
    {
      id: 'my-note',
      name: 'Your note',
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      isMe: true,
      noteText: userNote
    },
    {
      id: 'story-tanvir',
      name: 'Tanvir (Top)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      isOnline: true,
      convoId: 'chat-tanvir-ahmed'
    },
    {
      id: 'story-creative',
      name: 'Pixels (UI)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      isOnline: true,
      convoId: 'chat-creative-pixels'
    },
    {
      id: 'story-shahin',
      name: 'Shahinur (Dev)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      isOnline: true,
      convoId: 'chat-shahinur-rahman'
    },
    {
      id: 'story-sadia',
      name: 'Sadia (SEO)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      isOnline: true,
      convoId: 'chat-sadia-afrin'
    },
    {
      id: 'story-zubair',
      name: 'Zubair (App)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
      isOnline: true,
      convoId: 'chat-zubair-hossain'
    }
  ];

  const currentActiveWin = activeChatWindows?.find(w => w.id === selectedConversationId) || (
    selectedConversationId ? {
      id: selectedConversationId,
      senderName: conversationList.find(c => c.id === selectedConversationId)?.name || 'মার্কেটপ্লেস সেলার',
      senderRole: conversationList.find(c => c.id === selectedConversationId)?.role || 'টপ রেটেড সেলার',
      senderAvatar: conversationList.find(c => c.id === selectedConversationId)?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      messages: [
        {
          id: 'msg-default-1',
          senderName: conversationList.find(c => c.id === selectedConversationId)?.name || 'সেলার',
          senderAvatar: conversationList.find(c => c.id === selectedConversationId)?.avatar,
          isSelf: false,
          text: conversationList.find(c => c.id === selectedConversationId)?.lastMessage || 'আসসালামু আলাইকুম! আপনার প্রজেক্টের রিকোয়ারমেন্ট বা সার্ভিস সম্পর্কে জানান।',
          time: conversationList.find(c => c.id === selectedConversationId)?.time || '১০ মিনিট আগে'
        }
      ]
    } : null
  );

  return (
    <>
      {/* 1. FLOATING MINI CHAT HEADS & BOTTOM WINDOWS (ONLY ON DESKTOP - NEVER ON PHONE VIEW) */}
      {!isOpen && activeChatWindows && activeChatWindows.length > 0 && (
        <div className="hidden md:flex fixed bottom-0 right-2 sm:right-6 z-[9990] items-end gap-3 max-w-[calc(100vw-1rem)] overflow-x-auto pb-0 pointer-events-none font-bengali">
          {activeChatWindows.map(win => (
            <SingleChatWindow
              key={win.id}
              win={win}
              onClose={() => closeChatWindow(win.id)}
              onMinimize={() => toggleMinimizeChatWindow(win.id)}
              onSend={(text) => sendChatMessage(win.id, text)}
              onCreateMeet={() => createGoogleMeetCall(win.id)}
              onExpandFullScreen={() => {
                setSelectedConversationId(win.id);
                setIsFullScreenOpen(true);
              }}
              currentUserName={currentUser?.name || 'আমি'}
            />
          ))}
        </div>
      )}

      {/* 2. FULL SCREEN MESSENGER MODAL / SCREEN (RESPONSIVE PC & PHONE) */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-white dark:bg-[#18222D] flex flex-col font-bengali animate-in fade-in zoom-in-95 duration-200">
          
          {/* MOBILE VIEW TOPBAR (6 ICONS + ATTACHED SUB-HEADER IN #0B132B) */}
          <div className="md:hidden bg-[#0B132B] text-white shrink-0 font-bengali z-50">
            {/* Top 6 Icons Navigation Bar */}
            <div className="flex items-center justify-around py-2 px-2 border-b border-slate-800/80">
              {/* 1. Home */}
              <button
                type="button"
                onClick={handleCloseAll}
                className="flex-1 flex justify-center items-center py-1 transition relative active:scale-95 cursor-pointer text-white"
                title="হোম"
              >
                <Globe className="w-5 h-5 text-white" />
              </button>
              {/* 2. Order */}
              <button
                type="button"
                onClick={handleCloseAll}
                className="flex-1 flex justify-center items-center py-1 transition relative active:scale-95 cursor-pointer text-white"
                title="আমার অর্ডারসমূহ"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
              </button>
              {/* 3. Course */}
              <button
                type="button"
                onClick={handleCloseAll}
                className="flex-1 flex justify-center items-center py-1 transition relative active:scale-95 cursor-pointer text-white"
                title="আমার কোর্সসমূহ"
              >
                <BookOpen className="w-5 h-5 text-white" />
              </button>
              {/* 4. Messenger (Active) */}
              <button
                type="button"
                className="flex-1 flex justify-center items-center py-1 transition relative active:scale-95 cursor-pointer text-[#1DB954]"
                title="মেসেঞ্জার"
              >
                <Mail className="w-5 h-5 stroke-[2.5] text-[#1DB954]" />
              </button>
              {/* 5. Notification */}
              <button
                type="button"
                onClick={handleCloseAll}
                className="flex-1 flex justify-center items-center py-1 transition relative active:scale-95 cursor-pointer text-white"
                title="নোটিফিকেশন"
              >
                <Bell className="w-5 h-5 text-white" />
              </button>
              {/* 6. Saved / Favorites */}
              <button
                type="button"
                onClick={handleCloseAll}
                className="flex-1 flex justify-center items-center py-1 transition relative active:scale-95 cursor-pointer text-white"
                title="পছন্দের সেভ করা গিগসমূহ"
              >
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Sub-Header Attached Below 6 Icons */}
            <div className="px-3 py-2 border-t border-slate-800/60 bg-[#0B132B]">
              {selectedConversationId && currentActiveWin ? (
                /* Active Chat Sub-Header: < [Avatar] Name Active now 📹 📞 */
                <div className="flex items-center justify-between w-full animate-in fade-in duration-150 py-0.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedConversationId(null);
                        if (setActiveMessengerConversationId) setActiveMessengerConversationId(null);
                      }}
                      className="p-1 -ml-1 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800/80 transition cursor-pointer shrink-0"
                      title="ইনবক্সে ফিরে যান"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-100" />
                    </button>
                    <div className="relative shrink-0">
                      <img
                        src={currentActiveWin.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={currentActiveWin.senderName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700/80 shadow-2xs"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#1DB954] border-2 border-[#0B132B]" />
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-1">
                        <h2 className="text-xs sm:text-sm font-black text-white tracking-tight leading-tight truncate">
                          {currentActiveWin.senderName}
                        </h2>
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 fill-blue-400/20" />
                      </div>
                      <p className="text-[10px] text-[#1DB954] font-bold leading-none mt-0.5 truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] shrink-0" />
                        <span>Active now (অনলাইনে আছেন)</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => createGoogleMeetCall(selectedConversationId)}
                      className="p-1.5 rounded-full text-blue-400 hover:text-blue-300 hover:bg-slate-800 transition cursor-pointer"
                      title="ভিডিও কল"
                    >
                      <Video className="w-4.5 h-4.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => createGoogleMeetCall(selectedConversationId)}
                      className="p-1.5 rounded-full text-blue-400 hover:text-blue-300 hover:bg-slate-800 transition cursor-pointer"
                      title="ভয়েস কল"
                    >
                      <PhoneCall className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* List View Sub-Header: Messages • PiTen Marketplace Inbox */
                <div className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCloseAll}
                      className="p-1 -ml-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                      title="ফিরে যান"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-200" />
                    </button>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-black text-white tracking-tight leading-none">Messages</h2>
                        <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold leading-tight mt-0.5">PiTen Marketplace Inbox</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
            
            {/* LEFT PANE: MESSAGES HISTORY & STORIES (VISIBLE ON DESKTOP OR WHEN NO CONVO SELECTED ON PHONE) */}
            <div className={`w-full md:w-88 lg:w-96 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#18222D] flex flex-col h-full shrink-0 relative ${
              selectedConversationId ? 'hidden md:flex' : 'flex'
            }`}>
              
              {/* MESSAGES HEADER: Clean & Professional, Search + Settings set together on the right */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseAll}
                    className="p-1.5 -ml-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition cursor-pointer active:scale-95"
                    title="বন্ধ করে পেজে ফিরে যান"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-1.5">
                      <span>Messages</span>
                      <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400">
                      PiTen Marketplace Inbox
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Search Toggle Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('messenger-search-input');
                      if (input) input.focus();
                    }}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition cursor-pointer active:scale-95"
                    title="মেসেজ সার্চ করুন"
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  {/* Settings Button (Paired with Search) */}
                  <button
                    type="button"
                    onClick={() => setIsSettingsModalOpen(true)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 relative transition cursor-pointer active:scale-95"
                    title="মেসেঞ্জার সেটিংস"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* SCROLLABLE BODY: SEARCH BAR, FILTER TABS, SELLERS CAROUSEL & CONVERSATION LIST ALL SCROLL TOGETHER */}
              <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-slate-100/80 dark:divide-slate-800/40">
                
                {/* SEARCH BAR & FILTER TABS (SCROLLS SMOOTHLY ON PHONE) */}
                <div className="p-3 space-y-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="messenger-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="সেলার, বায়ার বা সার্ভিস খুঁজুন..."
                      className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF]"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveCategoryFilter('all')}
                      className={`px-3 py-1 rounded-full transition cursor-pointer whitespace-nowrap ${
                        activeCategoryFilter === 'all'
                          ? 'bg-[#0084FF] text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      সকল চ্যাট
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCategoryFilter('online')}
                      className={`px-3 py-1 rounded-full transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                        activeCategoryFilter === 'online'
                          ? 'bg-[#0084FF] text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      অনলাইন ({defaultHistory.filter(h => h.isOnline).length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCategoryFilter('sellers')}
                      className={`px-3 py-1 rounded-full transition cursor-pointer whitespace-nowrap ${
                        activeCategoryFilter === 'sellers'
                          ? 'bg-[#0084FF] text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      টপ সেলার্স
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCategoryFilter('orders')}
                      className={`px-3 py-1 rounded-full transition cursor-pointer whitespace-nowrap ${
                        activeCategoryFilter === 'orders'
                          ? 'bg-[#0084FF] text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      অর্ডার ও সাপোর্ট
                    </button>
                  </div>
                </div>

                {/* TOP ACTIVE SELLERS & STATUS NOTES (CAROUSEL) */}
                <div className="px-3 py-2.5 overflow-x-auto flex items-center gap-3.5 no-scrollbar">
                  {topSellers.map(s => (
                    <div
                      key={s.id}
                      onClick={() => {
                        if (s.isMe) {
                          setIsNoteModalOpen(true);
                        } else if (s.convoId) {
                          setSelectedConversationId(s.convoId);
                          if (setActiveMessengerConversationId) setActiveMessengerConversationId(s.convoId);
                          const win = activeChatWindows?.find(w => w.id === s.convoId);
                          if (!win) {
                            const convo = defaultHistory.find(d => d.id === s.convoId);
                            if (convo) {
                              openChatWindow({
                                id: convo.id,
                                senderName: convo.name,
                                senderRole: convo.role,
                                senderAvatar: convo.avatar
                              });
                            }
                          }
                        }
                      }}
                      className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
                    >
                      <div className="relative">
                        {s.isMe && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-50 dark:bg-slate-800 border border-[#0084FF]/40 shadow-xs px-2 py-0.5 rounded-full text-[9px] font-bold text-[#0084FF] dark:text-sky-300 whitespace-nowrap z-10">
                            {userNote.length > 12 ? userNote.substring(0, 12) + '...' : userNote}
                          </span>
                        )}
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#18222D]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 max-w-[62px] truncate text-center">
                        {s.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CONVERSATION HISTORY LIST (PROFESSIONAL MARKETPLACE PROFILES) */}
                <div className="divide-y divide-slate-100/80 dark:divide-slate-800/40">
                  {conversationList.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      কোনো চ্যাট হিস্ট্রি পাওয়া যায়নি।
                    </div>
                  ) : (
                    conversationList.map(c => {
                      const isSelected = selectedConversationId === c.id;
                      return (
                        <div
                          key={c.id}
                          onClick={() => {
                            setSelectedConversationId(c.id);
                            if (setActiveMessengerConversationId) setActiveMessengerConversationId(c.id);
                            const win = activeChatWindows?.find(w => w.id === c.id);
                            if (!win) {
                              openChatWindow({
                                id: c.id,
                                senderName: c.name,
                                senderRole: c.role,
                                senderAvatar: c.avatar,
                                initialMessage: c.lastMessage
                              });
                            }
                          }}
                          className={`p-3 sm:px-4 sm:py-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-blue-50/80 dark:bg-slate-800/80'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          {/* Avatar with Online Indicator */}
                          <div className="relative shrink-0">
                            <img
                              src={c.avatar}
                              alt={c.name}
                              className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                            {c.isOnline ? (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#18222D]" />
                            ) : (
                              c.onlineTimeAgo && (
                                <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[8px] font-bold px-1 rounded-full border border-slate-700">
                                  {c.onlineTimeAgo}
                                </span>
                              )
                            )}
                          </div>

                          {/* Name, Badge, Rating & Last Message */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                                  {c.name}
                                </h4>
                                {c.badge && (
                                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full shrink-0 ${
                                    c.badge.includes('Official')
                                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                                      : c.badge.includes('Top')
                                      ? 'bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/30'
                                      : 'bg-sky-500/10 text-sky-500 border border-sky-500/30'
                                  }`}>
                                    {c.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold shrink-0 ml-1">
                                {c.time}
                              </span>
                            </div>

                            {/* Role & Rating */}
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                              <span className="truncate">{c.role}</span>
                              {c.rating && (
                                <span className="flex items-center gap-0.5 text-amber-500 shrink-0 font-bold">
                                  <Star className="w-2.5 h-2.5 fill-amber-500" />
                                  {c.rating}
                                </span>
                              )}
                            </div>

                            {/* Message snippet */}
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium flex-1 mr-2">
                                {c.lastMessage}
                              </p>
                              {c.unreadCount ? (
                                <span className="min-w-4.5 h-4.5 px-1 bg-[#0084FF] text-white text-[10px] font-black rounded-full flex items-center justify-center shrink-0 shadow-xs">
                                  {c.unreadCount}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>

              {/* FLOATING ACTION BUTTONS AT BOTTOM RIGHT */}
              <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-3 pointer-events-auto">
                {/* Meta AI / Smart Sparkle Widget */}
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-purple-600 hover:scale-105 active:scale-95 transition cursor-pointer"
                  title="PiTen AI Assistant"
                >
                  <Sparkles className="w-5 h-5 text-purple-500" />
                </button>

                {/* Blue Circular Plus Button for New Message */}
                <button
                  type="button"
                  onClick={() => setIsNewChatModalOpen(true)}
                  className="w-12 h-12 rounded-full bg-[#0084FF] hover:bg-[#0073e6] text-white flex items-center justify-center shadow-xl cursor-pointer transition active:scale-95 hover:scale-105"
                  title="নতুন মেসেজ শুরু করুন"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

            </div>

            {/* RIGHT PANE: FULL SCREEN CHAT CONVERSATION VIEW */}
            <div className={`flex-1 flex flex-col h-full bg-white dark:bg-[#18222D] ${
              selectedConversationId ? 'flex' : 'hidden md:flex'
            }`}>
              {currentActiveWin ? (
                <FullScreenChatThread
                  win={currentActiveWin}
                  onBack={() => {
                    setSelectedConversationId(null);
                    if (setActiveMessengerConversationId) setActiveMessengerConversationId(null);
                  }}
                  onCloseFullScreen={handleCloseAll}
                  onSend={(text) => sendChatMessage(currentActiveWin.id, text)}
                  onCreateMeet={() => createGoogleMeetCall(currentActiveWin.id)}
                  onStartVoiceCall={() => {
                    setActiveCallState({
                      active: true,
                      callerName: currentActiveWin.senderName,
                      callerAvatar: currentActiveWin.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                      muted: false,
                      duration: 0
                    });
                  }}
                  currentUserName={currentUser?.name || 'আমি'}
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 text-slate-400">
                  <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-[#0084FF]">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-black text-slate-800 dark:text-slate-200">
                    মার্কেটপ্লেস চ্যাট ও অর্ডার ইনবক্স
                  </h3>
                  <p className="text-xs max-w-xs leading-relaxed">
                    বাম পাশের তালিকা থেকে যেকোনো ভেরিফাইড সেলার নির্বাচন করে সরাসরি কথা বলুন, কাস্টম অফার পাঠান এবং Google Meet কল শুরু করুন।
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 3. SETTINGS MODAL */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-bengali animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1C2733] border border-slate-200 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#0084FF]" />
                <span>মেসেঞ্জার ও চ্যাট সেটিংস</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">অ্যাক্টিভ অনলাইন স্ট্যাটাস</div>
                  <div className="text-[11px] text-slate-400">বায়ার ও ক্লায়েন্টদের কাছে অনলাইন দৃশ্যমান রাখুন</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.activeStatus}
                  onChange={(e) => setSettings({ ...settings, activeStatus: e.target.checked })}
                  className="w-5 h-5 accent-[#0084FF] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">মেসেজ সাউন্ড নোটিফিকেশন</div>
                  <div className="text-[11px] text-slate-400">নতুন বার্তা আসলে শব্দ হবে</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.messageSound}
                  onChange={(e) => setSettings({ ...settings, messageSound: e.target.checked })}
                  className="w-5 h-5 accent-[#0084FF] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">অর্ডার ও অফার নোটিফিকেশন</div>
                  <div className="text-[11px] text-slate-400">কাস্টম অফার ও ডেলিভারি আপডেট সাথে সাথে পান</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.orderAlerts}
                  onChange={(e) => setSettings({ ...settings, orderAlerts: e.target.checked })}
                  className="w-5 h-5 accent-[#0084FF] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">রিড রিসিপ্ট (Read Receipts)</div>
                  <div className="text-[11px] text-slate-400">মেসেজ পড়া হয়েছে কিনা ব্লু-টিক দেখাবে</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.readReceipts}
                  onChange={(e) => setSettings({ ...settings, readReceipts: e.target.checked })}
                  className="w-5 h-5 accent-[#0084FF] cursor-pointer"
                />
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-4 py-2 bg-[#0084FF] hover:bg-[#0073e6] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. NOTE UPDATE MODAL */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-bengali animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1C2733] border border-slate-200 dark:border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                আপনার স্ট্যাটাস নোট দিন
              </h4>
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="যেমন: Available for hire 💼"
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0084FF]"
            />

            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400 font-bold">কুইক প্রিসেট:</div>
              <div className="flex flex-wrap gap-1.5">
                {['Available for hire 💼', 'Taking new orders 🚀', 'Fast delivery ⚡', 'In a client meeting 📞', 'Working on projects 💻'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setUserNote(preset)}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-[#0084FF] transition cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsNoteModalOpen(false)}
              className="w-full py-2.5 bg-[#0084FF] hover:bg-[#0073e6] text-white text-xs font-black rounded-xl transition cursor-pointer shadow-md"
            >
              নোট আপডেট করুন
            </button>
          </div>
        </div>
      )}

      {/* 5. NEW CHAT PICKER MODAL */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-bengali animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1C2733] border border-slate-200 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#0084FF]" />
                <span>নতুন সেলার চ্যাট শুরু করুন</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsNewChatModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 space-y-1">
              {defaultHistory.map(seller => (
                <div
                  key={seller.id}
                  onClick={() => {
                    openChatWindow({
                      id: seller.id,
                      senderName: seller.name,
                      senderRole: seller.role,
                      senderAvatar: seller.avatar
                    });
                    setSelectedConversationId(seller.id);
                    setIsNewChatModalOpen(false);
                  }}
                  className="p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800/80 flex items-center gap-3 cursor-pointer transition"
                >
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                        {seller.name}
                      </h4>
                      {seller.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#1DB954]/10 text-[#1DB954] rounded-full">
                          {seller.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {seller.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. AI ASSISTANT MODAL */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-bengali animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1C2733] border border-slate-200 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    PiTen Smart AI Assistant
                  </h3>
                  <p className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                    মার্কেটপ্লেস মেসেজিং ও প্রপোজাল হেল্পার
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  if (currentActiveWin) {
                    sendChatMessage(currentActiveWin.id, '💼 [কাস্টম প্রপোজাল ড্রাফট]: আসসালামু আলাইকুম! আপনার প্রজেক্টের বিস্তারিত পড়েছি। আমি ৩ দিনের মধ্যে ১০০% কোয়ালিটি নিশ্চিত করে ডেলিভারি দিতে প্রস্তুত।');
                  }
                  setIsAiModalOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 hover:scale-[1.01] transition cursor-pointer font-medium"
              >
                ✨ <strong className="font-bold">কুইক প্রপোজাল পাঠান:</strong> "৩ দিনের মধ্যে ১০০% কোয়ালিটি ডেলিভারির অফার"
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentActiveWin) {
                    sendChatMessage(currentActiveWin.id, '📞 আসসালামু আলাইকুম! প্রজেক্টের জরুরি বিষয়গুলো দ্রুত আলোচনা করার জন্য একটি Google Meet মিটিংয়ে যুক্ত হতে পারবেন?');
                  }
                  setIsAiModalOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 hover:scale-[1.01] transition cursor-pointer font-medium"
              >
                🎥 <strong className="font-bold">মিটিং রিকুয়েস্ট পাঠান:</strong> "জরুরি বিষয় আলোচনার জন্য Google Meet কল"
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentActiveWin) {
                    sendChatMessage(currentActiveWin.id, '✅ ধন্যবাদ! আমি এখনই কাজ শুরু করছি এবং নিয়মিত কাজের অগ্রগতি মেসেঞ্জারে আপডেট জানাব।');
                  }
                  setIsAiModalOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 hover:scale-[1.01] transition cursor-pointer font-medium"
              >
                ⚡ <strong className="font-bold">কনফার্মেশন মেসেজ:</strong> "ধন্যবাদ! কাজ শুরু হয়েছে ও দ্রুত আপডেট দেওয়া হবে।"
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. LIVE VOICE CALL OVERLAY */}
      {activeCallState?.active && (
        <div className="fixed inset-0 z-70 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white font-bengali animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-4 max-w-sm w-full">
            <div className="relative inline-block">
              <img
                src={activeCallState.callerAvatar}
                alt={activeCallState.callerName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0084FF] shadow-2xl mx-auto animate-pulse"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-950" />
            </div>

            <div>
              <h3 className="text-xl font-black">{activeCallState.callerName}</h3>
              <p className="text-xs text-sky-400 font-bold mt-0.5">PiTen ভয়েস কল চলছে (HD অডিও)</p>
              <div className="text-sm font-mono text-slate-300 mt-2 font-bold">
                {Math.floor(activeCallState.duration / 60).toString().padStart(2, '0')}:
                {(activeCallState.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-6">
              <button
                type="button"
                onClick={() => setActiveCallState(prev => prev ? { ...prev, muted: !prev.muted } : null)}
                className={`p-4 rounded-full transition cursor-pointer ${
                  activeCallState.muted ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
                title={activeCallState.muted ? 'আনমিউট করুন' : 'মিউট করুন'}
              >
                {activeCallState.muted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveCallState(null)}
                className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl transition cursor-pointer active:scale-95"
                title="কল শেষ করুন"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ========================================================================= */
/* SINGLE FLOATING WINDOW (Desktop-only Mini window) */
/* ========================================================================= */

interface SingleChatWindowProps {
  win: {
    id: string;
    senderName: string;
    senderRole?: string;
    senderAvatar?: string;
    messages: Array<{
      id: string;
      senderName: string;
      senderAvatar?: string;
      isSelf: boolean;
      text: string;
      time: string;
      meetLink?: string;
    }>;
    minimized?: boolean;
    isClosed?: boolean;
    isReadOnly?: boolean;
  };
  onClose: () => void;
  onMinimize: () => void;
  onSend: (text: string) => void;
  onCreateMeet: () => void;
  onExpandFullScreen: () => void;
  currentUserName: string;
}

const SingleChatWindow: React.FC<SingleChatWindowProps> = ({
  win,
  onClose,
  onMinimize,
  onSend,
  onCreateMeet,
  onExpandFullScreen
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [win.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSend(inputText);
    setInputText('');
  };

  return (
    <div className="w-80 bg-white dark:bg-[#1C2733] rounded-t-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col pointer-events-auto transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="px-3.5 py-2.5 bg-[#0084FF] text-white flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2 min-w-0" onClick={onMinimize}>
          <div className="relative shrink-0">
            <img
              src={win.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={win.senderName}
              className="w-7 h-7 rounded-full object-cover border border-white/40"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full ring-1 ring-white" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-black truncate">{win.senderName}</h4>
            <span className="text-[9px] text-sky-100 font-medium">Active now</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onExpandFullScreen}
            className="p-1 hover:bg-white/20 rounded-md transition"
            title="ফুল স্ক্রিন করুন"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-md transition"
            title="বন্ধ করুন"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!win.minimized && (
        <>
          <div className="h-64 overflow-y-auto p-3 space-y-2 bg-slate-50 dark:bg-[#121B24] text-xs">
            {win.messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[85%] ${
                    m.isSelf
                      ? 'bg-[#0084FF] text-white'
                      : 'bg-white dark:bg-[#243447] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5">{m.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1.5 bg-white dark:bg-[#1C2733]">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="মেসেজ লিখুন..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 rounded-full text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="p-1.5 bg-[#0084FF] text-white rounded-full cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

/* ========================================================================= */
/* FULL SCREEN CHAT THREAD (High-End Marketplace Experience) */
/* ========================================================================= */

interface FullScreenChatThreadProps {
  win: {
    id: string;
    senderName: string;
    senderRole?: string;
    senderAvatar?: string;
    messages: Array<{
      id: string;
      senderName: string;
      senderAvatar?: string;
      isSelf: boolean;
      text: string;
      time: string;
      meetLink?: string;
    }>;
    minimized?: boolean;
    isClosed?: boolean;
    isReadOnly?: boolean;
  };
  onBack: () => void;
  onCloseFullScreen: () => void;
  onSend: (text: string) => void;
  onCreateMeet: () => void;
  onStartVoiceCall: () => void;
  currentUserName: string;
}

const FullScreenChatThread: React.FC<FullScreenChatThreadProps> = ({
  win,
  onBack,
  onCloseFullScreen,
  onSend,
  onCreateMeet,
  onStartVoiceCall
}) => {
  const [inputText, setInputText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerTitle, setOfferTitle] = useState('ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট সার্ভিস');
  const [offerPrice, setOfferPrice] = useState('৫০০০');
  const [offerDelivery, setOfferDelivery] = useState('৩ দিন');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [win.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSend(inputText);
    setInputText('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKb = (file.size / 1024).toFixed(1);
    onSend(`📎 [ফাইল অ্যাটাচমেন্ট]: ${file.name} (${sizeKb} KB)`);
    if (e.target) e.target.value = '';
  };

  const handleSendCustomOffer = () => {
    if (!offerTitle.trim() || !offerPrice.trim()) return;
    onSend(`💼 [কাস্টম প্রজেক্ট অফার]\n📦 সার্ভিস: ${offerTitle}\n💰 বাজেট: ৳${offerPrice}\n⏱️ ডেলিভারি সময়: ${offerDelivery}\n\n👉 অর্ডার নিশ্চিত করতে বায়ার একসেপ্ট বাটনে ট্যাপ করতে পারেন।`);
    setIsOfferModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#18222D]">
      {/* TOP HEADER BAR (HIDDEN ON PHONE VIEW AS ATTACHED DARK BAR HANDLES IT) */}
      <div className="hidden md:flex px-3 sm:px-4 py-2.5 bg-white dark:bg-[#1C2733] border-b border-slate-200/80 dark:border-slate-800 items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Prominent Back Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            className="p-2 -ml-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition cursor-pointer active:scale-95 shrink-0"
            title="ইনবক্সে ফিরে যান"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Seller Avatar */}
          <div className="relative shrink-0">
            <img
              src={win.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={win.senderName}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#1C2733]" />
          </div>

          {/* Seller Info */}
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate flex items-center gap-1.5">
              <span>{win.senderName}</span>
              <ShieldCheck className="w-4 h-4 text-[#0084FF] shrink-0" />
            </h3>
            <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active now (অনলাইনে আছেন)</span>
            </p>
          </div>
        </div>

        {/* Action icons in header */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Custom Offer Shortcut Button */}
          <button
            type="button"
            onClick={() => setIsOfferModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-black hover:bg-emerald-500/20 transition cursor-pointer"
            title="কাস্টম অফার পাঠান"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>অফার পাঠান</span>
          </button>

          {/* Google Meet Video Call */}
          <button
            type="button"
            onClick={onCreateMeet}
            className="p-2 text-[#0084FF] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition cursor-pointer"
            title="Google Meet ভিডিও কল"
          >
            <Video className="w-5 h-5" />
          </button>

          {/* Voice Call */}
          <button
            type="button"
            onClick={onStartVoiceCall}
            className="p-2 text-[#0084FF] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition cursor-pointer"
            title="ভয়েস কল"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MESSAGES FEED */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 dark:bg-[#101923] no-scrollbar">
        {/* Profile Intro Banner */}
        <div className="py-6 text-center space-y-2 border-b border-slate-200/50 dark:border-slate-800/60 max-w-sm mx-auto">
          <img
            src={win.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt={win.senderName}
            className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-white dark:border-[#1C2733] shadow-md"
          />
          <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center justify-center gap-1">
            <span>{win.senderName}</span>
            <BadgeCheck className="w-4 h-4 text-[#0084FF]" />
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {win.senderRole || 'ভেরিফাইড টপ সেলার'} • PiTen Secure Escrow
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 rounded-full text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>এন্ড-টু-এন্ড এনক্রিপ্টেড ও ১০০% নিরাপদ পেমেন্ট হিস্ট্রি</span>
          </div>
        </div>

        {win.messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-end gap-2 ${m.isSelf ? 'justify-end' : 'justify-start'}`}
          >
            {!m.isSelf && (
              <img
                src={m.senderAvatar || win.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt=""
                className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
              />
            )}

            <div className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%]`}>
              <div
                className={`px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  m.isSelf
                    ? 'bg-[#0084FF] text-white font-medium rounded-2xl rounded-br-xs'
                    : 'bg-white dark:bg-[#243447] text-slate-900 dark:text-slate-100 border border-slate-200/70 dark:border-slate-700/60 rounded-2xl rounded-bl-xs'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{m.text}</p>

                {m.meetLink && (
                  <div className="mt-2.5 p-3 bg-slate-900 text-white border border-[#0084FF]/60 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                      <Video className="w-4 h-4 text-sky-400 animate-pulse" />
                      <span>Google Meet ভিডিও মিটিং রুম তৈরি হয়েছে</span>
                    </div>
                    <a
                      href={m.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 bg-[#0084FF] hover:bg-[#0073e6] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition"
                    >
                      <span>🚀 মিটিংয়ে যুক্ত হন</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 mt-0.5 px-1.5">
                <span className="text-[10px] text-slate-400">{m.time}</span>
                {m.isSelf && <CheckCheck className="w-3.5 h-3.5 text-[#0084FF]" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* QUICK EMOJI BAR */}
      {showEmojis && (
        <div className="px-4 py-2 bg-white dark:bg-[#1C2733] border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-around gap-2 shrink-0 animate-in slide-in-from-bottom-2">
          {['👍', '❤️', '😊', '🔥', '🎉', '👏', '🙏', '💯', '🚀'].map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                onSend(emoji);
                setShowEmojis(false);
              }}
              className="text-xl p-1 hover:scale-125 transition-transform cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* BOTTOM INPUT BAR */}
      {win.isClosed || win.isReadOnly ? (
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2 shrink-0">
          <Lock className="w-4 h-4 shrink-0" />
          <span>প্রজেক্টটি সম্পন্ন হয়েছে ও ডেলিভারি রিলিজড। চ্যাট মোড বন্ধ রয়েছে।</span>
        </div>
      ) : (
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#1C2733] border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Attach file */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-[#0084FF] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition cursor-pointer shrink-0"
            title="ছবি বা ফাইল সংযুক্ত করুন"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Custom Offer mobile icon */}
          <button
            type="button"
            onClick={() => setIsOfferModalOpen(true)}
            className="sm:hidden p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-full transition cursor-pointer shrink-0"
            title="কাস্টম অফার পাঠান"
          >
            <Briefcase className="w-5 h-5" />
          </button>

          {/* Emoji */}
          <button
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className="p-2 text-[#0084FF] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition cursor-pointer shrink-0"
            title="ইমোজি"
          >
            <Smile className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="মেসেজ লিখুন..."
            className="flex-1 bg-slate-100 dark:bg-[#243447] border-0 rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF]"
          />

          {inputText.trim() ? (
            <button
              type="submit"
              className="p-2.5 bg-[#0084FF] hover:bg-[#0073e6] text-white rounded-full cursor-pointer transition shadow-md shrink-0 active:scale-95"
              title="মেসেজ পাঠান"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSend('👍')}
              className="p-2.5 text-[#0084FF] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full cursor-pointer transition shrink-0 active:scale-110"
              title="লাইক (👍) পাঠান"
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
          )}
        </form>
      )}

      {/* CUSTOM OFFER MODAL */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-bengali animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1C2733] border border-slate-200 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                <span>কাস্টম প্রজেক্ট অফার পাঠান</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  সার্ভিস / প্রজেক্টের বিবরণ
                </label>
                <input
                  type="text"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যেমন: ফুল স্ট্যাক ওয়েবসাইট ডেভেলপমেন্ট"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    বাজেট (টাকা ৳)
                  </label>
                  <input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="৫০০০"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    ডেলিভারি সময়
                  </label>
                  <input
                    type="text"
                    value={offerDelivery}
                    onChange={(e) => setOfferDelivery(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="৩ দিন"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSendCustomOffer}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md transition cursor-pointer"
              >
                অফার পাঠান
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { MarketplaceMessengerView } from './MarketplaceMessengerView';

