import type colors from '@kuda-terbang/design-token-example/json/color';

type JsonColors = typeof colors;

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
