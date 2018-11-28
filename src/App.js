import React, { useState, useEffect } from "react";
import "./App.css";
import CongklakBoard from "./components/CongklakBoard";
import { DIFFICULTY } from "./logic/congklakDifficulty";

export default function App(props) {
  const [userName, setUserName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [delay, setDelay] = useState(250);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);

  useEffect(() => {
    document.title = "Congklak.AI";
  });

  function handleClickStartButton() {
    setIsGameStarted(!isGameStarted);
  }

  function handleSetDelay(e) {
    setDelay(e.target.value);
  }

  function handleDifficulty(e) {
    setDifficulty(e.currentTarget.value);
  }

  return (
    <div className="App">
      <img
        src="https://i.imgur.com/dZa4gaQ.png"
        width="400"
        alt="logo-congklak.ai"
      />
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
          <h5 style={{ marginTop: "1.5rem" }}>Choose Congklak.AI Difficulty</h5>
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
          </form>
        </div>
      )}

      <div />

      <CongklakBoard
        disabled={isGameStarted}
        delay={Number.parseInt(delay)}
        difficulty={difficulty}
      />

      <button className="btn start-button" onClick={handleClickStartButton}>
        {isGameStarted ? "Change Config" : "Start Game"}
      </button>
      <div className="how-to">
        <div className="ht-clicker" tabIndex="1">
          <h3>Cara Bermain</h3>
        </div>
        <div className="ht-hiddendiv">
          <ol>
            <li>
              Pemain memilih satu lubang pada sisi milik pemain, yaitu sisi
              bawah. Tidak ada batasan waktu untuk ​pemain ​pada setiap ​giliran
              ​untuk memilih lubang.
            </li>
            <li>
              Secara otomatis biji pada lubang tersebut akan dimasukkan
              satu-persatu ke setiap lubang kecil dan lubang besar di sisi kanan
              papan dengan pergerakan berlawanan arah jarum jam.
            </li>
            <li>
              Jika biji terakhir jatuh pada lubang di sisi milik pemain (sisi
              bawah) dan lubang tersebut tidak kosong, maka secara otomatis
              semua biji yang ada di lubang tersebut diambil dan selanjutnya
              permainan akan mengulangi langkah (2).
            </li>
            <li>
              Jika biji terakhir jatuh pada lubang di sisi pemain (sisi bawah)
              dan lubang tersebut kosong, maka secara otomatis semua biji yang
              ada pada lubang di seberangnya (sisi lawan) akan dimasukkan ke
              lubang besar milik pemain (sisi kanan). Kemudian giliran pemain
              telah selesai dan selanjutnya adalah giliran dari bot.
            </li>
            <li>
              Jika biji terakhir masuk pada lubang besar milik pemain (sisi
              kanan), maka pemain dapat melanjutkan permainan dengan mengulangi
              langkah (1).
            </li>
            <li>
              Jika biji terakhir masuk pada sisi milik lawan (sisi atas), maka
              giliran pemain telah selesai dan selanjutnya adalah giliran dari
              bot.
            </li>
            <li>
              Pemenang permainan adalah yang memiliki biji paling banyak pada
              lubang besar miliknya.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
