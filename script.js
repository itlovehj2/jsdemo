/**
 * 실무 필수 JavaScript 라이브러리 TOP 10 쇼케이스 & 인터랙티브 랩
 */

// 10개 라이브러리 상세 메타데이터 및 실무 활용 가이드
const LIBRARIES = [
  {
    id: "dayjs",
    name: "Day.js",
    version: "v1.11.10",
    category: "data",
    categoryLabel: "데이터 & 유틸",
    size: "2 KB (초경량)",
    summary: "Moment.js를 완벽 대체하는 빠르고 가벼운 모던 날짜/시간 조작 라이브러리",
    docsUrl: "https://day.js.org/",
    whyToUse: [
      { title: "D-Day 및 만료일 계산", desc: "이벤트 남은 시간, 결제 기한, 근무일수 등의 복잡한 날짜 차이를 한 줄로 계산합니다." },
      { title: "상대적 시간 표시 (fromNow)", desc: "SNS나 커뮤니티의 '방금 전', '10분 전', '3일 후' 타임스탬프를 한국어로 쉽게 변환합니다." },
      { title: "다국어 및 날짜 포맷팅", desc: "Date 객체의 복잡한 메서드 없이 'YYYY-MM-DD HH:mm:ss' 형태로 자유롭게 포맷을 지정합니다." }
    ],
    codeSnippet: `// 1. 한국어 로케일 및 상대 시간 플러그인 로드
dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('ko');

// 2. 현재 시간 포맷팅 & D-Day 계산
const now = dayjs().format('YYYY년 MM월 DD일');
const dday = dayjs('2026-12-31').fromNow(); // "4개월 후"`,
    renderDemo: (container) => {
      container.innerHTML = `
        <div class="demo-controls" style="margin-bottom: 12px;">
          <input type="date" id="dayjsPicker" class="input-demo" style="width: auto;" value="${dayjs().add(7, 'day').format('YYYY-MM-DD')}" />
          <button id="dayjsNowBtn" class="btn-demo-secondary">오늘로 리셋</button>
        </div>
        <div class="dayjs-result-grid" id="dayjsResults">
          <!-- Live Day.js stats -->
        </div>
      `;

      const picker = container.querySelector("#dayjsPicker");
      const resetBtn = container.querySelector("#dayjsNowBtn");
      const results = container.querySelector("#dayjsResults");

      dayjs.extend(window.dayjs_plugin_relativeTime);
      dayjs.locale('ko');

      function updateDayjs() {
        const target = dayjs(picker.value);
        const now = dayjs();
        const diffDays = target.diff(now, 'day');
        const relativeStr = target.fromNow();
        const formattedFull = target.format('YYYY년 M월 D일 (ddd)');
        const formattedISO = target.format('YYYY-MM-DD');

        results.innerHTML = `
          <div class="dayjs-stat">
            <span>D-Day 상태</span>
            <strong>${diffDays === 0 ? 'D-Day (오늘)' : (diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`)}</strong>
          </div>
          <div class="dayjs-stat">
            <span>상대적 시간</span>
            <strong>${relativeStr}</strong>
          </div>
          <div class="dayjs-stat">
            <span>한글 날짜 포맷</span>
            <strong>${formattedFull}</strong>
          </div>
          <div class="dayjs-stat">
            <span>표준 ISO 포맷</span>
            <strong>${formattedISO}</strong>
          </div>
        `;
      }

      picker.addEventListener("input", updateDayjs);
      resetBtn.addEventListener("click", () => {
        picker.value = dayjs().format('YYYY-MM-DD');
        updateDayjs();
      });

      updateDayjs();
    }
  },
  {
    id: "chartjs",
    name: "Chart.js",
    version: "v4.4.1",
    category: "data",
    categoryLabel: "데이터 & 유틸",
    size: "60 KB",
    summary: "HTML5 Canvas 기반의 유연하고 미려한 반응형 데이터 시각화 차트 엔진",
    docsUrl: "https://www.chartjs.org/",
    whyToUse: [
      { title: "관리자 대시보드 & 통계 시각화", desc: "월별 매출 추이, 유입 통계, KPI 분석 그래프를 가장 빠르고 안정적으로 구현합니다." },
      { title: "다양한 차트 타입 즉시 전환", desc: "막대(Bar), 꺾은선(Line), 도넛(Doughnut), 레이더(Radar) 차트를 동일 데이터로 손쉽게 전환합니다." },
      { title: "부드러운 애니메이션 & 툴팁", desc: "마우스 호버 시 툴팁과 반응형 리사이즈, 세련된 진입 애니메이션을 기본 제공합니다." }
    ],
    codeSnippet: `const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'bar', // 'line', 'doughnut', 'polarArea'
  data: {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [{ label: '월별 매출(백만원)', data: [15, 24, 38, 31, 45, 52] }]
  }
});`,
    renderDemo: (container) => {
      container.innerHTML = `
        <div class="demo-controls" style="margin-bottom: 12px;">
          <button class="btn-demo-secondary active" data-chart-type="bar">막대 (Bar)</button>
          <button class="btn-demo-secondary" data-chart-type="line">꺾은선 (Line)</button>
          <button class="btn-demo-secondary" data-chart-type="doughnut">도넛 (Doughnut)</button>
          <button class="btn-demo" id="randomizeChartData"><i data-lucide="refresh-cw"></i> 데이터 갱신</button>
        </div>
        <div class="chart-container-box">
          <canvas id="liveChartCanvas"></canvas>
        </div>
      `;

      const ctx = container.querySelector("#liveChartCanvas").getContext("2d");
      let currentType = "bar";
      let chartData = [18, 29, 45, 34, 52, 68];

      let chartInstance = new Chart(ctx, {
        type: currentType,
        data: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
          datasets: [{
            label: "월간 방문자 수 (k)",
            data: chartData,
            backgroundColor: [
              "rgba(99, 102, 241, 0.75)",
              "rgba(6, 182, 212, 0.75)",
              "rgba(16, 185, 129, 0.75)",
              "rgba(245, 158, 11, 0.75)",
              "rgba(244, 63, 94, 0.75)",
              "rgba(139, 92, 246, 0.75)"
            ],
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#94a3b8" } }
          },
          scales: currentType === "doughnut" ? {} : {
            x: { ticks: { color: "#64748b" }, grid: { color: "rgba(255,255,255,0.05)" } },
            y: { ticks: { color: "#64748b" }, grid: { color: "rgba(255,255,255,0.05)" } }
          }
        }
      });

      // Buttons
      container.querySelectorAll("[data-chart-type]").forEach((btn) => {
        btn.addEventListener("click", () => {
          container.querySelectorAll("[data-chart-type]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          currentType = btn.dataset.chartType;
          chartInstance.destroy();
          chartInstance = new Chart(ctx, {
            type: currentType,
            data: {
              labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
              datasets: [{
                label: "월간 방문자 수 (k)",
                data: chartData,
                backgroundColor: [
                  "rgba(99, 102, 241, 0.75)",
                  "rgba(6, 182, 212, 0.75)",
                  "rgba(16, 185, 129, 0.75)",
                  "rgba(245, 158, 11, 0.75)",
                  "rgba(244, 63, 94, 0.75)",
                  "rgba(139, 92, 246, 0.75)"
                ],
                borderColor: currentType === "line" ? "#38bdf8" : "rgba(255, 255, 255, 0.2)",
                borderWidth: currentType === "line" ? 3 : 1,
                tension: 0.3,
                fill: currentType === "line" ? { target: 'origin', above: 'rgba(56, 189, 248, 0.15)' } : false
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: "#94a3b8" } } },
              scales: currentType === "doughnut" ? {} : {
                x: { ticks: { color: "#64748b" }, grid: { color: "rgba(255,255,255,0.05)" } },
                y: { ticks: { color: "#64748b" }, grid: { color: "rgba(255,255,255,0.05)" } }
              }
            }
          });
        });
      });

      container.querySelector("#randomizeChartData").addEventListener("click", () => {
        chartData = chartData.map(() => Math.floor(Math.random() * 80) + 15);
        chartInstance.data.datasets[0].data = chartData;
        chartInstance.update();
      });
    }
  },
  {
    id: "sweetalert2",
    name: "SweetAlert2",
    version: "v11.10",
    category: "ui",
    categoryLabel: "UI 컴포넌트",
    size: "40 KB",
    summary: "브라우저 기본 alert/confirm을 대체하는 세련되고 반응형인 커스텀 모달 & 토스트",
    docsUrl: "https://sweetalert2.github.io/",
    whyToUse: [
      { title: "파괴적 액션 전 안전한 확인 (Confirm)", desc: "'정말 삭제하시겠습니까?'와 같은 위험한 작업에 커스텀 버튼과 로딩 스피너를 제공합니다." },
      { title: "브랜드 아이덴티티에 맞는 알림", desc: "성공, 에러, 경고 메시지를 깔끔한 벡터 애니메이션 아이콘과 다크 모드로 띄웁니다." },
      { title: "비동기 사용자 입력 프롬프트", desc: "이메일, 비밀번호 등을 세련된 팝업 내에서 직접 입력받아 처리할 수 있습니다." }
    ],
    codeSnippet: `// 1. 성공 알림창
