import { IButtonConfig, IExtendedHtmlDivElement } from "./model/interfaces";

export class GUI {
    public renderControls(...buttonConfig: IButtonConfig[]): void {
        const controls: HTMLElement = document.querySelector(`[data-js="controls"]`);

        for (const cfg of buttonConfig) {
            controls.appendChild(this.generateButton(cfg.label, cfg.callback));
        }

        controls.appendChild(this.generateSelect("random", "PQ", "Numbers", "Star", "Circle"));
    }

    public getSelectValue(): string {
        const select: HTMLSelectElement = <HTMLSelectElement>document.getElementById("mode-select");
        return select.value;
    }

    public generateWorksheetOverlay(parent: HTMLElement, callback: Function): void {
        const overlay = document.createElement("div");
        overlay.classList.add("worksheet-overlay");
        overlay.id = "worksheet-overlay";
        const continueButton = document.createElement("button");
        continueButton.innerText = "BEGINN";
        continueButton.addEventListener("click", () => this.removeWorksheetOverlay(parent, callback));
        overlay.appendChild(continueButton);
        parent.appendChild(overlay);
    }

    private removeWorksheetOverlay(parent: HTMLElement, callback: Function) {
        parent.removeChild(document.getElementById("worksheet-overlay"));
        callback();
    }

    private generateButton(label: string, callback: Function): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement("button");
        button.addEventListener("click", () => callback());
        button.innerText = label;
        return button;
    }

    private generateSelect(...options: string[]): HTMLSelectElement {
        const select: HTMLSelectElement = document.createElement("select");
        select.id = "mode-select";

        for (let i = 0; i < options.length; i++) {
            select.appendChild(this.generateOption(i, options[i]))
        }

        return select;
    }

    private generateOption(mode: number, option: string): HTMLOptionElement {
        const o: HTMLOptionElement = document.createElement("option");

        o.value = "" + mode;
        o.innerText = option;

        return o;
    }
}