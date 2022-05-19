import { IMode, IModeController } from "../../model/interfaces";
import { Hexagon_Variant_1 } from "./hexagon_variant_1";

export class Hexagon implements IModeController {
    variants: any[];
    currentMode: IMode;
    taskContainer: HTMLElement;
    nSymbols: number;

    public constructor(
        taskContainer: HTMLElement,
        nSymbols: number
    ) {
        this.taskContainer = taskContainer;
        this.nSymbols = nSymbols;
        this.variants = [
            new Hexagon_Variant_1()
        ];
    }

    generateGrid(parent: HTMLElement): void {
        throw new Error("Method not implemented.");
    }

    checkGrid(parent: HTMLElement): void {
        throw new Error("Method not implemented.");
    }
}