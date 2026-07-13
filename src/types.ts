/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  coupangUrl: string;
  imageUrl: string;
  description: string;
  isRocket: boolean; // Is it rocket delivery?
  isBest: boolean; // Highlighted or best seller
  tags: string[];
  createdAt: string;
}

export const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'digital', label: '가전/디지털' },
  { id: 'kitchen', label: '홈/주방' },
  { id: 'fashion', label: '패션/의류' },
  { id: 'beauty', label: '뷰티/화장품' },
  { id: 'food', label: '식품/생필품' },
  { id: 'sports', label: '스포츠/레저' },
  { id: 'other', label: '기타' }
];

export const SORT_OPTIONS = [
  { id: 'discount', label: '할인율 높은순' },
  { id: 'low-price', label: '낮은 가격순' },
  { id: 'high-price', label: '높은 가격순' },
  { id: 'newest', label: '최신 등록순' }
];
