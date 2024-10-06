# 🏕️ [야! 소풍 어때](https://oho-picnic.vercel.app/)

<img src="https://github.com/user-attachments/assets/637fdee8-70af-4b4e-8bf4-adb93caecd30" width="40%" /> 
<img src="https://github.com/user-attachments/assets/ec867413-bf6d-4941-820d-f4ba7a6970cc" width="40%" />

### 목차

📖[프로젝트 개요](#📖프로젝트-개요) <br />
✨[기능](#✨기능) <br />
🔗[배포 서버](#🔗배포-서버) <br /> 
🤔[트러블 슈팅](#🤔트러블-슈팅) <br />
✅[개선할 점](#✅개선할-점) <br />

---

### 📖프로젝트 개요

**야! 소풍 어때**는 20-30 대의 지역 축제에 관심이 많은 사용자를 대상으로 **지역 축제**를 효과적으로 알리고 참여도를 높일 수 있는 디지털 소통 창구입니다. **사용자 친화적인 웹 사이트**를 통해 지역 문화를 홍보하고 지역 경제 활성화를 돕는 것이 목표입니다.

<br />

### ✨기능

- **키워드 검색 조회**: `한국관광공사 TOUR API`를 사용하여 사용자로부터 지역과 키워드를 입력 받아 행사, 숙소, 관광지 정보를 제공합니다.
- **무한 스크롤**: `Intersection Observer`를 사용하여 스크롤만으로 사용자가 데이터를 무한으로 불러올 수 있도록 무한 스크롤을 제공합니다. 이때 UX 개선을 위하여 `Loading Indicator`와 `Lazy Loading`을 적용하였습니다.
- **좋아요**: 사용자가 좋아요를 누른 행사, 숙소, 관광지 정보를 마이 페이지 내에서 확인할 수 있습니다.
- **반응형 디자인**: 다양한 장치에서 호환성을 보장합니다.

<br />

### 🔗배포 서버

[🏕️야! 소풍어때](https://oho-picnic.vercel.app/)

<br />

### 🛠️기술 스택

<img  src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img  src="https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logo=emotion&logoColor=white"> <img  src="https://img.shields.io/badge/react--router-CA4245?style=for-the-badge&logo=react router&logoColor=white"><br />
<img  src="https://img.shields.io/badge/react--query-FF4154?style=for-the-badge&logo=react query&logoColor=white"> <img  src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img  src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

---

### 🤔트러블 슈팅

1. 프록시 서버 설정
   - [프록시 서버 관련 고민](https://laced-snapdragon-0cd.notion.site/proxy-112e7dfd77448076a8b0ee89177987b4?pvs=4)
   - Vercel Serverless 함수를 통한 프록시 서버 설정을 했으나, 데이터를 가져오는 pending 시간이 너무 오래걸려 민감한 정보를 포함하고 있진 않다 보니, 직접 URL을 입력하는 방법을 채택했습니다.
2. Vercel SPA routing 설정
   - Vercel을 통해 React의 SPA 애플리케이션을 배포했을 때, Lighthouse에서 `'/'` 경로가 아닌 다른 경로에서는 `404 Not Found Error` 가 발생했습니다.
   - vercel.json 과 vite.config.ts 설정을 추가했지만, 브라우저에 캐싱이 되어 있어 처음엔 제대로 뜨지 않았지만 브라우저 캐싱 데이터를 지운 후, 모든 페이지에서 라우팅이 잘 되는 것을 확인하였습니다.
3. `dangerouslySetInnerHTML`
   - 상세 정보에 html 태그가 들어 있는 경우가 있어 `dangerouslySetInnerHTML`을 사용했지만, 이는 XSS 공격에 취약합니다.
   - `dompurify`를 사용해 검증은 하고 있지만, 보안 문제를 해결하는 완전한 방법은 아닙니다.

<br />

### ✅개선할 점

- 스켈레톤 UI
  - 서버 환경이나 네트워크 환경에 따라 pending 시간이 길어지는 경우가 있어, UX 개선을 위해 스켈레톤 UI 추가
- 에러 핸들링
  - 에러의 종류에 따라 유저에게 알맞은 피드백 제공
