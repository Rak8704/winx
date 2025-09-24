import React from "react";
import { Title } from "../../types/game";

/**
 * Utility function to get a properly formatted display name for game providers
 * @param providerName - The provider name from the Title enum or string
 * @returns Formatted provider display name
 */
export const getProviderDisplayName = (providerName: Title | string): string => {
  // Convert provider name to a more readable format
  const providerMap: Record<string, string> = {
    [Title.Evolution]: "EVOLUTION",
  [Title.NetEnt]: "NETENT",
  [Title.Pgsoft]: "PG SOFT",
  [Title.Playngo]: "PLAY'N GO",
  [Title.RedTiger]: "RED TIGER",
  [Title.Microgaming]: "MICROGAMING",
  [Title.Jili]: "JILI",
  [Title.Amatic]: "AMATIC",
  [Title.AmigoGaming]: "AMIGO GAMING",
  [Title.Apex]: "APEX",
  [Title.Apollo]: "APOLLO",
  [Title.Aristocrat]: "ARISTOCRAT",
  [Title.Bingo]: "BINGO",
  [Title.Booming]: "BOOMING",
  [Title.Egt]: "EGT",
  [Title.Firekirin]: "FIRE KIRIN",
  [Title.Goldenrace]: "GOLDEN RACE",
  [Title.Habanero]: "HABANERO",
  [Title.Igt]: "IGT",
  [Title.Kajot]: "KAJOT",
  [Title.Keno]: "KENO",
  [Title.Mancala]: "MANCALA",
  [Title.Pragmatic]: "PRAGMATIC PLAY",
  [Title.Quickspin]: "QUICKSPIN",
  [Title.Rubyplay]: "RUBY PLAY",
  [Title.Vegas]: "VEGAS",
  [Title.Wazdan]: "WAZDAN",
  [Title.Zitro]: "ZITRO",
  [Title.FastGames]: "FAST GAMES",
  [Title.SportBetting]: "SPORT BETTING",
  [Title.Ainsworth]: "AINSWORTH",
  [Title.Egaming]: "EGAMING",
  [Title.Fish]: "FISH",
  [Title.Igrosoft]: "IGROSOFT",
  [Title.Merkur]: "MERKUR",
  [Title.Novomatic]: "NOVOMATIC",
  [Title.Roulette]: "ROULETTE",
  [Title.ScientificGames]: "SCIENTIFIC GAMES",
  [Title.TableGames]: "TABLE GAMES",
  [Title.CQ9]: "CQ9",
  [Title.SexyGaming]: "SEXY GAMING",
  [Title.PlayTech]: "PLAYTECH",
  [Title.EpicWin]: "EPIC WIN",
  [Title.Rich88]: "RICH88",
  [Title.RelaxGaming]: "RELAX GAMING",
  [Title.Yggdrasil]: "YGGDRASIL",
  [Title.TurboGames]: "TURBOGAMES",
  [Title.SkyWind]: "SKYWIND",
  [Title.Hacksaw]: "HACKSAW",
  [Title.TadaGaming]: "TADA GAMING",
  [Title.BGaming]: "BGAMING",
  [Title.KM]: "KM",
  [Title.Ezugi]: "EZUGI",
  [Title.SmartSoft]: "SMARTSOFT",
  [Title.BTgaming]: "BTGAMING",
  [Title._2J]: "2J",
  [Title._5G]: "5G",
  [Title.PGSGaming]: "PGSGAMING",
  [Title.GameArt]: "GAMEART",
  [Title.OneGaming]: "ONEGAMING",
  [Title.InOut]: "INOUT",
  [Title.AG]: "AG",
  [Title.EazyGaming]: "EAZY GAMING",
  [Title.KoolBet]: "KOOLBET",
  [Title.FaChai]: "FACHAI",
  [Title.NoLimitCity]: "NOLIMITCITY",
  [Title.BigTimeGaming]: "BIG TIME GAMING",
  [Title.AStar]: "ASTAR",
  [Title.Mini]: "MINI",
  [Title.Galaxsys]: "GALAXSYS",
  [Title.Spribe]: "SPRIBE",
  [Title.V8]: "V8",
  [Title.JDBGaming]: "JDBGAMING",
  [Title.T1]: "T1",
  [Title.YeeBet]: "YEEBET",
  [Title.WonWon]: "WONWON",
  [Title.Pix]: "PIX",
  [Title.BFlottoBiit]: "BFLOTTOBIIT",
  [Title.BTI]: "BTI",
  [Title.DPESportsGaming]: "DPESPORTSGAMING",
  [Title.DPSportsGaming]: "DPSPORTSGAMING",
  [Title.DreamGaming]: "DREAMGAMING",
  [Title.LuckySportGaming]: "LUCKYSPORTGAMING",
  [Title.OnGaming]: "ONGAMING",
  };
  
  return providerMap[providerName as Title] || providerName.toString().toUpperCase();
};

/**
 * Component for displaying provider name with consistent styling
 * @param providerName - The provider name from the Title enum or string
 * @param className - Additional CSS classes
 * @returns JSX element with formatted provider name
 */
export const ProviderNameDisplay: React.FC<{
  providerName: Title | string;
  className?: string;
}> = ({ providerName, className = "" }) => {
  const displayName = getProviderDisplayName(providerName);
  
  return (
    <span className={className} title={displayName}>
      {displayName}
    </span>
  );
};