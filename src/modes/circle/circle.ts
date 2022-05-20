import { ICoords, IExtendedSVGSVGElement, IMode, IModeController } from "../../model/interfaces";
import { getCenterCoords, getDimensions, getSquarePerimeterCoords, W3_SVG } from "../../tools";
import { Circle_Variant_1 } from "./circle_variant_1";

export class Circle implements IModeController {
    variants: any[];
    currentMode: IMode;
    nSymbols: number;
    taskContainer: HTMLElement;
    dimensions: number;
    coords: ICoords[];

    public constructor(
        taskContainer: HTMLElement,
        nSymbols: number
    ) {
        this.taskContainer = taskContainer;
        this.dimensions = getDimensions();
        this.coords = getSquarePerimeterCoords(this.dimensions);
        this.nSymbols = nSymbols;
        this.variants = [
            new Circle_Variant_1(taskContainer)
        ];
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;
        this.currentMode = this.variants[Math.floor(Math.random() * this.variants.length)];

        for (let i = 0; i < this.nSymbols; i++) {
            const circle: SVGSVGElement = this.getCircle();
            circle.addEventListener("click", () => this.handleClick(circle));
            parent.appendChild(circle);
        }

        this.currentMode.renderTask(this.taskContainer);
    }

    checkGrid(parent: HTMLElement): void {
        this.currentMode.checkGrid(parent);
    }

    handleClick(e: IExtendedSVGSVGElement): void {
        const line = document.createElementNS(W3_SVG, "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "" + this.dimensions);
        line.setAttribute("x2", "" + this.dimensions);
        line.setAttribute("y2", "0");
        line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2")
        e.meta.checked = true;
        e.appendChild(line);
    }

    getCircle(): IExtendedSVGSVGElement {
        const circle: IExtendedSVGSVGElement = document.createElementNS(W3_SVG, "svg");
        circle.setAttribute("width", "" + this.dimensions);
        circle.setAttribute("height", "" + this.dimensions);

        const ring = document.createElementNS(W3_SVG, "circle");
        ring.setAttributeNS(null, 'cx', "" + this.dimensions / 2);
        ring.setAttributeNS(null, 'cy', "" + this.dimensions / 2);
        ring.setAttributeNS(null, 'r', "" + (this.dimensions / 2 - 3));
        ring.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 3px;');
        circle.appendChild(ring);

        const random = Math.floor(Math.random() * (this.coords.length - 1));
        const sourceCoords: ICoords = this.coords[random];
        const targetCoords: ICoords = getCenterCoords(this.dimensions);

        const line = document.createElementNS(W3_SVG, "line");
        line.setAttribute("x1", "" + sourceCoords.x);
        line.setAttribute("y1", "" + sourceCoords.y);
        line.setAttribute("x2", "" + targetCoords.x);
        line.setAttribute("y2", "" + targetCoords.y);
        line.setAttribute("style", "stroke:white;stroke-width:5")
        circle.appendChild(line);

        circle.meta = {
            number: random,
            checked: false
        };

        return circle;
    }
}