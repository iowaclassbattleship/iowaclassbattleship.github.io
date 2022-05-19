export interface IExtendedHtmlDivElement extends HTMLDivElement {
    meta?: IMeta
}

export interface IExtendedSVGSVGElement extends SVGSVGElement {
    meta?: IMeta
}

export interface IMeta {
    number: Number,
    checked: boolean
}

export interface IDigit {
    number: Number,
    digit: string
}

export interface IMode {
    taskText: string,

    generateGrid(parent: HTMLElement): void,
    checkGrid(parent: HTMLElement): void
    renderTask(parent: HTMLElement): void,
    handleClick(e: any): void
}

export interface IModeStar extends IMode {
    coords: any[];
}