import { useEffect, useReducer, useRef, useState } from "react";
import "./css/Game.css";

const BOAT_ACTIONS = {
  CARRIER: "carrier",
  BATTLESHIP: "battleship",
  CRUISER: "cruiser",
  SUBMARINE: "submarine",
  DESTROYER: "destroyer",
};

function shipReducer(boatState, action) {
  switch (action.type) {
    case BOAT_ACTIONS.CARRIER:
      return {
        style: "ship carrier-container",
        boat: BOAT_ACTIONS.CARRIER,
        size: 5,
      };
    case BOAT_ACTIONS.BATTLESHIP:
      return {
        style: "ship battleship-container",
        boat: BOAT_ACTIONS.BATTLESHIP,
        size: 4,
      };
    case BOAT_ACTIONS.CRUISER:
      return {
        style: "ship cruiser-container",
        boat: BOAT_ACTIONS.CRUISER,
        size: 3,
      };
    case BOAT_ACTIONS.SUBMARINE:
      return {
        style: "ship submarine-container",
        boat: BOAT_ACTIONS.SUBMARINE,
        size: 3,
      };
    case BOAT_ACTIONS.DESTROYER:
      return {
        style: "ship destroyer-container",
        boat: BOAT_ACTIONS.DESTROYER,
        size: 2,
      };
    default:
      return boatState;
  }
}

let isHorizontal = true;

const Game = () => {
  //Game Set Up
  const [message, setMessage] = useState();
  const [boatState, dispatch] = useReducer(shipReducer, {
    style: "",
    boat: "",
    size: "",
  });
  const boatRef = useRef(null);

  document.body.onpointermove = (e) => {
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
    setMessage("Set position of your Carrier on the left grid");
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
    if (boatState.boat === "carrier") {
      setMessage("Set position of your Battleship on the left grid");
      dispatch({ type: BOAT_ACTIONS.BATTLESHIP });
    } else if (boatState.boat === "battleship") {
      setMessage("Set position of your Cruiser on the left grid");
      dispatch({ type: BOAT_ACTIONS.CRUISER });
    } else if (boatState.boat === "cruiser") {
      setMessage("Set position of your Submarine on the left grid");
      dispatch({ type: BOAT_ACTIONS.SUBMARINE });
    } else if (boatState.boat === "submarine") {
      setMessage("Set position of your Destroyer on the left grid");
      dispatch({ type: BOAT_ACTIONS.DESTROYER });
    } else if (boatState.boat === "destroyer") {
      setMessage("Your Turn");
    }
  };

  // This will place the boat in its spot
  const handlePlace = (e) => {
    console.log("player square clicked clicked");
  };

  // This will handle every shot made
  const handleSelectShot = (e) => {
    console.log("clicked");
  };

  return (
    <>
      <div className="container-1">
        <div className="grids">
          <div
            className="battleship-grid player-grid"
            ref={playerGridRef}
          ></div>
          <div
            className="battleship-grid shooting-grid"
            ref={shootingGridRef}
          ></div>
        </div>
        <div className="actions">
          <button className="shoot">Shoot</button>
        </div>
      </div>
      <div className="Guide-1">
        {message ? (
          <>
            <p>{message}</p>
            <button
              className="set-boat"
              onClick={(e) => {
                e.preventDefault();
                handleSet();
              }}
            >
              Set
            </button>
            <button
              className="set-boat"
              onClick={(e) => {
                e.preventDefault();
                handleRotate();
              }}
            >
              Change Direction
            </button>
            <div className={boatState.style} ref={boatRef} id="move"></div>
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
    </>
  );
};

export default Game;
