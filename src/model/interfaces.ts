export interface IExtendedHtmlDivElement extends HTMLDivElement {
    meta?: IMeta
}

export interface IExtendedSVGSVGElement extends SVGSVGElement {
    meta?: IMeta
}

export interface IMeta {
    number?: Number,
    checked: boolean
}

export interface IDigit {
    number: number,
    digit: string
}

export interface IModeController {
    generateGrid(parent: HTMLElement): void;
    checkGrid(parent: HTMLElement): void;
}

export interface IMode {
    taskText: string,
    digits: number,
    taskContainer: HTMLElement

    generateGrid(parent: HTMLElement): void,
    checkGrid(parent: HTMLElement): void
    renderTask(parent: HTMLElement): void,
    handleClick(e: any): void
}

export enum EMode {
    RANDOM_ALL,
    PQ,
    NUMBERS,
    STAR,
    CIRCLE
}

export interface ICoords {
    x: string;
    y: string;
}
