import { IExtendedSVGSVGElement, IMode } from "../model/interfaces";
import { getDimensions } from "../tools";

export class Circle implements IMode {
    taskText: string = "John Mcclain";
    taskContainer: HTMLElement;
    digits: number;
    dimensions: number = 0;

    public constructor(
        taskContainer: HTMLElement,
        digits: number
    ) {
        this.digits = digits;
        this.taskContainer = taskContainer;
        this.dimensions = getDimensions();
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;

        for (let i = 0; i < this.digits; i++) {
            parent.appendChild(this.getCircle());
        }
    }

    checkGrid(parent: HTMLElement): void {
        throw new Error("Method not implemented.");
    }

    renderTask(parent: HTMLElement): void {
        parent.innerHTML = this.taskText;
    }

    getCircle(): IExtendedSVGSVGElement {
        const circle: IExtendedSVGSVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        circle.setAttribute("width", "" + this.dimensions);
        circle.setAttribute("height", "" + this.dimensions);

        const ring = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
        );
        ring.setAttributeNS(null, 'cx', "" + this.dimensions / 2);
        ring.setAttributeNS(null, 'cy', "" + this.dimensions / 2);
        ring.setAttributeNS(null, 'r', "" + (this.dimensions / 2 - 3));
        ring.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 3px;' );
        circle.appendChild(ring);

        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
        );
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", "" + this.dimensions / 2);
        line.setAttribute("y2", "" + this.dimensions / 2);
        line.setAttribute("style", "stroke:white;stroke-width:5")
        circle.appendChild(line);

        return circle;
    }
}