import React, { useState } from "react";
import "./App.css";
import { AddPlayer } from "./AddPlayer";
import { Player } from "./Player";
import { PlayersList } from "./PlayersList";
import { isPlayerSelected } from "./IsPlayerSelected";

const PlayerMatch = (props: { selectedPlayers: Player[] }) => {
  const { selectedPlayers } = props;

  const PlayerCard = (props: { player?: Player }) => {
    const { player } = props;

    if (!player) {
      return <div className="box"> ? </div>;
    }

    return (
      <div className="box">
        <p>
          {player.name} <strong>{player.elo}</strong>
        </p>
        <button className="button is-warning is-large mt-2" ><strong>{player.name}</strong>&nbsp; Win !</button>
      </div>
    );
  };

  if (selectedPlayers.length === 0) {
    return null;
  }

  return (
    <div className="columns is-mobile has-text-centered is-vcentered">
      <div className="column is-size-2">
        <PlayerCard player={selectedPlayers[0]} />
      </div>
      <div className="column is-size-1 is-one-fifth">VS</div>
      <div className="column is-size-2">
        <PlayerCard player={selectedPlayers[1]} />
      </div>
    </div>
  );
};

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const addPlayer = (player: Player) => {
    const existingPlayerName = players.some((p) => p.name === player.name);
    if (!existingPlayerName) {
      setPlayers([...players, player]);
    }
  };

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const onPlayerClick = (player: Player) => {
    if (isPlayerSelected(player, selectedPlayers)) {
      setSelectedPlayers(
        selectedPlayers.filter((sp) => sp.name !== player.name)
      );
    } else {
      if (selectedPlayers.length < 2) {
        setSelectedPlayers([...selectedPlayers, player]);
      } else {
        setSelectedPlayers([selectedPlayers[0], player]);
      }
    }
  };
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Elo Billard</h1>
          <p className="subtitle">
            C'est pas une compétition mais quand même...
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PlayerMatch selectedPlayers={selectedPlayers} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PlayersList
            players={players}
            onPlayerClick={onPlayerClick}
            selectedPlayers={selectedPlayers}
          />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <AddPlayer onAddPlayer={addPlayer} />
        </div>
      </section>
    </>
  );
}

export default App;
