import { IExtendedHtmlDivElement, IMode } from "../model/interfaces";
import { CHECKED, CORRECT_CHECKED, CORRECT_UNCHECKED, isEven, isOdd } from "../tools";

export class Numbers implements IMode {
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

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;

        for (let i = 0; i < this.digits; i++) {
            const number = this.getRandomNumber();

            const d: IExtendedHtmlDivElement = document.createElement("div");
            d.classList.add("item");
            d.innerHTML = "" + number;

            d.meta = {
                number,
                checked: false
            };

            d.addEventListener("click", () => this.handleClick(d));
            parent.appendChild(d);
        }

        this.renderTask(this.taskContainer);
    }

    checkGrid(parent: HTMLElement): void {
        const elements: any = parent.children;

        for (let i = 1; i < elements.length - 1; i++) {
            if (isEven(elements[i - 1].meta.number) && isEven(elements[i + 1].meta.number) && isOdd(elements[i].meta.number)) {
                if (elements[i].meta.checked) {
                    elements[i].classList.add(CORRECT_CHECKED);
                } else {
                    elements[i].classList.add(CORRECT_UNCHECKED);
                }
            }
        }
    }

    renderTask(parent: HTMLElement): void {
        parent.innerHTML = this.taskText;
    }

    handleClick(e: IExtendedHtmlDivElement): void {
        e.meta.checked = true;
        e.classList.add(CHECKED);
    }

    getRandomNumber(): number {
        const random: number = Math.floor(Math.random());
        const numbers = [1, 3, 5, 7, 9, 2, 2, 4, 4, 6, 6, 8, 8];

        return numbers[Math.floor(Math.random() * numbers.length)];
    }
}