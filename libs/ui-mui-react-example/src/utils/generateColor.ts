import type { json } from '@kuda-terbang/design-token-example';

type JsonColors = typeof json.color;

export default (jsonColors: JsonColors) => {
  const muiPaletteColor: Record<string, unknown> = {};
  const lightColor = jsonColors.color.m3.sys.light;
  const darkColor = jsonColors.color.m3.sys.dark;
  Object.keys(lightColor).forEach((key) => {
    const keyDarkColor = key as keyof typeof darkColor;
    const keyLightColor = key as keyof typeof darkColor;
    muiPaletteColor[key] = {
      dark: darkColor[keyDarkColor],
      light: lightColor[keyLightColor],
      main: lightColor[keyLightColor],
    };
  });
  return muiPaletteColor;
};
