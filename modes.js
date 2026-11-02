const CELL_DIM = 10;

const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const even = n => n % 2 === 0;
const odd = n => n % 2 === 1; // false for undefined, so row edges never match
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

// E-like symbol whose arms reach the edge of the box, turned by v * 90° clockwise
const drawE = v => svg('', `<path d="M9 1H1.5V9H9M1.5 5H9" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(${v * 90} 5 5)"/>`);

const defaultChoices = (choices) => {
    const v = pick(choices);
    return { html: v, v };
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
