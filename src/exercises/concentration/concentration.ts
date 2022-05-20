import { GUI } from "./gui";

const nSymbols: number = 1600;

export class Concentration {
    public renderGui(parent: HTMLElement) {
        const gui: GUI = new GUI(parent);
        gui.renderControls(this);
    }
}
