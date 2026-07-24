```javascript
let mqQuestions = [], mqIdx = 0, mqTimer = null, mqTimeLeft = 0, mqRunning = false;
let mqCoins = 0, mqXP = 0, mqCorrect = 0, mqMissionIdx = 0, mqSubject = 'math', mqReturnScreen = 'math-galaxy';

function startMathMission(idx) { 
  mqMissionIdx = idx; mqSubject = 'math'; mqReturnScreen = 'math-galaxy'; 
  mqQuestions = genMathMission(selectedMathGrade, idx); 
  mulakanKuiz(MATH_GRADES[selectedMathGrade].missions[idx].name, '🪐');
}

function startBMMission(idx) { 
  mqMissionIdx = idx; mqSubject = 'bm'; mqReturnScreen = 'bm-galaxy'; 
  mqQuestions = genBMMission(selectedBMGrade, idx); 
  mulakanKuiz(BM_GRADES[selectedBMGrade].missions[idx].name, '📚');
}

function mulakanKuiz(title, icon) {
  shuffleArray(mqQuestions); 
  mqIdx = 0; mqCoins = 0; mqXP = 0; mqCorrect = 0; mqRunning = true; 
  document.getElementById('mq-title').textContent = `${icon} ${title}`; 
  showScreen('mission-quiz'); 
  showMQQuestion();
}

function showMQQuestion() {
  if (mqIdx >= mqQuestions.length) { endMission(); return; }
  
  const q = mqQuestions[mqIdx];
  document.getElementById('mq-question').textContent = q.q;
  document.getElementById('mq-num').textContent = 'Q ' + (mqIdx + 1) + '/' + mqQuestions.length;
  document.getElementById('mq-coins').textContent = '🪙 ' + mqCoins;
  document.getElementById('mq-xp-earned').textContent = '⭐ ' + mqXP;
  
  const ans = document.getElementById('mq-answers'); 
  ans.innerHTML = '';
  
  const shuffled = q.a.map((a, i) => ({ text: a, idx: i })); 
  shuffleArray(shuffled);
  
  shuffled.forEach(item => { 
    const btn = document.createElement('button'); 
    btn.className = 'answer-btn rounded-xl p-4 text-base font-bold tactile-btn'; 
    btn.textContent = item.text; 
    btn.onclick = () => answerMQ(item.idx, q.c, btn); 
    ans.appendChild(btn); 
  });
  
  mqTimeLeft = 150; 
  clearInterval(mqTimer);
  document.getElementById('mq-timer').style.width = '100%';
  mqTimer = setInterval(() => { 
    mqTimeLeft--; 
    document.getElementById('mq-timer').style.width = Math.max(0, mqTimeLeft / 150 * 100) + '%'; 
    document.getElementById('mq-time-label').textContent = Math.ceil(mqTimeLeft / 10); 
    
    if (mqTimeLeft <= 0) { 
      clearInterval(mqTimer); 
      answerMQ(-1, q.c, null); 
    } 
  }, 100);
}

function answerMQ(chosen, correct, btn) {
  clearInterval(mqTimer); 
  const btns = document.getElementById('mq-answers').querySelectorAll('button'); 
  btns.forEach(b => b.disabled = true);
  
  if (chosen === correct) { 
    if (btn) btn.classList.add('correct'); 
    mqCorrect++; GS.totalCorrect++; 
    mqCoins += 10; GS.coins += 10; 
    mqXP += 10; addXP(10); 
    showToast('✅ Pandai! +10🪙', 'success');
  } else { 
    if (btn) btn.classList.add('wrong'); 
    btns.forEach(b => { if (b.textContent === mqQuestions[mqIdx].a[correct]) b.classList.add('correct') }); 
    GS.coins = Math.max(0, GS.coins - 5); 
    mqCoins -= 5; 
    showToast('❌ Cuba Lagi!', 'error');
  }
  updateUI(); 
  setTimeout(() => { mqIdx++; showMQQuestion(); }, 1200);
}

function endMission() { 
  mqRunning = false; clearInterval(mqTimer); 
  GS.stagesCompleted++; 
  document.getElementById('mc-score').textContent = mqCorrect; 
  document.getElementById('mc-total').textContent = mqQuestions.length; 
  document.getElementById('mc-coins').textContent = mqCoins; 
  document.getElementById('mc-xp').textContent = mqXP; 
  document.getElementById('mission-complete-overlay').classList.remove('hidden'); 
  updateUI(); 
}

function exitMission() { mqRunning = false; clearInterval(mqTimer); showScreen(mqReturnScreen); }
function closeMissionComplete() { document.getElementById('mission-complete-overlay').classList.add('hidden'); showScreen(mqReturnScreen); }
function replayMission() { document.getElementById('mission-complete-overlay').classList.add('hidden'); if (mqSubject === 'math') startMathMission(mqMissionIdx); else startBMMission(mqMissionIdx); }

function useHint() { showToast('💡 Hint digunakan (Kos 20💎)', 'info'); }
function skipQuestion() { showToast('⏩ Dilangkau (Kos 30🪙)', 'info'); setTimeout(() => { mqIdx++; showMQQuestion() }, 500); }
function useFiftyFifty() { showToast('🎯 50:50 (Kos 50💎)', 'info'); }

```
