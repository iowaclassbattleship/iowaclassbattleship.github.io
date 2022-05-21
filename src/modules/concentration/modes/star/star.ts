import { ICoords, IExtendedSVGSVGElement, IFinished, IMode, IModeController } from "../../model/interfaces";
import { getDimensions, getSquarePerimeterCoords, W3_SVG } from "../../tools";
import { Star_Variant_1 } from "./star_variant_1";

export class Star implements IModeController {
    variants: any[];
    currentMode: IMode;
    nSymbols: number;
    taskContainer: HTMLElement;
    dimensions: number;
    coords: ICoords[];

    public constructor(
        taskContainer: HTMLElement,
        nSymbols: number,
    ) {
        this.nSymbols = nSymbols;
        this.taskContainer = taskContainer;
        this.dimensions = getDimensions() - 2;
        this.coords = getSquarePerimeterCoords(this.dimensions);
        this.variants = [
            new Star_Variant_1(taskContainer, nSymbols, 4),
            new Star_Variant_1(taskContainer, nSymbols, 5),
            new Star_Variant_1(taskContainer, nSymbols, 6)
        ];
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;
        this.currentMode = this.variants[Math.floor(Math.random() * this.variants.length)];

        for (let i = 0; i < this.nSymbols; i++) {
            const star: SVGSVGElement = this.getStar();
            star.addEventListener("click", () => this.handleClick(star))
            parent.appendChild(star);
        }

        this.currentMode.renderTask(this.taskContainer);
    }

    getStar(): IExtendedSVGSVGElement {
        const svg: IExtendedSVGSVGElement = document.createElementNS(W3_SVG, "svg");
        svg.setAttribute("width", "" + this.dimensions);
        svg.setAttribute("height", "" + this.dimensions);

        const random: number = Math.floor(this.norm() * 8);

        const c = [].concat(this.coords);
        for (let i = 0; i < random; i++) {
            const line = document.createElementNS(W3_SVG, "line");
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

    checkGrid(parent: HTMLElement): void {
        const { correct, incorrect }: IFinished = this.currentMode.checkGrid(parent);

        const total = correct + incorrect;

        alert(`You got ${correct} correct, ${incorrect} incorrect. Total score: ${correct / total}`);
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