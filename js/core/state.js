```javascript
let GS = { 
  coins: 100, diamonds: 10, energy: 30, maxEnergy: 30, 
  xp: 0, level: 1, xpToNext: 100, streakDay: 1, stagesCompleted: 0, 
  activeHero: 0, activePet: 0, totalCorrect: 0, 
  playerName: 'Express Ranger', skinsOwned: [] 
};

function saveState() {
  // Simpan data (boleh integrasi dengan pangkalan data / localStorage di sini)
}

function addXP(amount) { 
  GS.xp += amount; 
  while (GS.xp >= GS.xpToNext) { 
    GS.xp -= GS.xpToNext; 
    GS.level++; 
    GS.xpToNext = Math.round(GS.xpToNext * 1.3); 
    showLevelUp('Level ' + GS.level + '!'); 
    GS.diamonds += 5; 
    GS.energy = GS.maxEnergy;
  } 
  updateUI(); 
}

```
