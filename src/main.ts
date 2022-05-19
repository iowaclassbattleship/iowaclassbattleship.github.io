import "../styles/styles.scss";
import { Circle } from "./modes/circle";
import { IMode } from "./model/interfaces";
import { PQ } from "./modes/pq";
import { Star } from "./modes/star";
import { Numbers } from "./modes/numbers";

const digits: number = 1600;

const worksheet: HTMLElement = document.querySelector(`[data-js="worksheet"]`);
const task: HTMLElement = document.querySelector(`[data-js="task"]`);

const modes: IMode[] = [
    new PQ(task, digits),
    new Star(task, digits),
    new Circle(task, digits),
    new Numbers(task, digits)
];

export function renderControls(): void {
    const controls: HTMLElement = document.querySelector(`[data-js="controls"]`);

    const generateButton: HTMLElement = document.createElement("button");
    generateButton.addEventListener("click", () => generate());
    generateButton.innerHTML = "generate";

    const checkButton: HTMLElement = document.createElement("button");
    checkButton.addEventListener("click", () => check());
    checkButton.innerHTML = "check";

    controls.appendChild(generateButton);
    controls.appendChild(checkButton);
}

let randomMode: IMode = null;

export function generate() {
    randomMode = modes[Math.floor(Math.random() * modes.length)];
    randomMode.generateGrid(worksheet);
}

export function check() {
    randomMode.checkGrid(worksheet);
}

renderControls();