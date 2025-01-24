import { useEffect, useReducer, useRef, useState } from "react";
import "./css/Game.css";

// Reducer utilities
const BOAT_ACTIONS = {
  CARRIER: "carrier",
  BATTLESHIP: "battleship",
  CRUISER: "cruiser",
  SUBMARINE: "submarine",
  DESTROYER: "destroyer",
};

const BOAT_STYLE = {
  CARRIER: "carrier-container",
  BATTLESHIP: "battleship-container",
  CRUISER: "cruiser-container",
  SUBMARINE: "submarine-container",
  DESTROYER: "destroyer-container",
};

const BOAT_SIZE = {
  CARRIER: 5,
  BATTLESHIP: 4,
  CRUISER: 3,
  SUBMARINE: 3,
  DESTROYER: 2,
};

function shipReducer(boatState, action) {
  switch (action.type) {
    case BOAT_ACTIONS.CARRIER:
      return {
        style: BOAT_STYLE.CARRIER,
        boat: BOAT_ACTIONS.CARRIER,
      };
    case BOAT_ACTIONS.BATTLESHIP:
      return {
        style: BOAT_STYLE.BATTLESHIP,
        boat: BOAT_ACTIONS.BATTLESHIP,
      };
    case BOAT_ACTIONS.CRUISER:
      return {
        style: BOAT_STYLE.CRUISER,
        boat: BOAT_ACTIONS.CRUISER,
      };
    case BOAT_ACTIONS.SUBMARINE:
      return {
        style: BOAT_STYLE.SUBMARINE,
        boat: BOAT_ACTIONS.SUBMARINE,
      };
    case BOAT_ACTIONS.DESTROYER:
      return {
        style: BOAT_STYLE.DESTROYER,
        boat: BOAT_ACTIONS.DESTROYER,
      };
    default:
      return boatState;
  }
}

// Function that returns index of square clicked
const findIndex = (array, property, value) => {
  const rowIndex = array.findIndex((row) =>
    row.some((div) => div.getAttribute(property) === value)
  );

  if (rowIndex === -1) return null;

  const colIndex = array[rowIndex].findIndex(
    (div) => div.getAttribute(property) === value
  );
  return [rowIndex, colIndex];
};

const checkPlacement = (index, horizontal, size) => {
  const [column, row] = index;

  const newRow = horizontal ? row + size : row;
  const newColumn = horizontal ? column : column + size;

  if (horizontal) {
    if (newRow > 9) {
      return { valid: false, message: "Out of Bounds, try again" };
    }
  } else {
    if (newColumn > 9) {
      return { valid: false, message: "Out of Bounds, try again" };
    }
  }

  return { valid: true, message: "" };
};

let isHorizontal = true;

