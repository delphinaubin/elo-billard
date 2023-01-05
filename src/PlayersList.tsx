import {Player} from "./Player";
import React from "react";
import classNames from "classnames";
import {isPlayerSelected} from "./IsPlayerSelected";

const PlayerListItem = (props: {
  player: Player;
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
      {player.name} <strong>{player.elo.toFixed(2)}</strong>
    </div>
  );
};

export const PlayersList = (props: {
  players: Player[];
  selectedPlayers: Player[];
  onPlayerClick: (clickedPlayer: Player) => void;
}) => {
  const { players, selectedPlayers, onPlayerClick } = props;

  return (
    <>
      {players.map((player) => {
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
