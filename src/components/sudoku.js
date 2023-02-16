import React, { useState } from "react";

export default function Sudoku() {
  const [board, setBoard] = useState([
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0],
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  function handleCellChange(row, col, value) {
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  }

  const checkZero = (num) => {
    return num > 0;
  };

  function handleCheckAnswers() {
    // Checking rows
    for (let i = 0; i < 9; i++) {
      const row = board[i];
      const toFindDuplicates = (row) =>
        row.filter((item, index) => row.indexOf(item) !== index);
      let checkRow = toFindDuplicates(row).filter(checkZero);
      if (checkRow.length > 0) {
        setErrorMessage("Error: Duplicate numbers in row " + (i + 1));
        return;
      }
    }

    // Checking columns
    for (let i = 0; i < 9; i++) {
      const column = board.map((row) => row[i]);
      const toFindDuplicates = (column) =>
        column.filter((item, index) => column.indexOf(item) !== index);
      let checkColumn = toFindDuplicates(column).filter(checkZero);
      if (checkColumn.length > 0) {
        setErrorMessage("Error: Duplicate numbers in column " + (i + 1));
        return;
      }
    }

    // Checking 3x3 subgrids
    for (let i = 0; i < 9; i++) {
      const subgrid = [];
      const rowStart = Math.floor(i / 3) * 3;
      const colStart = (i % 3) * 3;
      for (let j = 0; j < 9; j++) {
        const row = rowStart + Math.floor(j / 3);
        const col = colStart + (j % 3);
        subgrid.push(board[row][col]);
      }

      const toFindDuplicates = (subgrid) =>
        subgrid.filter((item, index) => subgrid.indexOf(item) !== index);
      let checkSubgrid = toFindDuplicates(subgrid).filter(checkZero);
      if (checkSubgrid.length > 0) {
        setErrorMessage("Error: Duplicate numbers in subgrid " + (i + 1));
        return;
      }
    }

    // Checking if board is completed
    const flatBoard = board.flat();
    if (!flatBoard.includes(0)) {
      setErrorMessage("Completed!");
    } else {
      setErrorMessage("");
    }
  }

  // Rendering the sudoku board
  return (
    <div id="Sudoku">
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    min={1}
                    max={9}
                    value={cell || ""}
                    onChange={(event) =>
                      handleCellChange(
                        rowIndex,
                        colIndex,
                        parseInt(event.target.value, 10)
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCheckAnswers}>Check answers</button>
      <div>{errorMessage}</div>
    </div>
  );
}