const Game = () => {
  //Game Set Up
  const [message, setMessage] = useState();
  const [isSetValid, setIsSetValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [boatState, dispatch] = useReducer(shipReducer, {
    style: "",
    boat: "",
    size: 0,
  });
  const boatRef = useRef(null);

  // Boat Movement feature
  useEffect(() => {
    playerGridRef.current.onpointermove = (e) => {
      const { clientX, clientY } = e;

      if (isHorizontal) {
        const elementHeight = move.offsetHeight;
        const topPosition = clientY - elementHeight / 2;

        boatRef.current.animate(
          {
            left: `${clientX - 20}px`,
            top: `${topPosition}px`,
          },
          { duration: 1000, fill: "forwards" }
        );
      }

      if (!isHorizontal) {
        const elementWidth = move.offsetWidth;
        const leftPosition = clientX - elementWidth / 2;

        boatRef.current.animate(
          {
            left: `${leftPosition - 20}px`,
            top: `${clientY - 20}px`,
          },
          { duration: 1000, fill: "forwards" }
        );
      }
    };
  });

  //Grids Set Up
  const gridSize = 10;
  const playerGrid = Array.from({ length: gridSize }, () =>
    new Array(gridSize).fill(0)
  );
  const shootingGrid = Array.from({ length: gridSize }, () =>
    new Array(gridSize).fill(0)
  );
  const playerGridRef = useRef(null);
  const shootingGridRef = useRef(null);

  const createGrid = (gridElement, grid, func) => {
    let id = 1;
    grid.forEach((row) => {
      row.forEach((_, colIndex) => {
        const square = document.createElement("div");
        square.dataset.id = id;
        id++;
        square.onclick = (e) => func(e);
        square.classList.toggle("square");
        gridElement.appendChild(square);
        row[colIndex] = square;
      });
    });
  };

  // Generating Grids on first render
  useEffect(() => {
    const genrateGrids = () => {
      if (playerGridRef.current && shootingGridRef.current) {
        createGrid(playerGridRef.current, playerGrid, handlePlace);
        createGrid(shootingGridRef.current, shootingGrid, handleSelectShot);
      }
    };

    genrateGrids();
  }, []);

  // This will trigger the game to start
  const handleStart = () => {
    setMessage(
      'Set position of your Carrier on the left grid, when Done click "Set"'
    );
    dispatch({ type: BOAT_ACTIONS.CARRIER });
  };

  //This will rotate the boat for placement
  const handleRotate = () => {
    if (isHorizontal) {
      if (boatState.boat === "carrier") {
        boatRef.current.classList.toggle("carrier-container-vertical");
      } else if (boatState.boat === "battleship") {
        boatRef.current.classList.toggle("battleship-container-vertical");
      } else if (boatState.boat === "cruiser") {
        boatRef.current.classList.toggle("cruiser-container-vertical");
      } else if (boatState.boat === "submarine") {
        boatRef.current.classList.toggle("submarine-container-vertical");
      } else if (boatState.boat === "destroyer") {
        boatRef.current.classList.toggle("destroyer-container-vertical");
      }
      isHorizontal = false;
      return;
    }

    if (!isHorizontal) {
      if (boatState.boat === "carrier") {
        boatRef.current.classList.toggle("carrier-container-vertical");
      } else if (boatState.boat === "battleship") {
        boatRef.current.classList.toggle("battleship-container-vertical");
      } else if (boatState.boat === "cruiser") {
        boatRef.current.classList.toggle("cruiser-container-vertical");
      } else if (boatState.boat === "submarine") {
        boatRef.current.classList.toggle("submarine-container-vertical");
      } else if (boatState.boat === "destroyer") {
        boatRef.current.classList.toggle("destroyer-container-vertical");
      }
      isHorizontal = true;
      return;
    }
  };

  //This will change the boat once set
  const handleSet = () => {
    isHorizontal = true;
    if (boatState.boat === "carrier") {
      setMessage(
        'Set position of your Battleship on the left grid, when Done click "Set"'
      );
      dispatch({ type: BOAT_ACTIONS.BATTLESHIP });
    } else if (boatState.boat === "battleship") {
      setMessage(
        'Set position of your Cruiser on the left grid, when Done click "Set"'
      );
      dispatch({ type: BOAT_ACTIONS.CRUISER });
    } else if (boatState.boat === "cruiser") {
      setMessage(
        'Set position of your Submarine on the left grid, when Done click "Set"'
      );
      dispatch({ type: BOAT_ACTIONS.SUBMARINE });
    } else if (boatState.boat === "submarine") {
      setMessage(
        'Set position of your Destroyer on the left grid, when Done click "Set"'
      );
      dispatch({ type: BOAT_ACTIONS.DESTROYER });
    } else if (boatState.boat === "destroyer") {
      setMessage("Your Turn");
    }
  };

  // This will place the boat in its spot
  const handlePlace = (e) => {
    const id = e.srcElement.dataset.id;
    const index = findIndex(playerGrid, "data-id", id);
    const getInfo = () => {
      if (boatRef.current.classList.contains(BOAT_STYLE.CARRIER)) {
        return {
          size: BOAT_SIZE.CARRIER - 1,
          boat: BOAT_ACTIONS.CARRIER,
        };
      }
      if (boatRef.current.classList.contains(BOAT_STYLE.BATTLESHIP)) {
        return {
          size: BOAT_SIZE.BATTLESHIP - 1,
          boat: BOAT_ACTIONS.BATTLESHIP,
        };
      }
      if (boatRef.current.classList.contains(BOAT_STYLE.CRUISER)) {
        return {
          size: BOAT_SIZE.CRUISER - 1,
          boat: BOAT_ACTIONS.CRUISER,
        };
      }
      if (boatRef.current.classList.contains(BOAT_STYLE.SUBMARINE)) {
        return {
          size: BOAT_SIZE.SUBMARINE - 1,
          boat: BOAT_ACTIONS.SUBMARINE,
        };
      }
      if (boatRef.current.classList.contains(BOAT_STYLE.DESTROYER)) {
        return {
          size: BOAT_SIZE.DESTROYER - 1,
          boat: BOAT_ACTIONS.DESTROYER,
        };
      }
    };

    const info = getInfo();
    const size = info.size;
    const boat = info.boat;

    const checked = checkPlacement(index, isHorizontal, size);

    if (!checked.valid) {
      setErrorMessage(checked.message);
      setIsSetValid(false);
    } else {
      boatRef.current.classList = "";
      setIsSetValid(true);
      setErrorMessage(checked.message);

      for (let i = 0; i <= size; i++) {
        if (isHorizontal) {
          playerGrid[index[0]][index[1] + i].classList.add(
            boat,
            "taken",
            "horizontal"
          );
          if (i === 0) {
            playerGrid[index[0]][index[1] + i].classList.toggle("h-head");
          } else if (i === size) {
            playerGrid[index[0]][index[1] + i].classList.toggle("h-tail");
          }
        } else {
          playerGrid[index[0] + i][index[1]].classList.add(
            boat,
            "taken",
            "vertical"
          );
          if (i === 0) {
            playerGrid[index[0] + i][index[1]].classList.toggle("v-head");
          } else if (i === size) {
            playerGrid[index[0] + i][index[1]].classList.toggle("v-tail");
          }
        }
      }
    }
  };

  // This will handle every shot made
  const handleSelectShot = (e) => {
    console.log("clicked");
  };

  return (
    <>
      <div className="Game-Container">
        <div className="container-1">
          <div className="grids">
            <div>
              <div>
                <p className="grid-tag">Player</p>
              </div>
              <div
                className="battleship-grid player-grid"
                ref={playerGridRef}
              ></div>
            </div>
            <div>
              <div>
                <p className="grid-tag">Enemy</p>
              </div>
              <div
                className="battleship-grid shooting-grid"
                ref={shootingGridRef}
              ></div>
            </div>
          </div>
          <div className="actions">
            <button className="shoot">Shoot</button>
          </div>
        </div>
        <div className="Guide-1">
          {message ? (
            <>
              <p className="message">{message}</p>
              <p className="error">{errorMessage}</p>
              {isSetValid && (
                <button
                  className="set-boat"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSet();
                  }}
                >
                  Set
                </button>
              )}
              <button
                className="set-boat"
                onClick={(e) => {
                  e.preventDefault();
                  handleRotate();
                }}
              >
                Change Direction
              </button>
            </>
          ) : (
            <button
              className="start-button"
              onClick={(e) => {
                e.preventDefault;
                handleStart();
              }}
            >
              Start
            </button>
          )}
        </div>
      </div>
      <div
        className={`${message && "ship"} ${boatState.style}`}
        ref={boatRef}
        id="move"
      ></div>
    </>
  );
};

export default Game;
