# [집꾸미기] 집 소개 페이지
원티드 프리온보딩 프론트엔드 코스    
집꾸미기 기업과제  
<br />

## `배포`
http://ggumim.s3-website.ap-northeast-2.amazonaws.com/  
<br/>

## `실행`

` npm install && npm run start`  
<br/>

## `환경`

- macOS Monterey 12.1
- chrome 97.0.4692.71 (arm64)  
  <br />

## `디렉토리`

```
ggumim-product-list/src
│
├── components
│   ├── swiper              # 하단 슬라이드
│   │   ├── index.tsx
│   │   └── styles.tsx
│   └── tag                 # 이미지 내부 태그 버튼
│       ├── index.tsx
│       └── styles.tsx
├── index.css
├── index.tsx
├── pages
│   └── main                # 메인페이지
│       ├── index.tsx
│       └── styles.tsx
├── styles                  # global style
│   ├── global-styles.ts
│   ├── styled.d.ts
│   └── theme.ts
└── utils
    ├── constants.tsx       # 이미지 관련 상수
    └── url.tsx             # 이미지 url
```

<br/>

## `기능`

### 1. 가구 정보 태그

- api에서 받아온 pointX, pointY로 가구 정보 위치 출력
- 기존 돋보기에서 클릭 시 닫기 버튼으로 변경
- 여러 버튼 중 하나만 active

### 2. 가구 정보 tool tip

- 정보 태그 (돋보기) 클릭 시 tool tip 노출
- tool tip 위치 조정 (메인이미지 중점에서 4분할)
  - 제1사분면 : 정보 태그 아래, 왼쪽 치우침
  - 제2사분면 : 정보 태그 아래, 오른쪽 치우침
  - 제3사분면 : 정보 태그 위, 오른쪽 치우침
  - 제4사분면 : 정보 태그 위, 왼쪽 치우침
- outside에 따라 tooltip 내용 변경

### 3. 상품목록 슬라이드

- 클릭 시 선택 표시
- 선택되는 상품으로 자동 이동
- 할인율 표시
- 스와이프 구현

### `screen`

https://user-images.githubusercontent.com/32586712/152331154-ea3087d1-f734-4434-868b-cd2436d7da4f.mov