Swal.fire({
  icon: 'success',
  title: '저장 완료!',
  text: '변경사항이 성공적으로 반영되었습니다.',
  background: '#111827', color: '#fff', confirmButtonColor: '#6366f1'
});

// 2. 우측 상단 토스트 알림
Swal.mixin({ toast: true, position: 'top-end', timer: 3000 }).fire({ icon: 'info', title: '새 메시지' });`,
    renderDemo: (container) => {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <p style="font-size: 0.88rem; color: var(--text-secondary);">버튼을 눌러 다양한 모달 & 토스트를 직접 확인해보세요:</p>
          <div class="demo-controls">
            <button class="btn-demo" id="swalSuccess"><i data-lucide="check-circle"></i> 성공 알림</button>
            <button class="btn-demo-secondary" id="swalConfirm"><i data-lucide="alert-triangle"></i> 삭제 확인 모달</button>
            <button class="btn-demo-secondary" id="swalToast"><i data-lucide="bell"></i> 3초 토스트</button>
            <button class="btn-demo-secondary" id="swalPrompt"><i data-lucide="edit-3"></i> 사용자 입력</button>
          </div>
          <div class="mini-card" id="swalResultBox" style="margin-top: 10px; font-size: 0.85rem; color: var(--accent-cyan); background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; border: 1px dashed var(--border-color);">
            결과 상태: 대기 중...
          </div>
        </div>
      `;

      const resultBox = container.querySelector("#swalResultBox");

      const themeOptions = {
        background: '#111827',
        color: '#f8fafc',
        confirmButtonColor: '#6366f1',
        cancelButtonColor: '#475569'
      };

      container.querySelector("#swalSuccess").addEventListener("click", () => {
        Swal.fire({
          ...themeOptions,
          icon: 'success',
          title: '결제 및 등록 완료!',
          text: '요청하신 작업이 성공적으로 처리되었습니다.',
          confirmButtonText: '확인'
        }).then(() => {
          resultBox.textContent = "결과 상태: 성공 모달 확인 완료";
        });
      });

      container.querySelector("#swalConfirm").addEventListener("click", () => {
        Swal.fire({
          ...themeOptions,
          icon: 'warning',
          title: '정말 삭제하시겠습니까?',
          text: '삭제된 파일은 복구할 수 없습니다!',
          showCancelButton: true,
          confirmButtonText: '네, 삭제합니다',
          cancelButtonText: '취소',
          confirmButtonColor: '#ef4444'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({ ...themeOptions, icon: 'success', title: '삭제 완료', text: '항목이 안전하게 삭제되었습니다.' });
            resultBox.textContent = "결과 상태: 사용자가 '삭제'를 승인함";
          } else {
            resultBox.textContent = "결과 상태: 사용자가 취소함";
          }
        });
      });

      container.querySelector("#swalToast").addEventListener("click", () => {
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#1e293b',
          color: '#f8fafc'
        }).fire({
          icon: 'info',
          title: '새로운 알림이 도착했습니다.'
        });
        resultBox.textContent = "결과 상태: 3초 후 사라지는 토스트 팝업 띄움";
      });

      container.querySelector("#swalPrompt").addEventListener("click", async () => {
        const { value: email } = await Swal.fire({
          ...themeOptions,
          title: '이메일 주소 입력',
          input: 'email',
          inputPlaceholder: 'user@example.com',
          showCancelButton: true,
          cancelButtonText: '취소',
          confirmButtonText: '제출'
        });

        if (email) {
          resultBox.textContent = `결과 상태: 입력된 이메일 (${email}) 검증 성공!`;
        }
      });
    }
  },
  {
    id: "sortablejs",
    name: "SortableJS",
    version: "v1.15.2",
    category: "ui",
    categoryLabel: "UI 컴포넌트",
    size: "12 KB",
    summary: "HTML5 드래그 앤 드롭으로 리스트 요소를 자유자재로 재정렬하는 터치 친화적 라이브러리",
    docsUrl: "https://sortablejs.github.io/Sortable/",
    whyToUse: [
      { title: "칸반 보드 & 우선순위 재정렬", desc: "Trello/Jira처럼 To-Do 카드를 마우스나 터치로 끌어 순서를 바꿀 때 필수적입니다." },
      { title: "이미지/파일 업로드 순서 변경", desc: "상품 대표 썸네일 순서나 슬라이드 순서를 직관적으로 조정할 수 있습니다." },
      { title: "프레임워크 무관 뛰어난 호환성", desc: "Vanilla JS, React, Vue 등 어디서든 HTML 엘리먼트만 지정하면 즉시 작동합니다." }
    ],
    codeSnippet: `const el = document.getElementById('taskList');
new Sortable(el, {
  animation: 200,
  ghostClass: 'sortable-ghost',
  onEnd: function (evt) {
    console.log('이전 위치:', evt.oldIndex, '새 위치:', evt.newIndex);
  }
});`,
    renderDemo: (container) => {
      container.innerHTML = `
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">
          💡 아래 항목들을 마우스로 드래그하여 순서를 바꿔보세요:
        </p>
        <div class="sortable-list" id="demoSortableList">
          <div class="sortable-item" data-id="1">
            <span>🚀 1. 메인 대시보드 컴포넌트 설계</span>
            <div class="drag-handle"><i data-lucide="grip-vertical"></i></div>
          </div>
          <div class="sortable-item" data-id="2">
            <span>🎨 2. 다크 모드 디자인 시스템 구축</span>
            <div class="drag-handle"><i data-lucide="grip-vertical"></i></div>
          </div>
          <div class="sortable-item" data-id="3">
            <span>⚡ 3. 성능 최적화 및 번들 크기 경량화</span>
            <div class="drag-handle"><i data-lucide="grip-vertical"></i></div>
          </div>
          <div class="sortable-item" data-id="4">
            <span>📱 4. 모바일 반응형 터치 인터랙션 테스트</span>
            <div class="drag-handle"><i data-lucide="grip-vertical"></i></div>
          </div>
        </div>
        <div style="margin-top: 10px; font-size: 0.8rem; color: var(--accent-emerald);" id="sortableLog">
          현재 순서: [1] 메인 대시보드 → [2] 다크 모드 → [3] 성능 최적화 → [4] 모바일 반응형
        </div>
      `;

      const listEl = container.querySelector("#demoSortableList");
      const logEl = container.querySelector("#sortableLog");

      new Sortable(listEl, {
        animation: 200,
        ghostClass: "sortable-ghost",
        handle: ".sortable-item",
        onEnd: () => {
          const items = Array.from(listEl.querySelectorAll(".sortable-item span")).map(s => s.textContent.trim().split(" ")[1]);
          logEl.textContent = `변경된 순서: ${items.join(" → ")}`;
        }
      });
    }
  },
  {
    id: "confetti",
    name: "Canvas Confetti",
    version: "v1.9.2",
    category: "animation",
    categoryLabel: "모션 & 이펙트",
    size: "5 KB (초경량)",
    summary: "축하와 성취의 순간을 돋보이게 만드는 고성능 Canvas 파티클 폭죽 엔진",
    docsUrl: "https://www.npmjs.com/package/canvas-confetti",
    whyToUse: [
      { title: "결제 완료 & 회원가입 축하", desc: "사용자가 구매나 가입을 마친 순간 폭죽을 터뜨려 긍정적인 감정 경험(UX)을 유도합니다." },
      { title: "게이미피케이션 & 미션 달성", desc: "레벨업, 퀴즈 정답, 쿠폰 당첨 등의 성취 피드백으로 몰입도를 극대화합니다." },
      { title: "Canvas 기반 초경량 고성능", desc: "DOM 노드를 늘리지 않고 Canvas에 직접 렌더링하여 프레임 드랍 없이 부드럽습니다." }
    ],
    codeSnippet: `// 1. 기본 폭죽 발사
confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

// 2. 화면 좌우에서 동시 발사 (대포 효과)
confetti({ angle: 60, origin: { x: 0 } });
confetti({ angle: 120, origin: { x: 1 } });`,
    renderDemo: (container) => {
      container.innerHTML = `
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">
          원하는 폭죽 스타일을 클릭해 화면 전체의 파티클 효과를 감상해보세요:
        </p>
        <div class="demo-controls">
          <button class="btn-demo" id="confettiBasic"><i data-lucide="sparkles"></i> 기본 폭죽</button>
          <button class="btn-demo-secondary" id="confettiCannons"><i data-lucide="zap"></i> 양쪽 대포 발사</button>
          <button class="btn-demo-secondary" id="confettiStars"><i data-lucide="star"></i> 별빛 파티클</button>
          <button class="btn-demo-secondary" id="confettiSnow"><i data-lucide="cloud-snow"></i> 눈꽃 흩날리기</button>
        </div>
      `;

      // 1. Basic
      container.querySelector("#confettiBasic").addEventListener("click", () => {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      });

      // 2. Cannons
      container.querySelector("#confettiCannons").addEventListener("click", () => {
        const end = Date.now() + 1000;
        const colors = ['#6366f1', '#06b6d4', '#ec4899', '#f59e0b'];

        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: colors
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      });

      // 3. Stars
      container.querySelector("#confettiStars").addEventListener("click", () => {
        confetti({
          shapes: ['star'],
          particleCount: 60,
          spread: 100,
          scalar: 1.3,
          colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
        });
      });

      // 4. Snow
      container.querySelector("#confettiSnow").addEventListener("click", () => {
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        let skew = 1;

        (function frame() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return;

          const ticks = Math.max(200, 500 * (timeLeft / duration));
          skew = Math.max(0.8, skew - 0.001);

          confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
              x: Math.random(),
              y: (Math.random() * skew) - 0.2
            },
            colors: ['#ffffff', '#a5f3fc', '#e0e7ff'],
            shapes: ['circle'],
            gravity: 0.6,
            scalar: 0.8,
            drift: 0.2
          });

          requestAnimationFrame(frame);
        })();
      });
    }
  },
  {
    id: "typedjs",
    name: "Typed.js",
    version: "v2.1.0",
    category: "animation",
    categoryLabel: "모션 & 이펙트",
    size: "12 KB",
    summary: "실제 사람이 타이핑하고 지우는 듯한 인터랙티브 타자 효과 라이브러리",
    docsUrl: "https://mattboldt.com/demos/typed-js/",
    whyToUse: [
      { title: "랜딩 페이지 히어로 카피", desc: "'우리는 [스타트업 / 크리에이터 / 개발자]를 위한 솔루션입니다' 문구를 시선 집중시킵니다." },
      { title: "포트폴리오 인트로 자기소개", desc: "자신의 핵심 역량과 키워드를 역동적으로 순환시켜 첫인상을 강조합니다." },
      { title: "AI 챗봇 타이핑 애니메이션", desc: "마치 AI가 실시간으로 문장을 생성하는 듯한 느낌을 시각적으로 연출합니다." }
    ],
    codeSnippet: `const typed = new Typed('#typedElement', {
  strings: ['프론트엔드 개발자', 'UI/UX 디자이너', '풀스택 엔지니어'],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1500,
  loop: true
});`,
    renderDemo: (container) => {
      container.innerHTML = `
        <div class="typed-display-box">
          <span style="color: #94a3b8; margin-right: 8px;">&gt;</span>
          <span id="liveTypedTarget"></span>
        </div>
        <div class="demo-controls" style="margin-top: 12px;">
          <input type="text" id="typedCustomInput" class="input-demo" style="flex: 1;" placeholder="새로운 타이핑 문구 입력 (쉼표로 구분)" value="JavaScript 전문가, 풀스택 개발자, AI 솔루션 아키텍트" />
          <button class="btn-demo" id="typedApplyBtn">적용 & 재생</button>
        </div>
      `;

      const target = container.querySelector("#liveTypedTarget");
      const customInput = container.querySelector("#typedCustomInput");
      const applyBtn = container.querySelector("#typedApplyBtn");

      let typedInstance = null;

      function startTyped(stringsArray) {
        if (typedInstance) typedInstance.destroy();
        typedInstance = new Typed(target, {
          strings: stringsArray,
          typeSpeed: 60,
          backSpeed: 35,
          backDelay: 1200,
          loop: true,
          cursorChar: '▋'
        });
      }

      startTyped(["JavaScript 전문가", "풀스택 개발자", "AI 솔루션 아키텍트"]);

      applyBtn.addEventListener("click", () => {
        const text = customInput.value.trim();
        const arr = text ? text.split(",").map(s => s.trim()).filter(Boolean) : ["혁신적인 웹 솔루션"];
        startTyped(arr);
      });
    }
  },
  {
    id: "animejs",
    name: "Anime.js",
    version: "v3.2.1",
    category: "animation",
    categoryLabel: "모션 & 이펙트",
    size: "17 KB",
    summary: "CSS 속성, SVG 패스, DOM, JS 객체를 부드럽게 제어하는 초강력 애니메이션 엔진",
    docsUrl: "https://animejs.com/",
    whyToUse: [
      { title: "시차(Stagger) 파도타기 효과", desc: "수많은 카드나 리스트 아이템이 시차를 두고 순차적으로 떠오르는 고급 모션을 구현합니다." },
      { title: "스프링 물리 탄성 바운스", desc: "CSS 기본 bezier로는 흉내 낼 수 없는 쫀득한 물리 탄성(Elastic) 애니메이션을 만듭니다." },
      { title: "SVG 모핑 및 패스 드로잉", desc: "로고 윤곽선이 그려지는 효과나 도형 형태가 변형되는 SVG 모션을 쉽게 제어합니다." }
    ],
    codeSnippet: `// 시차(Stagger) 그리드 애니메이션
anime({
  targets: '.anime-box',
  translateY: [-30, 0],
  scale: [0.8, 1],
  opacity: [0, 1],
  delay: anime.stagger(60, { grid: [4, 4], from: 'center' }),
  easing: 'easeOutElastic(1, .6)'
});`,
    renderDemo: (container) => {
      container.innerHTML = `
        <div class="anime-grid" id="animeGridBoxes">
          <!-- 16 Grid boxes -->
        </div>
        <div class="demo-controls" style="margin-top: 12px;">
          <button class="btn-demo" id="animeWaveBtn"><i data-lucide="activity"></i> 파도타기 (Wave)</button>
          <button class="btn-demo-secondary" id="animeRotateBtn"><i data-lucide="rotate-cw"></i> 회전 & 스케일</button>
          <button class="btn-demo-secondary" id="animeElasticBtn"><i data-lucide="layers"></i> 탄성 바운스</button>
        </div>
      `;

      const grid = container.querySelector("#animeGridBoxes");
      for (let i = 0; i < 16; i++) {
        const box = document.createElement("div");
        box.className = "anime-box";
        grid.appendChild(box);
      }

      function runWave() {
        anime({
          targets: grid.querySelectorAll(".anime-box"),
          scale: [
            { value: 0.3, easing: 'easeOutSine', duration: 300 },
            { value: 1, easing: 'easeInOutQuad', duration: 600 }
          ],
          translateY: [
            { value: -20, easing: 'easeOutSine', duration: 300 },
            { value: 0, easing: 'easeInOutQuad', duration: 600 }
          ],
          delay: anime.stagger(50, { grid: [2, 8], from: 'center' })
        });
      }

      function runRotate() {
        anime({
          targets: grid.querySelectorAll(".anime-box"),
          rotate: '1turn',
          borderRadius: ['6px', '50%', '6px'],
          duration: 900,
          easing: 'easeInOutCirc',
          delay: anime.stagger(40)
        });
      }

      function runElastic() {
        anime({
          targets: grid.querySelectorAll(".anime-box"),
          translateY: [-28, 0],
          delay: anime.stagger(30, { from: 'last' }),
          easing: 'easeOutElastic(1, .5)'
        });
      }

      container.querySelector("#animeWaveBtn").addEventListener("click", runWave);
      container.querySelector("#animeRotateBtn").addEventListener("click", runRotate);
      container.querySelector("#animeElasticBtn").addEventListener("click", runElastic);

      runWave();
    }
  },
  {
    id: "cleavejs",
    name: "Cleave.js",
    version: "v1.6.0",
    category: "form",
    categoryLabel: "입력 폼 & 아이콘",
    size: "11 KB",
    summary: "사용자가 타이핑하는 동안 전화번호, 카드번호, 금액 단위 포맷을 실시간 완성하는 입력 마스크",
    docsUrl: "https://nosir.github.io/cleave.js/",
    whyToUse: [
      { title: "전화번호 자동 하이픈 (010-XXXX-XXXX)", desc: "숫자만 쳐도 자동으로 통신사 표준 하이픈 서식으로 정돈해 줍니다." },
      { title: "화폐 단위 실시간 3자리 콤마 (₩ 1,000,000)", desc: "결제 및 송금 금액 입력 시 콤마를 실시간 추가하여 가독성을 높입니다." },
      { title: "신용카드 번호 4자리 자동 띄어쓰기", desc: "카드 번호와 유효기간(MM/YY) 입력을 분리해 오타를 획기적으로 줄입니다." }
    ],
    codeSnippet: `// 1. 휴대폰 번호 마스크 (010-0000-0000)
new Cleave('#phone', { delimiters: ['-', '-'], blocks: [3, 4, 4], numericOnly: true });

// 2. 화폐 금액 3자리 콤마
new Cleave('#price', { numeral: true, numeralThousandsGroupStyle: 'thousand' });`,
    renderDemo: (container) => {
      container.innerHTML = `
        <div class="cleave-grid">
          <div class="cleave-field">
            <label>📱 휴대폰 번호 자동 서식</label>
            <input type="text" id="cleavePhone" class="input-demo" placeholder="01012345678" />
          </div>
          <div class="cleave-field">
            <label>💳 신용카드 4자리 분리</label>
            <input type="text" id="cleaveCard" class="input-demo" placeholder="1234567812345678" />
          </div>
          <div class="cleave-field">
            <label>💰 금액 3자리 콤마 (원)</label>
            <input type="text" id="cleaveNumeral" class="input-demo" placeholder="1000000" />
          </div>
          <div class="cleave-field">
            <label>📅 생년월일 포맷 (YYYY-MM-DD)</label>
            <input type="text" id="cleaveDate" class="input-demo" placeholder="19950512" />
          </div>
        </div>
      `;

      new Cleave(container.querySelector("#cleavePhone"), {
        delimiters: ['-', '-'],
        blocks: [3, 4, 4],
        numericOnly: true
      });

      new Cleave(container.querySelector("#cleaveCard"), {
        creditCard: true
      });

      new Cleave(container.querySelector("#cleaveNumeral"), {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        prefix: '₩ '
      });

      new Cleave(container.querySelector("#cleaveDate"), {
        date: true,
        delimiter: '-',
        datePattern: ['Y', 'm', 'd']
      });
    }
  },
  {
    id: "lodash",
    name: "Lodash",
    version: "v4.17.21",
    category: "data",
    categoryLabel: "데이터 & 유틸",
    size: "25 KB (모듈형)",
    summary: "검색 Debounce, 스크롤 Throttle, 깊은 복사(cloneDeep) 등을 지원하는 JS 필수 유틸리티 키트",
    docsUrl: "https://lodash.com/",
    whyToUse: [
      { title: "검색 디바운스(Debounce)로 서버 부하 절감", desc: "사용자가 타이핑을 멈춘 뒤에만 검색 API를 1회 호출하여 서버 트래픽을 90% 이상 절약합니다." },
      { title: "무한 스크롤 쓰로틀(Throttle)", desc: "스크롤이나 리사이즈 이벤트가 초당 수백 번 불필요하게 실행되는 것을 방지합니다." },
      { title: "복잡한 데이터 그룹화 & 정렬", desc: "_.groupBy, _.orderBy, _.cloneDeep으로 데이터 구조를 간결하고 안전하게 처리합니다." }
    ],
    codeSnippet: `// 1. 디바운스: 입력 후 400ms 대기 시 검색 실행
const sendSearchQuery = _.debounce((text) => {
  console.log('실제 API 호출:', text);
}, 400);

// 2. 배열 그룹화
const grouped = _.groupBy(users, 'role');`,
    renderDemo: (container) => {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <input type="text" id="lodashInput" class="input-demo" placeholder="여기에 아무 글자나 빠르게 타이핑해보세요!" />
          <div class="lodash-metrics">
            <div class="metric-card raw">
              <span>일반 입력 이벤트 발생</span>
              <strong id="rawCount">0회</strong>
            </div>
            <div class="metric-card debounced">
              <span>Lodash 디바운스 API 호출</span>
              <strong id="debounceCount">0회</strong>
            </div>
          </div>
          <p id="lodashLog" style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">
            마지막 전송된 검색어: <span style="color: var(--accent-cyan);">(없음)</span>
          </p>
        </div>
      `;

      const input = container.querySelector("#lodashInput");
      const rawCountEl = container.querySelector("#rawCount");
      const debounceCountEl = container.querySelector("#debounceCount");
      const logEl = container.querySelector("#lodashLog");

      let rawCalls = 0;
      let debouncedCalls = 0;

      const triggerDebounced = _.debounce((val) => {
        debouncedCalls++;
        debounceCountEl.textContent = `${debouncedCalls}회`;
        logEl.innerHTML = `마지막 전송된 검색어: <span style="color: var(--accent-cyan);">${val || '(빈 문자열)'}</span>`;
      }, 500);

      input.addEventListener("input", (e) => {
        rawCalls++;
        rawCountEl.textContent = `${rawCalls}회`;
        triggerDebounced(e.target.value);
      });
    }
  },
  {
    id: "lucide",
    name: "Lucide Icons",
    version: "v0.344",
    category: "form",
    categoryLabel: "입력 폼 & 아이콘",
    size: "2 KB (SVG On-Demand)",
    summary: "1,000개 이상의 선명하고 일관된 디자인을 제공하는 모던 오픈소스 벡터 SVG 아이콘 라이브러리",
    docsUrl: "https://lucide.dev/",
    whyToUse: [
      { title: "일관되고 세련된 디자인 시스템", desc: "웹앱의 버튼, 네비게이션, 상태 배지에 통일감 있는 고품질 아이콘을 적용합니다." },
      { title: "실시간 크기, 굵기, 색상 제어", desc: "픽셀 깨짐 없이 size(크기), strokeWidth(선 굵기), color(색상)를 자유롭게 커스텀합니다." },
      { title: "HTML 속성 기반 초간단 렌더링", desc: "&lt;i data-lucide='sparkles'&gt;&lt;/i&gt; 태그 하나로 깔끔한 인라인 SVG를 동적 생성합니다." }
    ],
    codeSnippet: `// 1. HTML 태그 선언
// <i data-lucide="sparkles"></i>
// <i data-lucide="github"></i>

// 2. 렌더링 초기화
lucide.createIcons();`,
    renderDemo: (container) => {
      const sampleIcons = [
        "sparkles", "zap", "shield-check", "activity", "heart", 
        "star", "settings", "bell", "search", "coffee", 
        "download", "share-2", "cpu", "database", "code", "globe"
      ];

      container.innerHTML = `
        <div class="demo-controls" style="margin-bottom: 10px;">
          <input type="text" id="lucideSearch" class="input-demo" style="flex: 1;" placeholder="아이콘 이름 검색 (예: star, code, heart...)" />
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--text-secondary);">
            <span>굵기:</span>
            <input type="range" id="lucideStroke" min="1" max="3" step="0.5" value="2" style="width: 70px;" />
          </div>
        </div>
        <div class="lucide-preview-grid" id="lucideGrid">
          <!-- Icons rendered here -->
        </div>
        <p id="lucideCopyAlert" style="font-size: 0.78rem; color: var(--accent-cyan); margin: 6px 0 0; text-align: center;">
          아이콘을 클릭하면 &lt;i data-lucide="..."&gt; 태그 코드가 복사됩니다.
        </p>
      `;

      const grid = container.querySelector("#lucideGrid");
      const searchInput = container.querySelector("#lucideSearch");
      const strokeInput = container.querySelector("#lucideStroke");
      const copyAlert = container.querySelector("#lucideCopyAlert");

      function renderIcons(filter = "", stroke = 2) {
        grid.innerHTML = "";
        const filtered = sampleIcons.filter(name => name.includes(filter.toLowerCase()));
        
        if (filtered.length === 0) {
          grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 20px;">일치하는 아이콘이 없습니다.</div>`;
          return;
        }

        filtered.forEach(name => {
          const card = document.createElement("div");
          card.className = "lucide-icon-card";
          card.innerHTML = `
            <i data-lucide="${name}" style="stroke-width: ${stroke}px; width: 22px; height: 22px; color: var(--accent-cyan);"></i>
            <span>${name}</span>
          `;
          card.addEventListener("click", () => {
            const code = `<i data-lucide="${name}"></i>`;
            navigator.clipboard?.writeText(code);
            copyAlert.textContent = `✅ 복사 완료: ${code}`;
            setTimeout(() => {
              copyAlert.textContent = "아이콘을 클릭하면 <i data-lucide=\"...\"> 태그 코드가 복사됩니다.";
            }, 2500);
          });
          grid.appendChild(card);
        });

        lucide.createIcons({ root: grid });
      }

      renderIcons();

      searchInput.addEventListener("input", (e) => {
        renderIcons(e.target.value, strokeInput.value);
      });

      strokeInput.addEventListener("input", (e) => {
        renderIcons(searchInput.value, e.target.value);
      });
    }
  }
];

