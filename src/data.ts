/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';
import benqMonitorImg from './assets/images/benq_monitor_1784038159423.jpg';
import alubarPowerstripImg from './assets/images/alubar_powerstrip_1784398375144.jpg';

export const DEFAULT_PRODUCTS: Product[] = [
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
    createdAt: '2026-07-14T00:00:00Z'
  },
  {
    id: 'alubar_powerstrip',
    title: '02 알루바프로 멀티탭',
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
    createdAt: '2026-07-15T00:00:00Z'
  },
  {
    id: '1',
    title: 'Apple 2024 iPad Air 11형 M2칩 (Liquid Retina 디스플레이, 128GB, Wi-Fi)',
    category: 'digital',
    originalPrice: 899000,
    salePrice: 835000,
    discountRate: 7,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg1', // Mock affiliate link
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '강력한 Apple M2 칩 탑재로 이전 세대 대비 압도적으로 빨라진 처리 속도! 생생한 Liquid Retina 디스플레이로 창작, 학습, 게임까지 완벽하게 소화합니다. 가볍고 슬림한 디자인에 온종일 지속되는 배터리까지 탑재했습니다.',
    isRocket: true,
    isBest: true,
    tags: ['아이패드', '애플', '태블릿', '신학기선물'],
    createdAt: '2026-07-01T12:00:00Z'
  },
  {
    id: '2',
    title: 'LG전자 스탠바이미 스마트 스크린 27ART10AKPL',
    category: 'digital',
    originalPrice: 1040000,
    salePrice: 945000,
    discountRate: 9,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg2',
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '무빙휠 탑재로 집안 어디서든 편리하게 이동하며 시청하는 나만의 프라이빗 스마트 스크린! 화면 각도 조절, 높낮이 조절, 로테이션이 자유로우며 모바일 화면 미러링 및 내장 배터리로 선 없이 깔끔하게 즐길 수 있습니다.',
    isRocket: true,
    isBest: true,
    tags: ['스탠바이미', 'LGTV', '스마트스크린', '인테리어가전'],
    createdAt: '2026-07-02T12:00:00Z'
  },
  {
    id: '3',
    title: '다이슨 에어랩 멀티 스타일러 앤 드라이어 (볼륨앤쉐이프/니켈코퍼)',
    category: 'beauty',
    originalPrice: 659000,
    salePrice: 598000,
    discountRate: 9,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg3',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '과도한 열 손상 없이 코안다 효과로 머릿결을 자연스럽고 윤기 있게! 드라이부터 스트레이트, 풍성한 웨이브까지 헤어 살롱 스타일링을 집에서 손쉽게 완성해보세요.',
    isRocket: true,
    isBest: true,
    tags: ['다이슨', '에어랩', '헤어스타일러', '고데기', '선물추천'],
    createdAt: '2026-07-03T12:00:00Z'
  },
  {
    id: '4',
    title: '필립스 1200 시리즈 전자동 에스프레소 커피머신 EP1200/03',
    category: 'kitchen',
    originalPrice: 429000,
    salePrice: 319000,
    discountRate: 25,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg4',
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '터치 한 번으로 즐기는 신선한 에스프레소와 홈카페의 감동! 100% 세라믹 그라인더로 원두 고유의 풍미와 아로마를 온전히 보존하며, 직관적인 디스플레이로 커피 진도와 양을 간편히 조절할 수 있습니다.',
    isRocket: true,
    isBest: false,
    tags: ['커피머신', '홈카페', '필립스', '에스프레소', '원두커피'],
    createdAt: '2026-07-04T12:00:00Z'
  },
  {
    id: '5',
    title: '샤오미 로보락 S8 Plus 로봇청소기 (먼지비움 자동 스테이션 포함)',
    category: 'digital',
    originalPrice: 990000,
    salePrice: 879000,
    discountRate: 11,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg5',
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '비교 불가한 6000Pa의 압도적인 흡입력과 물걸레 밀착 음파 진동 시스템! 정밀한 LiDAR 센서로 가구 사이를 완벽 우회하며, 청소 후 먼지 비움부터 충전까지 완벽히 자동화된 자동 스테이션이 최고의 청결함을 유지합니다.',
    isRocket: true,
    isBest: true,
    tags: ['로보락', '로봇청소기', '샤오미', '물걸레청소', '필수가전'],
    createdAt: '2026-07-05T12:00:00Z'
  },
  {
    id: '6',
    title: '멜킨스포츠 육각 아령 덤벨 세트 5kg x 2개',
    category: 'sports',
    originalPrice: 38000,
    salePrice: 24900,
    discountRate: 34,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg6',
    imageUrl: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '안정적인 육각 디자인으로 굴러다니지 않아 안전한 실내 트레이닝 아령! 최고급 네오프렌 코팅으로 소음을 최소화하고 탁월한 그립감을 선사합니다. 홈트레이닝 초보자부터 전문가까지 추천드립니다.',
    isRocket: false,
    isBest: false,
    tags: ['홈트레이닝', '덤벨', '아령', '멜킨스포츠', '근력운동'],
    createdAt: '2026-07-06T12:00:00Z'
  },
  {
    id: '7',
    title: '매일유업 어메이징 오트 언스위트 오트음료 190ml x 24팩',
    category: 'food',
    originalPrice: 26000,
    salePrice: 17800,
    discountRate: 31,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg7',
    imageUrl: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '핀란드산 고품질 오트를 통째로 갈아 넣어 오트 고유의 영양과 고소함을 그대로 담은 건강 비건 음료! 당류 0g의 언스위트 타입으로 칼로리 걱정 없이 든든한 아침이나 다이어트 식단으로 안성맞춤입니다.',
    isRocket: true,
    isBest: false,
    tags: ['비건음료', '오트밀크', '어메이징오트', '다이어트식단', '건강음료'],
    createdAt: '2026-07-07T12:00:00Z'
  },
  {
    id: '8',
    title: '네셔널지오그래픽 남녀공용 헤론 라이트 구스다운 베스트',
    category: 'fashion',
    originalPrice: 139000,
    salePrice: 119000,
    discountRate: 14,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg8',
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '초경량 고성능 덕다운 충전재를 사용하여 언제 어디서나 가볍고 따뜻하게 착용할 수 있는 프리미엄 베스트! 트렌디한 내셔널지오그래픽 로고 패치 디테일과 세련된 슬림핏 실루엣으로 아우터 혹은 레이어드로 훌륭합니다.',
    isRocket: true,
    isBest: false,
    tags: ['구스다운', '패딩조끼', '아웃도어', '내셔널지오그래픽', '간절기아우터'],
    createdAt: '2026-07-08T12:00:00Z'
  },
  {
    id: '9',
    title: '핏쳐 슬림 라운드 이동식 높이 조절 침대 소파 사이드 테이블 FST1',
    category: 'other',
    originalPrice: 89000,
    salePrice: 59000,
    discountRate: 33,
    coupangUrl: 'https://link.coupang.com/a/bCDeFg9',
    imageUrl: 'https://images.unsplash.com/photo-1544207240-8b1025eb7aeb?w=1200&auto=format&fit=crop&ar=16:9&q=95',
    description: '침대나 소파 옆에서 자유롭게 높이를 조절하며 편리하게 사용할 수 있는 다목적 무빙 사이드 테이블! 세련된 라운드 디자인과 튼튼한 강철 프레임으로 흔들림 없이 편안한 작업 환경을 제공합니다.',
    isRocket: true,
    isBest: true,
    tags: ['만능 테이블', '사이드테이블', '이동식테이블', '가구인테리어'],
    createdAt: '2026-07-09T12:00:00Z'
  }
];
