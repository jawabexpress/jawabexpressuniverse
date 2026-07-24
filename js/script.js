let coins = 0;
let currentQuestionIndex = 0;
let activeQuestions = [];

const questionsData = {
    bm: [
        { q: "Pilih perkataan sinonim bagi 'Pantas':", options: ["Laju", "Lambat", "Berat", "Jauh"], answer: 0 },
        { q: "Apakah kata nama am bagi 'Kucing':", options: ["Binatang", "Tempat", "Manusia", "Masa"], answer: 0 }
    ],
    math: [
        { q: "Berapakah hasil tambah bagi 5 + 7?", options: ["10", "11", "12", "13"], answer: 2 },
        { q: "Berapakah nilai bagi 9 darab 3?", options: ["24", "27", "30", "21"], answer: 1 }
    ]
};

function startQuiz(type) {
    activeQuestions = questionsData[type];
    currentQuestionIndex = 0;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('quiz-title').innerText = type === 'bm' ? "Misi Bahasa Melayu" : "Misi Matematik";
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < activeQuestions.length) {
        let currentQ = activeQuestions[currentQuestionIndex];
        document.getElementById('question-text').innerText = currentQ.q;
        let optionsDiv = document.getElementById('options-container');
        optionsDiv.innerHTML = '';
        
        currentQ.options.forEach((opt, index) => {
            let btn = document.createElement('button');
            btn.className = 'btn option-btn';
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(index, currentQ.answer);
            optionsDiv.appendChild(btn);
        });
        document.getElementById('back-btn').classList.add('hidden');
    } else {
        document.getElementById('question-text').innerText = "Tahniah! Anda telah melengkapkan misi angkasa lepas ini! 🎉";
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('back-btn').classList.remove('hidden');
    }
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        coins += 10;
        document.getElementById('coin-count').innerText = coins;
        alert("Betul! +10 Koin ⭐");
    } else {
        alert("Salah! Cuba lagi.");
    }
    currentQuestionIndex++;
    loadQuestion();
}

function goHome() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');
}
