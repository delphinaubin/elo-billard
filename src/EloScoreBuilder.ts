export interface ComputedEloScore {
  eloPlayerOne: number;
  eloPlayerTwo: number;
}

export class EloScoreBuilder {
  private constructor() {}

  static anEloScore(): EloScoreBuilder {
    return new EloScoreBuilder();
  }

  private firstPlayerEloScore?: number;
  private secondPlayerEloScore?: number;
  private playerNumberWhoWon: 1 | 2 = 1;
  private kFactor = 32;

  withFirstPlayerEloScore(firstPlayerEloScore: number): this {
    this.firstPlayerEloScore = firstPlayerEloScore;
    return this;
  }

  withSecondPlayerEloScore(secondPlayerEloScore: number): this {
    this.secondPlayerEloScore = secondPlayerEloScore;
    return this;
  }

  withWinningPlayerNumber(winningPlayerNumber: 1 | 2): this {
    this.playerNumberWhoWon = winningPlayerNumber;
    return this;
  }

  whereFirstPlayerWon(): this {
    this.playerNumberWhoWon = 1;
    return this;
  }

  whereSecondPlayerWon(): this {
    this.playerNumberWhoWon = 2;
    return this;
  }

  withKFactor(k: number): this {
    this.kFactor = k;
    return this;
  }

  computeScore(): ComputedEloScore {
    if (
      this.firstPlayerEloScore === undefined ||
      this.secondPlayerEloScore === undefined
    ) {
      throw new Error(
        "Cannot compute Elo score without giving both players initial score"
      );
    }

    const scoreDelta = +(
      this.kFactor *
      (1 /
        (1 +
          Math.pow(
            10,
            (this.firstPlayerEloScore - this.secondPlayerEloScore) / 400
          )))
    ).toFixed(1);

    if (this.playerNumberWhoWon === 1) {
      return {
        eloPlayerOne: this.firstPlayerEloScore + scoreDelta,
        eloPlayerTwo: this.secondPlayerEloScore - scoreDelta,
      };
    } else {
      return {
        eloPlayerOne: this.firstPlayerEloScore - scoreDelta,
        eloPlayerTwo: this.secondPlayerEloScore + scoreDelta,
      };
    }
  }
}
