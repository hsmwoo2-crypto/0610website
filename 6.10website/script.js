 const dramaData = [
    { 
        title: "Modern Family", 
        season: "11 Seasons • 250 Episodes", 
        tags: ["🏡 Family Comedy", "😂 Heartwarming", "📺 Easy Watching"], 
        posterImg: "images/modernfamily.jpg", 
        bgImg: "images/modernfamily2.jpg" 
    },
    { 
        title: "Community", 
        season: "6 Seasons • 110 Episodes", 
        tags: ["🎲 Meta Humor", "🤪 Chaotic", "🎬 Pop Culture Heavy"], 
        posterImg: "images/community.jpg", 
        bgImg: "images/community2.jpg" 
    },
    { 
        title: "The Big Bang Theory", 
        season: "12 Seasons • 279 Episodes", 
        tags: ["🧪 Nerdy Comedy", "😂 Easy Laughs", "🏠 Hangout Sitcom"], 
        posterImg: "images/bigbangtheory.jpg", 
        bgImg: "images/bigbangtheory2.jpg" 
    },
    { 
        title: "Brooklyn Nine-Nine", 
        season: "8 Seasons • 153 Episodes", 
        tags: ["🚔 Police Comedy", "😆 Chaotic", "🍕 Easy Watching"], 
        posterImg: "images/brooklyn99.jpg", 
        bgImg: "images/brooklyn992.jpg" 
    },
    { 
        title: "Kim's Convenience", 
        season: "5 Seasons • 65 Episodes", 
        tags: ["🏪 Family Sitcom", "🥹 Wholesome", "☕ Cozy Vibes"], 
        posterImg: "images/kims.jpg", 
        bgImg: "images/kims2.jpg" 
    },
    { 
        title: "Unbreakable Kimmy Schmidt", 
        season: "4 Seasons • 51 Episodes", 
        tags: ["🌈 Quirky Comedy", "✨ Optimistic", "🤪 Chaotic Energy"], 
        posterImg: "images/unbreakable.jpg", 
        bgImg: "images/unbreakable2.jpg" 
    },
    { 
        title: "Abbott Elementary", 
        season: "4 Seasons • 71 Episodes", 
        tags: ["🏫 Workplace Comedy", "🥹 Heartwarming", "📚 Feel-Good"], 
        posterImg: "images/abbot.jpg", 
        bgImg: "images/abbot2.jpg" 
    },
    { 
        title: "2 Broke Girls", 
        season: "6 Seasons • 138 Episodes", 
        tags: ["💸 Friends Comedy", "😂 Fast-Paced", "🍰 Easy Watching"], 
        posterImg: "images/2brokegirls.jpg", 
        bgImg: "images/2brokegirls2.jpg" 
    },
    { 
        title: "Never Have I Ever", 
        season: "4 Seasons • 40 Episodes", 
        tags: ["🎓 Coming-of-Age", "💕 Romance", "😅 Awkward Comedy"], 
        posterImg: "images/neverhaveiever.jpg", 
        bgImg: "images/neverhaveiever2.jpg" 
    },
    { 
        title: "Friends", 
        season: "10 Seasons • 236 Episodes", 
        tags: ["☕ Classic Sitcom", "😂 Easy Laughs", "🏙️ Hangout Comedy"], 
        posterImg: "images/friends.jpg", 
        bgImg: "images/friends2.jpg" 
    },
    { 
        title: "The Good Place", 
        season: "4 Seasons • 53 Episodes", 
        tags: ["😇 Afterlife Comedy", "🧠 Clever Humor", "💛 Feel-Good"], 
        posterImg: "images/goodplace.jpg", 
        bgImg: "images/goodplace2.jpg" 
    },
    {
        title: "The Office (US)", 
        season: "9 Seasons • 201 Episodes", 
        tags: ["📄 Workplace Comedy", "😂 Awkward Humor", "📎 Mockumentary Style"], 
        posterImg: "images/theoffice.jpg", 
        bgImg: "images/theoffice2.jpg" 
    },
    {
        title: "White Chicks", 
        season: " movie • 109 min ", 
        tags: ["💅 Disguise Comedy 🤣 Absurd Humor 🎉 Party Vibes 👥 Group Friendly"],
        posterImg: "images/whitechicks.jpg", 
        bgImg: "images/whitechicks2.jpg" 
    }
];

const posters = document.querySelectorAll('.poster');
const slotWrapper = document.getElementById('slotWrapper');
const wheelContainer = document.getElementById('wheel'); 

const bgLayer = document.getElementById('bgLayer');
const infoBox = document.getElementById('infoBox');
const infoTitle = document.getElementById('infoTitle');
const infoMeta = document.getElementById('infoMeta');
const tag1 = document.getElementById('tag1');
const tag2 = document.getElementById('tag2');
const tag3 = document.getElementById('tag3');

