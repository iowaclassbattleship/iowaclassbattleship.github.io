const digits: Number = 1600;

const worksheet: HTMLElement = document.querySelector(`[data-js="worksheet"]`);
const task: HTMLElement = document.querySelector(`[data-js="task"]`);

interface IExtendedHtmlDivElement extends HTMLDivElement {
    meta?: IMeta
}

interface IExtendedSVGSVGElement extends SVGSVGElement {
    meta?: IMeta
}

interface IMeta {
    number: Number,
    checked: boolean
}

interface IDigit {
    number: Number,
    digit: string
}

interface IMode {
    taskText: string,

    generateGrid(parent: HTMLElement): void,
    checkGrid(parent: HTMLElement): void

    renderTask(parent: HTMLElement): void,
}

interface IModeStar extends IMode {
    coords: any[];
    getLine(c: any): SVGLineElement;
}

enum E_PQ {
    p,
    q
}

class PQ implements IMode {
    taskText: string = "Check every p BEFORE a q";

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;
        for (let i = 0; i < digits; i++) {
            const digit = this.getDigit();

            let d: IExtendedHtmlDivElement = document.createElement("div");
            d.classList.add("item");
            d.innerHTML = digit.digit;

            d.meta = {
                number: digit.number,
                checked: false
            };

            d.addEventListener("click", () => this.handleClick(d));
            parent.appendChild(d);
        }

        this.renderTask(task);
    }

    handleClick(e: IExtendedHtmlDivElement): void {
        e.classList.add("checked");
        e.meta.checked = true;
    }

    renderTask(taskContainer: HTMLElement) {
        taskContainer.innerHTML = this.taskText;
    }

    getDigit(): IDigit {
        let random = Math.floor(Math.random() * 2);

        return {
            number: random,
            digit: E_PQ[random],
        };
    }

    public checkGrid(parent: HTMLElement): void {
        const elements: any = parent.children;

        for (let i = 0; i < elements.length - 1; i++) {
            if (elements[i].meta.number == E_PQ.p && elements[i + 1].meta.number == E_PQ.q) {
                if (elements[i].meta.checked) {
                    elements[i].classList.add("correct--checked");
                } else {
                    elements[i].classList.add("correct--unchecked");
                }
            } else {
                if (elements[i].meta.checked) {
                    elements[i].classList.add("incorrect--checked");
                }
            }
        }
    }
}

class Star implements IModeStar {
    taskText: string = "fartharder";
    points: number;
    starDimensions: number = 0;
    coords: any[] = [];

    public constructor(
        points: number
    ) {
        this.points = points;
        this.starDimensions = this.getDimensions() - 2;
        this.coords = [
            {
                x: "0",
                y: "0"
            },
            {
                x: "" + this.starDimensions / 2,
                y: "0"
            },
            {
                x: "" + this.starDimensions,
                y: "0"
            },
            {
                x: "0",
                y: "" + this.starDimensions / 2
            },
            {
                x: "0",
                y: "" + this.starDimensions
            },
            {
                x: "" + this.starDimensions / 2,
                y: "" + this.starDimensions
            },
            {
                x: "" + this.starDimensions / 2,
                y: "" + this.starDimensions
            },
            {
                x: "" + this.starDimensions,
                y: "" + this.starDimensions
            },
        ];
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;

        for (let i = 0; i < digits; i++) {
            const star: SVGSVGElement = this.getStar();
            star.addEventListener("click", () => this.handleClick(star))
            parent.appendChild(star);
        }

        this.renderTask(task);
    }

    handleClick(e: IExtendedSVGSVGElement): void {
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
        );
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", "" + this.starDimensions);
        line.setAttribute("y2", "" + this.starDimensions);
        line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2")
        e.meta.checked = true;
        e.appendChild(line);
    }

    renderTask(taskContainer: HTMLElement): void {
        taskContainer.innerHTML = this.taskText;
    }

    getStar(): IExtendedSVGSVGElement {
        const svg: IExtendedSVGSVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "" + this.starDimensions);
        svg.setAttribute("height", "" + this.starDimensions);

        const random: number = Math.floor(Math.random() * 8);

        for (let i = 0; i < random + 1; i++) {
            svg.appendChild(this.getLine());
        }

        svg.style.padding = "1px";
        svg.meta = {
            number: random + 1,
            checked: false
        }

        return svg;
    }

    getLine(): SVGLineElement {
        const c = [].concat(this.coords);
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
        );
        let randomCoordIdx = Math.floor(Math.random() * c.length);
        let coord = c[randomCoordIdx]
        line.setAttribute("x1", "" + this.starDimensions / 2);
        line.setAttribute("y1", "" + this.starDimensions / 2);
        line.setAttribute("x2", coord.x);
        line.setAttribute("y2", coord.y);
        line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1")
        c.splice(randomCoordIdx, 1);

        return line;
    }

    getDimensions(): number {
        return document.getElementById("hidden-pixel-density-measure").offsetWidth;
    }

    checkGrid(parent: HTMLElement): void {
        const elements: any = parent.children;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].meta.number === 5) {
                if (elements[i].meta.checked === true) {
                    elements[i].classList.add("correct--checked");
                } else {
                    elements[i].classList.add("correct--unchecked");
                }
            }
        }
    }
}

const modes: IMode[] = [
    new PQ,
    new Star(8)
];

let randomMode: IMode = null;

const generate = () => {
    randomMode = modes[Math.floor(Math.random() * modes.length)];
    randomMode.generateGrid(worksheet);
}

const check = () => {
    randomMode.checkGrid(worksheet);
}