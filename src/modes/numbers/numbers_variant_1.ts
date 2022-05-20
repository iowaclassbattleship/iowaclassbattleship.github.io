import { IFinished, IMode } from "../../model/interfaces";
import { CORRECT_CHECKED, CORRECT_UNCHECKED, isEven, isOdd } from "../../tools";

export class Numbers_Variant_1 implements IMode {
    taskText: string;
    digits: number;
    taskContainer: HTMLElement;

    public constructor(
        taskContainer: HTMLElement,
        digits: number
    ) {
        this.taskContainer = taskContainer;
        this.digits = digits;
    }

    checkGrid(parent: HTMLElement): IFinished {
        const elements: any = parent.children;

        let correct: number = 0;
        let incorrect: number = 0;

        for (let i = 1; i < elements.length - 1; i++) {
            if (isEven(elements[i - 1].meta.number) && isEven(elements[i + 1].meta.number) && isOdd(elements[i].meta.number)) {
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