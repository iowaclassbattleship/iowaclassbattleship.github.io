import { IMode, IModeController } from "../../model/interfaces";
import { Star_Variant_1 } from "./star_variant_1";

export class Star implements IModeController {
    variants: any[];
    currentMode: IMode;

    public constructor(
        taskContainer: HTMLElement,
        nSymbols: number,
        starEdges: number
    ) {
        this.variants = [
            new Star_Variant_1(taskContainer, nSymbols, starEdges)
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