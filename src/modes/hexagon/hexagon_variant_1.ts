import { IMode } from "../../model/interfaces";

export class Hexagon_Variant_1 implements IMode {
    taskText: string;
    digits: number;
    taskContainer: HTMLElement;

    public construtor() {

    }

    generateGrid(parent: HTMLElement): void {
        throw new Error("Method not implemented.");
    }

    checkGrid(parent: HTMLElement): void {
        throw new Error("Method not implemented.");
    }

    renderTask(parent: HTMLElement): void {
        throw new Error("Method not implemented.");
    }

    handleClick(e: any): void {
        throw new Error("Method not implemented.");
    }
}