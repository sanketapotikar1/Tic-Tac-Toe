import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export function TicTacToe() {
  return (
    <h1>
      Fun Game
      <Board />
    </h1>
  );
}

function Board() {
  const { width, height } = useWindowSize();

  const Initial_Board = [null, null, null, null, null, null, null, null, null];
  const [board, setBoard] = useState(Initial_Board);

  const decideWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        console.log("Winner :", board[a]);
        return board[a];
      }
    }
    return null;
  };

  const Winner = decideWinner(board);

  const [Xturn, setXturn] = useState(true);

  const handleClick = (index) => {
    console.log(index);
    //Allow update untouched boxes (null means untouched)
    // If there is no winnner and untouched then update.
    if (!board[index] && !Winner) {
      const boardcopy = [...board];
      boardcopy[index] = Xturn ? "X" : "O";
      // change the turn
      setXturn(!Xturn);
      setBoard(boardcopy);
    }
  };

  const restart = () => {
    setBoard(Initial_Board);
    setXturn(true);
  };
  return (
    <div>
      <div className="board">
        
        {board.map((val, index) => (
          <GameBox val={val} onPlayerClick={() => handleClick(index)} />
        ))}
      </div>
      { Winner  ? <h2>Winner is : {Winner}</h2> : null}
      { Winner  ? <Confetti width={width} height={height} gravity={0.05}/> : null}
      <button onClick={restart}>Restart</button>
    </div>
  );
}

function GameBox({ val, onPlayerClick }) {
  // const [val, setVal] = useState("");

  const styles = {
    color: val === "X" ? "green" : "red",
  };
  return (
    <div
      // onClick={() => setVal(val == "X" ? "O" : "X")}

      onClick={onPlayerClick}
      style={styles}
      className="game-box"
    >
      {val}
    </div>
  );
}
