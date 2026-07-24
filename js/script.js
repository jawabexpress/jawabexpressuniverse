let player = {
    coins: 100,
    level: 1,
    hero: "Kadet Alpha"
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

const databaseSoalan = {
    bm: [
        { q: "Pilih perkataan sinonim bagi 'Pantas':", options: ["Laju", "Lambat", "Berat", "Jauh"], answer: 0 },
        { q: "Apakah kata nama am bagi 'Kucing':", options: ["Binatang", "Tempat", "Manusia", "Masa"], answer: 0 },
        { q: "Pilih ejaan yang betul:", options: ["Gerai", "Geria", "Gari", "Grei"], answer: 0 },
        { q: "Antonim bagi 'Tinggi' ialah:", options: ["Rendah", "Panjang", "Luas", "Jauh"], answer: 0 },
        { q: "Ibu memasak di...", options: ["Dapur", "Bilik air", "Garaj", "Tandas"], answer: 0 }
    ],
    math: [
        { q: "Berapakah hasil tambah bagi 5 + 7?", options: ["10", "11", "12", "13"], answer: 2 },
        { q: "Berapakah nilai bagi 9 darab 3?", options: ["24", "27", "30", "21"], answer: 1 },
        { q: "Berapakah baki jika 20 ditolak 8?", options: ["10", "11", "12", "15"], answer: 2 },
        { q: "Pilih Nombor Perdana:", options: ["4", "6", "7", "9"], answer: 2 },
        { q: "Apakah hasil bahagi 36 bahagi 6?", options: ["5", "6", "7", "8"], answer: 1 }
    ]
};

function updateUI() {
    document.getElementById('coin-count').innerText = player.coins;
    document.getElementById('level-count').innerText = player.level;
    document.getElementById('active-hero').innerText = player.hero;
}

function openScreen(screenId) {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('quiz-menu').classList.add('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('shop-screen').classList.add('hidden');

    document.getElementById(screenId).classList.remove('hidden');
    updateUI();
}

function startQuiz(type) {
    currentQuestions = databaseSoalan[type];
    currentIndex = 0;
    score = 0;
    
    document.getElementById('quiz-menu').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('mission-tag').innerText = type === 'bm' ? "Misi Bahasa Melayu" : "Misi Matematik";
    document.getElementById('finish-btn').classList.add('hidden');
    
    loadQuestion();
}

function loadQuestion() {
    if (currentIndex < currentQuestions.length) {
        let qData = currentQuestions[currentIndex];
        document.getElementById('current-q').innerText = currentIndex + 1;
        document.getElementById('total-q').innerText = currentQuestions.length;
        document.getElementById('question-text').innerText = qData.q;

        let optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        qData.options.forEach((opt, idx) => {
            let btn = document.createElement('button');
            btn.className = 'btn option-btn';
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(idx, qData.answer);
            optionsContainer.appendChild(btn);
        });
    } else {
        document.getElementById('question-text').innerText = `Tahniah! Misi Selesai! 🎉 Markah anda: ${score}/${currentQuestions.length}`;
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('finish-btn').classList.remove('hidden');
    }
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        player.coins += 15;
        score++;
        alert("Tepat sekali! +15 Koin ⭐");
    } else {
        alert("Kurang tepat! Cuba lagi dalam misi seterusnya.");
    }
    currentIndex++;
    loadQuestion();
    updateUI();
}

function buyItem(itemType, cost) {
    if (player.coins >= cost) {
        player.coins -= cost;
        if (itemType === 'pet') {
            alert("Berjaya membeli Robo-Cat Pet! 🐱");
        } else if (itemType === 'hero') {
            player.hero = "Kapal V-Max";
            alert("Berjaya menaik taraf Hero kepada Kapal V-Max! 🚀");
        }
        updateUI();
    } else {
        alert("Koin tidak mencukupi! Selesaikan lebih banyak kuiz.");
    }
}

updateUI();
