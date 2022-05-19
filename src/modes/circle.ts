import { ICoords, IExtendedSVGSVGElement, IMode } from "../model/interfaces";
import { getPerimeterCoords, getDimensions, getCenterCoords } from "../tools";

export class Circle implements IMode {
    taskText: string = "John Mcclain";
    taskContainer: HTMLElement;
    digits: number;
    dimensions: number = 0;
    coords: ICoords[] = [];

    public constructor(
        taskContainer: HTMLElement,
        digits: number
    ) {
        this.digits = digits;
        this.taskContainer = taskContainer;
        this.dimensions = getDimensions();
        this.coords = getPerimeterCoords(this.dimensions);
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;

        for (let i = 0; i < this.digits; i++) {
            const circle: SVGSVGElement = this.getCircle();
            circle.addEventListener("click", () => this.handleClick(circle));
            parent.appendChild(circle);
        }

        this.renderTask(this.taskContainer);
    }

    checkGrid(parent: HTMLElement): void {
        const elements: any = parent.children;

        for (let i = 0; i < elements.length - 1; i++) {
            if (
                elements[i + 1].meta.number === 0 ||
                elements[i + 1].meta.number === 2 ||
                elements[i + 1].meta.number === 4 ||
                elements[i + 1].meta.number === 6
            ) {
                elements[i].classList.add("correct--checked");
            }
        }
    }

    renderTask(parent: HTMLElement): void {
        parent.innerHTML = this.taskText;
    }

    handleClick(e: IExtendedSVGSVGElement): void {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "" + this.dimensions);
        line.setAttribute("x2", "" + this.dimensions);
        line.setAttribute("y2", "0");
        line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2")
        e.meta.checked = true;
        e.appendChild(line);
    }

    getCircle(): IExtendedSVGSVGElement {
        const circle: IExtendedSVGSVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        circle.setAttribute("width", "" + this.dimensions);
        circle.setAttribute("height", "" + this.dimensions);

        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttributeNS(null, 'cx', "" + this.dimensions / 2);
        ring.setAttributeNS(null, 'cy', "" + this.dimensions / 2);
        ring.setAttributeNS(null, 'r', "" + (this.dimensions / 2 - 3));
        ring.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 3px;');
        circle.appendChild(ring);

        const random = Math.floor(Math.random() * (this.coords.length - 1));
        const sourceCoords: ICoords = this.coords[random];
        const targetCoords: ICoords = getCenterCoords(this.dimensions);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
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