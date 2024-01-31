/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    screens: {},
    height: {
      148: "300px",
      149: "324px",
      150: "300px",
      151: "400px",
      152: "500px",
      153: "600px",
      154: "640px",
    },
    width: {
      149: "324px",
      150: "300px",
      151: "400px",
      152: "500px",
      153: "600px",
      154: "640px",
    },
    colors: {
      bodyColor: "#EBF2F7",
      bgcolor: "rgb(235, 242, 247)",

      primery: "#0d084d",
      secondery: "#0d084d",
      buttonColor: "#1dbf73",
      brandColor: "#bf4800",
      titleColor: "#1c1c1b",
    },
    flex: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
    },
    padding: {},
    grid: {},
  },

  fontFamily: {
    popins: ["Poppins", "sans - serif"],
  },
};
export const plugins = [];