// App State
const state = {
  activeCategory: "all",
  searchQuery: ""
};

// Render Main Library Cards
function renderLibraries() {
  const grid = document.getElementById("libraryGrid");
  grid.innerHTML = "";

  const filtered = LIBRARIES.filter(lib => {
    const matchCategory = state.activeCategory === "all" || lib.category === state.activeCategory;
    const query = state.searchQuery.toLowerCase();
    const matchSearch = !query || 
      lib.name.toLowerCase().includes(query) ||
      lib.summary.toLowerCase().includes(query) ||
      lib.whyToUse.some(w => w.title.toLowerCase().includes(query) || w.desc.toLowerCase().includes(query));
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
        <h3 style="font-size: 1.3rem; margin-bottom: 6px;">검색 결과가 없습니다</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">다른 검색어를 입력하시거나 카테고리 필터를 변경해보세요.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filtered.forEach((lib, index) => {
    const card = document.createElement("article");
    card.className = "lib-showcase";
    card.id = `card-${lib.id}`;

    // Why to use HTML
    const whyItemsHtml = lib.whyToUse.map(item => `
      <li>
        <div><strong>${item.title}:</strong> ${item.desc}</div>
      </li>
    `).join("");

    card.innerHTML = `
      <!-- Left Column: Knowledge & Why to use -->
      <div class="lib-info">
        <div class="lib-header">
          <div class="lib-brand">
            <div class="lib-number">${index + 1}</div>
            <div class="lib-title-area">
              <h2>${lib.name}</h2>
              <div class="lib-badges">
                <span class="badge category">${lib.categoryLabel}</span>
                <span class="badge">${lib.version}</span>
                <span class="badge size">${lib.size}</span>
              </div>
            </div>
          </div>
        </div>

        <p class="lib-summary">${lib.summary}</p>

        <!-- Why to Use Box -->
        <div class="why-box">
          <div class="why-title">
            <i data-lucide="help-circle"></i>
            <span>언제 쓰면 좋은가? (실무 활용 포인트)</span>
          </div>
          <ul class="why-list">
            ${whyItemsHtml}
          </ul>
        </div>

        <!-- Quick Code Example -->
        <div class="code-box">
          <div class="code-header">
            <span>핵심 사용 예제</span>
            <button class="copy-btn" data-code="${encodeURIComponent(lib.codeSnippet)}">
              <i data-lucide="copy"></i> 복사
            </button>
          </div>
          <pre><code>${escapeHtml(lib.codeSnippet)}</code></pre>
        </div>

        <div class="lib-footer-links">
          <a href="${lib.docsUrl}" target="_blank" rel="noopener noreferrer" class="doc-link">
            공식 문서 바로가기 <i data-lucide="external-link"></i>
          </a>
        </div>
      </div>

      <!-- Right Column: Live Interactive Demo -->
      <div class="lib-demo">
        <div class="demo-title-bar">
          <div class="demo-label">
            <i data-lucide="play-circle"></i>
            <span>실시간 인터랙티브 라이브 랩</span>
          </div>
          <div class="live-indicator">
            <span class="live-dot"></span> LIVE DEMO
          </div>
        </div>

        <div class="demo-playground" id="demo-container-${lib.id}">
          <!-- Live widget injected here -->
        </div>
      </div>
    `;

    grid.appendChild(card);

    // Render interactive live demo for this library
    const demoContainer = card.querySelector(`#demo-container-${lib.id}`);
    if (demoContainer && typeof lib.renderDemo === "function") {
      lib.renderDemo(demoContainer);
    }
  });

  // Re-run Lucide icons for new elements
  lucide.createIcons();

  // Attach copy snippet events
  grid.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = decodeURIComponent(btn.dataset.code);
      navigator.clipboard?.writeText(code);
      btn.innerHTML = `<i data-lucide="check"></i> 완료`;
      lucide.createIcons({ root: btn });
      setTimeout(() => {
        btn.innerHTML = `<i data-lucide="copy"></i> 복사`;
        lucide.createIcons({ root: btn });
      }, 2000);
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Category Tabs & Search Event Listeners
function initEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const categoryTabs = document.getElementById("categoryTabs");

  // Search Debounce
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderLibraries();
  });

  // Category Filter
  categoryTabs.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      categoryTabs.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeCategory = btn.dataset.category;
      renderLibraries();
    });
  });
}

// Initialize on Load
window.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  renderLibraries();
  lucide.createIcons();
});
