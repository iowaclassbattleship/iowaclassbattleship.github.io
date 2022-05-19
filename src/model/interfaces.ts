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

export interface IMode {
    taskText: string,
    digits: number,
    taskContainer: HTMLElement

    generateGrid(parent: HTMLElement): void,
    checkGrid(parent: HTMLElement): void
    renderTask(parent: HTMLElement): void,
    handleClick(e: any): void
}

export interface IModeStar extends IMode {
    coords: any[];
}