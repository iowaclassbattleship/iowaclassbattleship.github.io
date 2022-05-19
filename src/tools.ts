import { ICoords } from "./model/interfaces";

export function getDimensions(): number {
    return document.getElementById("hidden-pixel-density-measure").offsetWidth;
}

export function getCenterCoords(dimension: number): ICoords {
    return {
        x: "" + dimension / 2,
        y: "" + dimension / 2
    }
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