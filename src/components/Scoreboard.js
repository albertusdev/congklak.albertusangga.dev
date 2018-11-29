import React, { useState, useEffect } from "react";
import axios from "axios";
import { DASHBOARD_URL } from "../urls";

export default function ScoreboardList(props) {
  const [easy, setEasy] = useState([]);
  const [medium, setMedium] = useState([]);
  const [hard, setHard] = useState([]);
  const [brutal, setBrutal] = useState([]);

  const queryDifficulty = difficulty => `?difficulty=${difficulty}`;

  useEffect(async () => {
    const easy = await axios(DASHBOARD_URL + queryDifficulty("EASY"));
    const medium = await axios(DASHBOARD_URL + queryDifficulty("MEDIUM"));
    const hard = await axios(DASHBOARD_URL + queryDifficulty("HARD"));
    const brutal = await axios(DASHBOARD_URL + queryDifficulty("BRUTAL"));

    setEasy(easy);
    setMedium(medium);
    setHard(hard);
    setBrutal(brutal);

    console.log("Easy", easy);
    console.log("Medium", medium);
    console.log("Hard", hard);
    console.log("Brutal", brutal);
  });

  return (
    <div>
      {easy.map(scoreboard => (
        <pre>
          <code>{JSON.stringify(scoreboard, 2, 2)}</code>
        </pre>
      ))}
      {medium.map(scoreboard => (
        <pre>
          <code>{JSON.stringify(scoreboard, 2, 2)}</code>
        </pre>
      ))}
      {hard.map(scoreboard => (
        <pre>
          <code>{JSON.stringify(scoreboard, 2, 2)}</code>
        </pre>
      ))}
      {brutal.map(scoreboard => (
        <pre>
          <code>{JSON.stringify(scoreboard, 2, 2)}</code>
        </pre>
      ))}
    </div>
  );
}
