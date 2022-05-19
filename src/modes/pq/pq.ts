import { IMode, IModeController } from "../../model/interfaces";
import { PQ_Variant_1 } from "./pq_variant_1";

export enum E_PQ {
    p,
    q
}

export class PQ implements IModeController {
    private variants: any[] = [];
    private currentMode: IMode;

    constructor(
        taskContainer: HTMLElement,
        digits: number
    ) {
        this.variants = [
            new PQ_Variant_1(taskContainer, digits)
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