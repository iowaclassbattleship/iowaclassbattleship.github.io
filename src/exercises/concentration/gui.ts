import { Concentration } from "./concentration";
import { EMode, IModeController } from "./model/interfaces";
import { Circle } from "./modes/circle/circle";
import { Numbers } from "./modes/numbers/numbers";
import { PQ } from "./modes/pq/pq";
import { Star } from "./modes/star/star";

// TODO: SPLIT BUSINESS LOGIC OUT FROM GUI CLASS
// perhaps with observables

export class GUI {
    private parent: HTMLElement;
    private modes: IModeController[];
    private randomModeController: IModeController;
    private currentMode: number;
    private worksheet: HTMLElement;
    private taskContainer: HTMLElement;
    private nSymbols: number = 1600;

    public constructor(
        parent: HTMLElement
    ) {
        this.parent = parent;
        const template: string = `<div class="head">
        <div class="task" data-js="task"></div>
    </div>
    <main class="worksheet-container">
        <div class="controls" data-js="controls"></div>
        <div class="grid" data-js="worksheet"></div>
    </main>
    
    <div id="hidden-pixel-density-measure"></div>`;

        this.parent.innerHTML = template;
        this.taskContainer = document.querySelector(`[data-js="task"]`);
        this.worksheet = document.querySelector(`[data-js="worksheet"]`);
        this.modes = [
            new PQ(this.taskContainer, this.nSymbols),
            new Numbers(this.taskContainer, this.nSymbols),
            new Star(this.taskContainer, this.nSymbols),
            new Circle(this.taskContainer, this.nSymbols)
        ];
    }

    public renderControls(con: Concentration): void {
        const controls: HTMLElement = document.querySelector(`[data-js="controls"]`);

        controls.appendChild(this.generateButton1("generate"));
        controls.appendChild(this.generateButton2("check"));
        controls.appendChild(this.generateSelect("random", "PQ", "Numbers", "Star", "Circle"));
    }

    public getSelectValue(): string {
        const select: HTMLSelectElement = <HTMLSelectElement>document.getElementById("mode-select");
        return select.value;
    }

    private generateButton1(label: string): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.addEventListener("click", () => this.generate());
        button.innerText = label;
        return button;
    }
    private generateButton2(label: string): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.addEventListener("click", () => this.check());
        button.innerText = label;
        return button;
    }

    private generateSelect(...options: string[]): HTMLSelectElement {
        const select: HTMLSelectElement = document.createElement("select");
        select.id = "mode-select";

        for (let i = 0; i < options.length; i++) {
            select.appendChild(this.generateOption(i, options[i]))
        }

        return select;
    }

    private generateOption(mode: number, option: string): HTMLOptionElement {
        const o: HTMLOptionElement = document.createElement("option");

        o.value = "" + mode;
        o.innerText = option;

        return o;
    }

    private generate() {
        this.currentMode = Number(this.getSelectValue());

        this.randomModeController = this.modes[0];

        if (this.currentMode === EMode.RANDOM_ALL) {
            this.randomModeController = this.modes[Math.floor(Math.random() * this.modes.length)];
        } else if (this.currentMode === EMode.PQ) {
            this.randomModeController = this.modes[EMode.PQ - 1];
        } else if (this.currentMode === EMode.NUMBERS) {
            this.randomModeController = this.modes[EMode.NUMBERS - 1];
        } else if (this.currentMode === EMode.STAR) {
            this.randomModeController = this.modes[EMode.STAR - 1];
        } else if (this.currentMode === EMode.CIRCLE) {
            this.randomModeController = this.modes[EMode.CIRCLE - 1];
        } else {
            throw new Error("Life sucks m8");
        }

        this.randomModeController.generateGrid(this.worksheet);
    }

    private check() {
        this.randomModeController.checkGrid(this.worksheet);
    }
}