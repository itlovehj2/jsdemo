const features = [
  ["Modal Pro","UI","모달로 중요한 안내나 입력창을 띄웁니다.","로그인 버튼을 누르면 로그인 폼을 모달로 보여줍니다.","modal"],
  ["Toast Stream","UI","작업 결과를 짧은 알림 메시지로 전달합니다.","저장 완료 후 '저장되었습니다' 토스트를 표시합니다.","toast"],
  ["Tabs Flow","UI","여러 콘텐츠를 탭으로 나누어 보여줍니다.","상품 상세, 리뷰, 배송 정보를 탭으로 구성합니다.","tabs"],
  ["Accordion Fold","UI","긴 콘텐츠를 접었다 펼치며 보여줍니다.","자주 묻는 질문의 답변을 클릭할 때만 펼칩니다.","accordion"],
  ["Carousel Loop","UI","이미지나 카드를 좌우로 넘겨 보여줍니다.","추천 상품 3개를 슬라이드로 보여줍니다.","carousel"],
  ["Drag Drop Kit","UI","요소를 끌어 다른 위치에 놓습니다.","할 일 목록을 드래그해 우선순위를 바꿉니다.","dragdrop"],
  ["Tooltip Spark","UI","마우스를 올리면 짧은 도움말을 보여줍니다.","설정 아이콘에 '환경 설정' 안내를 표시합니다.","tooltip"],
  ["Drawer Panel","UI","화면 가장자리에서 메뉴를 밀어냅니다.","모바일 햄버거 메뉴를 사이드 패널로 엽니다.","drawer"],
  ["Progress Ring","UI","작업 진행률을 원형 그래프로 표시합니다.","파일 업로드가 72% 진행 중임을 보여줍니다.","progress"],
  ["Skeleton Grid","UI","데이터를 기다리는 동안 빈 콘텐츠를 보여줍니다.","게시글 목록을 불러오는 동안 스켈레톤을 표시합니다.","skeleton"],
  ["Chart Canvas","Data","Canvas로 막대 차트를 그립니다.","월별 매출 수치를 막대 그래프로 비교합니다.","chart"],
  ["Sparkline View","Data","작은 영역에 데이터 추이를 표현합니다.","주식 카드에 최근 가격 흐름을 표시합니다.","sparkline"],
  ["Table Sorter","Data","표 데이터를 열 기준으로 정렬합니다.","회원 목록을 이름순 또는 가입일순으로 정렬합니다.","table"],
  ["Form Guard","Forms","입력값이 올바른지 실시간으로 검사합니다.","잘못된 이메일 형식을 입력창 아래에 안내합니다.","form"],
  ["Range Picker","Forms","슬라이더로 숫자 범위를 선택합니다.","가격 검색의 최소 금액과 최대 금액을 조절합니다.","range"],
  ["Search Autocomplete","Forms","입력 중 관련 검색어를 추천합니다.","'자바' 입력 시 자바스크립트 관련어를 보여줍니다.","autocomplete"],
  ["Theme Switch","Utility","다크 테마와 라이트 테마를 전환합니다.","사용자가 밤에는 어두운 화면으로 바꿉니다.","theme"],
  ["Local Storage","Utility","브라우저에 데이터를 저장해 유지합니다.","즐겨찾기 목록을 새로 방문해도 복원합니다.","storage"],
  ["Clipboard Copy","Utility","텍스트를 클립보드에 복사합니다.","초대 링크 옆 버튼으로 URL을 바로 복사합니다.","clipboard"],
  ["Debounce Lab","Utility","입력이 멈춘 뒤에만 함수를 실행합니다.","검색어 입력이 끝난 뒤 API를 호출합니다.","debounce"],
  ["Infinite Feed","Data","스크롤 끝에서 다음 데이터를 불러옵니다.","SNS 피드를 내리면 게시물을 자동 추가합니다.","feed"],
  ["Pagination Kit","Data","많은 데이터를 여러 페이지로 나눕니다.","검색 결과를 한 페이지에 20개씩 보여줍니다.","pagination"],
  ["Color Mixer","Utility","색상 값을 조절하고 결과를 미리 봅니다.","브랜드 컬러의 배경 그라디언트를 만듭니다.","color"],
  ["Countdown Clock","Utility","특정 시점까지 남은 시간을 보여줍니다.","이벤트 시작까지 남은 시간을 카운트다운합니다.","countdown"],
  ["Code Editor","Dev","코드를 입력하고 결과를 미리 봅니다.","JavaScript 예제를 즉시 실행해 봅니다.","editor"],
  ["API Card","Dev","API JSON 응답의 구조를 표현합니다.","서버에서 받은 사용자 정보와 연결 상태를 보여줍니다.","api"],
  ["Markdown Notes","Dev","마크다운 메모를 읽기 쉬운 화면으로 바꿉니다.","회의 내용을 제목과 목록이 있는 문서로 봅니다.","markdown"],
  ["Timeline Path","UX","순서가 있는 과정을 세로로 보여줍니다.","주문 접수부터 배송 완료까지 상태를 표시합니다.","timeline"],
  ["Hero Reveal","UX","핵심 콘텐츠가 자연스럽게 등장합니다.","랜딩 페이지 제목과 버튼을 순서대로 나타냅니다.","reveal"],
  ["Notification Center","UX","여러 알림을 한곳에서 확인합니다.","댓글, 결제, 시스템 알림을 하나로 관리합니다.","notifications"]
].map(([name, category, desc, example, demo]) => ({ name, category, desc, example, demo, tags: [category, "예시"] }));

