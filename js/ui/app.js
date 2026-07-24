```javascript
function updateUI() {
  const hero = heroes[GS.activeHero] || heroes[0];
  const pet = pets[GS.activePet] || pets[0];
  
  const homeHero = document.getElementById('home-hero-avatar'); if(homeHero) homeHero.textContent = hero.emoji;
  const homePet = document.getElementById('home-pet-avatar'); if(homePet) homePet.textContent = pet.emoji;
  
  document.getElementById('coin-display').textContent = GS.coins.toLocaleString();
  document.getElementById('diamond-display').textContent = GS.diamonds;
  document.getElementById('xp-display').textContent = 'Lv.' + GS.level;
  document.getElementById('home-hero-name').textContent = hero.name;
  document.getElementById('home-pet-name').textContent = pet.name;
  
  const pct = Math.min(100, Math.round(GS.xp / GS.xpToNext * 100));
  document.getElementById('xp-bar').style.width = pct + '%';
  
  saveState();
}

function showScreen(id) { 
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); 
  const el = document.getElementById('screen-' + id); 
  if (el) el.classList.add('active'); 
  
  const navMap = { home: 0, galaxy: 1, subject: 2, shop: 3, profile: 4 }; 
  document.querySelectorAll('.nav-item').forEach((n, i) => n.classList.toggle('active', i === (navMap[id] ?? -1))); 
  window.scrollTo(0, 0); 
  
  if (id === 'hero-system') renderHeroes(); 
  if (id === 'pet-system') renderPets(); 
  if (id === 'shop') renderShop(); 
  if (id === 'galaxy') renderGalaxyPlanets();
}

function navTo(id) { showScreen(id); }

let selectedBMGrade = 1, selectedMathGrade = 1;
function renderGradeButtons(type) {
  const container = document.getElementById(`${type}-grade-buttons`);
  if(!container) return;
  container.innerHTML = '';
  for(let i=1; i<=6; i++) {
    container.innerHTML += `<button class="grade-planet bg-gradient-to-br from-indigo-500 to-purple-600 tactile-btn p-4 rounded-2xl flex flex-col items-center justify-center border border-purple-400/30" onclick="select${type.toUpperCase()}Grade(${i})"><span class="text-3xl">🪐</span><span class="text-sm font-bold mt-1">Darjah ${i}</span></button>`;
  }
}

function selectBMGrade(g) { 
  selectedBMGrade = g; 
  document.getElementById('bm-galaxy-grade-label').textContent = `Darjah ${g} Misi`;
  renderBMMissionGrid(g);
  showScreen('bm-galaxy'); 
}

function selectMathGrade(g) { 
  selectedMathGrade = g; 
  document.getElementById('math-galaxy-grade-label').textContent = `Darjah ${g} Misi`;
  renderMathMissionGrid(g);
  showScreen('math-galaxy'); 
}

function renderBMMissionGrid(g) {
  const grid = document.getElementById('bm-mission-grid');
  grid.innerHTML = '';
  BM_GRADES[g].missions.forEach((m, i) => {
    grid.innerHTML += `<div class="mission-card"><div class="flex items-center gap-3 mb-2"><span class="text-3xl">${m.icon}</span><div><h3 class="font-bold text-base text-cyan-100">${m.name}</h3><p class="text-sm text-slate-300">${m.desc}</p></div></div><button class="neon-btn tactile-btn w-full py-2.5 rounded-full text-sm font-bold text-cyan-200 bg-purple-900/50 border border-purple-500" onclick="startBMMission(${i})">🚀 Mula Misi</button></div>`;
  });
}

function renderMathMissionGrid(g) {
  const grid = document.getElementById('mission-grid');
  grid.innerHTML = '';
  MATH_GRADES[g].missions.forEach((m, i) => {
    grid.innerHTML += `<div class="mission-card"><div class="flex items-center gap-3 mb-2"><span class="text-3xl">${m.icon}</span><div><h3 class="font-bold text-base text-cyan-100">${m.name}</h3><p class="text-sm text-slate-300">${m.desc}</p></div></div><button class="neon-btn tactile-btn w-full py-2.5 rounded-full text-sm font-bold text-cyan-200 bg-purple-900/50 border border-purple-500" onclick="startMathMission(${i})">🚀 Mula Misi</button></div>`;
  });
}

function renderHeroes() {
  const grid = document.getElementById('hero-grid');
  if(!grid) return;
  grid.innerHTML = '';
  heroes.forEach((h, i) => {
    const active = GS.activeHero === i;
    grid.innerHTML += `<div class="section-card text-center cursor-pointer ${active ? 'border-cyan-400 border-2' : ''}" onclick="GS.activeHero=${i}; renderHeroes(); showToast('${h.name} dipilih!', 'success');"><div class="text-5xl mb-2">${h.emoji}</div><p class="text-sm font-bold">${h.name}</p><p class="text-xs text-green-300">${h.bonus}</p>${active ? '<span class="text-xs text-cyan-300 font-bold">Aktif</span>' : ''}</div>`;
  });
}

function renderPets() {
  const grid = document.getElementById('pet-grid');
  if(!grid) return;
  grid.innerHTML = '';
  pets.forEach((p, i) => {
    const active = GS.activePet === i;
    grid.innerHTML += `<div class="section-card text-center cursor-pointer ${active ? 'border-orange-400 border-2' : ''}" onclick="GS.activePet=${i}; renderPets(); showToast('${p.name} dipilih!', 'success');"><div class="text-5xl mb-2">${p.emoji}</div><p class="text-sm font-bold">${p.name}</p><p class="text-xs text-orange-300">${p.bonus}</p>${active ? '<span class="text-xs text-orange-300 font-bold">Aktif</span>' : ''}</div>`;
  });
}

function renderShop() {
  const grid = document.getElementById('shop-grid');
  if(!grid) return;
  grid.innerHTML = '';
  shopItems.forEach(item => {
    grid.innerHTML += `<div class="shop-item"><div class="text-3xl mb-1">${item.icon}</div><p class="text-sm font-bold">${item.name}</p><p class="text-xs text-slate-300">${item.effect}</p><p class="text-sm text-yellow-300 font-bold mt-1">${item.price}</p></div>`;
  });
}

function renderGalaxyPlanets() {
  const grid = document.getElementById('galaxy-planets');
  if(!grid) return;
  grid.innerHTML = '';
  galaxyPlanets.forEach(p => {
    grid.innerHTML += `<div class="galaxy-card p-4"><div class="text-3xl mb-2">${p.icon}</div><p class="text-sm font-bold">${p.name}</p><p class="text-xs text-slate-300">${p.desc}</p></div>`;
  });
}

function confirmHeroSelection() { updateUI(); showToast('Hero Berjaya Disahkan!', 'success'); }
function confirmPetSelection() { updateUI(); showToast('Pet Berjaya Disahkan!', 'success'); }

function showToast(msg, type = 'info') { 
  const t = document.createElement('div'); t.className = 'toast'; 
  const bg = type === 'success' ? 'bg-green-800 text-green-100 border border-green-500' : type === 'error' ? 'bg-red-900 text-red-100 border border-red-500' : 'bg-purple-900 text-purple-100 border border-purple-500'; 
  t.classList.add(...bg.split(' ')); t.textContent = msg; 
  document.getElementById('toast-container').appendChild(t); 
  setTimeout(() => t.remove(), 2500); 
}

function showLevelUp(text) {
  document.getElementById('levelup-detail').textContent = text;
  document.getElementById('levelup-overlay').classList.remove('hidden');
}

function openGenericModal(html) { 
  document.getElementById('generic-modal-content').innerHTML = html; 
  document.getElementById('generic-modal').classList.add('show');
}

function profileAction(action) {
  if(action === 'stats') {
    openGenericModal(`<h2 class="text-xl font-bold text-cyan-200 mb-4">📊 Statistik</h2><p class="text-white">Total Soalan Betul: ${GS.totalCorrect}</p>`);
  } else {
    openGenericModal(`<h2 class="text-xl text-white">Fungsi ${action} akan datang!</h2>`);
  }
}

function shuffleArray(arr) { 
  for (let i = arr.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
  } 
  return arr; 
}

window.addEventListener('load', () => {
  renderGradeButtons('bm');
  renderGradeButtons('math');
  updateUI();
  setTimeout(() => { 
    const l = document.getElementById('loading-screen');
    if(l) { l.classList.add('opacity-0'); setTimeout(() => l.classList.add('hidden'), 500); }
  }, 1000);
});

```
