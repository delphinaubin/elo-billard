export type Player = {
  name: string,
  elo: number
}

export type PlayerWithRanking = Player & { ranking: number}