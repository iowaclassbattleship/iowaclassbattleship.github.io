import { IMode, IModeController } from "../../model/interfaces";
import { Numbers_Variant_1 } from "./numbers_variant_1";

export class Numbers implements IModeController {
    variants: any[] = [];
    currentMode: IMode;

    constructor(
        taskContainer: HTMLElement,
        nSymbols: number
    ) {
        this.variants = [
            new Numbers_Variant_1(taskContainer, nSymbols)
        ];
    }

    generateGrid(parent: HTMLElement): void {
        this.currentMode = this.variants[Math.floor(Math.random() * this.variants.length)];

        this.currentMode.generateGrid(parent);
    }

    checkGrid(parent: HTMLElement): void {
        this.currentMode.checkGrid(parent);
    }
}