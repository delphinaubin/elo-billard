import {Player} from "./Player";

export function isPlayerSelected(player: Player, selectedPlayers: Player[]) {
  return selectedPlayers.some((sp) => sp.name === player.name);
}