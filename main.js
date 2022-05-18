var digits = 1600;
var worksheet = document.querySelector("[data-js=\"worksheet\"]");
var task = document.querySelector("[data-js=\"task\"]");
var E_PQ;
(function (E_PQ) {
    E_PQ[E_PQ["p"] = 0] = "p";
    E_PQ[E_PQ["q"] = 1] = "q";
})(E_PQ || (E_PQ = {}));
var PQ = /** @class */ (function () {
    function PQ() {
        this.taskText = "Check every p BEFORE a q";
    }
    PQ.prototype.generateGrid = function (parent) {
        var _this = this;
        parent.innerHTML = null;
        var _loop_1 = function (i) {
            var digit = this_1.getDigit();
            var d = document.createElement("div");
            d.classList.add("item");
            d.innerHTML = digit.digit;
            d.meta = {
                number: digit.number,
                checked: false
            };
            d.addEventListener("click", function () { return _this.handleClick(d); });
            parent.appendChild(d);
        };
        var this_1 = this;
        for (var i = 0; i < digits; i++) {
            _loop_1(i);
        }
        this.renderTask(task);
    };
    PQ.prototype.handleClick = function (e) {
        e.classList.add("checked");
        e.meta.checked = true;
    };
    PQ.prototype.renderTask = function (taskContainer) {
        taskContainer.innerHTML = this.taskText;
    };
    PQ.prototype.getDigit = function () {
        var random = Math.floor(Math.random() * 2);
        return {
            number: random,
            digit: E_PQ[random]
        };
    };
    PQ.prototype.checkGrid = function (parent) {
        var elements = parent.children;
        for (var i = 0; i < elements.length - 1; i++) {
            if (elements[i].meta.number == E_PQ.p && elements[i + 1].meta.number == E_PQ.q) {
                if (elements[i].meta.checked) {
                    elements[i].classList.add("correct--checked");
                }
                else {
                    elements[i].classList.add("correct--unchecked");
                }
            }
            else {
                if (elements[i].meta.checked) {
                    elements[i].classList.add("incorrect--checked");
                }
            }
        }
    };
    return PQ;
}());
var Star = /** @class */ (function () {
    function Star(points) {
        this.taskText = "fartharder";
        this.starDimensions = 0;
        this.coords = [];
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
    Star.prototype.generateGrid = function (parent) {
        var _this = this;
        parent.innerHTML = null;
        var _loop_2 = function (i) {
            var star = this_2.getStar();
            star.addEventListener("click", function () { return _this.handleClick(star); });
            parent.appendChild(star);
        };
        var this_2 = this;
        for (var i = 0; i < digits; i++) {
            _loop_2(i);
        }
        this.renderTask(task);
    };
    Star.prototype.handleClick = function (e) {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", "" + this.starDimensions);
        line.setAttribute("y2", "" + this.starDimensions);
        line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2");
        e.appendChild(line);
    };
    Star.prototype.renderTask = function (taskContainer) {
        taskContainer.innerHTML = this.taskText;
    };
    Star.prototype.getStar = function () {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "" + this.starDimensions);
        svg.setAttribute("height", "" + this.starDimensions);
        var random = Math.floor(Math.random() * 8);
        for (var i = 0; i < random + 1; i++) {
            svg.appendChild(this.getLine());
        }
        svg.style.padding = "1px";
        svg.meta = {
            number: random + 1,
            checked: false
        };
        return svg;
    };
    Star.prototype.getLine = function () {
        var c = [].concat(this.coords);
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        var randomCoordIdx = Math.floor(Math.random() * c.length);
        var coord = c[randomCoordIdx];
        line.setAttribute("x1", "" + this.starDimensions / 2);
        line.setAttribute("y1", "" + this.starDimensions / 2);
        line.setAttribute("x2", coord.x);
        line.setAttribute("y2", coord.y);
        line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1");
        c.splice(randomCoordIdx, 1);
        return line;
    };
    Star.prototype.getDimensions = function () {
        return document.getElementById("hidden-pixel-density-measure").offsetWidth;
    };
    Star.prototype.checkGrid = function (parent) {
        throw new Error("Method not implemented.");
    };
    return Star;
}());
var modes = [
    new PQ,
    new Star(8)
];
var randomMode = null;
var generate = function () {
    randomMode = modes[Math.floor(Math.random() * modes.length)];
    randomMode.generateGrid(worksheet);
};
var check = function () {
    randomMode.checkGrid(worksheet);
};
