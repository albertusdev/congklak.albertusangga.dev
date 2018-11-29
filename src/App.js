import React, { useState } from "react";
import "./App.css";
import CongklakBoard from "./components/CongklakBoard";
import { DIFFICULTY } from "./logic/congklakDifficulty";
import ScoreboardList from "./components/Scoreboard";

export default function App(props) {
  const [username, setUsername] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [delay, setDelay] = useState(250);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
  const [isDifficultyChanged, setDifficultyChanged] = useState(false);
  const [isScoreboardShown, setIsScoreboardShown] = useState(false);
  const [isHowToShown, setIsHowToShown] = useState(false);

  function handleClickStartButton() {
    setIsGameStarted(!isGameStarted);
    setDifficultyChanged(true);
  }

  function handleSetDelay(e) {
    setDelay(e.target.value);
  }

  function handleDifficulty(e) {
    setDifficulty(e.currentTarget.value);
  }

  function handleSetUsername(e) {
    setUsername(e.target.value);
  }

  function toggleScoreboard() {
    if (!isHowToShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setIsScoreboardShown(!isScoreboardShown);
  }

  function toggleHowTo() {
    if (!isHowToShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setIsHowToShown(!isHowToShown);
  }

  return (
    <div className="App">
      <img
        className="congklak-ai-logo"
        src="https://i.imgur.com/dZa4gaQ.png"
        width="400"
        alt="logo-congklak.ai"
      />
      <div className="board">
        {!isGameStarted && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <h5>Choose Delay</h5>
            <input
              type="range"
              min="1"
              max="500"
              value={delay}
              onChange={handleSetDelay}
            />
            {!isDifficultyChanged && (
              <React.Fragment>
                <h5 style={{ marginTop: "1.5rem" }}>Choose Difficulty</h5>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "20rem"
                  }}
                >
                  <label>
                    <input
                      type="radio"
                      value={DIFFICULTY.EASY}
                      onChange={handleDifficulty}
                      checked={difficulty === DIFFICULTY.EASY}
                    />
                    <span>Easy</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={DIFFICULTY.MEDIUM}
                      onChange={handleDifficulty}
                      checked={difficulty === DIFFICULTY.MEDIUM}
                    />
                    <span>Medium</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={DIFFICULTY.HARD}
                      onChange={handleDifficulty}
                      checked={difficulty === DIFFICULTY.HARD}
                    />
                    <span>Hard</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={DIFFICULTY.BRUTAL}
                      onChange={handleDifficulty}
                      checked={difficulty === DIFFICULTY.BRUTAL}
                    />
                    <span>Brutal</span>
                  </label>
                </form>
              </React.Fragment>
            )}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <h5
                for="first_name"
                style={{ fontWeight: "bold", color: "black" }}
              >
                Your Name
              </h5>
              <input
                placeholder="Your Name"
                type="text"
                value={username}
                onChange={handleSetUsername}
                id="first_name"
              />
            </div>
          </div>
        )}

        <CongklakBoard
          disabled={isGameStarted}
          delay={Number.parseInt(delay)}
          difficulty={difficulty}
          name={username}
        />
      </div>

      <div className="buttondiv">
        <button className="btn start-button" onClick={handleClickStartButton}>
          {isGameStarted ? "Change Config" : "Start Game"}
        </button>
        <button className="btn orange lighten-2" onClick={toggleScoreboard}>
          See Scoreboard
        </button>
        <button className="btn" onClick={toggleHowTo}>
          How to Play
        </button>
      </div>

      {isScoreboardShown && <ScoreboardList toggle={toggleScoreboard} />}

      {isHowToShown && (
        <div className="how-to-wrapper">
          <div className="how-to-modal-wrapper" onClick={toggleHowTo} />
          <div className="card how-to-card-wrapper">
            <div className="card-content">
              <h3 className="card-content-title">How To Play</h3>
              <ol>
                <li>
                  Player chooses one of the seven holes on their side, which is
                  bottom side. There is no time limit for player on each turn to
                  choose the hole.
                </li>
                <li>
                  Automatically the seeds in the hole will be inserted one by
                  one into each small hole and large hole on the right side of
                  the board with a counter-clockwise movement.
                </li>
                <li>
                  If the last seed drops in the hole on the player's side
                  (bottom side) and the hole is not empty, then all the seeds in
                  the hole are automatically taken and the game will repeat step
                  (2).
                </li>
                <li>
                  If the last seed drops in the hole on the player's side
                  (bottom side) and the hole is empty, then automatically all
                  seeds in the opposite hole (opponent's side) will be inserted
                  into the player's large hole (right side). Then the player's
                  turn has finished and then it is the turn of the bot.
                </li>
                <li>
                  If the last seed enters the player's large hole (right side),
                  the player can continue the game by repeating step (1).
                </li>
                <li>
                  If the last seed enters the opponent's side (upper side), then
                  the player's turn has finished and then it is the turn of the
                  bot.
                </li>
                <li>
                  The game ends when there is no longer any seeds in small
                  holes. The player who manages to collect the most seeds is the
                  winner.
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
