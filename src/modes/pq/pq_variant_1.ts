import { IMode } from "../../model/interfaces";
import { CORRECT_CHECKED, CORRECT_UNCHECKED } from "../../tools";

export enum E_PQ {
    p,
    q
}

export class PQ_Variant_1 implements IMode {
    taskText: string = "Check every p BEFORE a q";
    digits: number;
    taskContainer: HTMLElement;

    public constructor(
        taskContainer: HTMLElement,
        digits: number
    ) {
        this.digits = digits;
        this.taskContainer = taskContainer;
    }

    checkGrid(parent: HTMLElement): void {
        const elements: any = parent.children;

        for (let i = 0; i < elements.length - 1; i++) {
            if (elements[i].meta.number === E_PQ.p && elements[i + 1].meta.number === E_PQ.q) {
                if (elements[i].meta.checked) {
                    elements[i].classList.add(CORRECT_CHECKED);
                } else {
                    elements[i].classList.add(CORRECT_UNCHECKED);
                }
            } else if (elements[i].meta.checked) {
                elements[i].classList.add(CORRECT_UNCHECKED);
            }
        }
    }

    renderTask(taskContainer: HTMLElement): void {
        taskContainer.innerHTML = this.taskText;
    }
}