const classNames = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13'];

// 현재 시스템상 원형의 중앙(p7 위치)에 배치되어 있는 카드의 index를 기억할 변수
let currentCenterIdx = 6; 

posters.forEach((poster, idx) => {
    poster.setAttribute('data-index', idx);
    
    // 1. 포스터 이미지 설정 (이 부분이 빠져 있었습니다)
    poster.style.backgroundImage = `url('${dramaData[idx].posterImg}')`;
    poster.style.backgroundSize = "cover";
    poster.style.backgroundPosition = "center";

    // 이미지가 잘 보이도록 기존 텍스트는 비우거나 스타일을 조정합니다.
    poster.innerText = ""; 
    poster.classList.add(classNames[idx]);
});

function initSlotMachine() {
    slotWrapper.innerHTML = '';
    const doubleData = [...dramaData, ...dramaData];
    doubleData.forEach((itemData) => {
        const item = document.createElement('div');
        item.className = 'slot-item';
        item.innerText = itemData.title;
        slotWrapper.appendChild(item);
    });
}
initSlotMachine();

// [기능 분리 1] 단순히 슬롯머신만 부드럽게 감속하면서 세우는 함수 (마우스 아웃용)
function stopSlotOnly(targetIdx) {
    slotWrapper.classList.remove('spinning');
    slotWrapper.classList.add('stopping');
    
    const itemHeight = 85; 
    const stopPosition = targetIdx * itemHeight;
    slotWrapper.style.transform = `translateY(-${stopPosition}px)`;
}

// [기능 분리 2] 슬롯머신을 세우고 + 배경 이미지 풀스크린 + 정보창까지 띄우는 함수 (진짜 클릭용)
function stopSlotWithUI(targetIdx) {
    // 1) 슬롯머신 감속 정지
    stopSlotOnly(targetIdx);

    // 2) 클릭한 드라마의 상세 데이터를 가져와서 UI 매핑
    const currentData = dramaData[targetIdx];
    
    // 배경 레이어 사진 세팅 및 페이드인 활성화
    if(currentData.bgImg) {
        // 2. 배경 이미지도 url() 형식이 필요합니다.
        bgLayer.style.backgroundImage = `url('${currentData.bgImg}')`;
    } else {
        bgLayer.style.backgroundImage = 'none';
    }
    bgLayer.classList.add('active');

    // 왼쪽 하단 작품 정보 텍스트 세팅 및 페이드인 활성화
    infoTitle.innerText = currentData.title;
    infoMeta.innerText = currentData.season;
    tag1.innerText = currentData.tags[0];
    tag2.innerText = currentData.tags[1];
    tag3.innerText = currentData.tags[2];
    infoBox.classList.add('active');
}

// 인터랙션 이벤트 구현
posters.forEach((targetPoster) => {
    
    // 휠 탐색 중 (마우스가 포스터 위를 스쳐 지나갈 때)
    targetPoster.addEventListener('mouseenter', () => {
        const targetIdx = parseInt(targetPoster.getAttribute('data-index'));
        const centerClassIdx = 6; 
        
        currentCenterIdx = targetIdx;

        posters.forEach((poster) => {
            const currentIdx = parseInt(poster.getAttribute('data-index'));
            let newClassIdx = (currentIdx - targetIdx + centerClassIdx) % 13;
            if (newClassIdx < 0) newClassIdx += 13;
            
            poster.classList.remove(...classNames, 'active');
            poster.classList.add(classNames[newClassIdx]);
        });

        // 슬롯머신 회전 시작
        slotWrapper.classList.remove('stopping');
        slotWrapper.classList.add('spinning');
        slotWrapper.style.transform = ''; 
    });

    // [핵심 클릭 이벤트] 포스터를 명확하게 '클릭'했을 때만 정보창과 풀스크린 배경을 노출시킵니다.
    targetPoster.addEventListener('click', () => {
        posters.forEach((poster) => {
            if (poster.classList.contains('p7')) {
                poster.classList.add('active');
            }
        });
        // 슬롯머신 정지 + 배경화면 등장 + 작품 정보 등장 통합 실행
        stopSlotWithUI(currentCenterIdx);
    });
});

// [마우스 탈출 이벤트] 마우스가 우측 선택 휠 영역 전체를 벗어났을 때
wheelContainer.addEventListener('mouseleave', () => {
    // 배경이나 정보창은 절대 건드리지 않고, 오직 슬롯머신만 부드럽게 감속하며 세웁니다.
    stopSlotOnly(currentCenterIdx);
});