import "../styles/styles.scss";
import { EMode, IModeController } from "./model/interfaces";
import { PQ } from "./modes/pq/pq";
import { Numbers } from "./modes/numbers/numbers";
import { GUI } from "./gui";
import { Circle } from "./modes/circle/circle";
import { Star } from "./modes/star/star";

const nSymbols: number = 1600;

const worksheet: HTMLElement = document.querySelector(`[data-js="worksheet"]`);
const taskContainer: HTMLElement = document.querySelector(`[data-js="task"]`);

const modes: IModeController[] = [
    new PQ(taskContainer, nSymbols),
    new Numbers(taskContainer, nSymbols),
    new Star(taskContainer, nSymbols, 5),
    new Circle(taskContainer, nSymbols)
];

let randomModeController: IModeController;

const gui: GUI = new GUI;
gui.renderControls();

export function generate() {
    const currentMode: number = Number(gui.getSelectValue());

    randomModeController = modes[2];

    if (currentMode === EMode.RANDOM_ALL) {
        randomModeController = modes[Math.floor(Math.random() * modes.length)];
    } else if (currentMode === EMode.PQ) {
        randomModeController = modes[EMode.PQ - 1];
    } else if (currentMode === EMode.NUMBERS) {
        randomModeController = modes[EMode.NUMBERS - 1];
    } else if (currentMode === EMode.STAR) {
        randomModeController = modes[EMode.STAR - 1];
    } else if (currentMode === EMode.CIRCLE) {
        randomModeController = modes[EMode.CIRCLE - 1];
    } else {
        throw new Error("Life sucks m8");
    }

    randomModeController.generateGrid(worksheet);
}

export function check() {
    randomModeController.checkGrid(worksheet);
}
