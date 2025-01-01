const MAX_SIZE = 960;   // container size in pixel

const mainContainerDiv = document.querySelector("#main");
const changeGridBtn = document.querySelector("#btn-change-grid");

let timer = 200; // interval for fade out
let numGridPerSide = 11;
let totalGrids = numGridPerSide ** 2;
let gridSize = Math.floor(MAX_SIZE / numGridPerSide); // grid size in pixel. round down to an integer
let mainContainerSize = gridSize * numGridPerSide;

mainContainerDiv.style.width = `${mainContainerSize}px`;
mainContainerDiv.style.height = `${mainContainerSize}px`;

createGrids(mainContainerDiv, totalGrids, gridSize, listener_gridChangeColor);

// Change grid number per side button event listener
changeGridBtn.addEventListener("click", () => {
    do {
        numGridPerSide = +prompt("How many grids per side? (Enter a number between 1 - 100)");
    } while (numGridPerSide > 100 || numGridPerSide < 1);

    computeGridLogic();

    removeAllChildrenElements(mainContainerDiv);
    createGrids(mainContainerDiv, totalGrids, gridSize, listener_gridChangeColor);

})

// Event Listener
function listener_gridChangeColor(event) {

    let gridElement = event.target;
    let opacity = 1;
    let red = randomiseNum(0, 255);
    let green = randomiseNum(0, 255);
    let blue = randomiseNum(0, 255);
    let fadeValue = +gridElement.getAttribute("fadeIntervalValue");

    clearInterval(fadeValue); // To clear the existing timeout on the grid, if any
    gridElement.setAttribute("fadeIntervalValue", "N/A");

    gridElement.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    gridElement.setAttribute("red", red);
    gridElement.setAttribute("green", green);
    gridElement.setAttribute("blue", blue);
    gridElement.setAttribute("opacity", opacity);

    // add the removecolor listener so it can begin fadeout upon mouseout event
    // remove existing mouseenter listener
    gridElement.addEventListener("mouseout", listener_gridRemoveColor);
    gridElement.removeEventListener("mouseenter", listener_gridChangeColor);
}

function listener_gridRemoveColor(event) {
    let gridElement = event.target;
    let red = +gridElement.getAttribute("red");
    let green = +gridElement.getAttribute("green");
    let blue = +gridElement.getAttribute("blue");
    let currentOpacity = +gridElement.getAttribute("opacity");

    let fadeCountDown = setInterval(() => {
        currentOpacity -= 0.1; // minus 0.1 opacity every timer tick ms value
        if (currentOpacity > 0) {
            gridElement.setAttribute("opacity", currentOpacity);
            gridElement.setAttribute("fadeIntervalValue", fadeCountDown);
            gridElement.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${currentOpacity})`;
        } else {
            clearInterval(fadeCountDown);
            gridElement.setAttribute("fadeIntervalValue", "N/A");

            // remove existing mouseout listener
            gridElement.removeEventListener("mouseout", listener_gridRemoveColor);
        }

    }, timer);

    // add the changecolor listener so it can change color upon mouseenter event

    gridElement.addEventListener("mouseenter", listener_gridChangeColor);
}

// Functions

function computeGridLogic() {
    totalGrids = numGridPerSide ** 2;
    gridSize = Math.floor(MAX_SIZE / numGridPerSide);
    mainContainerSize = gridSize * numGridPerSide;

    mainContainerDiv.style.width = `${mainContainerSize}px`;
    mainContainerDiv.style.height = `${mainContainerSize}px`;
}

function createGrids(parent, numGrids, size, listener_gridChangeColor) {
    for (let i = 0; i < numGrids; i++) {
        let gridElement = document.createElement("div");
        gridElement.classList.add("grid");
        gridElement.style.width = `${size}px`;
        gridElement.style.height = `${size}px`;
        gridElement.setAttribute("opacity", 1);

        gridElement.addEventListener("mouseenter", listener_gridChangeColor);

        parent.appendChild(gridElement);
    }
}

function randomiseNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeAllChildrenElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}