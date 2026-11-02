const CELL_DIM = 10;

const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const even = n => n % 2 === 0;
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
const svg = (attrs, body) => `<svg viewBox="0 0 ${CELL_DIM} ${CELL_DIM}" ${attrs}>${body}</svg>`;

function gauss() {
    const u = 1 - Math.random(), v = Math.random();
    const x = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) / 10 + 0.5;
    return x < 0 || x > 1 ? gauss() : x;
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const MARGIN = 1
const HALF = CELL_DIM / 2 - MARGIN
const FULL = CELL_DIM - 2 * MARGIN 

const edge = [[0, 0], [HALF, 0], [FULL, 0], [FULL, HALF], [FULL, FULL], [HALF, FULL], [0, FULL], [0, HALF]];
const gap = 20 * Math.PI / 180, pt = a => `${5 + 4.4 * Math.cos(a)} ${5 + 4.4 * Math.sin(a)}`;
const ring = `M ${pt(Math.PI / 2 + gap)} A 4.4 4.4 0 1 1 ${pt(Math.PI / 2 - gap)}`;

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
                cell: () => defaultChoices(['f', 't']),
                hit: (c, i) => i > 0 && i < c.length - 1 && c[i].v === "f" && c[i + 1].v === "t",
            },
            {
                task: "Mark every t directly after an f",
                cell: () => defaultChoices(['f', 't']),
                hit: (c, i) => i > 1 && i < c.length && i % 40 > 0 && c[i].v === "t" && c[i - 1].v === "f"
            },
            {
                task: "Mark every b between two d",
                cell: () => defaultChoices(['b', 'd']),
                hit: (c, i) => i > 1 && i < c.length - 1 && c[i].v === "b" && c[i - 1].v === "d" && c[i + 1].v === "d"
            },
            {
                task: "Mark every b",
                cell: () => defaultChoices(['b', 'd', 'p', 'q']),
                hit: (c, i) => c[i].v === "b"
            },
            {
                task: "Mark every p",
                cell: () => defaultChoices(['p', 'q']),
                hit: (c, i) => c[i].v === "p"
            },
            {
                task: "Mark every q",
                cell: () => defaultChoices(['p', 'q']),
                hit: (c, i) => c[i].v === "q"
            },
        ]
    },
    numbers: {
        label: 'numbers',
        variants: [
            {
                task: 'Mark every odd number between two even numbers',
                cell: () => { const v = pick([1, 3, 5, 7, 9, 2, 2, 4, 4, 6, 6, 8, 8]); return { html: v, v }; },
                hit: (c, i) => i > 0 && i < c.length - 1 && !even(c[i].v) && even(c[i - 1].v) && even(c[i + 1].v),
            },
            {
                task: 'Mark every even number between two odd numbers',
                cell: () => { const v = pick([1, 3, 5, 7, 9, 2, 2, 4, 4, 6, 6, 8, 8]); return { html: v, v }; },
                hit: (c, i) => i > 0 && i < c.length - 1 && even(c[i].v) && !even(c[i - 1].v) && !even(c[i + 1].v)
            },
            ...[4, 5, 6, 7, 8, 9].map(n => ({
                task: `Mark every number which added with its successor equals ${n}`,
                cell: () => { const v = pick([1, 2, 3, 4, 5, 6, 7, 8, 9]); return { html: v, v }; },
                hit: (c, i) => i < c.length - 1 && i % 40 !== 39 && c[i].v + c[i + 1].v === n,
            })),
        ],
    },
    star: {
        label: 'star',
        variants: [4, 5].map(n => ({
            task: `Mark all stars with ${n} points`,
            cell: () => {
                const v = Math.min(8, Math.max(0, Math.round(gauss() * 8)));
                const rays = shuffle(edge).slice(0, v).map(([x, y]) => `<line x1="5" y1="5" x2="${x}" y2="${y}"/>`);
                return { html: svg(`stroke="currentColor" stroke-width="1"`, rays.join('')), v };
            },
            hit: (c, i) => c[i].v === n,
        })),
    },
    circle: {
        label: 'circle',
        variants: [['diagonal', 1], ['straight', 0]].map(([name, rest]) => ({
            task: `Mark all circles whose gap is ${name}`,
            cell: () => {
                const v = rnd(8); // gap direction in 45° steps, 0 = bottom
                return { html: svg('', `<path d="${ring}" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(${v * 45} 5 5)"/>`), v };
            },
            hit: (c, i) => c[i].v % 2 === rest,
        })),
    },
};
