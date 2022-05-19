import { IMode, IModeController } from "../../model/interfaces";
import { Circle_Variant_1 } from "./circle_variant_1";

export class Circle implements IModeController {
    variants: any[];
    currentMode: IMode;

    public constructor(
        taskContainer: HTMLElement,
        nSymbols: number
    ) {
        this.variants = [
            new Circle_Variant_1(taskContainer, nSymbols)
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