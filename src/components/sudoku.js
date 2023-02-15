import React, { useState } from "react";

export default function Sudoku() {
  const [board, setBoard] = useState([
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  function handleCellChange(row, col, value) {
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  }

  function handleCheckAnswers() {
    // Check rows
    for (let i = 0; i < 9; i++) {
      const row = board[i];
      const uniqueRow = new Set(row);
      console.log(uniqueRow);
      if (row.includes(null)) {
        setErrorMessage("Error: finish the row " + (i + 1));
        return;
      }
      else if (uniqueRow.size !== 9) {
        setErrorMessage("Error: Duplicate numbers in row " + (i + 1));
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 9; i++) {
      const column = board.map((row) => row[i]);
      const uniqueColumn = new Set(column);
      if (column.includes(null)) {
        setErrorMessage("Error: finish the column " + (i + 1));
        return;
      }
      else if (uniqueColumn.size !== 9) {
        setErrorMessage("Error: Duplicate numbers in column " + (i + 1));
        return;
      }
    }

    // Check 3x3 subgrids
    for (let i = 0; i < 9; i++) {
      const subgrid = [];
      const rowStart = Math.floor(i / 3) * 3;
      const colStart = (i % 3) * 3;
      for (let j = 0; j < 9; j++) {
        const row = rowStart + Math.floor(j / 3);
        const col = colStart + (j % 3);
        subgrid.push(board[row][col]);
      }
      const uniqueSubgrid = new Set(subgrid);
      if (subgrid.includes(null)) {
        setErrorMessage("Error: finish the subgrid " + (i + 1));
        return;
      }
      else if (uniqueSubgrid.size !== 9) {
        setErrorMessage("Error: Duplicate numbers in subgrid " + (i + 1));
        return;
      }
    }
  }

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
