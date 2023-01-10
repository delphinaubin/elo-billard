import React, {useEffect, useState} from "react";
import "./App.css";
import {AddPlayer} from "./AddPlayer";
import {Player, PlayerWithRanking} from "./Player";
import {PlayersList} from "./PlayersList";
import {isPlayerSelected} from "./IsPlayerSelected";
import {PlayerMatch} from "./PlayerMatch";

const LOCAL_STORAGE_PLAYERS_KEY = "players";
const INITIAL_PLAYER_STATE: PlayerWithRanking[] = [];
function App() {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYER_STATE);
  const addPlayer = (player: Player) => {
    const existingPlayerName = players.some((p) => p.name === player.name);
    if (!existingPlayerName) {
      setPlayers([...players, player]);
    }
  };

  const [selectedPlayers, setSelectedPlayers] =
    useState<PlayerWithRanking[]>(INITIAL_PLAYER_STATE);

  useEffect(() => {
    if (players !== INITIAL_PLAYER_STATE) {
      localStorage.setItem(LOCAL_STORAGE_PLAYERS_KEY, JSON.stringify(players));
    }
  }, [players]);

  useEffect(() => {
    const jsonPlayersInLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_PLAYERS_KEY
    );
    if (jsonPlayersInLocalStorage) {
      setPlayers(JSON.parse(jsonPlayersInLocalStorage));
    }
  }, []);

  const onPlayerClick = (player: PlayerWithRanking) => {
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

  const changePlayersScore = (playersWhoPlayed: [Player, Player]) => {
    const [firstPlayer, secondPlayer] = playersWhoPlayed;
    setPlayers(
      players.map((p): Player => {
        if (p.name === firstPlayer.name) {
          return firstPlayer;
        }
        if (p.name === secondPlayer.name) {
          return secondPlayer;
        }
        return p;
      })
    );
    setSelectedPlayers([]);
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
      <section className="section pt-0 pb-0">
        <div className="container">
          <PlayerMatch
            selectedPlayers={selectedPlayers}
            onPlayerScoreChange={changePlayersScore}
          />
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
