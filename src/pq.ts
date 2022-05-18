import { IDigit, IExtendedHtmlDivElement, IMode } from "./interfaces";

enum E_PQ {
    p,
    q
}

export class PQ implements IMode {
    taskText: string = "Check every p BEFORE a q";
    digits: number = 0;
    taskContainer: HTMLElement;

    public constructor(
        taskContainer: HTMLElement,
        digits: number
    ) {
        this.digits = digits;
        this.taskContainer = taskContainer;
    }

    generateGrid(parent: HTMLElement): void {
        parent.innerHTML = null;
        for (let i = 0; i < this.digits; i++) {
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

        this.renderTask(this.taskContainer);
    }

    checkGrid(parent: HTMLElement): void {
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

    renderTask(taskContainer: HTMLElement) {
        taskContainer.innerHTML = this.taskText;
    }

    handleClick(e: IExtendedHtmlDivElement): void {
        e.classList.add("checked");
        e.meta.checked = true;
    }

    getDigit(): IDigit {
        let random = Math.floor(Math.random() * 2);

        return {
            number: random,
            digit: E_PQ[random],
        };
    }
}