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

  /**
   * @see https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/
   */
  computeScore(): ComputedEloScore {
    if (
      this.firstPlayerEloScore === undefined ||
      this.secondPlayerEloScore === undefined
    ) {
      throw new Error(
        "Cannot compute Elo score without giving both players initial score"
      );
    }

    const r1 = Math.pow(10, this.firstPlayerEloScore / 400);
    const r2 = Math.pow(10, this.secondPlayerEloScore / 400);
    const probabilityFirstPlayerWin = r1 / (r1 + r2);
    const probabilitySecondPlayerWin = r2 / (r2 + r1);
    const s1 = this.playerNumberWhoWon === 1 ? 1 : 0;
    const s2 = this.playerNumberWhoWon === 2 ? 1 : 0;

    const newFirstPlayerScore =
      this.firstPlayerEloScore +
      this.kFactor * (s1 - probabilityFirstPlayerWin);
    const newSecondPlayerScore =
      this.secondPlayerEloScore +
      this.kFactor * (s2 - probabilitySecondPlayerWin);

    return {
      eloPlayerOne: +newFirstPlayerScore.toFixed(1),
      eloPlayerTwo: +newSecondPlayerScore.toFixed(1),
    };
  }
}
