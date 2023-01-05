import React, { useState } from "react";
import { Player } from "./Player";

const INITIAL_ELO = 1_000;
export const AddPlayer = (props: { onAddPlayer: (player: Player) => void }) => {
  const { onAddPlayer } = props;

  const [playerName, setPlayerName] = useState("");
  let addPlayer = () => {
    onAddPlayer({
      name: playerName,
      elo: INITIAL_ELO,
    });
    setPlayerName("");
  };
  return (
    <>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Ajouter un joueur</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    addPlayer();
                  }
                }}
              />
            </p>
            <button
              onClick={addPlayer}
              className="button is-primary"
              style={{ marginTop: "1rem", width: "100%" }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
