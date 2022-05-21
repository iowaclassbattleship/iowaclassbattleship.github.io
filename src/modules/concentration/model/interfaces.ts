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
    variants: any[];
    currentMode: IMode;

    generateGrid(parent: HTMLElement): void;
    checkGrid(parent: HTMLElement): void;
    handleClick?(e: any): void

}

export interface IMode {
    taskText: string;
    taskContainer: HTMLElement;

    checkGrid(parent: HTMLElement): IFinished;
    renderTask(parent: HTMLElement): void;
}

export interface IFinished {
    correct: number;
    incorrect: number;
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

export interface IButtonConfig {
    label: string;
    callback: Function;
}
