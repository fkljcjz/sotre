/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';
import benqMonitorImg from './assets/images/benq_monitor_1784038159423.jpg';
import alubarPowerstripImg from './assets/images/alubar_powerstrip_perfect_replica_1784489797658.jpg';
import toiletPaperRollsImg from './assets/images/zalpullineun_tissue_exact_1784479641126.jpg';
import flyingSpinnerBallImg from './assets/images/flying_spinner_ball_1784529305695.jpg';
import greenAppleSquishyImg from './assets/images/cheongsagwa_wakppuball_1784795207533.jpg';
import dubaiChewyCookieImg from './assets/images/dubai_chewy_cookie_1784981147819.jpg';
import monsterPrivacyGlassImg from './assets/images/monster_privacy_glass_1785091944927.jpg';
import koreanHoneyWatermelonImg from './assets/images/korean_honey_watermelon_1785310075611.jpg';
import cartoonBeamProjectorImg from './assets/images/cartoon_beam_projector_1785391487368.jpg';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'monster_privacy_glass',
    title: '몬스터 사생활보호 강화유리 필름 (2매)',
    category: 'digital',
    originalPrice: 25900,
    salePrice: 15900,
    discountRate: 38,
    coupangUrl: 'https://link.coupang.com/a/fNMB5ZcevA',
    imageUrl: monsterPrivacyGlassImg,
    description: '옆사람 시선 완벽 차단! 몬스터 28도 엿보기 방지 사생활 보호 강화유리 필름 2매 세트. 9H 고강도 표면 경도로 강력한 스크래치 방지, 지문 방지 AF 코팅 및 쉬운 부착 가이드로 기포 없이 깔끔하게 부착할 수 있습니다.',
    isRocket: true,
    isBest: true,
    tags: ['몬스터', '사생활보호필름', '강화유리', '아이폰필름', '엿보기방지', '액정보호필름'],
    createdAt: '2026-07-26T11:50:00Z',
    topType: 'performance',
    section: 'popular'
  },
  {
    id: 'benq_monitor',
    title: '01 벤큐 프리미엄 모니터',
    category: 'digital',
    originalPrice: 199000,
    salePrice: 159000,
    discountRate: 20,
    coupangUrl: 'https://link.coupang.com/a/fnPPvTMbUy',
    imageUrl: benqMonitorImg,
    description: '장시간 모니터를 사용하는 분들을 위한 최고의 시력 보호 모니터! 벤큐만의 독자적인 B.I. 테크놀로지가 주변 밝기를 감지하여 화면 밝기를 자동 조절해 눈의 피로를 최소화합니다. 슬림 베젤 디자인과 100Hz의 부드러운 주사율로 끊김 없는 멀티미디어 감상 및 웹 서핑 환경을 선사합니다.',
    isRocket: true,
    isBest: true,
    tags: ['벤큐', '모니터', '시력보호', '가성비모니터', '사무용모니터'],
    createdAt: '2026-07-14T00:00:00Z',
    section: 'celeb'
  },
  {
    id: 'alubar_powerstrip',
    title: '02 알루바프로 멀티탭\n(성능)',
    category: 'digital',
    originalPrice: 45000,
    salePrice: 35900,
    discountRate: 20,
    coupangUrl: 'https://link.coupang.com/a/fuEMWdH7f2',
    imageUrl: alubarPowerstripImg,
    description: '알루미늄 바디로 제작되어 탁월한 내구성과 세련된 안전성을 자랑하는 알루바프로 프리미엄 개별 멀티탭! 먼지 유입을 막아주고 오작동을 예방하는 개별 보호 커버 스위치가 탑재되어 화재 위험으로부터 소중한 기기를 안전하게 보호합니다. 세련된 매트 블랙 디자인으로 깔끔한 데스크테리어를 완성해보세요.',
    isRocket: true,
    isBest: true,
    tags: ['알루바프로', '멀티탭', '안전멀티탭', '알루미늄멀티탭', '데스크테리어'],
    createdAt: '2026-07-15T00:00:00Z',
    topType: 'performance',
    section: 'celeb'
  },
  {
    id: 'jalpullineun_tissue',
    title: '03 잘풀리는집 3겹 화장지',
    category: 'food',
    originalPrice: 28900,
    salePrice: 22900,
    discountRate: 20,
    coupangUrl: 'https://link.coupang.com/a/fwqv2S0nvw',
    imageUrl: toiletPaperRollsImg,
    description: '도톰하고 부드러운 3겹 구조로 피부 자극을 줄인 잘풀리는집 오리지널 맥스 소프트 화장지! 100% 천연펄프 원단에 무향, 무인쇄, 무형광으로 온 가족이 안심하고 사용할 수 있습니다. 탄탄한 4D 픽셀 엠보싱으로 흡수력이 뛰어나며, 30롤 대용량 패키지로 실용성을 더했습니다.',
    isRocket: true,
    isBest: true,
    tags: ['잘풀리는집', '롤화장지', '3겹화장지', '생필품', '천연펄프'],
    createdAt: '2026-07-19T00:00:00Z',
    section: 'celeb'
  },
  {
    id: 'honey_watermelon',
    title: '07 고당도 씨없는 꿀 수박',
    category: 'food',
    originalPrice: 36500,
    salePrice: 21900,
    discountRate: 40,
    coupangUrl: 'https://link.coupang.com/a/fNN4oXskV2',
    imageUrl: koreanHoneyWatermelonImg,
    description: '산지직송 당도선별 명품 꿀수박! 비파괴 당도 측정으로 11 Brix 이상의 아삭하고 당도 높은 프리미엄 수박만을 엄선했습니다. 시원하고 풍부한 과즙과 달콤함으로 온 가족 여름 디저트로 추천드립니다.',
    isRocket: true,
    isBest: true,
    tags: ['수박', '꿀수박', '당도선별', '신선과일', '제철과일', '여름과일'],
    createdAt: '2026-07-29T12:00:00Z',
    section: 'popular'
  },
  {
    id: 'green_apple_squishy',
    title: '06 상큼톡톡 청사과 왁뿌볼',
    category: 'other',
    originalPrice: 15900,
    salePrice: 9900,
    discountRate: 37,
    coupangUrl: 'https://link.coupang.com/a/fCh4jrrHxc',
    imageUrl: greenAppleSquishyImg,
    description: '한 손에 쏙 들어오는 귀여운 청사과 모양 왁뿌볼 스퀴시 말랑이! 쫀득쫀득하고 말랑말랑한 감촉으로 누를 때마다 스트레스가 싹 풀립니다. 상큼한 청사과 디자인에 투명하고 톡톡 터지는 질감으로 남녀노소 즐기기 좋은 인기 완구 아이템입니다.',
    isRocket: true,
    isBest: true,
    tags: ['청사과왁뿌볼', '왁뿌볼', '말랑이', '스퀴시', '장난감', '스트레스해소'],
    createdAt: '2026-07-28T12:00:00Z',
    section: 'popular'
  },
  {
    id: 'dubai_chewy_cookie',
    title: '05 신세계 두바이 쫀득 쿠키',
    category: 'food',
    originalPrice: 20800,
    salePrice: 13900,
    discountRate: 33,
    coupangUrl: 'https://link.coupang.com/a/fGcMdjR0dE',
    imageUrl: dubaiChewyCookieImg,
    description: '코코아 파우더의 깊은 풍미와 쫀득쫀득하고 부드러운 식감이 일품인 디저트! 깔끔한 투명 4구 전용 패키지에 정성스럽게 담긴 두바이 쫀득 쿠키입니다. 고소한 피스타치오와 바삭한 카다이프, 쫀득한 마시멜로우가 환상적인 조화를 이룹니다.',
    isRocket: true,
    isBest: true,
    tags: ['두바이쫀득쿠키', '두바이쿠키', '카다이프', '피스타치오', '디저트', '쫀득쿠키'],
    createdAt: '2026-07-27T12:00:00Z',
    section: 'popular'
  },
  {
    id: 'flying_spinner_ball',
    title: '04 우주비행 플라잉 스피너볼',
    category: 'other',
    originalPrice: 26800,
    salePrice: 19800,
    discountRate: 26,
    coupangUrl: 'https://link.coupang.com/a/fxfvcVSwcC',
    imageUrl: flyingSpinnerBallImg,
    description: '공중에 띄워 주고받으며 노는 신개념 모터라이즈 드론 플라잉 스피너볼! 가볍고 유연하며 복원력이 뛰어난 친환경 ABS 소재로 부딪혀도 안심하고 안전하게 사용할 수 있습니다. 아름다운 LED 라이팅이 내장되어 어두운 실내에서도 화려한 비행 쇼를 연출하며, 온 가족이 다 함께 즐기기 좋은 최고의 액티비티 완구입니다.',
    isRocket: true,
    isBest: true,
    tags: ['플라잉볼', '스피너볼', '우주비행볼', '장난감', '어린이선물'],
    createdAt: '2026-07-26T12:00:00Z',
    section: 'popular'
  },
  {
    id: 'cartoon_beam_projector',
    title: '08 귀여운 만화 빔 프로젝터',
    category: 'digital',
    originalPrice: 22000,
    salePrice: 12900,
    discountRate: 41,
    coupangUrl: 'https://link.coupang.com/a/fNN8nsrNGS',
    imageUrl: cartoonBeamProjectorImg,
    description: '자동차, 전기차, 오토바이, 자전거 모두 사용 가능! 선명하고 선명한 LED 광원으로 바닥에 귀여운 캐릭터 빔을 쏘아주는 만화 빔 프로젝터입니다.',
    isRocket: true,
    isBest: false,
    tags: ['빔프로젝터', '만화빔프로젝터', '피카츄', '자동차도어등', 'LED프로젝터', '차량용품'],
    createdAt: '2026-07-29T23:05:00Z',
    section: 'popular'
  }
];