const $ = (id) => document.getElementById(id);
const state = { category: "all", favorites: new Set(JSON.parse(localStorage.getItem("js-atlas-favorites") || "[]")), theme: localStorage.getItem("js-atlas-theme") || "dark" };
const categories = ["all", ...new Set(features.map((item) => item.category))];
const save = () => localStorage.setItem("js-atlas-favorites", JSON.stringify([...state.favorites]));

function renderDemo(feature) {
  if (!feature) { $("demoContent").innerHTML = "<div class='placeholder'><h4>카드를 선택해 보세요</h4><p>기능 카드를 누르면 한글 설명, 사용 예시와 미니 데모를 확인할 수 있습니다.</p></div>"; return; }
  const previews = { modal: "<button class='primary-btn' id='demoAction'>모달 열기</button>", toast: "<button class='primary-btn' id='demoAction'>토스트 띄우기</button><div id='toastStack'></div>", tabs: "<div class='tabs-demo'><div class='demo-buttons'><button class='chip active' data-tab='개요'>개요</button><button class='chip' data-tab='문서'>문서</button><button class='chip' data-tab='예시'>예시</button></div><div class='mini-card' id='tabResult'>개요 탭의 내용입니다.</div></div>", accordion: "<details open><summary>아코디언 예시</summary><p>클릭해서 내용을 접고 펼쳐보세요.</p></details>", carousel: "<div class='mini-card' id='carouselResult'>추천 상품 A</div><div class='demo-buttons'><button class='ghost-btn' id='prevSlide'>이전</button><button class='ghost-btn' id='nextSlide'>다음</button></div>", dragdrop: "<p class='demo-hint'>항목을 직접 끌어 순서를 바꿔보세요.</p><div class='drag-demo' id='dragList'><div draggable='true'>할 일 01</div><div draggable='true'>할 일 02</div><div draggable='true'>할 일 03</div></div>", tooltip: "<div class='mini-card tooltip-wrap'>마우스를 올려보세요 <span class='tooltip'>추가 설명입니다.</span></div>", progress: "<div class='progress-demo'><div class='ring' id='progressRing'><span id='progressValue'>72%</span></div><input id='progressInput' type='range' min='0' max='100' value='72'><p>슬라이더로 진행률을 바꿔보세요.</p></div>", skeleton: "<button class='primary-btn' id='loadSkeleton'>콘텐츠 불러오기</button><div class='skeleton-grid' id='skeletonResult'><div class='skeleton'></div><div class='skeleton'></div><div class='skeleton'></div></div>", chart: "<canvas id='chartCanvas' width='420' height='220'></canvas>", sparkline: "<svg viewBox='0 0 240 80' class='sparkline'><path d='M0,55 C25,20 40,70 65,46 C85,28 95,18 120,35 C145,53 158,12 178,26 C200,44 214,39 240,18'/></svg>", table: "<div class='mini-table'><div class='row head'><span>이름</span><span>상태</span></div><div class='row'><span>Alpha</span><span>활성</span></div><div class='row'><span>Beta</span><span>완료</span></div></div><button class='ghost-btn' id='sortDemo'>이름순 정렬</button>", form: "<form class='form-demo' id='formDemo'><input id='emailInput' placeholder='이메일'><button class='primary-btn' type='submit'>검증하기</button><small id='formResult'>이메일을 입력하고 테스트하세요.</small></form>", range: "<label>선택한 값: <strong id='rangeValue'>64</strong></label><input id='rangeInput' type='range' min='0' max='100' value='64'>", autocomplete: "<input id='autoInput' placeholder='검색어를 입력해보세요'><ul class='suggestions' id='autoResult'></ul>", theme: "<div class='mini-card'>헤더의 테마 버튼과 화면 색상이 함께 바뀝니다.</div>", storage: "<div class='mini-card'>즐겨찾기를 localStorage에 저장합니다. 카드를 별표로 테스트하세요.</div>", clipboard: "<button class='primary-btn' id='demoAction'>예시 문구 복사</button>", debounce: "<input id='debounceInput' placeholder='빠르게 입력해보세요'><p class='mini-card' id='debounceResult'>대기 중...</p>", feed: "<button class='primary-btn' id='addFeed'>새 피드 추가</button><div class='feed-demo' id='feedResult'><div>새 피드 콘텐츠 1</div><div>새 피드 콘텐츠 2</div></div>", pagination: "<div class='pagination-demo' id='pageButtons'><button class='ghost-btn active'>1</button><button class='ghost-btn'>2</button><button class='ghost-btn'>3</button></div><p id='pageResult'>현재 1페이지</p>", color: "<label>색상 선택: <input type='color' id='colorInput' value='#6ee7ff'></label><div class='color-demo'><div class='swatch' id='colorSwatch'></div></div>", countdown: "<div class='mini-card'><strong id='countdownValue'>00:30</strong> 남음</div>", editor: "<textarea class='editor-demo' id='editorInput'>console.log('안녕하세요');</textarea><pre id='editorResult'>코드를 입력하면 미리보기가 바뀝니다.</pre>", api: "<button class='primary-btn' id='apiAction'>API 응답 불러오기</button><pre id='apiResult'>{ '상태': '대기 중' }</pre>", markdown: "<textarea id='markdownInput' class='editor-demo'># 회의 메모</textarea><div class='mini-card' id='markdownResult'>내용을 입력하면 미리보기가 바뀝니다.</div>", timeline: "<div class='timeline-demo'><div>주문 접수</div><div>상품 준비</div><div>배송 완료</div></div>", reveal: "<button class='primary-btn' id='revealAction'>다시 재생</button><div class='mini-card reveal-card' id='revealResult'>자연스럽게 등장하는 콘텐츠</div>", notifications: "<button class='primary-btn' id='notificationAction'>알림 읽음 처리</button><div class='mini-card' id='notificationResult'>새 알림 3개가 도착했습니다.</div>" };
  $("demoContent").innerHTML = `<div class='feature-detail'><p class='eyebrow'>${feature.category}</p><h4>${feature.name}</h4><p>${feature.desc}</p><div class='example-box'><strong>사용 예시</strong><span>${feature.example}</span></div><div class='card-tags'><span class='tag'>${feature.category}</span><span class='tag'>동작 미리보기</span></div></div><div class='feature-preview'>${previews[feature.demo] || ""}</div>`;
  if (feature.demo === "chart") { const ctx = $("chartCanvas").getContext("2d"); [30,55,38,72,64,88].forEach((v, i) => { ctx.fillStyle = ["#6ee7ff","#9b8cff","#41d39e","#ffd166"][i % 4]; ctx.fillRect(30 + i * 60, 190 - v * 1.6, 34, v * 1.6); }); }
  if ($("demoAction")) $("demoAction").onclick = () => { if (feature.demo === "clipboard") { navigator.clipboard?.writeText("JS Library Atlas 예시 문구"); $("demoAction").textContent = "복사 완료"; } else { alert(`${feature.name} 동작 예시입니다.`); } };
  bindDemo(feature.demo);
}

