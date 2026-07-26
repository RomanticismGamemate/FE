const GAME_LOGO_FILES = {
  lol: "lol.png",
  valorant: "valorant.png",
  overwatch2: "overwatch2.png",
  pubg: "pubg.png",
  lostark: "lostark.png",
  minecraft: "minecraft.png",
};

export const hasGameLogo = (slug) => Boolean(GAME_LOGO_FILES[slug]);

export const getGameLogoSrc = (slug) => {
  const fileName = GAME_LOGO_FILES[slug];
  if (!fileName) return null;

  return `${process.env.PUBLIC_URL}/images/gamelogos/${fileName}`;
};
