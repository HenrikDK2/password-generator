import { createStitches, globalCss } from "@stitches/react";

export const { styled } = createStitches({
  theme: {
    colors: {
      "green-1": "#a4ffaf",
      "green-2": "#b1faba",
      "dark-1": "#16151d",
      "white-1": "#f5f4fc",
      "grey-1": "#24232b",
      "grey-2": "#7b7a87",
    },
  },
  media: {
    desktop: "(min-width: 500px)",
  },
});

export const globalStyles = globalCss({
  body: { fontFamily: "Poppins", backgroundColor: "#131218", color: "#edecf4" },
});
