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
  EyeOff
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
  // Products State (Loaded from localStorage, always ensuring the newly requested BenQ monitor is present)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('coupang_products');
    let loadedProducts: Product[] = [];
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Product[];
        // Filter out old default preset products (ids '1' to '9') to ensure a clean starting slate
        loadedProducts = parsed.filter(p => {
          const idNum = parseInt(p.id, 10);
          return isNaN(idNum) || idNum < 1 || idNum > 9;
        });
      } catch (e) {
        console.error('Failed to parse products', e);
      }
    }

    // Always guarantee custom non-numeric default products exist in the list and hold the latest default metadata
    const nonNumericDefaults = DEFAULT_PRODUCTS.filter(p => isNaN(parseInt(p.id, 10)));
    
    // We reverse it to maintain their original relative order when prepending
    for (const defaultProduct of [...nonNumericDefaults].reverse()) {
      const hasProduct = loadedProducts.some(p => p.id === defaultProduct.id);
      if (hasProduct) {
        loadedProducts = loadedProducts.map(p => {
          if (p.id === defaultProduct.id) {
            return {
              ...p,
              title: defaultProduct.title,
              imageUrl: defaultProduct.imageUrl,
              coupangUrl: defaultProduct.coupangUrl,
              originalPrice: defaultProduct.originalPrice,
              salePrice: defaultProduct.salePrice,
              discountRate: defaultProduct.discountRate,
              isRocket: defaultProduct.isRocket,
              isBest: defaultProduct.isBest,
            };
          }
          return p;
        });
      } else {
        loadedProducts = [defaultProduct, ...loadedProducts];
      }
    }
    return loadedProducts;
  });

  // Profile Settings State
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('coupang_profile_name') || '살림토끼';
  });
  const [profileHandle, setProfileHandle] = useState(() => {
    return localStorage.getItem('coupang_profile_handle') || 'sallim_rabbit';
  });
  const [profileColor, setProfileColor] = useState(() => {
    return localStorage.getItem('coupang_profile_color') || '#FF6E8F';
  });
  const [profileContact, setProfileContact] = useState(() => {
    return localStorage.getItem('coupang_profile_contact') || 'dbgustjs110@gmail.com';
  });

  // Save profile settings
  useEffect(() => {
    localStorage.setItem('coupang_profile_name', profileName);
    localStorage.setItem('coupang_profile_handle', profileHandle);
    localStorage.setItem('coupang_profile_color', profileColor);
    localStorage.setItem('coupang_profile_contact', profileContact);
  }, [profileName, profileHandle, profileColor, profileContact]);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('coupang_products', JSON.stringify(products));
  }, [products]);

  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('discount');
  const [onlyRocket, setOnlyRocket] = useState(false);
  const [highDiscountOnly, setHighDiscountOnly] = useState(false);

  // UI Modals & Panels State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminPinError, setAdminPinError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'list' | 'analytics'>('list');
  const [noticeClickCount, setNoticeClickCount] = useState(0);
  const [lastNoticeClickTime, setLastNoticeClickTime] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    const saved = localStorage.getItem('hapix_failed_attempts');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lockoutUntil, setLockoutUntil] = useState<number>(() => {
    const saved = localStorage.getItem('hapix_lockout_until');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // Sync failed attempts and lockout to LocalStorage for persistent security
  useEffect(() => {
    localStorage.setItem('hapix_failed_attempts', failedAttempts.toString());
  }, [failedAttempts]);

  useEffect(() => {
    localStorage.setItem('hapix_lockout_until', lockoutUntil.toString());
  }, [lockoutUntil]);

  // Add/Edit Product Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formProduct, setFormProduct] = useState<Partial<Product> | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Share Notification Toast
  const [toastMessage, setToastMessage] = useState('');

  // Hero banner index
  const [heroIndex, setHeroIndex] = useState(0);

  // Filter best products for the hero banner
  const bestProducts = products.filter(p => p.isBest).slice(0, 3);
  const bannerProducts = bestProducts.length > 0 ? bestProducts : products.slice(0, 3);

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

  // Handle Search & Filter logic
  const filteredProducts = products.filter(product => {
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

  // Lockout countdown timer using persistent lockoutUntil timestamp from LocalStorage
  useEffect(() => {
    const checkLockout = () => {
      const now = Date.now();
      if (lockoutUntil > now) {
        setLockoutTimeLeft(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        setLockoutTimeLeft(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Silent 10-tap secret admin trigger (10 clicks within 3 seconds)
  const handleNoticeClick = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      triggerToast('관리자 모드가 해제되었습니다.');
      setNoticeClickCount(0);
      return;
    }
    const now = Date.now();
    // If it's the first click or the 3-second window has passed since the FIRST click of the current sequence
    if (noticeClickCount === 0 || now - lastNoticeClickTime > 3000) {
      setNoticeClickCount(1);
      setLastNoticeClickTime(now); // Store the timestamp of the FIRST click of this sequence
    } else {
      const nextCount = noticeClickCount + 1;
      if (nextCount >= 10) {
        setShowAdminLogin(true);
        setNoticeClickCount(0);
        triggerToast('보안 관리자 모드 로그인 창이 활성화되었습니다.');
      } else {
        setNoticeClickCount(nextCount);
      }
    }
  };

  // Admin Verification (PIN Code: 1233 with persistent anti-brute-force progressive lockout safety)
  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    if (lockoutUntil > now) {
      const timeLeft = Math.ceil((lockoutUntil - now) / 1000);
      setAdminPinError(`보안 규정에 따라 ${timeLeft}초 동안 로그인이 일시 정지됩니다.`);
      return;
    }

    if (adminPinInput === '1233') {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminPinInput('');
      setAdminPinError('');
      setFailedAttempts(0);
      setLockoutUntil(0);
      triggerToast('관리자 인증에 성공하였습니다.');
    } else {
      const nextFailed = failedAttempts + 1;
      setFailedAttempts(nextFailed);

      if (nextFailed >= 15) {
        const penalty = 3600; // 1 hour lockout for 15+ fails
        setLockoutUntil(Date.now() + penalty * 1000);
        setAdminPinError('비밀번호 오류 15회 초과! 강력한 공격 방어 조치로 1시간 동안 로그인이 금지됩니다.');
      } else if (nextFailed >= 10) {
        const penalty = 300; // 5 mins lockout for 10 fails
        setLockoutUntil(Date.now() + penalty * 1000);
        setAdminPinError('비밀번호 오류 10회 초과! 계정 도용 방지를 위해 5분 동안 로그인이 금지됩니다.');
      } else if (nextFailed >= 5) {
        const penalty = 30; // 30s lockout for 5 fails
        setLockoutUntil(Date.now() + penalty * 1000);
        setAdminPinError('비밀번호 오류 5회 초과! 보안 수칙에 따라 30초 동안 로그인이 금지됩니다.');
      } else {
        setAdminPinError(`비밀번호가 올바르지 않습니다. (현재 무단 시도: ${nextFailed}회 / 5회 초과 시 일시 잠금)`);
      }
    }
  };

  // Logout Admin
  const handleAdminLogout = () => {
    setIsAdminMode(false);
    triggerToast('관리자 모드가 해제되었습니다.');
  };

  // Delete Product
  const handleDeleteProduct = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('이 상품을 추천 목록에서 삭제하시겠습니까?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      triggerToast('상품이 삭제되었습니다.');
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
    }
  };

  // Open Form to Add New Product
  const handleOpenAddForm = () => {
    setFormProduct({
      id: '',
      title: '',
      category: 'digital',
      originalPrice: 0,
      salePrice: 0,
      coupangUrl: '',
      imageUrl: '',
      description: '',
      isRocket: true,
      isBest: false,
      tags: [],
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Open Form to Edit Existing Product
  const handleOpenEditForm = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormProduct({
      ...product,
      tags: [...product.tags]
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Save Add/Edit Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProduct) return;

    // Validate
    const errors: Record<string, string> = {};
    if (!formProduct.title?.trim()) errors.title = '상품명을 입력해주세요.';
    if (!formProduct.coupangUrl?.trim()) errors.coupangUrl = '쿠팡 파트너스 링크를 입력해주세요.';
    if (!formProduct.imageUrl?.trim()) errors.imageUrl = '이미지 URL을 선택하거나 입력해주세요.';
    if (!formProduct.originalPrice || formProduct.originalPrice <= 0) errors.originalPrice = '정상가를 입력해주세요.';
    if (!formProduct.salePrice || formProduct.salePrice <= 0) errors.salePrice = '할인가를 입력해주세요.';
    if (formProduct.originalPrice && formProduct.salePrice && formProduct.salePrice > formProduct.originalPrice) {
      errors.salePrice = '할인 가격은 정상가보다 낮아야 합니다.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Auto-calculate discount rate
    const orig = formProduct.originalPrice || 0;
    const sale = formProduct.salePrice || 0;
    const computedDiscount = Math.max(0, Math.round(((orig - sale) / orig) * 100));

    const finalProduct: Product = {
      id: formProduct.id || Date.now().toString(),
      title: formProduct.title || '',
      category: formProduct.category || 'digital',
      originalPrice: orig,
      salePrice: sale,
      discountRate: computedDiscount,
      coupangUrl: formProduct.coupangUrl || '',
      imageUrl: formProduct.imageUrl || '',
      description: formProduct.description || '',
      isRocket: !!formProduct.isRocket,
      isBest: !!formProduct.isBest,
      tags: formProduct.tags || [],
      createdAt: formProduct.createdAt || new Date().toISOString()
    };

    if (formProduct.id) {
      // Edit mode
      setProducts(prev => prev.map(p => p.id === formProduct.id ? finalProduct : p));
      triggerToast('상품 정보가 수정되었습니다.');
    } else {
      // Add mode
      setProducts(prev => [finalProduct, ...prev]);
      triggerToast('새로운 추천 상품이 등록되었습니다.');
    }

    setIsFormOpen(false);
    setFormProduct(null);
  };

  // Reset to Defaults
  const handleResetToDefaults = () => {
    if (window.confirm('전체 상품 목록을 초기 기본 상품들로 복원하시겠습니까? (추가하신 상품은 사라집니다)')) {
      setProducts(DEFAULT_PRODUCTS);
      triggerToast('기본 추천 상품들로 초기화되었습니다.');
    }
  };

  // Clear Catalog
  const handleClearCatalog = () => {
    if (window.confirm('등록된 모든 추천 상품을 삭제하시겠습니까?')) {
      setProducts([]);
      triggerToast('전체 목록이 삭제되었습니다.');
    }
  };

  // Export Catalog as JSON
  const handleExportCatalog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `coupang_partners_catalog_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('카탈로그 JSON 파일 백업이 시작되었습니다.');
  };

  // Import Catalog via File Upload
  const handleImportCatalog = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            // Basic validation
            const isValid = parsed.every(item => item.title && item.coupangUrl && item.imageUrl);
            if (isValid) {
              setProducts(parsed);
              triggerToast(`성공적으로 ${parsed.length}개의 상품을 가져왔습니다.`);
            } else {
              alert('올바르지 않은 백업 파일 형식입니다. 필수 필드(상품명, 쿠팡링크, 이미지)가 누락되었습니다.');
            }
          } else {
            alert('올바르지 않은 백업 파일 형식입니다. 배열 포맷이어야 합니다.');
          }
        } catch (error) {
          alert('JSON 파일을 구문 분석하는 도중 오류가 발생했습니다.');
        }
      };
    }
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

  // Calculate stats for Admin Analytics Panel
  const totalItems = products.length;
  const avgDiscount = totalItems > 0 
    ? Math.round(products.reduce((acc, p) => acc + p.discountRate, 0) / totalItems) 
    : 0;
  const rocketCount = products.filter(p => p.isRocket).length;
  const categoryStats = CATEGORIES.filter(c => c.id !== 'all').map(cat => {
    return {
      name: cat.label,
      count: products.filter(p => p.category === cat.id).length
    };
  });

  const categoryTitles: Record<string, string> = {
    digital: '💻 삶의 질 수직상승 디지털/가전 ⚡️',
    kitchen: '🍳 감성 가득 홈/주방 필수템 🏡',
    fashion: '👕 매일 입고 싶은 데일리 패션 🧥',
    beauty: '✨ 꿀피부 보장 뷰티/화장품 🌸',
    food: '🍿 마성의 간식 & 먹거리 리스트 🍩',
    sports: '💪 오운완 완성 스포츠/피트니스 🚴',
    other: '🎁 나만 알고 싶은 꿀템 모음 🎉'
  };

  const renderProductCard = (product: Product) => (
    <motion.div
      layout
      key={product.id}
      onClick={() => {
        if (product.coupangUrl) {
          window.open(product.coupangUrl, '_blank', 'noopener,noreferrer');
        }
      }}
      className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col relative cursor-pointer group"
    >
      {/* Admin controls */}
      {isAdminMode && (
        <div className="absolute top-1 left-1 z-10 flex gap-0.5">
          <button
            onClick={(e) => handleOpenEditForm(product, e)}
            className="bg-white/95 p-1 rounded shadow-sm border border-slate-100"
            title="상품 수정"
          >
            <Edit2 className="w-2.5 h-2.5 text-blue-600" />
          </button>
          <button
            onClick={(e) => handleDeleteProduct(product.id, e)}
            className="bg-white/95 p-1 rounded shadow-sm border border-slate-100 text-red-600"
            title="상품 삭제"
          >
            <Trash2 className="w-2.5 h-2.5" />
          </button>
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-[16/9] w-full bg-slate-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition group-hover:scale-105 duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Text body */}
      <div className="p-1.5 flex-1 flex flex-col justify-center text-center min-h-[46px]">
        <h4 className="text-[10px] font-extrabold text-slate-800 line-clamp-2 leading-tight tracking-tight select-none">
          {product.title}
        </h4>
      </div>
    </motion.div>
  );

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

      {/* Admin Dashboard Control Panel (Visible in Admin Mode) */}
      {isAdminMode && (
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[420px] mb-4 bg-white rounded-2xl p-4 border border-red-200 shadow-lg space-y-4 text-left"
        >
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>파트너스 관리자 센터</span>
              </h2>
              <p className="text-[10px] text-slate-500 mt-0.5">나만의 제휴 마케팅 링크와 프로필을 실시간 편집하세요.</p>
            </div>

            {/* Tab Toggles */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg self-start">
              <button
                onClick={() => setActiveAdminTab('list')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition ${activeAdminTab === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                상품 관리
              </button>
              <button
                onClick={() => setActiveAdminTab('analytics')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition ${activeAdminTab === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                실시간 통계
              </button>
            </div>
          </div>

          {activeAdminTab === 'list' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <button
                  id="add-product-btn"
                  onClick={handleOpenAddForm}
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>상품 등록</span>
                </button>
                <button
                  onClick={handleExportCatalog}
                  className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-[10px] font-bold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>내보내기</span>
                </button>
                <label className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-[10px] font-bold transition cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>가져오기</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportCatalog}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleResetToDefaults}
                  className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-[10px] font-bold transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>기본 복원</span>
                </button>
                <button
                  onClick={handleClearCatalog}
                  className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl text-[10px] font-bold transition border border-red-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>전체 삭제</span>
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center space-x-1 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold transition ml-auto"
                >
                  <span>로그아웃</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold block">총 등록 상품</span>
                <p className="text-sm font-black text-slate-900 mt-0.5">{totalItems}개</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold block">평균 할인율</span>
                <p className="text-sm font-black text-red-500 mt-0.5">{avgDiscount}%</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold block">로켓배송 비율</span>
                <p className="text-sm font-black text-blue-600 mt-0.5">
                  {totalItems > 0 ? Math.round((rocketCount / totalItems) * 100) : 0}%
                </p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold block">베스트 추천 배너</span>
                <p className="text-sm font-black text-amber-500 mt-0.5">
                  {products.filter(p => p.isBest).length}개
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Main PHONE CONTAINER */}
      <div className="w-full max-w-[420px] bg-[#F5EEFC] min-h-screen sm:min-h-[780px] rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl relative flex flex-col overflow-hidden border-0 sm:border border-purple-900/20">
        
        {/* Sticky Legal Banner Warning Header with Purple Marquee Design */}
        <div 
          onClick={handleNoticeClick}
          className="bg-[#2E1044] text-purple-100 text-xs py-3.5 sticky top-0 z-20 overflow-hidden w-full cursor-pointer select-none border-b border-purple-950/50 flex items-center shadow-md"
          title="파트너스 알림 (10번 연속 클릭 시 관리자 설정)"
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
          
          {/* Hapix Store Title */}
          <div className="flex flex-col items-center pt-5 pb-1">
            <h1 
              onClick={handleNoticeClick}
              className="text-2xl font-black text-[#2E1044] tracking-tight hover:scale-105 transition cursor-pointer select-none"
              title="10번 연속 클릭 시 관리자 설정"
            >
              Hapix
            </h1>
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
            <div className="px-4 -mt-1 flex justify-center">
              <button 
                onClick={() => window.open('https://link.coupang.com/a/fnPPvTMbUy', '_blank', 'noopener,noreferrer')}
                className="w-full max-w-[220px] bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md active:scale-[0.99] cursor-pointer"
              >
                <span>✨ 최고의 상품 10개 보러가기</span>
              </button>
            </div>
          )}

          {/* Main Product Grid */}
          <div className="space-y-4">
            {sortedProducts.length > 0 ? (
              <div className="px-3">
                <div className="grid grid-cols-3 gap-2">
                  {sortedProducts.map(product => renderProductCard(product))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 px-4 bg-white mx-4 rounded-2xl border border-purple-100 shadow-sm">
                <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h3 className="text-xs font-bold text-slate-800">원하시는 조건의 상품이 없습니다</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">검색어를 바꾸거나 다시 시도해 보세요.</p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg transition"
                  >
                    검색 초기화
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer legal disclaimer */}
          <div className="px-4 text-center text-[8px] text-slate-400 leading-normal space-y-1 pb-4">
            <p>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
            <p>© 2026 COUPARTNERS. All Rights Reserved.</p>
          </div>

        </div>
      </div>

      {/* ADMIN PIN LOGIN MODAL */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-100 shadow-2xl relative"
            >
              <button 
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPinInput('');
                  setAdminPinError('');
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <div className="mx-auto bg-red-100 text-red-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">제휴 관리자 모드 잠금 해제</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  새로운 쿠팡 파트너스 링크 및 상품 정보를 등록/수정하기 위해 관리자 비밀번호를 입력해주세요.
                </p>
              </div>

              <form onSubmit={handleAdminVerify} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">비밀번호 (PIN Code)</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      maxLength={10}
                      value={adminPinInput}
                      onChange={(e) => setAdminPinInput(e.target.value)}
                      placeholder="비밀번호 입력"
                      disabled={lockoutTimeLeft > 0}
                      className="w-full text-center bg-slate-50 border border-slate-200 py-3 px-10 rounded-2xl text-lg font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 disabled:bg-slate-100 disabled:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {adminPinError && (
                    <p className="text-red-500 text-xs mt-2.5 font-semibold text-center leading-normal">
                      {adminPinError}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminLogin(false);
                      setAdminPinInput('');
                      setAdminPinError('');
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl text-xs font-bold transition cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl text-xs font-bold transition shadow-md shadow-red-500/10 cursor-pointer"
                  >
                    로그인 승인
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                <div className="relative bg-slate-50 aspect-[16/9] w-full">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
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

                    <h2 className="text-lg md:text-xl font-black text-slate-950 leading-snug">
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

      {/* ADD/EDIT PRODUCT FORM MODAL (Admin only) */}
      <AnimatePresence>
        {isFormOpen && formProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full border border-slate-100 shadow-2xl relative my-8"
            >
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setFormProduct(null);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-black text-slate-900">
                  {formProduct.id ? '기존 추천 상품 수정' : '새로운 제휴 파트너스 상품 등록'}
                </h3>
                <p className="text-xs text-slate-500">쿠팡에서 획득한 파트너스 배너/상품 링크와 단가, 특징을 입력해주세요.</p>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">상품명 (공식 명칭)</label>
                  <input
                    type="text"
                    value={formProduct.title || ''}
                    onChange={(e) => setFormProduct({ ...formProduct, title: e.target.value })}
                    placeholder="예: Apple 2024 아이패드 에어 11형 M2칩 Wi-Fi 128GB"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  />
                  {formErrors.title && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.title}</p>}
                </div>

                {/* Category & Rocket / Best Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">카테고리</label>
                    <select
                      value={formProduct.category || 'digital'}
                      onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-center border border-slate-100 bg-slate-50/50 p-2.5 rounded-xl">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formProduct.isRocket}
                        onChange={(e) => setFormProduct({ ...formProduct, isRocket: e.target.checked })}
                        className="rounded border-slate-300 text-red-500 focus:ring-red-500 w-4 h-4"
                      />
                      <span className="text-xs font-bold text-slate-600">🚀 로켓배송 적용</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-center border border-slate-100 bg-slate-50/50 p-2.5 rounded-xl">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formProduct.isBest}
                        onChange={(e) => setFormProduct({ ...formProduct, isBest: e.target.checked })}
                        className="rounded border-slate-300 text-red-500 focus:ring-red-500 w-4 h-4"
                      />
                      <span className="text-xs font-bold text-slate-600">⭐️ 베스트 배너 노출</span>
                    </label>
                  </div>
                </div>

                {/* Price original vs sale */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">정상 판매가 (원)</label>
                    <input
                      type="number"
                      value={formProduct.originalPrice || ''}
                      onChange={(e) => setFormProduct({ ...formProduct, originalPrice: parseInt(e.target.value) || 0 })}
                      placeholder="예: 899000"
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                    {formErrors.originalPrice && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.originalPrice}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">제휴 할인 가격 (원)</label>
                    <input
                      type="number"
                      value={formProduct.salePrice || ''}
                      onChange={(e) => setFormProduct({ ...formProduct, salePrice: parseInt(e.target.value) || 0 })}
                      placeholder="예: 835000"
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                    {formErrors.salePrice && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.salePrice}</p>}
                  </div>
                </div>

                {/* Coupang Partners Link */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">쿠팡 파트너스 링크 (Affiliate URL)</label>
                  <input
                    type="url"
                    value={formProduct.coupangUrl || ''}
                    onChange={(e) => setFormProduct({ ...formProduct, coupangUrl: e.target.value })}
                    placeholder="예: https://link.coupang.com/a/..."
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  {formErrors.coupangUrl && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.coupangUrl}</p>}
                </div>

                {/* Image selection and Custom input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-500">상품 대표 이미지 URL</label>
                    <span className="text-[10px] text-slate-400">아래 프리셋을 선택하면 고화질 이미지가 자동 완성됩니다</span>
                  </div>
                  <input
                    type="url"
                    value={formProduct.imageUrl || ''}
                    onChange={(e) => setFormProduct({ ...formProduct, imageUrl: e.target.value })}
                    placeholder="예: https://images.unsplash.com/photo-..."
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  {formErrors.imageUrl && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.imageUrl}</p>}

                  {/* Preset Selector */}
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
                    {PRESET_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormProduct({ ...formProduct, imageUrl: img.url })}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${formProduct.imageUrl === img.url ? 'border-red-500' : 'border-transparent hover:border-slate-300'}`}
                        title={img.label}
                      >
                        <img src={img.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags (comma separated) */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">태그 (쉼표로 구분)</label>
                  <input
                    type="text"
                    value={formProduct.tags?.join(', ') || ''}
                    onChange={(e) => {
                      const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
                      setFormProduct({ ...formProduct, tags: tagsArray });
                    }}
                    placeholder="예: 아이패드, 애플, 추천선물"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">MD 추천평 및 상세 스펙 특징</label>
                  <textarea
                    rows={3}
                    value={formProduct.description || ''}
                    onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                    placeholder="사용자에게 유용한 할인 정보, 실용적인 사유, 기능적 이점을 친절하게 설명해주세요."
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false);
                      setFormProduct(null);
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-xs font-bold transition shadow-md shadow-red-500/10 cursor-pointer"
                  >
                    {formProduct.id ? '수정 사항 적용' : '추천 상품 저장'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
