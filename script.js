const MAX_SIZE = 960;   // container size in pixel

const mainContainerDiv = document.querySelector("#main");
const changeGridBtn = document.querySelector("#btn-change-grid");

let numGridPerSide = 11;
let totalGrids = null;
let gridSize = null;
let mainContainerSize = null;

computeGridLogic(numGridPerSide);
createGrids(mainContainerDiv);

changeGridBtn.addEventListener("click", listener_changeGrid);

// Event listener

// Change grid number per side
function listener_changeGrid() {
    do {
        numGridPerSide = +prompt("How many grids per side? (Enter a number between 1 - 100)");
    } while (numGridPerSide > 100 || numGridPerSide < 1);

    removeAllChildrenElements(mainContainerDiv);
    computeGridLogic(numGridPerSide);
    createGrids(mainContainerDiv);
}

// Change grid colour
function listener_changeColor(event) {
    event.target.style.backgroundColor = `rgb(${randomiseNum(0, 255)}, ${randomiseNum(0, 255)}, ${randomiseNum(0, 255)})`;
    // event.target.style.backgroundColor = "white";
}

// Change opacity
function listener_changeOpacity(event) {
    let currentOpacity = +event.target.getAttribute("opacity");

    event.target.style.opacity = currentOpacity !== 0? (currentOpacity - 0.1).toString() : "0";
    event.target.setAttribute("opacity", event.target.style.opacity);
}


// Function directly related to the program

function computeGridLogic(numSideGrid) {
    totalGrids = numSideGrid ** 2;
    gridSize = Math.floor(MAX_SIZE / numSideGrid); // grid size in pixel. round down to an integer
    mainContainerSize = gridSize * numSideGrid;
}

function createGrids(parent) {
    parent.style.width = `${mainContainerSize}px`;
    parent.style.height = `${mainContainerSize}px`;

    for (let i = 0; i < totalGrids; i++) {
        let gridContainer = document.createElement("div");
        gridContainer.classList.add("grid-container");
        gridContainer.style.width = `${gridSize}px`;
        gridContainer.style.height = `${gridSize}px`;

        let gridElement = document.createElement("div");
        gridElement.classList.add("grid");
        gridElement.setAttribute("opacity", 1);

        gridContainer.appendChild(gridElement);
        parent.appendChild(gridContainer);

        gridElement.addEventListener("mouseenter", listener_changeColor);
        gridElement.addEventListener("mouseenter", listener_changeOpacity);
    }
}

function removeAllChildrenElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}



// Utility functions

function randomiseNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

