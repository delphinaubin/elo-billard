import { Player, PlayerWithRanking } from "./Player";
import React from "react";
import classNames from "classnames";
import { isPlayerSelected } from "./IsPlayerSelected";
import { RankingIcon } from "./RankingIcon";

const PlayerListItem = (props: {
  player: PlayerWithRanking;
  click: () => void;
  isSelected: boolean;
}) => {
  const { player, click, isSelected } = props;
  return (
    <div
      onClick={click}
      className={classNames(
        {
          "has-background-primary": isSelected,
        },
        "box"
      )}
    >
      <span className="icon">
        <RankingIcon ranking={player.ranking} />
      </span>
      {player.name} <strong>{player.elo.toFixed(2)}</strong>
    </div>
  );
};

export const PlayersList = (props: {
  players: Player[];
  selectedPlayers: Player[];
  onPlayerClick: (clickedPlayer: PlayerWithRanking) => void;
}) => {
  const { players, selectedPlayers, onPlayerClick } = props;

  return (
    <>
      {getSortedPlayersWithRanking(players).map((player) => {
        return (
          <PlayerListItem
            player={player}
            key={player.name}
            isSelected={isPlayerSelected(player, selectedPlayers)}
            click={() => {
              onPlayerClick(player);
            }}
          />
        );
      })}
    </>
  );
};

function getSortedPlayersWithRanking(players: Player[]): PlayerWithRanking[] {
  return players
    .sort((a, b) => b.elo - a.elo)
    .map((player, index) => ({
      ...player,
      ranking: index + 1,
    }));
}
