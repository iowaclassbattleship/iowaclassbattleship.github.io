import "../styles/styles.scss";
import { Circle } from "./modes/circle/circle";
import { EMode, IMode, IModeController } from "./model/interfaces";
import { PQ } from "./modes/pq/pq";
import { Star } from "./modes/star/star";
import { Numbers } from "./modes/numbers/numbers";
import { GUI } from "./gui";

const digits: number = 1600;

const worksheet: HTMLElement = document.querySelector(`[data-js="worksheet"]`);
const task: HTMLElement = document.querySelector(`[data-js="task"]`);

const modes: IModeController[] = [
    new PQ(task, digits),
];

let randomModeController: IModeController;

const gui: GUI = new GUI;
gui.renderControls();

export function generate() {
    const currentMode: number = Number(gui.getSelectValue());

    randomModeController = modes[0];

    // if (currentMode === EMode.RANDOM_ALL) {
    //     randomMode = modes[Math.floor(Math.random() * modes.length)];
    // } else if (currentMode === EMode.PQ) {
    //     randomMode = modes[EMode.PQ - 1];
    // } else if (currentMode === EMode.NUMBERS) {
    //     randomMode = modes[EMode.NUMBERS - 1];
    // } else if (currentMode === EMode.STAR) {
    //     randomMode = modes[EMode.STAR - 1];
    // } else if (currentMode === EMode.CIRCLE) {
    //     randomMode = modes[EMode.CIRCLE - 1];
    // } else {
    //     throw new Error("Life sucks m8");
    // }

    randomModeController.generateGrid(worksheet);
}

export function check() {
    randomModeController.checkGrid(worksheet);
}
