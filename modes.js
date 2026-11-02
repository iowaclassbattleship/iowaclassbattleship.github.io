const CELL_DIM = 10;

const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const even = n => n % 2 === 0;
const odd = n => n % 2 === 1;
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
const svg = (attrs, body) => `<svg viewBox="0 0 ${CELL_DIM} ${CELL_DIM}" ${attrs}>${body}</svg>`;

function gauss() {
    const u = 1 - Math.random(), v = Math.random();
    const x = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) / 10 + 0.5;
    return x < 0 || x > 1 ? gauss() : x;
}

const MARGIN = 1
const HALF = CELL_DIM / 2 - MARGIN
const FULL = CELL_DIM - 2 * MARGIN 

const edge = [[0, 0], [HALF, 0], [FULL, 0], [FULL, HALF], [FULL, FULL], [HALF, FULL], [0, FULL], [0, HALF]];
const gap = 20 * Math.PI / 180, pt = a => `${5 + 4.4 * Math.cos(a)} ${5 + 4.4 * Math.sin(a)}`;
const ring = `M ${pt(Math.PI / 2 + gap)} A 4.4 4.4 0 1 1 ${pt(Math.PI / 2 - gap)}`;

const COLS = 40;
const at = (c, i, d) => { const col = i % COLS + d; return col >= 0 && col < COLS ? c[i + d]?.v : undefined; };

const drawStar = v => {
    const rays = shuffle(edge).slice(0, v).map(([x, y]) => `<line x1="5" y1="5" x2="${x}" y2="${y}"/>`);
    return svg(`stroke="currentColor" stroke-width="1"`, rays.join(''));
};

const drawCircle = v => svg('', `<path d="${ring}" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(${v * 45} 5 5)"/>`);

