import React from "react";

export function getIconForRanking(ranking: number): string {
  switch (true) {
    case ranking === 1: {
      return "🏆";
    }
    case ranking === 2: {
      return "🥈";
    }
    case ranking === 3: {
      return "🥉";
    }
    default: {
      return "";
    }
  }
}

export const RankingIcon = (props: { ranking: number }) => {
  const { ranking } = props;
  return (
    <em style={{ fontStyle: "normal" }} className="is-size-3 mr-4">
      {getIconForRanking(ranking)}
    </em>
  );
};
