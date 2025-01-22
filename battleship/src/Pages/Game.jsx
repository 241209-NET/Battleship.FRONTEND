import { useEffect, useRef } from "react";
import "./css/Game.css";

const Game = () => {
  const gridSize = 10;
  const playerGrid = Array.from({ length: gridSize }, () =>
    new Array(gridSize).fill(0)
  );
  const shootingGrid = Array.from({ length: gridSize }, () =>
    new Array(gridSize).fill(0)
  );
  const playerGridRef = useRef(null);
  const shootingGridRef = useRef(null);

  const createGrid = (gridElement, grid) => {
    let id = 1;
    grid.forEach((row) => {
      row.forEach((element) => {
        const square = document.createElement("div");
        square.dataset.id = id;
        id++;
        gridElement.appendChild(square);
        element = square;
      });
    });
  };

  useEffect(() => {
    const genrateGrids = () => {
      if (playerGridRef.current && shootingGridRef.current) {
        createGrid(playerGridRef.current, playerGrid);
        createGrid(shootingGridRef.current, shootingGrid);
      }
    };

    genrateGrids();
  }, []);

  return (
    <>
      <div className="container-1">
        <div className="grids">
          <div className="battleship-grid player-grid" ref={playerGridRef}></div>
          <div className="battleship-grid shooting-grid" ref={shootingGridRef}></div>
        </div>
        <div className="actions">
          <button className="shoot">Shoot</button>
        </div>
      </div>
    </>
  );
};

export default Game;
