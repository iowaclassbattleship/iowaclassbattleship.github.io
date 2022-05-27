import { IExtendedHtmlDivElement, IMode, IModeController } from "../../model/interfaces";
import { CHECKED, getDimensions } from "../../tools";
import { Numbers_Variant_1 } from "./numbers_variant_1";

export class Numbers implements IModeController {
    variants: any[] = [];
    currentMode: IMode;
    taskContainer: HTMLElement;
    nSymbols: number;
    dimensions: number;

    constructor(
        taskContainer: HTMLElement,
        nSymbols: number
    ) {
        this.dimensions = getDimensions();
        this.taskContainer = taskContainer;
        this.nSymbols = nSymbols;
        this.variants = [
            new Numbers_Variant_1(taskContainer, nSymbols)
        ];
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;
        this.currentMode = this.variants[Math.floor(Math.random() * this.variants.length)];

        for (let i = 0; i < this.nSymbols; i++) {
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

        this.currentMode.renderTask(this.taskContainer);
    }

    checkGrid(parent: HTMLElement): void {
        this.currentMode.checkGrid(parent);
    }

    getRandomNumber(): number {
        const random: number = Math.floor(Math.random());
        const numbers = [1, 3, 5, 7, 9, 2, 2, 4, 4, 6, 6, 8, 8];

        return numbers[Math.floor(Math.random() * numbers.length)];
    }

    handleClick(e: IExtendedHtmlDivElement): void {
        e.meta.checked = true;
        e.classList.add(CHECKED);
    }
}