import "../styles/styles.scss";
import "./styles/main.scss";

import { GUI } from "./gui";
import { IExercises } from "./model/interfaces";

const exercises: IExercises[] = [
    {
        label: "Konzentriertes Arbeiten",
        link: `${window.location.href}concentration.html`
    }
];

const gui: GUI = new GUI(exercises);
gui.renderOptions();
