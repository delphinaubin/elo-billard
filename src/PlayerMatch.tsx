import { Player } from "./Player";
import React from "react";
import { EloScoreBuilder } from "./EloScoreBuilder";

const PlayerCard = (props: { player?: Player; onWinCLick: () => void, isWinButtonActive: boolean }) => {
  const { player, onWinCLick, isWinButtonActive } = props;

  if (!player) {
    return <div className="box"> ? </div>;
  }

  return (
    <div className="box">
      <p>
        {player.name} <strong>{player.elo.toFixed(2)}</strong>
      </p>
      <button onClick={onWinCLick} className="button is-warning is-large mt-2" disabled={!isWinButtonActive}>
        <strong>{player.name}</strong>&nbsp; gagne !
      </button>
    </div>
  );
};

export const PlayerMatch = (props: {
  selectedPlayers: Player[];
  onPlayerScoreChange: (players: [Player, Player]) => void;
}) => {
  const { selectedPlayers, onPlayerScoreChange } = props;

  if (selectedPlayers.length === 0) {
    return <h1 className="subtitle is-center has-text-info is-size-3">Sélectionne deux joueurs pour une partie !</h1> ;
  }

  const playerWin = (playerWhoWon: 1 | 2) => () => {
    const computedScore = EloScoreBuilder.anEloScore()
      .withFirstPlayerEloScore(selectedPlayers[0].elo)
      .withSecondPlayerEloScore(selectedPlayers[1].elo)
      .withWinningPlayerNumber(playerWhoWon)
      .computeScore();

    onPlayerScoreChange([
      {
        ...selectedPlayers[0],
        elo: computedScore.eloPlayerOne,
      },
      {
        ...selectedPlayers[1],
        elo: computedScore.eloPlayerTwo,
      },
    ]);
  };

  const isWinButtonActive = selectedPlayers.length === 2;

  return (
    <div className="columns is-mobile has-text-centered is-vcentered">
      <div className="column is-size-2">
        <PlayerCard
          player={selectedPlayers[0]}
          onWinCLick={playerWin(1)}
          isWinButtonActive={isWinButtonActive}
        />
      </div>
      <div className="column is-size-1 is-one-fifth">VS</div>
      <div className="column is-size-2">
        <PlayerCard
          player={selectedPlayers[1]}
          onWinCLick={playerWin(2)}
          isWinButtonActive={isWinButtonActive}
        />
      </div>
    </div>
  );
};
