import "../../../styles/styles.scss";
import "./styles/concentration.scss";

import { GUI } from "./gui";
import { EMode, IModeController } from "./model/interfaces";
import { PQ } from "./modes/pq/pq";
import { Numbers } from "./modes/numbers/numbers";
import { Star } from "./modes/star/star";
import { Circle } from "./modes/circle/circle";

const nSymbols: number = 1600;
let randomModeController: IModeController;
let currentMode: number;

const gui: GUI = new GUI;
gui.renderControls(
    { label: "NEU", callback: generate },
    { label: "CHECK", callback: check }
);

const taskContainer: HTMLElement = document.querySelector(`[data-js="task"]`);
const worksheet: HTMLElement = document.querySelector(`[data-js="worksheet"]`);

const modes: IModeController[] = [
    new PQ(taskContainer, nSymbols),
    new Numbers(taskContainer, nSymbols),
    new Star(taskContainer, nSymbols),
    new Circle(taskContainer, nSymbols)
];

function beginTest() {
    console.log("hehrhe");
}

function generate() {
    currentMode = Number(gui.getSelectValue());

    randomModeController = modes[0];

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
    gui.generateWorksheetOverlay(worksheet, beginTest);
}

function check() {
    randomModeController.checkGrid(worksheet);
}