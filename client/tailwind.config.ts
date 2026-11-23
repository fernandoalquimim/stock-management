import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
] as const;

const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
} as const;

type BaseColor = (typeof baseColors)[number];
type Shade = keyof typeof shadeMapping;
type ThemeObject = Record<BaseColor, Record<Shade, string>>;

const generateThemeObject = (
  palette: typeof colors,
  mapping: typeof shadeMapping,
  invert = false,
): ThemeObject => {
  const theme = {} as ThemeObject;
  baseColors.forEach((color) => {
    const colorTheme = {} as Record<Shade, string>;
    (Object.keys(mapping) as Shade[]).forEach((key) => {
      const shadeKey: Shade = invert ? mapping[key] : key;
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
  plugins: [createThemes(themes)],
};
export default config;
