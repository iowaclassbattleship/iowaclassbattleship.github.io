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
            const circle: SVGSVGElement = this.getCircle();
            circle.addEventListener("click", () => this.handleClick(circle));
            parent.appendChild(circle);
        }
    }

    checkGrid(parent: HTMLElement): void {
        throw new Error("Method not implemented.");
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

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "" + (this.dimensions / 2));
        line.setAttribute("x2", "" + this.dimensions / 2);
        line.setAttribute("y2", "" + (this.dimensions / 2));
        line.setAttribute("style", "stroke:white;stroke-width:5")
        circle.appendChild(line);

        const random = Math.floor(Math.random() * 8);

        circle.style.transform = `rotate(${random * 45}deg)`;
        circle.meta = {
            number: random,
            checked: false
        };

        return circle;
    }
}