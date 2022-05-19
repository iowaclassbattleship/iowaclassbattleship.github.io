import { IDigit, IExtendedHtmlDivElement, IMode } from "../../model/interfaces";
import { CHECKED, CORRECT_CHECKED, CORRECT_UNCHECKED } from "../../tools";
import { E_PQ } from "./pq";

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

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;
        for (let i = 0; i < this.digits; i++) {
            const digit = this.getDigit();

            const d: IExtendedHtmlDivElement = document.createElement("div");
            d.classList.add("item");
            d.innerHTML = digit.digit;

            d.meta = {
                number: digit.number,
                checked: false
            };

            d.addEventListener("click", () => this.handleClick(d));
            parent.appendChild(d);
        }

        this.renderTask(this.taskContainer);
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

    handleClick(e: IExtendedHtmlDivElement): void {
        e.classList.add(CHECKED);
        e.meta.checked = true;
    }

    getDigit(): IDigit {
        let random = Math.floor(Math.random() * 2);

        return {
            number: random,
            digit: E_PQ[random],
        };
    }
}