const [A, B, C] = [2.8, 5, 7.2];
const PIPS = [
    [],
    [[B, B]],
    [[A, A], [C, C]],
    [[A, A], [B, B], [C, C]],
    [[A, A], [A, C], [C, A], [C, C]],
    [[A, A], [A, C], [B, B], [C, A], [C, C]],
    [[A, A], [A, B], [A, C], [C, A], [C, B], [C, C]],
];
const drawDie = v => svg('stroke="currentColor" stroke-width="0.8" fill="none"',
    `<rect x="1" y="1" width="8" height="8" rx="1.5"/>` +
    PIPS[v].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".8" fill="currentColor" stroke="none"/>`).join(''));

const drawE = v => svg('', `<path d="M9 1H1.5V9H9M1.5 5H9" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(${v * 90} 5 5)"/>`);

const bit = (mask, k) => (mask >> k) & 1;
const popcount = mask => [0, 1, 2, 3].reduce((n, k) => n + bit(mask, k), 0);
const maskWith = min => pick([...Array(16).keys()].filter(mask => popcount(mask) >= min));
const SIDES = [[1, 1, 9, 1], [9, 1, 9, 9], [1, 9, 9, 9], [1, 1, 1, 9]]; // box edges, in bit order
const lineAt = ([x1, y1, x2, y2], extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;

const drawSides = ({ n, mask }) => svg('stroke="currentColor" stroke-width=".8" stroke-linecap="square"',
    SIDES.filter((_, k) => bit(mask, k)).map(s => lineAt(s)).join('') +
    `<text x="5" y="5.4" font-size="5" text-anchor="middle" dominant-baseline="central" fill="currentColor" stroke="none">${n}</text>`);

const drawTurned = v => svg('fill="none" stroke="currentColor" stroke-width=".8"',
    `<g transform="rotate(${v * 90} 5 5)"><rect x="1" y="1" width="8" height="8"/><polyline points="1,1 9,5 1,9"/></g>`);

const drawLines = mask => svg('fill="none" stroke="currentColor" stroke-width=".8"',
    `<rect x="1" y="1" width="8" height="8"/>` +
    [0, 1, 2, 3].map(k => lineAt([1, 2.6 + 1.6 * k, 9, 2.6 + 1.6 * k], `stroke-width=".6" ${bit(mask, k) ? '' : 'stroke-dasharray=".9 .7"'}`)).join(''));

const drawParts = mask => {
    const x = 4 + Math.random() * 2, y = 4 + Math.random() * 2;
    const spokes = [[x, 1, x, y], [x, y, 9, y], [x, y, x, 9], [1, y, x, y]];
    return svg('fill="none" stroke="currentColor" stroke-width=".8"',
        `<rect x="1" y="1" width="8" height="8"/>` + spokes.filter((_, k) => bit(mask, k)).map(s => lineAt(s)).join(''));
};

// box whose sides are thick (bit set) or thin
const drawThick = mask => svg('stroke="currentColor" stroke-linecap="square"',
    SIDES.map((s, k) => lineAt(s, `stroke-width="${bit(mask, k) ? 1.6 : .5}"`)).join(''));

const drawText = v => `${String(v)[0]}<span class="prime">${String(v).slice(1)}</span>`;

const defaultChoices = (choices) => {
    const v = pick(choices);
    return { html: drawText(v), v };
}

const modes = {
    letters: {
        label: 'letters',
        variants: [
            {
                task: 'Mark every f directly before a t',
                difficulty: 0,
                hint: ['f', 't', 't', 't', 'f', 't', 'f', 'f', 't', 'f'],
                cell: () => defaultChoices(['f', 't']),
                hit: (c, i) => c[i].v === "f" && at(c, i, 1) === "t",
            },
            {
                task: "Mark every t directly after an f",
                difficulty: 0,
                hint: ['t', 'f', 't', 't', 'f', 'f', 't', 'f', 't', 't'],
                cell: () => defaultChoices(['f', 't']),
                hit: (c, i) => c[i].v === "t" && at(c, i, -1) === "f",
            },
            {
                task: "Mark every b between two d",
                difficulty: 0,
                hint: ['d', 'b', 'd', 'b', 'b', 'd', 'd', 'b', 'd', 'b'],
                cell: () => defaultChoices(['b', 'd']),
                hit: (c, i) => c[i].v === "b" && at(c, i, -1) === "d" && at(c, i, 1) === "d",
            },
            {
                task: "Mark every b",
                difficulty: 0,
                hint: ['b', 'd', 'p', 'q', 'b', 'p', 'd', 'b', 'q', 'p'],
                cell: () => defaultChoices(['b', 'd', 'p', 'q']),
                hit: (c, i) => c[i].v === "b"
            },
            {
                task: "Mark every p",
                difficulty: 0,
                hint: ['p', 'q', 'q', 'p', 'p', 'q', 'p', 'q', 'q', 'p'],
                cell: () => defaultChoices(['p', 'q']),
                hit: (c, i) => c[i].v === "p"
            },
            {
                task: "Mark every q",
                difficulty: 0,
                hint: ['q', 'p', 'p', 'q', 'p', 'q', 'q', 'p', 'q', 'p'],
                cell: () => defaultChoices(['p', 'q']),
                hit: (c, i) => c[i].v === "q"
            },
            {
                task: "Mark every b''",
                difficulty: 0,
                hint: ["b'", "b''", "b'", "b", "b", "b'", "b''", "b''", "b'", "b",],
                cell: () => defaultChoices(['b', "b'", "b''"]),
                hit: (c, i) => c[i].v === "b''"
            },
        ]
    },
    rotatedLetters: {
        label: 'rotated symbols',
        variants: [
            ['upright', 0], ['rotated 90° clockwise', 1], ['upside down', 2], ['rotated 90° counterclockwise', 3],
        ].map(([name, turns]) => ({
            task: `Mark every symbol that is ${name}`,
            difficulty: 1,
            hint: [0, 1, 2, 3, turns, 2, 1, turns, 3, 0],
            draw: drawE,
            cell: () => { const v = rnd(4); return { html: drawE(v), v }; },
            hit: (c, i) => c[i].v === turns,
        })),
    },
    numbers: {
        label: 'numbers',
        variants: [
            {
                task: 'Mark every odd number between two even numbers',
                difficulty: 1,
                hint: [2, 3, 4, 6, 5, 8, 1, 3, 2, 7],
                cell: () => { const v = pick([1, 3, 5, 7, 9, 2, 2, 4, 4, 6, 6, 8, 8]); return { html: v, v }; },
                hit: (c, i) => odd(c[i].v) && even(at(c, i, -1)) && even(at(c, i, 1)),
            },
            {
                task: 'Mark every even number between two odd numbers',
                difficulty: 1,
                hint: [1, 2, 3, 5, 4, 7, 6, 8, 9, 2],
                cell: () => { const v = pick([1, 3, 5, 7, 9, 2, 2, 4, 4, 6, 6, 8, 8]); return { html: v, v }; },
                hit: (c, i) => even(c[i].v) && odd(at(c, i, -1)) && odd(at(c, i, 1)),
            },
            {
                task: 'Mark every number that is followed by its double',
                difficulty: 2,
                hint: [1, 2, 4, 8, 3, 6, 2, 3, 4, 8],
                cell: () => { const v = pick([1, 2, 3, 4, 6, 8]); return { html: v, v }; },
                hit: (c, i) => at(c, i, 1) === 2 * c[i].v,
            },
            ...[4, 5, 6, 7, 8, 9].map(n => ({
                task: `Mark every number which added with its successor equals ${n}`,
                difficulty: 2,
                hint: [2, n - 2, 9, 1, n - 1, 6, 3, 4, n - 3, 8],
                cell: () => { const v = pick([1, 2, 3, 4, 5, 6, 7, 8, 9]); return { html: v, v }; },
                hit: (c, i) => c[i].v + at(c, i, 1) === n,
            })),
        ],
    },
    dice: {
        label: 'dice',
        variants: [
            ...[[2, 3], [2, 4], [5, 4]].map(([a, b]) => ({
                task: `Mark every die showing ${a} or ${b} dots`,
                difficulty: 0,
                hint: [4, 1, 5, 2, 6, 5, 3, 4, 1, 2],
                draw: drawDie,
                cell: () => { const v = 1 + rnd(6); return { html: drawDie(v), v }; },
                hit: (c, i) => c[i].v === a || c[i].v === b,
            })),
            ...[3, 4, 5].map(n => ({
                task: `Mark every die that together with its successor adds to ${n} dots`,
                difficulty: 2,
                hint: [1, 3, 1, 4, 2, 5, 3, 1, 2, 6],
                draw: drawDie,
                cell: () => { const v = 1 + rnd(6); return { html: drawDie(v), v }; },
                hit: (c, i) => c[i].v + at(c, i, 1) === n
            })),
        ],
    },
    squares: {
        label: 'squares',
        variants: [{
            task: 'Mark every square whose number equals its number of sides',
            difficulty: 1,
            hint: [[4, 15], [3, 7], [3, 3], [4, 5], [3, 3], [4, 14], [3, 13], [3, 12], [4, 15], [4, 10]].map(([n, mask]) => ({ n, mask })),
            draw: drawSides,
            cell: () => { const v = { n: 2 + rnd(3), mask: maskWith(2) }; return { html: drawSides(v), v }; },
            hit: (c, i) => popcount(c[i].v.mask) === c[i].v.n,
        }],
    },
    turned: {
        label: 'turned symbols',
        variants: [{
            task: 'Mark every symbol that is followed by the same symbol turned by 180°',
            difficulty: 2,
            hint: [0, 2, 1, 3, 3, 1, 0, 0, 2, 1],
            draw: drawTurned,
            cell: () => { const v = rnd(4); return { html: drawTurned(v), v }; },
            hit: (c, i) => at(c, i, 1) === (c[i].v + 2) % 4,
        }],
    },
    lines: {
        label: 'lines',
        variants: [{
            task: 'Mark every box whose lines alternate between solid and dashed',
            difficulty: 1,
            hint: [5, 10, 3, 5, 12, 10, 0, 15, 5, 6],
            draw: drawLines,
            cell: () => { const v = rnd(16); return { html: drawLines(v), v }; },
            hit: (c, i) => c[i].v === 5 || c[i].v === 10,
        }],
    },
    parts: {
        label: 'parts',
        variants: [2, 3, 4].map(n => ({
            task: `Mark every box that is divided into exactly ${n} parts`,
            difficulty: 2,
            hint: [15, 7, 3, 5, 11, 14, 12, 9, 13, 10],
            draw: drawParts,
            cell: () => { const v = maskWith(2); return { html: drawParts(v), v }; },
            hit: (c, i) => popcount(c[i].v) === n, // 2 spokes make 2 parts, 3 make 3, 4 make 4
        })),
    },
    thick: {
        label: 'thick sides',
        variants: [{
            task: 'Mark every box whose sides are the same thickness as the opposite side',
            difficulty: 1,
            hint: [15, 0, 5, 10, 3, 12, 6, 9, 0, 7],
            draw: drawThick,
            cell: () => { const v = rnd(16); return { html: drawThick(v), v }; },
            hit: (c, i) => bit(c[i].v, 0) === bit(c[i].v, 2) && bit(c[i].v, 1) === bit(c[i].v, 3),
        }],
    },
    star: {
        label: 'star',
        variants: [4, 5].map(n => ({
            task: `Mark all stars with ${n} points`,
            difficulty: 2,
            hint: [n, 2, 9 - n, 7, n, 3, 1, n, 6, 0],
            draw: drawStar,
            cell: () => {
                const v = Math.min(8, Math.max(0, Math.round(gauss() * 8)));
                return { html: drawStar(v), v };
            },
            hit: (c, i) => c[i].v === n,
        })),
    },
    circle: {
        label: 'circle',
        variants: [['diagonal', 1], ['straight', 0]].map(([name, rest]) => ({
            task: `Mark all circles whose gap is ${name}`,
            difficulty: 1,
            hint: [0, 1, 2, 3, 4, 5, 6, 7, 1, 5],
            draw: drawCircle,
            cell: () => { const v = rnd(8); return { html: drawCircle(v), v }; },
            hit: (c, i) => c[i].v % 2 === rest,
        })),
    },
};
