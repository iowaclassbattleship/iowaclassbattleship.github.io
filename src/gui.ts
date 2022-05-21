import { IExercises } from "./model/interfaces";

export class GUI {
    private exercises: IExercises[];

    public constructor(
        exercises: IExercises[]
    ) {    
        this.exercises = exercises;
    }

    public renderOptions(): void {
        const parent: HTMLElement = document.querySelector(`[data-js="exercise-select"]`);

        for (const exercise of this.exercises) {
            const a = document.createElement("a");
            a.innerText = exercise.label;
            a.href = exercise.link;
            a.classList.add("link-button");
            parent.appendChild(a);
        }
    }
}