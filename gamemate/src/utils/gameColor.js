const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "").trim();
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    return null;
  }

  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
};

const rgbToHsl = ({ r, g, b }) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === red) {
      hue = ((green - blue) / delta) % 6;
    } else if (max === green) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }
  }

  hue = Math.round((hue * 60 + 360) % 360);
  const lightness = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return {
    h: hue,
    s: saturation * 100,
    l: lightness * 100,
  };
};

const hslToHex = ({ h, s, l }) => {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const match = lightness - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (h < 60) {
    red = chroma;
    green = x;
  } else if (h < 120) {
    red = x;
    green = chroma;
  } else if (h < 180) {
    green = chroma;
    blue = x;
  } else if (h < 240) {
    green = x;
    blue = chroma;
  } else if (h < 300) {
    red = x;
    blue = chroma;
  } else {
    red = chroma;
    blue = x;
  }

  const toHex = (value) =>
    Math.round((value + match) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
};

const seedFromId = (id) => {
  const text = String(id ?? "");
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }

  return hash;
};

/**
 * 게임 기본색에서 채도/명도를 방 id 기준으로 약간 변형합니다.
 * 같은 방은 항상 같은 색이 나오고, 방마다 조금씩 달라집니다.
 */
export const getVariedGameColor = (baseColor, seedSource) => {
  const fallback = "#d9d9d9";
  const rgb = hexToRgb(baseColor || fallback);

  if (!rgb) {
    return fallback;
  }

  const { h, s, l } = rgbToHsl(rgb);
  const seed = seedFromId(seedSource);
  const saturationOffset = (seed % 21) - 10; // -10 ~ +10
  const lightnessOffset = ((seed >> 5) % 17) - 8; // -8 ~ +8

  return hslToHex({
    h,
    s: clamp(s + saturationOffset, 25, 90),
    l: clamp(l + lightnessOffset, 28, 72),
  });
};
