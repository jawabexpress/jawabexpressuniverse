```javascript
const MATH_GRADES = {
  1: { name: 'Darjah 1', missions: [ { name: 'Nombor Asas', icon: '🪐', desc: '1 hingga 100' }, { name: 'Tambah & Tolak', icon: '⚙️', desc: 'Operasi Asas' } ] },
  2: { name: 'Darjah 2', missions: [ { name: 'Nombor Hingga 1000', icon: '🪐', desc: 'Nilai tempat' } ] },
  3: { name: 'Darjah 3', missions: [ { name: 'Darab & Bahagi', icon: '✖️', desc: 'Sifir asas' } ] },
  4: { name: 'Darjah 4', missions: [ { name: 'Pecahan', icon: '🍕', desc: 'Pecahan wajar' } ] },
  5: { name: 'Darjah 5', missions: [ { name: 'Peratus & Nisbah', icon: '📊', desc: 'Pengiraan peratus' } ] },
  6: { name: 'Darjah 6', missions: [ { name: 'Pra-Algebra', icon: '🔤', desc: 'Penyelesaian masalah' } ] }
};

function genMathMission(grade, missionIdx) {
  const qs = []; 
  function r(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  
  const generators = {
    1: [
      [
        () => { const a = r(1, 10), b = r(1, 10); return { q: `${a} + ${b} = ?`, a: ['' + (a + b), '' + (a + b + 1), '' + (a + b - 1), '' + (a - b)], c: 0 } },
        () => { const n = r(1, 99); return { q: `Selepas nombor ${n} ialah?`, a: [String(n + 1), String(n - 1), String(n + 2), String(n)], c: 0 } }
      ],
      [ () => { const a = r(10, 20), b = r(1, 9); return { q: `${a} - ${b} = ?`, a: ['' + (a - b), '' + (a - b + 1), '' + (a + b), '0'], c: 0 } } ]
    ],
    2: [ [ () => { const a = r(50, 400), b = r(50, 400); return { q: `${a} + ${b} = ?`, a: ['' + (a + b), '' + (a + b + 10), '' + (a + b - 10), '' + (a - b)], c: 0 } } ] ],
    3: [ [ () => { const a = r(2, 9), b = r(2, 9); return { q: `${a} × ${b} = ?`, a: ['' + (a * b), '' + (a * b + a), '' + (a + b), '' + (a * b - 1)], c: 0 } } ] ],
    4: [ [ () => { const l = r(3, 10), w = r(2, 8); return { q: `Luas segiempat ${l}cm × ${w}cm?`, a: [`${l * w} cm²`, `${2 * (l + w)} cm²`, `${l + w} cm²`, `${l * w + l} cm²`], c: 0 } } ] ],
    5: [ [ () => { const pct = 20, val = r(2, 10) * 10; return { q: `${pct}% daripada ${val} = ?`, a: ['' + (val * pct / 100), '' + (val + pct), '' + val, '' + pct], c: 0 } } ] ],
    6: [ [ () => { const a = r(2, 5), ans = r(2, 10); return { q: `Cari nilai x: ${a}x = ${a * ans}`, a: ['' + ans, '' + (a * ans), '' + a, '' + (ans + 1)], c: 0 } } ] ]
  };
  
  const templates = generators[grade] ? generators[grade][missionIdx] || generators[grade][0] : generators[1][0];
  for (let i = 0; i < 10; i++) {
    qs.push(templates[i % templates.length]());
  }
  return qs;
}

```
