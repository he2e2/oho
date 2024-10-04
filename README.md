## 🏕️ 야! 소풍가자

---

### 진행도

- [x] 개발 환경 세팅
- [x] 기본 레이아웃
- [x] 페이지 뷰
- [x] 메인 페이지 플로우
- [x] 리스트 페이지 플로우
- [x] 디테일 페이지 플로우
- [x] 마이 페이지 플로우
- [x] 리팩토링
- [ ] 성능 개선 < 진행 중 `feat/enhancement`

### 이슈

- 프록시 설정
  [🗒️proxy](https://laced-snapdragon-0cd.notion.site/proxy-112e7dfd77448076a8b0ee89177987b4?pvs=4)
- ~~Vercel SPA 404 ERROR~~ ➡️ Vercel preview 서버에서만 발견
- ~~리스트 페이지 데이터 캐싱~~
- 상세 정보에 html 태그가 들어 있는 경우가 있어 `dangerouslySetInnerHTML`을 사용했지만, 이는 XSS 공격에 취약함
  - `dompurify`를 사용해 검증은 하고 있지만, 완전하진 않다.
