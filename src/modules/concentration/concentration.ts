import "../../../styles/styles.scss";
import "./styles/concentration.scss";

import { GUI } from "./gui";

const nSymbols: number = 1600;

const gui: GUI = new GUI(nSymbols);
gui.renderControls();
