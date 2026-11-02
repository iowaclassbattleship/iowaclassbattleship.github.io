const N = 1600;

const $ = id => document.getElementById(id);
let round, cells, els;

function generate() {
    round = pick(modes[$('mode').value || pick(Object.keys(modes))].variants);
    cells = Array.from({ length: N }, round.cell);
    $('task').textContent = round.task;
    $('difficulty').textContent = round.difficulty === 0 ? "easy" : round.difficulty === 1 ? "medium" : "hard"
    $('solution').textContent = ``;
    const hint = (round.hint ?? []).map(v => ({ v }));
    $('hint').replaceChildren(...hint.map((c, i) => {
        const d = document.createElement('div');
        d.innerHTML = (round.draw ?? String)(c.v);
        if (round.hit(hint, i)) d.classList.add('checked');
        return d;
    }));
    $('grid').replaceChildren(...(els = cells.map(c => {
        const d = document.createElement('div');
        d.innerHTML = c.html;
        d.onclick = () => d.classList.toggle('checked');
        return d;
    })));
}

function check() {
    let correct = 0, wrong = 0;
    els.forEach((d, i) => {
        const hit = round.hit(cells, i), marked = d.classList.contains('checked');
        d.classList.remove('hit', 'miss');
        if (hit && marked) { d.classList.add('hit'); correct++; }
        else if (hit || marked) { d.classList.add('miss'); wrong++; }
    });
    $('solution').textContent = `${correct} correct, ${wrong} wrong`;
}

$('mode').append(new Option('Random', ''), ...Object.entries(modes).map(([key, m]) => new Option(m.label, key)));
$('new').onclick = generate;
$('check').onclick = check;
$('testmode').onchange = e => document.body.classList.toggle('testmode', e.target.checked);
$('print').onclick = () => print();
$('numbers').append(...Array.from({ length: 40 }, (_, i) => Object.assign(document.createElement('div'), { textContent: i + 1 })))
generate();
