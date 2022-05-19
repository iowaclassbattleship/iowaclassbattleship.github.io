import { IExtendedSVGSVGElement, IMode, ICoords } from "../model/interfaces";
import { getDimensions, getPerimeterCoords } from "../tools";

export class Star implements IMode {
    taskText: string = "fartharder";
    taskContainer: HTMLElement;
    digits: number;
    dimensions: number = 0;
    coords: ICoords[] = [];

    public constructor(
        taskContainer: HTMLElement,
        digits: number,
    ) {
        this.taskContainer = taskContainer;
        this.dimensions = getDimensions() - 2;
        this.digits = digits;
        this.coords = getPerimeterCoords(this.dimensions);
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;

        for (let i = 0; i < this.digits; i++) {
            const star: SVGSVGElement = this.getStar();
            star.addEventListener("click", () => this.handleClick(star))
            parent.appendChild(star);
        }

        this.renderTask(this.taskContainer);
    }

    checkGrid(parent: HTMLElement): void {
        const elements: any = parent.children;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].meta.number === 5) {
                if (elements[i].meta.checked) {
                    elements[i].classList.add("correct--checked");
                } else {
                    elements[i].classList.add("correct--unchecked");
                }
            } else {
                if (elements[i].meta.checked) {
                    elements[i].classList.add("correct-unchecked");
                }
            }
        }
    }

    renderTask(taskContainer: HTMLElement): void {
        taskContainer.innerHTML = this.taskText;
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

    getStar(): IExtendedSVGSVGElement {
        const svg: IExtendedSVGSVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "" + this.dimensions);
        svg.setAttribute("height", "" + this.dimensions);

        const random: number = Math.floor(this.norm() * 8);

        const c = [].concat(this.coords);
        for (let i = 0; i < random; i++) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            let randomCoordIdx = Math.floor(Math.random() * c.length);
            let coord = c[randomCoordIdx]
            line.setAttribute("x1", "" + this.dimensions / 2);
            line.setAttribute("y1", "" + this.dimensions / 2);
            line.setAttribute("x2", coord.x);
            line.setAttribute("y2", coord.y);
            line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1")
            c.splice(randomCoordIdx, 1);
            svg.appendChild(line);
        }

        svg.style.padding = "1px";
        svg.meta = {
            number: random,
            checked: false
        }

        return svg;
    }

    norm(): number {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();
        let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) return this.norm() // resample between 0 and 1
        return num
    }
}