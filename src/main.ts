import "../styles/styles.scss";
import { Circle } from "./modes/circle";
import { EMode, IMode } from "./model/interfaces";
import { PQ } from "./modes/pq";
import { Star } from "./modes/star";
import { Numbers } from "./modes/numbers";
import { GUI } from "./gui";

const digits: number = 1600;

const worksheet: HTMLElement = document.querySelector(`[data-js="worksheet"]`);
const task: HTMLElement = document.querySelector(`[data-js="task"]`);

const modes: IMode[] = [
    new PQ(task, digits),
    new Numbers(task, digits),
    new Star(task, digits),
    new Circle(task, digits),
];

let randomMode: IMode = null;

const gui: GUI = new GUI;
gui.renderControls();

export function generate() {
    const currentMode: number = Number(gui.getSelectValue());

    if (currentMode === EMode.RANDOM_ALL) {
        randomMode = modes[Math.floor(Math.random() * modes.length)];
    } else if (currentMode === EMode.PQ) {
        randomMode = modes[EMode.PQ - 1];
    } else if (currentMode === EMode.NUMBERS) {
        randomMode = modes[EMode.NUMBERS - 1];
    } else if (currentMode === EMode.STAR) {
        randomMode = modes[EMode.STAR - 1];
    } else if (currentMode === EMode.CIRCLE) {
        randomMode = modes[EMode.CIRCLE - 1];
    } else {
        throw new Error("Life sucks m8");
    }

    randomMode.generateGrid(worksheet);
}

export function check() {
    randomMode.checkGrid(worksheet);
}