function bindDemo(type) {
  const on = (id, event, handler) => { if ($(id)) $(id).addEventListener(event, handler); };
  if (type === "tabs") document.querySelectorAll("[data-tab]").forEach((button) => button.onclick = () => { document.querySelectorAll("[data-tab]").forEach((b) => b.classList.remove("active")); button.classList.add("active"); $("tabResult").textContent = `${button.dataset.tab} 탭의 내용입니다.`; });
  if (type === "carousel") { let index = 0; const slides = ["추천 상품 A", "추천 상품 B", "추천 상품 C"]; const update = () => $("carouselResult").textContent = slides[index]; on("prevSlide", "click", () => { index = (index + 2) % 3; update(); }); on("nextSlide", "click", () => { index = (index + 1) % 3; update(); }); }
  if (type === "dragdrop") { let dragged; document.querySelectorAll("#dragList div").forEach((item) => { item.ondragstart = () => dragged = item; item.ondragover = (e) => e.preventDefault(); item.ondrop = () => { if (dragged !== item) item.parentNode.insertBefore(dragged, item); }; }); }
  if (type === "progress") on("progressInput", "input", (e) => { $("progressValue").textContent = `${e.target.value}%`; $("progressRing").style.setProperty("--progress", `${e.target.value * 3.6}deg`); });
  if (type === "skeleton") on("loadSkeleton", "click", () => { $("skeletonResult").innerHTML = "<div class='mini-card'>불러온 콘텐츠 1</div><div class='mini-card'>불러온 콘텐츠 2</div>"; });
  if (type === "form") on("formDemo", "submit", (e) => { e.preventDefault(); $("formResult").textContent = /^[^@]+@[^@]+\.[^@]+$/.test($("emailInput").value) ? "올바른 이메일입니다." : "이메일 형식을 확인해 주세요."; });
  if (type === "range") on("rangeInput", "input", (e) => $("rangeValue").textContent = e.target.value);
  if (type === "autocomplete") on("autoInput", "input", (e) => { const q = e.target.value; $("autoResult").innerHTML = q ? [q, `${q} 라이브러리`, `${q} 예제`].map((x) => `<li>${x}</li>`).join("") : ""; });
  if (type === "debounce") { let timer; on("debounceInput", "input", (e) => { $("debounceResult").textContent = "입력 감지..."; clearTimeout(timer); timer = setTimeout(() => $("debounceResult").textContent = `검색 실행: ${e.target.value || "(빈 값)"}`, 500); }); }
  if (type === "feed") on("addFeed", "click", () => { const item = document.createElement("div"); item.textContent = `새 피드 콘텐츠 ${$("feedResult").children.length + 1}`; $("feedResult").appendChild(item); });
  if (type === "pagination") document.querySelectorAll("#pageButtons button").forEach((button, index) => button.onclick = () => { document.querySelectorAll("#pageButtons button").forEach((b) => b.classList.remove("active")); button.classList.add("active"); $("pageResult").textContent = `현재 ${index + 1}페이지`; });
  if (type === "color") on("colorInput", "input", (e) => $("colorSwatch").style.background = e.target.value);
  if (type === "countdown") { let seconds = 30; setInterval(() => { if (document.getElementById("countdownValue")) { seconds = Math.max(0, seconds - 1); $("countdownValue").textContent = `00:${String(seconds).padStart(2, "0")}`; } }, 1000); }
  if (type === "editor") on("editorInput", "input", (e) => $("editorResult").textContent = e.target.value);
  if (type === "api") on("apiAction", "click", () => $("apiResult").textContent = "{ '상태': '연결됨', '데이터': ['Alpha', 'Beta'] }");
  if (type === "markdown") on("markdownInput", "input", (e) => $("markdownResult").innerHTML = e.target.value.replace(/^# (.*)$/gm, "<h4>$1</h4>").replace(/\n/g, "<br>"));
  if (type === "reveal") on("revealAction", "click", () => { $("revealResult").classList.remove("reveal-card"); void $("revealResult").offsetWidth; $("revealResult").classList.add("reveal-card"); });
  if (type === "notifications") on("notificationAction", "click", () => $("notificationResult").textContent = "모든 알림을 읽었습니다.");
}

function inlineDemo(feature, root) {
  const simple = { modal: "모달 열기", toast: "알림 띄우기", tabs: "탭 바꾸기", accordion: "내용 펼치기", carousel: "다음 카드", dragdrop: "순서 바꾸기", tooltip: "도움말 보기", drawer: "메뉴 열기", skeleton: "로딩 완료", chart: "차트 새로 그리기", sparkline: "추이 보기", table: "정렬하기", form: "검증하기", autocomplete: "추천 보기", theme: "테마 전환", storage: "저장 확인", clipboard: "문구 복사", debounce: "검색 실행", feed: "피드 추가", pagination: "다음 페이지", color: "색상 변경", countdown: "타이머 시작", editor: "미리보기", api: "응답 받기", markdown: "미리보기", timeline: "다음 단계", reveal: "다시 재생", notifications: "읽음 처리" };
  root.innerHTML = `<button class='inline-action'>${simple[feature.demo] || "테스트"}</button><span class='inline-result'>버튼을 눌러보세요.</span>`;
  const button = root.querySelector(".inline-action"); const result = root.querySelector(".inline-result");
  if (feature.demo === "theme") button.onclick = () => { document.body.classList.toggle("light"); result.textContent = document.body.classList.contains("light") ? "라이트 테마 적용됨" : "다크 테마 적용됨"; };
  else if (feature.demo === "form") { root.insertAdjacentHTML("afterbegin", "<input class='inline-input' placeholder='이메일 입력'>"); button.onclick = () => { const value = root.querySelector(".inline-input").value; result.textContent = /^[^@]+@[^@]+\.[^@]+$/.test(value) ? "올바른 이메일" : "이메일 형식 오류"; }; }
  else if (feature.demo === "range") { root.innerHTML = "<input class='inline-range' type='range' min='0' max='100' value='50'><span class='inline-result'>50</span>"; root.querySelector("input").oninput = (e) => root.querySelector(".inline-result").textContent = e.target.value; }
  else if (feature.demo === "color") { root.innerHTML = "<input class='inline-color' type='color' value='#6ee7ff'><span class='inline-result color-dot'></span>"; root.querySelector("input").oninput = (e) => root.querySelector(".inline-result").style.background = e.target.value; root.querySelector("input").dispatchEvent(new Event("input")); }
  else if (feature.demo === "autocomplete") { root.innerHTML = "<input class='inline-input' placeholder='검색어 입력'><span class='inline-result'>추천 대기 중</span>"; root.querySelector("input").oninput = (e) => root.querySelector(".inline-result").textContent = e.target.value ? `${e.target.value} 라이브러리 추천` : "추천 대기 중"; }
  else if (feature.demo === "countdown") { let n = 5; button.onclick = () => { n = 5; const timer = setInterval(() => { result.textContent = `${n--}초 남음`; if (n < 0) { clearInterval(timer); result.textContent = "완료"; } }, 1000); }; }
  else if (feature.demo === "dragdrop") { button.onclick = () => { const items = ["할 일 01", "할 일 02", "할 일 03"]; root.innerHTML = `<span class='inline-result'>${items.reverse().join(" → ")}</span>`; }; }
  else if (feature.demo === "storage") button.onclick = () => { localStorage.setItem("atlas-inline-test", "저장된 데이터"); result.textContent = localStorage.getItem("atlas-inline-test"); };
  else if (feature.demo === "clipboard") button.onclick = async () => { await navigator.clipboard?.writeText("JS Library Atlas"); result.textContent = "클립보드에 복사됨"; };
  else if (feature.demo === "debounce") { let timer; button.onclick = () => { result.textContent = "대기 중..."; clearTimeout(timer); timer = setTimeout(() => result.textContent = "검색 실행됨", 500); }; }
  else button.onclick = () => { result.textContent = `${feature.name} 테스트 완료`; };
}

function render() {
  const query = $("search").value.toLowerCase(); const list = features.filter((f) => (state.category === "all" || f.category === state.category) && [f.name,f.category,f.desc,f.example].join(" ").toLowerCase().includes(query));
  $("libraryGrid").innerHTML = ""; $("resultCount").textContent = `${list.length}개 기능`;
  list.forEach((feature) => { const card = $("cardTemplate").content.cloneNode(true); const article = card.querySelector(".lib-card"); card.querySelector(".card-badge").textContent = feature.category; card.querySelector("h4").textContent = feature.name; card.querySelector(".card-desc").textContent = feature.desc; card.querySelector(".card-example").innerHTML = `<strong>예시</strong> ${feature.example}`; inlineDemo(feature, card.querySelector(".inline-demo")); const fav = card.querySelector(".favorite-btn"); fav.textContent = state.favorites.has(feature.name) ? "★" : "☆"; fav.classList.toggle("active", state.favorites.has(feature.name)); fav.onclick = (e) => { e.stopPropagation(); state.favorites.has(feature.name) ? state.favorites.delete(feature.name) : state.favorites.add(feature.name); save(); render(); }; article.onclick = (e) => { if (e.target.closest(".card-demo")) return; renderDemo(feature); document.querySelectorAll(".lib-card").forEach((x) => x.classList.remove("selected")); article.classList.add("selected"); }; $("libraryGrid").appendChild(card); });
  $("quickChips").innerHTML = categories.map((c) => `<button class='chip ${state.category === c ? "active" : ""}' data-category='${c}'>${c === "all" ? "전체" : c}</button>`).join(""); document.querySelectorAll("[data-category]").forEach((b) => b.onclick = () => { state.category = b.dataset.category; $("category").value = state.category; render(); });
  $("favoriteList").innerHTML = [...state.favorites].map((name) => `<li>${name}</li>`).join("") || "<li>즐겨찾기한 기능이 여기에 표시됩니다.</li>";
}

$("category").innerHTML = categories.map((c) => `<option value='${c}'>${c === "all" ? "전체" : c}</option>`).join(""); $("search").oninput = render; $("category").onchange = (e) => { state.category = e.target.value; render(); }; $("clearFilters").onclick = () => { $("search").value = ""; state.category = "all"; $("category").value = "all"; render(); }; $("resetFavorites").onclick = () => { state.favorites.clear(); save(); render(); }; $("themeToggle").onclick = () => { state.theme = state.theme === "dark" ? "light" : "dark"; localStorage.setItem("js-atlas-theme", state.theme); document.body.classList.toggle("light", state.theme === "light"); }; document.body.classList.toggle("light", state.theme === "light"); render();
