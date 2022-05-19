import { ICoords, IExtendedSVGSVGElement, IMode } from "../../model/interfaces";
import { getPerimeterCoords, getDimensions, getCenterCoords, CORRECT_UNCHECKED, CORRECT_CHECKED, W3_SVG } from "../../tools";

export class Circle_Variant_1 implements IMode {
    taskText: string = "John Mcclain";
    taskContainer: HTMLElement;

    public constructor(
        taskContainer: HTMLElement,
    ) {
        this.taskContainer = taskContainer;
    }

    checkGrid(parent: HTMLElement): void {
        const elements: any = parent.children;

        for (let i = 0; i < elements.length - 1; i++) {
            if (
                elements[i + 1].meta.number === 0 ||
                elements[i + 1].meta.number === 2 ||
                elements[i + 1].meta.number === 4 ||
                elements[i + 1].meta.number === 6
            ) {
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

    renderTask(parent: HTMLElement): void {
        parent.innerHTML = this.taskText;
    }
}