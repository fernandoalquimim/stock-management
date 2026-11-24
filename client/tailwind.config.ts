import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

const baseColors = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

const shadeMapping = {
  "50": "950",
  "100": "900",
  "200": "800",
  "300": "700",
  "400": "600",
  "500": "500",
  "600": "400",
  "700": "300",
  "800": "200",
  "900": "100",
  "950": "50",
} as const;

type BaseColor = (typeof baseColors)[number];
type ShadeKey = keyof typeof shadeMapping;
type ThemeObject = Record<BaseColor, Record<ShadeKey, string>>;

const generateThemeObject = (
  palette: typeof colors,
  shadesMap: typeof shadeMapping,
  invert = false,
): ThemeObject => {
  const theme = {} as ThemeObject;

  baseColors.forEach((color) => {
    const colorTheme = {} as Record<ShadeKey, string>;

    (Object.keys(shadesMap) as ShadeKey[]).forEach((key) => {
      const shadeKey: ShadeKey = invert ? shadesMap[key] : key;
      colorTheme[key] = palette[color][shadeKey];
    });

    theme[color] = colorTheme;
  });

  return theme;
};

const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: { ...lightTheme, white: "#ffffff" },
  dark: { ...darkTheme, white: colors.gray["950"], black: colors.gray["50"] },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    createThemes(themes),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".flex-between-center": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      });
    }),
  ],
};
export default config;
