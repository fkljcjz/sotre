/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  TrendingUp, 
  Tv, 
  Utensils, 
  Shirt, 
  Sparkles, 
  Dumbbell, 
  Apple, 
  Package, 
  Download, 
  Upload, 
  ExternalLink, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  RotateCcw,
  Info,
  ChevronRight,
  AlertTriangle,
  Flame,
  Filter,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  ArrowLeft,
  Trophy,
  QrCode,
  Laptop,
  Share2,
  Mail,
  Smartphone,
  MessageCircle,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CATEGORIES, SORT_OPTIONS } from './types';
import { DEFAULT_PRODUCTS } from './data';

// Preset high-quality images to help administrators add products quickly and beautifully
const PRESET_IMAGES = [
  { label: '가전/디지털 (모니터)', url: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop&q=80' },
  { label: '테블릿/디바이스', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80' },
  { label: '홈/인테리어', url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80' },
  { label: '생활 가전 (로봇청소기)', url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80' },
  { label: '패션/의류 (자켓)', url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80' },
  { label: '스포츠/피트니스', url: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&auto=format&fit=crop&q=80' },
  { label: '음료/푸드 (오트밀크)', url: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=800&auto=format&fit=crop&q=80' },
  { label: '화장품/뷰티', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80' }
];

export default function App() {
  // Products State directly from DEFAULT_PRODUCTS
  const products = DEFAULT_PRODUCTS;

  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [onlyRocket, setOnlyRocket] = useState(false);
  const [highDiscountOnly, setHighDiscountOnly] = useState(false);

  // UI Modals & Panels State
  const [showTop10View, setShowTop10View] = useState(false);
  const [topTab, setTopTab] = useState<'all' | 'cost_effective' | 'performance'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // External Site Link Configuration State
  const familySiteConfig = {
    name: 'Hapix',
    url: 'https://sotre.netlify.app/',
    desc: '더 많은 추천 정보와 유용한 소식 보러가기'
  };

  // Share Modal & Notification Toast State
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Toast Auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const SHARE_URL = 'https://sotre.netlify.app/';

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = SHARE_URL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedLink(true);
    setToastMessage('링크가 클립보드에 복사되었습니다!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareButtonClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hapix',
          text: '가성비와 성능으로 검증된 추천 상품 스토어',
          url: SHARE_URL
        });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }
    setShowShareModal(true);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hapix',
          text: '가성비와 성능으로 검증된 추천 상품 스토어',
          url: SHARE_URL
        });
      } catch {
        // User closed native share sheet
      }
    } else {
      handleCopyShareLink();
    }
  };

  // Hero banner index
  const [heroIndex, setHeroIndex] = useState(0);

  // Main screen products (excludes monster_privacy_glass)
  const mainProducts = products.filter(p => p.id !== 'monster_privacy_glass');

  // Filter best products for the hero banner
  const bestProducts = mainProducts.filter(p => p.isBest).slice(0, 3);
  const bannerProducts = bestProducts.length > 0 ? bestProducts : mainProducts.slice(0, 3);

  // Top Products List for dedicated "최고의 상품" view
  // Classified into cost-effective (가성비) and performance (성능)
  const costEffectiveProducts = products.filter(p => (p.topType === 'cost_effective' || p.topType === 'both') && p.id !== 'monster_privacy_glass' && p.id !== 'alubar_powerstrip' && p.id !== 'honey_watermelon' && p.id !== 'cartoon_beam_projector');
  const performanceProducts = products.filter(p => (p.topType === 'performance' || p.topType === 'both' || p.id === 'monster_privacy_glass' || p.id === 'alubar_powerstrip') && p.id !== 'honey_watermelon' && p.id !== 'cartoon_beam_projector');
  const top10Products = products.filter(p => (p.topType === 'cost_effective' || p.topType === 'performance' || p.topType === 'both' || p.id === 'monster_privacy_glass' || p.id === 'alubar_powerstrip') && p.id !== 'honey_watermelon' && p.id !== 'cartoon_beam_projector');

  // Auto-scroll hero banner
  useEffect(() => {
    if (bannerProducts.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % bannerProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerProducts]);

  // Check URL query parameters for deep linking (?p=id)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('p');
    if (productId) {
      const found = products.find(p => p.id === productId);
      if (found) {
        setSelectedProduct(found);
      }
    }
  }, [products]);

  // Handle Search & Filter logic (main screen)
  const filteredProducts = mainProducts.filter(product => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesRocket = !onlyRocket || product.isRocket;
    const matchesDiscount = !highDiscountOnly || product.discountRate >= 20;

    return matchesSearch && matchesCategory && matchesRocket && matchesDiscount;
  });

  // Handle Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'discount':
        return b.discountRate - a.discountRate;
      case 'low-price':
        return a.salePrice - b.salePrice;
      case 'high-price':
        return b.salePrice - a.salePrice;
      case 'newest':
      default:
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    }
  });

  // Get Category Icons
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'all': return <Package className="w-4 h-4" />;
      case 'digital': return <Tv className="w-4 h-4" />;
      case 'kitchen': return <Utensils className="w-4 h-4" />;
      case 'fashion': return <Shirt className="w-4 h-4" />;
      case 'beauty': return <Sparkles className="w-4 h-4" />;
      case 'food': return <Apple className="w-4 h-4" />;
      case 'sports': return <Dumbbell className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  // Toast notifier helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Copy Direct Link to Product
  const handleShareProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?p=${product.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      triggerToast('해당 상품 상세 링크가 복사되었습니다! SNS나 블로그에 공유하세요.');
    }).catch(() => {
      triggerToast('링크 복사에 실패했습니다.');
    });
  };

  const categoryTitles: Record<string, string> = {
    digital: '💻 삶의 질 수직상승 디지털/가전 ⚡️',
    kitchen: '🍳 감성 가득 홈/주방 필수템 🏡',
    fashion: '👕 매일 입고 싶은 데일리 패션 🧥',
    beauty: '✨ 꿀피부 보장 뷰티/화장품 🌸',
    food: '🍿 마성의 간식 & 먹거리 리스트 🍩',
    sports: '💪 오운완 완성 스포츠/피트니스 🚴',
    other: '🎁 나만 알고 싶은 꿀템 모음 🎉'
  };

  const renderProductCard = (product: Product) => {
    let targetUrl = (product.coupangUrl || '').trim();
    if (targetUrl && !targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    return (
      <motion.a
        layout
        key={product.id}
        href={targetUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (!targetUrl || targetUrl === '#') {
            e.preventDefault();
            setSelectedProduct(product);
          }
        }}
        className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col relative cursor-pointer group text-left block select-none"
      >
        {/* Top Type Badge for Best View (가성비 vs 성능) */}
        {showTop10View && (
          <div className="absolute top-1 left-1 z-10">
            {product.id === 'alubar_powerstrip' || product.id === 'monster_privacy_glass' || product.topType === 'performance' ? (
              <span className="bg-indigo-600 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-md shadow-xs border border-indigo-400/40">
                ⚡ 성능
              </span>
            ) : product.topType === 'both' ? (
              <span className="bg-purple-600 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-md shadow-xs border border-purple-400/40">
                🔥 BEST
              </span>
            ) : (
              <span className="bg-emerald-600 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-md shadow-xs border border-emerald-400/40">
                💡 가성비
              </span>
            )}
          </div>
        )}

        {/* Product Image */}
        <div className="relative aspect-square w-full bg-white overflow-hidden p-2">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain transition group-hover:scale-[1.03] duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        {/* Text body */}
        <div className="p-1.5 flex-1 flex flex-col justify-center text-center min-h-[36px]">
          <h4 className="text-[10px] font-extrabold text-slate-800 line-clamp-3 leading-tight tracking-tight select-none whitespace-pre-line">
            {product.title}
          </h4>
        </div>
      </motion.a>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#300c4c] via-[#4F1975] to-[#140026] text-slate-800 selection:bg-[#FF6E8F] selection:text-white flex flex-col items-center justify-start p-0 sm:py-4 md:py-10 sm:px-4">
      
      {/* Dynamic Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 border border-slate-800"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main PHONE CONTAINER */}
      <div className="w-full max-w-[420px] bg-[#F5EEFC] min-h-screen sm:min-h-[780px] rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl relative flex flex-col overflow-hidden border-0 sm:border border-purple-900/20">
        
        {/* Sticky Legal Banner Warning Header with Purple Marquee Design */}
        <div 
          className="bg-[#2E1044] text-purple-100 text-xs py-3.5 sticky top-0 z-20 overflow-hidden w-full select-none border-b border-purple-950/50 flex items-center shadow-md"
        >
          <div className="w-full overflow-hidden relative flex">
            <div className="animate-marquee-seamless flex shrink-0 items-center">
              <span className="font-extrabold tracking-wide pr-16">
                📢 쿠팡 파트너스 활동의 일환으로 구매시 일정액의 수수료를 제공 받습니다.
              </span>
            </div>
            <div className="animate-marquee-seamless flex shrink-0 items-center" aria-hidden="true">
              <span className="font-extrabold tracking-wide pr-16">
                📢 쿠팡 파트너스 활동의 일환으로 구매시 일정액의 수수료를 제공 받습니다.
              </span>
            </div>
          </div>
        </div>

        {/* Outer scrollable area */}
        <div className="flex-1 overflow-y-auto pb-10 scrollbar-none space-y-6">
          
          {/* Hapix Store Title, Family Site Link Pill & Share Button */}
          <div className="relative px-4 pt-5 pb-1 flex items-center justify-between min-h-[48px]">
            {/* Top External Link Badge/Pill */}
            <a
              href={familySiteConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-purple-100/90 hover:bg-purple-200 text-purple-900 text-[10px] font-extrabold py-1.5 px-2.5 rounded-full border border-purple-200/80 transition cursor-pointer shadow-2xs group shrink-0 z-10 max-w-[125px]"
              title={`${familySiteConfig.name} 바로가기`}
            >
              <Globe className="w-3.5 h-3.5 text-purple-700 group-hover:rotate-12 transition-transform shrink-0" />
              <span className="truncate">{familySiteConfig.name}</span>
              <ExternalLink className="w-3 h-3 text-purple-600 opacity-80 shrink-0" />
            </a>

            {/* Absolutely Centered Hapix Title */}
            <h1 
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-2xl font-black text-[#2E1044] tracking-tight hover:scale-105 transition select-none z-10 whitespace-nowrap"
            >
              Hapix
            </h1>

            {/* YouTube Style Share Icon Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleShareButtonClick}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200/90 text-slate-800 flex items-center justify-center transition border border-slate-200 shadow-2xs cursor-pointer select-none shrink-0 z-10 ml-auto"
              title="공유하기"
            >
              <svg className="w-4 h-4 fill-slate-800 ml-0.5" viewBox="0 0 24 24">
                <path d="M15 5.636v-3.636l9 9-9 9v-3.955c-6.848 0-11.455 2.182-15 7.136 1.364-6.818 5.455-13.545 15-14.545z" />
              </svg>
            </motion.button>
          </div>

          {/* Search Box */}
          <div className="px-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력해주세요."
                className="w-full bg-white border border-slate-200/80 pl-11 pr-10 py-3 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-400 shadow-sm transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-[10px] font-bold text-purple-700 -mt-2 flex items-center justify-center gap-1">
            <span>⬆️ 원하는 제품 검색하기 ⬆️</span>
          </div>

          {/* Special Custom Link/Banner Placeholder Box */}
          {!searchQuery && (
            <div className="px-4 my-3.5 flex flex-col items-center justify-center">
              <motion.button 
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTop10View(true)}
                className="relative overflow-hidden w-full max-w-[280px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold py-3 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 border border-white/10 transition-all duration-300 cursor-pointer group"
              >
                {/* Shining glass-shimmer light effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 animate-shimmer" />
                
                <div className="relative z-10 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
                  <span className="tracking-tight font-extrabold drop-shadow-sm">최고의 상품 10개 보기</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0 text-white/90" />
                </div>
              </motion.button>
              <p className="text-[11px] font-extrabold text-[#2E1044]/90 mt-2.5 tracking-tight flex items-center gap-1 select-none">
                {showTop10View && '성능 또는 가성비에서 탑인 제품만 소개합니다'}
              </p>
            </div>
          )}

          {/* Conditional View: Top 10 View vs Main Product Grid */}
          {showTop10View ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 pt-1"
            >
              {/* Header Navigation & Filter Tabs */}
              <div className="px-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <button
                  onClick={() => setShowTop10View(false)}
                  className="flex items-center justify-center gap-1 text-xs font-bold text-purple-900 bg-white/90 backdrop-blur hover:bg-white px-3 py-1.5 rounded-xl border border-purple-100 shadow-xs transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>메인으로</span>
                </button>

                {/* Filter Tabs for 전체, 가성비, 성능 */}
                <div className="flex items-center justify-center bg-white/90 backdrop-blur p-1 rounded-xl border border-purple-100 shadow-xs text-[11px] font-extrabold gap-1">
                  <button
                    onClick={() => setTopTab('all')}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${topTab === 'all' ? 'bg-purple-950 text-white shadow-xs' : 'text-slate-600 hover:text-purple-900'}`}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setTopTab('cost_effective')}
                    className={`px-3 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${topTab === 'cost_effective' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-700'}`}
                  >
                    <span>💡 가성비</span>
                  </button>
                  <button
                    onClick={() => setTopTab('performance')}
                    className={`px-3 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${topTab === 'performance' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-indigo-700'}`}
                  >
                    <span>⚡ 성능</span>
                  </button>
                </div>
              </div>

              {/* 전체 Tab View */}
              {topTab === 'all' && (
                <div className="px-3">
                  {top10Products.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {top10Products.map(product => renderProductCard(product))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-xs font-bold text-white/70 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
                      등록된 추천 상품이 없습니다.
                    </div>
                  )}
                </div>
              )}

              {/* 가성비 Tab View */}
              {topTab === 'cost_effective' && (
                <div className="px-3">
                  {costEffectiveProducts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {costEffectiveProducts.map(product => renderProductCard(product))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-xs font-bold text-white/70 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
                      등록된 가성비 상품이 없습니다.
                    </div>
                  )}
                </div>
              )}

              {/* 성능 Tab View */}
              {topTab === 'performance' && (
                <div className="px-3">
                  {performanceProducts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {performanceProducts.map(product => renderProductCard(product))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-xs font-bold text-white/70 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
                      등록된 성능 추천 상품이 없습니다.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            /* Main Product Grid categorized into 2 sections */
            <div className="space-y-6">
              {searchQuery ? (
                /* Search Results View */
                <div className="space-y-3">
                  <div className="px-4 text-xs font-black text-[#2E1044] flex items-center justify-between">
                    <span>🔍 "{searchQuery}" 검색 결과 ({sortedProducts.length}개)</span>
                  </div>
                  {sortedProducts.length > 0 ? (
                    <div className="px-3">
                      <div className="grid grid-cols-3 gap-2">
                        {sortedProducts.map(product => renderProductCard(product))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 px-4 bg-white mx-4 rounded-2xl border border-purple-100 shadow-xs">
                      <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <h3 className="text-xs font-bold text-slate-800">원하시는 조건의 상품이 없습니다</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">검색어를 바꾸거나 다시 시도해 보세요.</p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-3 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        검색 초기화
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Main 2-Category Layout */
                <>
                  {/* Category 1: 요즘 가장 인기 있는 아이템 */}
                  <div className="space-y-2.5">
                    <div className="text-center">
                      <h2 className="text-xs font-black text-[#2E1044] tracking-tight inline-flex items-center gap-1 select-none">
                        🔥 요즘 가장 인기 있는 아이템
                      </h2>
                    </div>
                    {sortedProducts.filter(p => (p.section || 'popular') === 'popular').length > 0 ? (
                      <div className="px-3">
                        <div className="grid grid-cols-3 gap-2">
                          {sortedProducts.filter(p => (p.section || 'popular') === 'popular').map(product => renderProductCard(product))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 px-4 bg-white/60 mx-4 rounded-xl border border-purple-100 text-[11px] font-semibold text-slate-400">
                        등록된 인기 아이템이 없습니다.
                      </div>
                    )}
                  </div>

                  {/* Category 2: 유명인들이 추천하는 상품 */}
                  <div className="space-y-2.5 pt-3 border-t border-purple-100/60">
                    <div className="text-center">
                      <h2 className="text-xs font-black text-[#2E1044] tracking-tight inline-flex items-center gap-1 select-none">
                        ⭐ 유명인들이 추천하는 상품 ⭐
                      </h2>
                    </div>
                    {sortedProducts.filter(p => p.section === 'celeb').length > 0 ? (
                      <div className="px-3">
                        <div className="grid grid-cols-3 gap-2">
                          {sortedProducts.filter(p => p.section === 'celeb').map(product => renderProductCard(product))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 px-4 bg-white/60 mx-4 rounded-xl border border-purple-100 text-[11px] font-semibold text-slate-400">
                        등록된 유명인 추천 상품이 없습니다.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* External / Family Site Card Banner */}
          <div className="mx-4 mt-6 p-3.5 bg-gradient-to-r from-purple-50 via-white to-purple-50/50 rounded-2xl border border-purple-200/80 shadow-2xs flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-black text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-md">공식 사이트</span>
                  <span className="text-[11px] font-black text-slate-800 truncate">{familySiteConfig.name}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{familySiteConfig.desc}</p>
              </div>
            </div>
            <a
              href={familySiteConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs group"
            >
              <span>방문하기</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Footer legal disclaimer */}
          <div className="px-4 text-center text-[8px] text-slate-400 leading-normal space-y-1 pb-4">
            <p>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
            <p>© 2026 COUPARTNERS. All Rights Reserved.</p>
          </div>

        </div>
      </div>

      {/* TOAST NOTIFICATION */}

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full border border-slate-100 shadow-2xl relative my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/60 hover:bg-slate-900 backdrop-blur-md text-white p-2.5 rounded-full transition shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1">
                {/* Image panel */}
                <div className="relative bg-white aspect-[3/4] w-full overflow-hidden p-4">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details info body */}
                <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                        {CATEGORIES.find(c => c.id === selectedProduct.category)?.label}
                      </span>
                      {selectedProduct.isBest && (
                        <span className="text-amber-500 text-xs font-extrabold flex items-center space-x-1">
                          <span>⭐️ 실시간 추천 베스트</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg md:text-xl font-black text-slate-950 leading-snug whitespace-pre-line">
                      {selectedProduct.title}
                    </h2>

                    {/* Tag list */}
                    {selectedProduct.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-lg">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-1 pt-2">
                      <h4 className="text-xs font-bold text-slate-400">MD 추천 및 상세 특징</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {selectedProduct.description || '이 상품은 실용성과 높은 가성비를 고루 갖춘 특별 기획 추천 상품입니다.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    {/* Share & Disclaimer info */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[10px] text-slate-500 space-y-1">
                      <p className="leading-normal">
                        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다. 본 수수료를 통해 본 사이트가 안정적으로 유지되며, 소비자 구매가에는 일절 변동이 없습니다.
                      </p>
                    </div>

                    {/* Affiliate CTAs */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={(e) => handleShareProduct(selectedProduct, e)}
                        className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                        <span>추천 링크 복사</span>
                      </button>
                      <a
                        href={selectedProduct.coupangUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        rel="noopener noreferrer"
                        className="flex-2 bg-red-500 hover:bg-red-600 text-white text-center py-3.5 rounded-2xl text-xs font-extrabold transition flex items-center justify-center space-x-1 shadow-md shadow-red-500/20"
                      >
                        <span>쿠팡 최저가로 구매하러 가기</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LINK SHARE MODAL (Native System Style Bottom Sheet) */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="bg-[#F6F7F9] rounded-t-[28px] sm:rounded-3xl p-5 max-w-sm sm:max-w-md w-full border border-slate-200 shadow-2xl relative space-y-4"
            >
              {/* Top Grab Bar for Mobile Sheet */}
              <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto -mt-1 mb-1 sm:hidden" />

              {/* Modal Header */}
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-base font-extrabold text-slate-900">
                  링크 공유
                </h3>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/60 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Link Card */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex flex-col items-center justify-center text-white font-black text-[9px] leading-tight shrink-0 shadow-xs">
                  <span>HAPIX</span>
                  <span className="text-[7px] opacity-80">LINK</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-xs font-bold text-slate-900 truncate">Hapix</div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">https://sotre.netlify.app/</div>
                </div>
                <button
                  onClick={handleCopyShareLink}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 p-2.5 rounded-xl border border-slate-200 transition shadow-xs cursor-pointer shrink-0"
                  title="복사하기"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Quick Action Pills Row */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNativeShare}
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-800 text-[11px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
                >
                  <Laptop className="w-3.5 h-3.5 text-slate-600" />
                  <span>기기로 보내기</span>
                </button>
                <button
                  onClick={() => setShowQrCode(!showQrCode)}
                  className={`flex-1 border text-[11px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer ${
                    showQrCode 
                      ? 'bg-purple-50 border-purple-300 text-purple-900' 
                      : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5 text-slate-600" />
                  <span>QR 코드</span>
                </button>
              </div>

              {/* QR Code Section Toggle */}
              <AnimatePresence>
                {showQrCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-2 shadow-inner"
                  >
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://sotre.netlify.app/"
                      alt="Hapix QR Code"
                      className="w-36 h-36 mx-auto rounded-xl border border-slate-100 p-1"
                    />
                    <p className="text-[10px] text-slate-500 font-semibold">
                      스마트폰 카메라로 QR 코드를 스캔하여 접속하세요
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* App Icons Share Grid (Matches image grid: Quick Share, KakaoTalk, Discord, Instagram, Gmail) */}
              <div className="pt-2">
                <p className="text-[10px] font-bold text-slate-400 mb-2.5 text-left px-1">앱으로 바로 공유하기</p>
                <div className="grid grid-cols-5 gap-2 text-center">
                  
                  {/* Quick Share */}
                  <button
                    onClick={handleNativeShare}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">퀵 셰어</span>
                  </button>

                  {/* KakaoTalk */}
                  <button
                    onClick={() => {
                      handleCopyShareLink();
                      setToastMessage('카카오톡 공유 링크 복사 완료!');
                    }}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FEE500] text-[#191919] flex items-center justify-center shadow-md group-hover:scale-105 transition">
                      <svg className="w-5 h-5 fill-[#3C1E1E]" viewBox="0 0 24 24">
                        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.122.49.18.484.378.353.156-.103 2.486-1.69 3.5-2.38.52.076 1.055.118 1.632.118 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">카카오톡</span>
                  </button>

                  {/* Discord */}
                  <button
                    onClick={() => {
                      handleCopyShareLink();
                      setToastMessage('디스코드 공유 링크 복사 완료!');
                    }}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#5865F2] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">Discord</span>
                  </button>

                  {/* Instagram */}
                  <button
                    onClick={() => {
                      handleCopyShareLink();
                      setToastMessage('인스타그램 공유 링크 복사 완료!');
                    }}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">Instagram</span>
                  </button>

                  {/* Gmail */}
                  <a
                    href={`mailto:?subject=Hapix%20스토어&body=가성비%20완벽%20추천%20스토어:%20${encodeURIComponent(SHARE_URL)}`}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center shadow-md group-hover:scale-105 transition">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">Gmail</span>
                  </a>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl border border-white/10 backdrop-blur-md flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
