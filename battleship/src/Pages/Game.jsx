import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./css/Game.css";
import axios from "axios";

let compShipsSunk = 0;
let playerShipsSunk = 0;
let gameStart;

// User ID
let User = {
  ID: sessionStorage.getItem("userid"),
  TOKEN: sessionStorage.getItem("token"),
};

const Auth = {
  Authorization: `Bearer ${User.TOKEN}`,
};

const classes = ["carrier", "battleship", "cruiser", "submarine", "destroyer"];

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
let playerwin = false;
let computerwin = false;

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

const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkPlacement = (index, horizontal, size, grid) => {
  const [column, row] = index;

  const newRow = horizontal ? row + size : row;
  const newColumn = horizontal ? column : column + size;

  if (horizontal) {
    if (newRow > 9) {
      return { valid: false, message: "Out of Bounds, try again" };
    }
    for (let i = 0; i <= size; i++) {
      if (grid) {
        if (grid[index[0]][index[1] + i]) {
          if (grid[index[0]][index[1] + i].classList.contains("taken")) {
            return { valid: false, message: "Cannot place " };
          }
        }
      }
    }
  } else {
    if (newColumn > 9) {
      return { valid: false, message: "Out of Bounds, try again" };
    }

    for (let i = 0; i <= size; i++) {
      if (grid) {
        if (grid[index[0] + i][index[1]]) {
          if (grid[index[0] + i][index[1]].classList.contains("taken")) {
            return { valid: false, message: "Cannot place " };
          }
        }
      }
    }
  }

  return { valid: true, message: "" };
};

let isHorizontal = true;
let isPlayerTurn;

