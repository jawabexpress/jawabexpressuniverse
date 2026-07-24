```javascript
const BM_GRADES = {
  1: { 
    name: 'Darjah 1', 
    missions: [ 
      { name: 'Dunia Huruf & Suku Kata', icon: '🔤', desc: 'Mengenal huruf, suku kata terbuka dan tertutup' }, 
      { name: 'Planet Membaca Awal', icon: '📖', desc: 'Membaca perkataan dan ayat mudah' } 
    ] 
  },
  2: { name: 'Darjah 2', missions: [ { name: 'Galaksi Ejaan', icon: '🔤', desc: 'Ejaan betul' } ] },
  3: { name: 'Darjah 3', missions: [ { name: 'Imbuhan Mantap', icon: '🔤', desc: 'Awalan dan akhiran' } ] },
  4: { name: 'Darjah 4', missions: [ { name: 'Morfologi', icon: '🔤', desc: 'Kata terbitan' } ] },
  5: { name: 'Darjah 5', missions: [ { name: 'Tatabahasa Tinggi', icon: '📝', desc: 'Ayat aktif/pasif' } ] },
  6: { name: 'Darjah 6', missions: [ { name: 'Persediaan UPSR', icon: '📚', desc: 'Soalan peperiksaan' } ] }
};

function genBMMission(grade, missionIdx) {
  const qs = []; 
  function r(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  
  const bmData = {
    1: [
      [
        () => { 
          const sk = [['ba', 'bu', 'bi'], ['ka', 'ku', 'ki'], ['ma', 'mu', 'mi']]; 
          const s = sk[r(0, 2)]; const idx = r(0, 2); 
          return { q: `Suku kata "${s[idx]}" bermula dengan huruf?`, a: [s[idx][0], 'z', 'x', 'q'], c: 0 }; 
        },
        () => { 
          const words = [['buku', 'bu-ku'], ['meja', 'me-ja']]; 
          const w = words[r(0, 1)]; 
          return { q: `Berapa suku kata dalam "${w[0]}"?`, a: ['2', '1', '3', '4'], c: 0 }; 
        }
      ],
      [ () => ({ q: 'Lawan bagi perkataan Besar?', a: ['Kecil', 'Tinggi', 'Rendah', 'Cantik'], c: 0 }) ]
    ],
    2: [ [ () => ({ q: 'Ejaan yang betul?', a: ['Kereta', 'Kerata', 'Krete', 'Kareta'], c: 0 }) ] ],
    3: [ [ () => ({ q: 'Kata hubung yang sesuai: Dia miskin ___ rajin.', a: ['tetapi', 'dan', 'lalu', 'kerana'], c: 0 }) ] ],
    4: [ [ () => ({ q: 'Apakah maksud Simpulan Bahasa "Kaki Ayam"?', a: ['Tidak pakai kasut', 'Kaki kecil', 'Berlari laju', 'Suka makan'], c: 0 }) ] ],
    5: [ [ () => ({ q: 'Tukar ke ayat pasif: Ali menendang bola.', a: ['Bola ditendang oleh Ali.', 'Ali ditendang bola.', 'Bola menendang Ali.', 'Dia tendang bola.'], c: 0 }) ] ],
    6: [ [ () => ({ q: 'Peribahasa: Bagai aur dengan...', a: ['tebing', 'sungai', 'kayu', 'buluh'], c: 0 }) ] ]
  };
  
  const templates = bmData[grade] ? bmData[grade][missionIdx] || bmData[grade][0] : bmData[1][0];
  for (let i = 0; i < 10; i++) {
    qs.push(templates[i % templates.length]());
  }
  return qs;
}

```
