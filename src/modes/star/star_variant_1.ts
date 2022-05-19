import { IMode, ICoords } from "../../model/interfaces";
import { CORRECT_CHECKED, CORRECT_UNCHECKED } from "../../tools";

export class Star_Variant_1 implements IMode {
    taskText: string;
    taskContainer: HTMLElement;
    digits: number;
    dimensions: number;
    starEdges: number;
    coords: ICoords[] = [];

    public constructor(
        taskContainer: HTMLElement,
        digits: number,
        starEdges: number,
    ) {
        this.taskContainer = taskContainer;
        this.digits = digits;
        this.starEdges = starEdges;
        this.taskText = `Markiere alle Sterne, die ${this.starEdges} Zacken haben`;
    }

    checkGrid(parent: HTMLElement): void {
        const elements: any = parent.children;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].meta.number === this.starEdges) {
                if (elements[i].meta.checked) {
                    elements[i].classList.add(CORRECT_CHECKED);
                } else {
                    elements[i].classList.add(CORRECT_UNCHECKED);
                }
            } else {
                if (elements[i].meta.checked) {
                    elements[i].classList.add(CORRECT_UNCHECKED);
                }
            }
        }
    }

    renderTask(taskContainer: HTMLElement): void {
        taskContainer.innerHTML = this.taskText;
    }
}