```javascript
// Pengurusan Senarai Hero
const heroes = [
  { name: 'Cahaya Murni', emoji: '🌟', bonus: '+5% XP', cost: 0 }, 
  { name: 'Srikandi Berani', emoji: '🔥', bonus: '+10% Coin', cost: 300 }, 
  { name: 'Luna Penyayang', emoji: '🌙', bonus: '-2 penalti', cost: 350 },
  { name: 'Wira Petir', emoji: '⚡', bonus: '+1 Hint', cost: 500 }
];

// Pengurusan Senarai Pet
const pets = [
  { name: 'Blaze Jr.', emoji: '🐉', bonus: '+5% XP' }, 
  { name: 'Foxia', emoji: '🦊', bonus: '+5% Coin' }, 
  { name: 'Owlstar', emoji: '🦉', bonus: '+1 Hint' }
];

// Pengurusan Item Kedai (Shop) & Harga Koin/Diamond
const shopItems = [
  { name: 'Energy x10', icon: '⚡', price: '💎30', coinCost: 0, diamondCost: 30, effect: 'Tambah 10 energy' },
  { name: 'Hint Pack x5', icon: '💡', price: '🪙500', coinCost: 500, diamondCost: 0, effect: '5 hint tambahan' },
  { name: 'Starblade', icon: '⚔️', price: '🪙500', coinCost: 500, diamondCost: 0, effect: 'Senjata kosmetik' }
];

// Senarai Planet Galaksi
const galaxyPlanets = [
  { name: 'Galaksi Permulaan', icon: '🌍', desc: 'Bermula di sini', unlock: 'Terbuka', check: () => true },
  { name: 'Kristal Biru', icon: '💎', desc: 'Dunia kristal', unlock: 'Level 3+', check: () => GS.level >= 3 }
];

```
