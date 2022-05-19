import { ICoords } from "./model/interfaces";

// CSS classes
export const CORRECT_CHECKED: string = "correct--checked";
export const CORRECT_UNCHECKED: string = "correct--unchecked";
export const CHECKED: string = "checked";

export const W3_SVG: "http://www.w3.org/2000/svg" = "http://www.w3.org/2000/svg";

export function getDimensions(): number {
    return document.getElementById("hidden-pixel-density-measure").offsetWidth;
}

export function getCenterCoords(dimension: number): ICoords {
    return {
        x: "" + dimension / 2,
        y: "" + dimension / 2
    }
}

export function isEven(n: number): boolean {
    return n % 2 === 0;
}

export function isOdd(n: number): boolean {
    return n % 2 !== 0;
}

export function getPerimeterCoords(dimension: number): ICoords[] {
    return [
        {
            x: "0",
            y: "0"
        },
        {
            x: "" + dimension / 2,
            y: "0"
        },
        {
            x: "" + dimension,
            y: "0"
        },
        {
            x: "" + dimension,
            y: "" + dimension / 2
        },
        {
            x: "" + dimension,
            y: "" + dimension
        },
        {
            x: "" + dimension / 2,
            y: "" + dimension
        },
        {
            x: "0",
            y: "" + dimension
        },
        {
            x: "0",
            y: "" + dimension / 2
        }
    ];
}