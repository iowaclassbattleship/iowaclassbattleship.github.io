import { IExercises } from "./model/interfaces";

export class GUI {
    private menuSelect: HTMLElement;
    private exercises: IExercises[];
    private parent: HTMLElement;

    public constructor(
        parent: HTMLElement,
        exercises: IExercises[]
    ) {
        // const template = require("./template/template.html");
    
        this.menuSelect = document.querySelector(`[data-js="menu-select"]`);
        this.exercises = exercises;
        this.parent = parent;
        this.parent.innerHTML = `<div class="exercise-select" data-js="exercise-select"></div>`;
    }

    public renderOptions(): void {
        const parent: HTMLElement = document.querySelector(`[data-js="exercise-select"]`);

        for (const exercise of this.exercises) {
            const btn = document.createElement("button");
            btn.innerText = exercise.label;
            btn.addEventListener("click", () => exercise.application.renderGui(parent));
            parent.appendChild(btn);
        }
    }
}