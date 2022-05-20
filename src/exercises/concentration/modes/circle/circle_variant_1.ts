import { IFinished, IMode } from "../../model/interfaces";
import { CORRECT_UNCHECKED, CORRECT_CHECKED } from "../../tools";

export class Circle_Variant_1 implements IMode {
    taskText: string = "John Mcclain";
    taskContainer: HTMLElement;

    public constructor(
        taskContainer: HTMLElement,
    ) {
        this.taskContainer = taskContainer;
    }

    checkGrid(parent: HTMLElement): IFinished {
        const elements: any = parent.children;

        let correct: number = 0;
        let incorrect: number = 0;

        for (let i = 0; i < elements.length - 1; i++) {
            if (
                elements[i + 1].meta.number === 0 ||
                elements[i + 1].meta.number === 2 ||
                elements[i + 1].meta.number === 4 ||
                elements[i + 1].meta.number === 6
            ) {
                if (elements[i].meta.checked) {
                    elements[i].classList.add(CORRECT_CHECKED);
                    correct++;
                } else {
                    elements[i].classList.add(CORRECT_UNCHECKED);
                    incorrect++;
                }
            } else if (elements[i].meta.checked) {
                elements[i].classList.add(CORRECT_UNCHECKED);
                incorrect++;
            }
        }

        return { correct, incorrect };
    }

    renderTask(parent: HTMLElement): void {
        parent.innerHTML = this.taskText;
    }
}