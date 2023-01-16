import { ComputedEloScore, EloScoreBuilder } from "./EloScoreBuilder";

describe("EloScoreBuilder", () => {
  it("well compute known elos", () => {
    const score = EloScoreBuilder.anEloScore()
      .withFirstPlayerEloScore(1800)
      .withSecondPlayerEloScore(2500)
      .whereFirstPlayerWon()
      .withKFactor(30)
      .computeScore();

    expect(score).toEqual<ComputedEloScore>({
      eloPlayerOne: 1829.5,
      eloPlayerTwo: 2470.5,
    });
  });

  it("starting Elo", () => {
    const score = EloScoreBuilder.anEloScore()
      .withFirstPlayerEloScore(1000)
      .withSecondPlayerEloScore(1000)
      .whereSecondPlayerWon()
      .withKFactor(30)
      .computeScore();

    expect(score).toEqual<ComputedEloScore>({
      eloPlayerOne: 985,
      eloPlayerTwo: 1015,
    });
  });

  it("A strong player win against a bad player", () => {
    const score = EloScoreBuilder.anEloScore()
      .withFirstPlayerEloScore(2000)
      .withSecondPlayerEloScore(1000)
      .whereFirstPlayerWon()
      .withKFactor(30)
      .computeScore();

    expect(score).toEqual<ComputedEloScore>({
      eloPlayerOne: 2000.1,
      eloPlayerTwo: 999.9,
    });
  })

  it("A bad player win against a strong player", () => {
    const score = EloScoreBuilder.anEloScore()
      .withFirstPlayerEloScore(2000)
      .withSecondPlayerEloScore(1000)
      .whereSecondPlayerWon()
      .withKFactor(30)
      .computeScore();

    expect(score).toEqual<ComputedEloScore>({
      eloPlayerOne: 1970.1,
      eloPlayerTwo: 1029.9,
    });
  })
});


