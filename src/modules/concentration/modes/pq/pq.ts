import { IDigit, IExtendedHtmlDivElement, IMode, IModeController } from "../../model/interfaces";
import { CHECKED } from "../../tools";
import { PQ_Variant_1 } from "./pq_variant_1";

export enum E_PQ {
    p,
    q
}

export class PQ implements IModeController {
    variants: any[] = [];
    currentMode: IMode;
    nSymbols: number;
    taskContainer: HTMLElement;

    constructor(
        taskContainer: HTMLElement,
        nSymbols: number
    ) {
        this.taskContainer = taskContainer;
        this.nSymbols = nSymbols;
        this.variants = [
            new PQ_Variant_1(taskContainer, nSymbols)
        ];
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;
        this.currentMode = this.variants[Math.floor(Math.random() * this.variants.length)];

        for (let i = 0; i < this.nSymbols; i++) {
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

        this.currentMode.renderTask(this.taskContainer);
    }

    checkGrid(parent: HTMLElement): void {
        this.currentMode.checkGrid(parent);
    }

    getDigit(): IDigit {
        let random = Math.floor(Math.random() * 2);

        return {
            number: random,
            digit: E_PQ[random],
        };
    }

    handleClick(e: IExtendedHtmlDivElement): void {
        e.classList.add(CHECKED);
        e.meta.checked = true;
    }
}