const Game = () => {
  let _gameId;
  let _playerGridId;
  let _enemyGridId;
  const navigate = useNavigate();

  //Game Set Up
  const [message, setMessage] = useState();
  const [isSetValid, setIsSetValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [computerShip, setComputerShip] = useState([]);
  const [playerShips, setPlayerShips] = useState([]);
  const [changeDir, setChangeDir] = useState(true); 
  const [boatState, dispatch] = useReducer(shipReducer, {
    style: "",
    boat: "",
    size: 0,
  });
  const boatRef = useRef(null);

  // Boat Movement feature
  useEffect(() => {
    User.ID = sessionStorage.getItem("userid");
    User.TOKEN = sessionStorage.getItem("token"); 
    Auth.Authorization = `Bearer ${User.TOKEN}`;

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

  const computerships = (index, isHorizontal, curboat, size) => {
    for (let i = 0; i <= size; i++) {
      if (isHorizontal) {
        shootingGrid[index[0]][index[1] + i].classList.add(curboat, "taken");
        if (i === 0) {
          shootingGrid[index[0]][index[1] + i].classList.toggle("h-head");
        } else if (i === size) {
          shootingGrid[index[0]][index[1] + i].classList.toggle("h-tail");
        }
      } else {
        shootingGrid[index[0] + i][index[1]].classList.add(curboat, "taken");
        if (i === 0) {
          shootingGrid[index[0] + i][index[1]].classList.toggle("v-head");
        } else if (i === size) {
          shootingGrid[index[0] + i][index[1]].classList.toggle("v-tail");
        }
      }
    }
    const postingEnemyBoat = async () => {
      await axios.post(
        `${import.meta.env.VITE_API}/api/Ship`,
        {
          boardId: _enemyGridId,
          type: curboat,
          length: size + 1,
          isHorizontal: isHorizontal,
          startX: index[0],
          startY: index[1],
        },
        { headers: Auth }
      );
    };

    setTimeout(() => {
      postingEnemyBoat();
    }, 100);
  };

  // Generating Grids on first render
  useEffect(() => {
    // Creating Game
    playerShipsSunk = 0;
    compShipsSunk = 0;
    isPlayerTurn = null;
    gameStart =false;
    const dateTime = new Date();
    const now = `${dateTime.getFullYear()}-${String(
      dateTime.getMonth() + 1
    ).padStart(2, "0")}-${String(dateTime.getDate()).padStart(2, "0")} ${String(
      dateTime.getHours()
    ).padStart(2, "0")}:${String(dateTime.getMinutes()).padStart(
      2,
      "0"
    )}:${String(dateTime.getSeconds()).padStart(2, "0")}`;

    const postGame = async () => {
      await axios
        .post(
          `${import.meta.env.VITE_API}/api/Game`,
          {
            userId: User.ID,
            status: false,
            playerTurn: true,
            startTime: now,
            endTime: "",
          },
          { headers: Auth }
        )
        .then((res) => {
          _gameId = res.data.id;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    postGame();

    const genrateGrids = () => {
      if (playerGridRef.current && shootingGridRef.current) {
        createGrid(playerGridRef.current, playerGrid, handlePlace);
        const postPlayerBoard = async () => {
          await axios
            .post(
              `${import.meta.env.VITE_API}/api/Board`,
              {
                gameId: _gameId,
                userId: User.ID,
                isComputerBoard: false,
              },
              { headers: Auth }
            )
            .then((res) => {
              _playerGridId = res.data.id;
            })
            .catch((err) => {
              console.log(err);
            });
        };
        postPlayerBoard();

        createGrid(shootingGridRef.current, shootingGrid, handleSelectShot);
        const postEnemyBoard = async () => {
          const res = await axios
            .post(
              `${import.meta.env.VITE_API}/api/Board`,
              {
                gameId: _gameId,
                userId: User.ID,
                isComputerBoard: true,
              },
              { headers: Auth }
            )
            .then((res) => {
              _enemyGridId = res.data.id;
            })
            .catch((err) => {
              console.log(err);
            });
        };
        postEnemyBoard();
      }
    };
    const checkIfShipExists = (index, horizontal, size) => {
      if (horizontal) {
        for (let i = 0; i < size; i++) {
          if (shootingGrid[index[0]][index[1] + i].classList.contains("taken"))
            return true;
        }
      } else {
        for (let i = 0; i < size; i++) {
          if (shootingGrid[index[0] + i][index[1]].classList.contains("taken"))
            return true;
        }
      }

      return false;
    };

    const placementJob = (x, loop, boat, _size) => {
      if (x == 1) isHorizontal = true;
      else isHorizontal = false;
      while (loop) {
        let z = randomNumberInRange(0, 9);
        let y = randomNumberInRange(0, 9);
        let curboat = boat;
        let size = _size - 1;
        let index = [z, y];
        if (
          checkPlacement(index, isHorizontal, size).valid &&
          !checkIfShipExists(index, isHorizontal, size + 1)
        ) {
          computerships(index, isHorizontal, curboat, size);
          setComputerShip([
            ...computerShip,
            {
              x: z,
              y: y,
              horizontal: isHorizontal,
            },
          ]);
          loop = false;
        } else console.log("looping");
      }
    };

    const boatPlacement = () => {
      placementJob(
        randomNumberInRange(1, 2),
        true,
        BOAT_ACTIONS.CARRIER,
        BOAT_SIZE.CARRIER
      );

      placementJob(
        randomNumberInRange(1, 2),
        true,
        BOAT_ACTIONS.BATTLESHIP,
        BOAT_SIZE.BATTLESHIP
      );

      placementJob(
        randomNumberInRange(1, 2),
        true,
        BOAT_ACTIONS.CRUISER,
        BOAT_SIZE.CRUISER
      );

      placementJob(
        randomNumberInRange(1, 2),
        true,
        BOAT_ACTIONS.SUBMARINE,
        BOAT_SIZE.SUBMARINE
      );

      placementJob(
        randomNumberInRange(1, 2),
        true,
        BOAT_ACTIONS.DESTROYER,
        BOAT_SIZE.DESTROYER
      );

      isHorizontal = true;
    };

    setTimeout(() => {
      genrateGrids();
      boatPlacement();
    }, 100);
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
    setChangeDir(true); 
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
      isPlayerTurn = true;
      setMessage("Your Turn. Click in any square in the enemy grid to shoot.");
      gameStart = true;
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

    const checked = checkPlacement(index, isHorizontal, size, playerGrid);

    if (!checked.valid) {
      setErrorMessage(checked.message);
      setIsSetValid(false);

    } else {
      boatRef.current.classList = "";
      setIsSetValid(true);
      setErrorMessage(checked.message);
      setChangeDir(false);

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

      const postingPlayerBoat = async () => {
        await axios.post(
          `${import.meta.env.VITE_API}/api/Ship`,
          {
            boardId: _playerGridId,
            type: boat,
            length: size + 1,
            isHorizontal: isHorizontal,
            startX: index[0],
            startY: index[1],
          },
          { headers: Auth }
        );
      };

      postingPlayerBoat();
    }
  };

  const postShot = async (x, y, b_id, status) => {
    await axios.post(
      `${import.meta.env.VITE_API}/api/CellFired`,
      {
        x: x,
        y: y,
        boardId: b_id,
        status: status,
      },
      {
        headers: Auth,
      }
    );
  };

  async function UpdateWinLoss(win, loss) {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API}/UpdateScore?wins=${win}&losses=${loss}`,
        {},
        { headers: Auth }
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  function CheckWin() {
    playerShipsSunk = 0;
    compShipsSunk = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (shootingGrid[i][j].classList.contains("hit")) compShipsSunk++;
        if (playerGrid[i][j].classList.contains("hit")) playerShipsSunk++;
        if (compShipsSunk == 17) playerwin = true;
        if (playerShipsSunk == 17) computerwin = true;
      }
    }
    if (playerwin) {
      console.log("player wins");
      UpdateWinLoss(1, 0);
      setTimeout(() => {alert("player wins")}, 1000); 
      setMessage("You Win!");
      compShipsSunk = 0; 
      playerShipsSunk = 0; 
      playerwin = false; 
      setTimeout(() => {navigate("/Home")}, 2000);
    }
    if (computerwin) {
      UpdateWinLoss(0, 1);
      alert("Computer wins");
      setErrorMessage("Computer Won!");
      compShipsSunk = 0; 
      playerShipsSunk = 0; 
      computerwin = false; 
      navigate("/Home");
    }
  }

  const computerfire = () => {
    let compTurn = true;
    while (compTurn) {
      let x = randomNumberInRange(0, 9);
      let y = randomNumberInRange(0, 9);
      if (
        !playerGrid[x][y].classList.contains("hit") &&
        !playerGrid[x][y].classList.contains("miss")
      ) {
        compTurn = false;
        if (
          classes.some((className) => {
            const hasClass = playerGrid[x][y].classList.contains(className);

            return hasClass;
          })
        ) {
          playerGrid[x][y].classList.toggle("hit");
          postShot(x, y, _enemyGridId, "hit");
          CheckWin();
          compTurn = true;
        } else {
          playerGrid[x][y].classList.toggle("miss");
          postShot(x, y, _enemyGridId, "miss");
        }
      }
    }

    isPlayerTurn = true;
    setMessage("Your Turn");
    setErrorMessage("");
  };

  // This will handle any shot
  const handleSelectShot = (e) => {
    while (isPlayerTurn) {
      const id = e.srcElement.dataset.id;
      const index = findIndex(shootingGrid, "data-id", id);
      if (
        !shootingGrid[index[0]][index[1]].classList.contains("hit") &&
        !shootingGrid[index[0]][index[1]].classList.contains("miss")
      ) {
        isPlayerTurn = false;

        if (
          classes.some((className) => {
            const hasClass =
              shootingGrid[index[0]][index[1]].classList.contains(className);

            return hasClass;
          })
        ) {
          shootingGrid[index[0]][index[1]].classList.toggle("hit");
          postShot(index[0], index[1], _playerGridId, "hit");
          CheckWin();
          isPlayerTurn = true;
        } else {
          shootingGrid[index[0]][index[1]].classList.toggle("miss");
          postShot(index[0], index[1], _playerGridId, "miss");
        }

        if (!isPlayerTurn) {
          setMessage("Wait...");
          setErrorMessage("Enemy Turn");
        }

        setTimeout(() => {
          if (!isPlayerTurn) {
            computerfire();
          }
        }, 1000);
        return;
      } else break;
    }
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
        </div>
        <div className="Guide-1">
          {message ? (
            <>
              <p className="message">{message}</p>
              {errorMessage && <p className="error">{errorMessage}</p>}
              {isSetValid && (
                 !gameStart && (
                  <button
                  className="set-boat"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSet();
                  }}
                >
                  Set
                </button>
                ))}
                {!gameStart && (
                  changeDir && (
                    <button
                className="set-boat"
                onClick={(e) => {
                  e.preventDefault();
                  handleRotate();
                }}
              >
                Change Direction
              </button>
              ))}
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
