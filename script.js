// 모든 카드에 클릭 이벤트 추가 (체크박스 제외)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        // 체크박스나 라벨을 클릭한 경우는 카드 뒤집기 방지
        if (e.target.classList.contains('card-checkbox') || e.target.classList.contains('checkbox-label')) {
            return;
        }
        this.classList.toggle('flipped');
    });
});

// 체크박스 클릭 시 카드 뒤집기 방지
document.querySelectorAll('.card-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// 선택된 카드들을 확인하는 함수
function getSelectedCards() {
    const selectedCards = [];
    document.querySelectorAll('.card-checkbox:checked').forEach(checkbox => {
        const card = checkbox.closest('.card');
        selectedCards.push(card);
    });
    return selectedCards;
}

// 선택된 카드들을 결과 화면에 표시하는 함수
function displaySelectedCards() {
    const selectedCards = getSelectedCards();
    const resultContainer = document.getElementById('selected-cards-container');
    
    if (selectedCards.length === 0) {
        alert('최소 하나의 카드를 선택해주세요!');
        return;
    }
    
    // 결과 화면에 카드들 복사
    resultContainer.innerHTML = '';
    selectedCards.forEach(card => {
        const clonedCard = card.cloneNode(true);
        clonedCard.classList.add('selected-card');
        // 체크박스 제거
        const checkboxContainer = clonedCard.querySelector('.checkbox-container');
        if (checkboxContainer) {
            checkboxContainer.remove();
        }
        resultContainer.appendChild(clonedCard);
    });
    
    // 결과 화면의 카드들에도 클릭 이벤트 추가
    document.querySelectorAll('.selected-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // 화면 전환
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
}

// 다시 선택하기 버튼
function goBackToSelection() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

// PDF 출력 함수
function generatePDF() {
    const element = document.getElementById('pdf-content');
    const opt = {
        margin: 1,
        filename: '페르소나카드.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'in', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };
    
    // PDF 생성
    html2pdf().set(opt).from(element).save();
}

// 이벤트 리스너 등록
document.getElementById('output-btn').addEventListener('click', displaySelectedCards);
document.getElementById('back-btn').addEventListener('click', goBackToSelection);
document.getElementById('pdf-btn').addEventListener('click', generatePDF);

// 선택된 카드들을 콘솔에 출력 (디버깅용)
document.querySelectorAll('.card-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        console.log('선택된 카드들:', getSelectedCards().map(card => card.id));
    });
});