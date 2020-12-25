import { Platform } from "react-native";

const button = {
  textAlign: "center",
  textAlignVertical: "center",
  color: "white",
  lineHeight: 20,
  borderRadius: 5,
  padding: 10,
};

const colors = {
  primary: "#0366d6",
  error: "#d73a4a",
  cardBackground: "#e1e4e8",
  textPrimary: "#24292e",
  textSecondary: "#586069",
};

const fontSizes = {
  body: 14,
  subheading: 16,
};

const fonts = {
  main: Platform.select({
    android: "Roboto",
    ios: "Arial",
    default: "System",
  }),
};

const fontWeights = {
  normal: "400",
  bold: "700",
};

const margins = {
  standard: 20,
};

const theme = {
  colors,
  fontSizes,
  fonts,
  fontWeights,
  primaryButton: { ...button, backgroundColor: colors.primary },
  errorButton: { ...button, backgroundColor: colors.error },
  margins,
};

export default theme;
