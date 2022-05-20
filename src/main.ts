import "../styles/main.scss";
import "../styles/concentration.scss";

import { Concentration } from "./exercises/concentration/concentration";
import { GUI } from "./gui";
import { IExercises } from "./model/interfaces";

const parent: HTMLElement = document.querySelector(`[data-js="app"]`);

const exercises: IExercises[] = [
    {
        label: "Konzentriertes Arbeiten",
        application: new Concentration
    }
]

const gui: GUI = new GUI(parent, exercises);
gui.renderOptions();
