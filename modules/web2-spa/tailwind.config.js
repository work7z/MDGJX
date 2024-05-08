const colors = require("tailwindcss/colors");
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

const toRgba = (hexCode, opacity = 50) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

const flattenColorPalette = (obj, sep = "-") =>
  Object.assign(
    {},
    ...(function _flatten(o, p = "") {
      return [].concat(
        ...Object.keys(o).map((k) =>
          typeof o[k] === "object"
            ? _flatten(o[k], k + sep)
            : { [p + k]: o[k] },
        ),
      );
    })(obj),
  );

const patterns = [
  {
    name: "lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(0deg, var(--pattern-bg-color, transparent) 50%, var(--pattern-color) 50%)`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 40px)`,
    },
  },
  {
    name: "vertical-lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(to right, var(--pattern-color), var(--pattern-color) var(--pattern-size-half, 20px), var(--pattern-bg-color, transparent) var(--pattern-size-half, 20px), var(--pattern-bg-color, transparent))`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 40px)`,
    },
  },
  {
    name: "dots",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `radial-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), var(--pattern-bg-color) calc(var(--pattern-size, 40px) * 0.1))`,
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "rhombus",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(135deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(315deg, var(--pattern-color) 25%, var(--pattern-bg-color) 25%)`,
      backgroundPosition:
        "var(--pattern-size, 40px) 0, var(--pattern-size, 40px) 0, 0 0, 0 0",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
      backgroundRepeat: "repeat",
    },
  },
  {
    name: "cross",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background: `radial-gradient(circle, transparent 20%, var(--pattern-bg-color) 20%, var(--pattern-bg-color) 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, var(--pattern-bg-color) 20%, var(--pattern-bg-color) 80%, transparent 80%, transparent) var(--pattern-size-half, 20px) var(--pattern-size-half, 20px), linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)) 0 calc(var(--pattern-size, 40px) * -0.02), linear-gradient(90deg, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), var(--pattern-bg-color) calc(var(--pattern-size, 100px) * 0.04)) calc(var(--pattern-size, 40px) * -0.02) 0`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 20px), var(--pattern-size, 40px) var(--pattern-size, 20px), var(--pattern-size-half, 20px) var(--pattern-size-half, 20px), var(--pattern-size-half, 20px) var(--pattern-size-half, 20px)`,
    },
  },
  {
    name: "wavy",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "repeating-radial-gradient( circle at 0 0, transparent 0, var(--pattern-bg-color, transparent) var(--pattern-size, 40px) ), repeating-linear-gradient( var(--pattern-color-55), var(--pattern-color) )",
    },
  },
  {
    name: "zigzag",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(135deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(315deg, var(--pattern-color) 25%, var(--pattern-bg-color, transparent) 25%)",
      backgroundPosition:
        "var(--pattern-size-half, 20px) 0, var(--pattern-size-half, 20px) 0, 0 0, 0 0",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
      backgroundRepeat: "repeat",
    },
  },
  {
    name: "zigzag-3d",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background:
        "linear-gradient(135deg, var(--pattern-color-55) 25%, transparent 25%) calc(var(--pattern-size, 40px) * -0.5) 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%) calc(var(--pattern-size, 40px) * -0.5) 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(315deg, var(--pattern-color-55) 25%, transparent 25%) 0px 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(45deg, var(--pattern-color) 25%, var(--pattern-bg-color) 25%) 0px 0/ var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "isometric",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(30deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(150deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(30deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(150deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(60deg, var(--pattern-color-77) 25%, transparent 25.5%, transparent 75%, var(--pattern-color-77) 75%, var(--pattern-color-77)), linear-gradient(60deg, var(--pattern-color-77) 25%, transparent 25.5%, transparent 75%, var(--pattern-color-77) 75%, var(--pattern-color-77))",
      backgroundSize:
        "var(--pattern-size, 40px) calc(var(--pattern-size, 40px) * 1.75)",
      backgroundPosition:
        "0 0, 0 0, var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875), var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875), 0 0, var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875)",
    },
  },
  {
    name: "boxes",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), transparent calc(var(--pattern-size, 40px) * 0.1)), linear-gradient(to right, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.1))",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "rectangles",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "repeating-linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%, transparent 75%, var(--pattern-color) 75%, var(--pattern-color)), repeating-linear-gradient(45deg, var(--pattern-color) 25%, var(--pattern-bg-color, transparent) 25%, var(--pattern-bg-color, transparent) 75%, var(--pattern-color) 75%, var(--pattern-color))",
      backgroundPosition:
        "0 0, var(--pattern-size-half, 20px) var(--pattern-size-half, 20px)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "diagonal-lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background:
        "repeating-linear-gradient( 45deg, var(--pattern-color), var(--pattern-color) calc(var(--pattern-size, 40px) * 0.2), var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.2), var(--pattern-bg-color) var(--pattern-size, 40px) )",
    },
  },
  {
    name: "triangles",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(45deg, var(--pattern-color) 50%, var(--pattern-bg-color, transparent) 50%)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "moon",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "radial-gradient( ellipse farthest-corner at var(--pattern-size, 40px) var(--pattern-size, 40px), var(--pattern-color), var(--pattern-color) 50%, var(--pattern-bg-color, transparent) 50%)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "paper",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)), linear-gradient(90deg, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)), linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.02), transparent calc(var(--pattern-size, 40px) * 0.02)), linear-gradient(90deg, var(--pattern-color) 2px, var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.02))",
      backgroundSize:
        "var(--pattern-size, 40px) var(--pattern-size, 40px), var(--pattern-size, 40px) var(--pattern-size, 40px), calc(var(--pattern-size, 40px) * 0.2) calc(var(--pattern-size, 40px) * 0.2), calc(var(--pattern-size, 40px) * 0.2) calc(var(--pattern-size, 40px) * 0.2)",
      backgroundPosition:
        "calc(var(--pattern-size, 40px) * -0.04) calc(var(--pattern-size, 40px) * -0.04), calc(var(--pattern-size, 40px) * -0.04) calc(var(--pattern-size, 40px) * -0.04), calc(var(--pattern-size, 40px) * -0.02) calc(var(--pattern-size, 40px) * -0.02), calc(var(--pattern-size, 40px) * -0.02) calc(var(--pattern-size, 40px) * -0.02)",
    },
  },
];

const defaultOpacities = {
  100: "1",
  80: ".80",
  60: ".60",
  40: ".40",
  20: ".20",
  10: ".10",
  5: ".05",
};

const defaultSizes = {
  1: "0.25rem",
  2: "0.5rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
};

const config = {
  // mode: "jit",
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        sky: {},
        solarized: {
          "light-blue": colors.sky,
          cyan: colors.cyan,
          base03: "#002b36",
          base03Light1: "#00364b",
          base03Light2: "#004060",
          base03Light3: "#004b75",
          base03Light4: "#00568a",
          base03Light5: "#00619f",
          base03Dark1: "#002021",
          base03Dark2: "#00150c",
          base03Dark3: "#000a00",
          base03Dark4: "#000000",
          base03Dark5: "#000000",
          base02: "#073642",
          base02Light1: "#084a57",
          base02Light2: "#095e6c",
          base02Light3: "#0a7281",
          base02Light4: "#0b8696",
          base02Light5: "#0c9aab",
          base02Dark1: "#06222d",
          base02Dark2: "#051e18",
          base02Dark3: "#041a03",
          base02Dark4: "#031600",
          base02Dark5: "#021200",
          base03Light: "#003d4d",
          base03Dark: "#001e26",
          base02Light: "#0a4a5e",
          base02Dark: "#042639",
          base01: "#586e75",
          base01Light: "#708a8c",
          base01Dark: "#46565e",
          base00: "#657b83",
          base00Light: "#7a949a",
          base00Dark: "#51666c",
          base0: "#839496",
          base0Light: "#9ab2b4",
          base0Dark: "#6c7f80",
          base1: "#93a1a1",
          base1Light: "#b0bdbd",
          base1Dark: "#778686",
          base2: "#eee8d5",
          base2Light: "#fffaf3",
          base2Dark: "#d6d1bc",
          base3: "#fdf6e3",
          base3Light: "#ffffff",
          base3Dark: "#ebe5d2",
          yellow: "#b58900",
          yellowLight: "#d6ab00",
          yellowDark: "#946b00",
          orange: "#cb4b16",
          orangeLight: "#ff6c2c",
          orangeDark: "#a23700",
          red: "#dc322f",
          redLight: "#ff4b4a",
          redDark: "#b02524",
          magenta: "#d33682",
          magentaLight: "#ff4db1",
          magentaDark: "#a72666",
          violet: "#6c71c4",
          violetLight: "#8d8ff0",
          violetDark: "#4b4d94",
          blue: "#268bd2",
          blueLight: "#4a9dff",
          blueDark: "#0069a1",
          cyanLight: "#4dbcb4",
          cyanDark: "#00756e",
          green: "#859900",
          greenLight: "#a8c200",
          greenDark: "#657200",
        },
      },
      boxShadow: {
        bottom:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addComponents, addUtilities, theme }) {
      const colors = theme("colors", {});
      const allColors = Object.keys(colors).map((key) => ({
        name: key,
        values: colors[key],
      }));
      const opacities = theme("patterns.opacity", defaultOpacities);
      const sizes = theme("patterns.size", defaultSizes);

      let utilities = {};
      let components = {};

      allColors.forEach(({ name, values }) => {
        if (typeof values === "object") {
          Object.keys(values).forEach((value) => {
            utilities[`.pattern-${name}-${value}`] = {
              "--pattern-color": values[value],
              "--pattern-color-55": values[value] + "55",
              "--pattern-color-77": values[value] + "77",
            };
            utilities[`.pattern-bg-${name}-${value}`] = {
              "--pattern-bg-color": values[value],
            };
          });
        } else {
          utilities[`.pattern-${name}`] = {
            "--pattern-color": values,
          };
          utilities[`.pattern-bg-${name}`] = {
            "--pattern-bg-color": values,
          };
        }
      });

      Object.keys(opacities).forEach((opacity) => {
        utilities[`.pattern-opacity-${opacity}`] = {
          "--pattern-opacity": opacities[opacity],
        };
      });

      Object.keys(sizes).forEach((size) => {
        utilities[`.pattern-size-${size}`] = {
          "--pattern-size": sizes[size],
          "--pattern-size-half": `calc(${sizes[size]} / 2)`,
        };
      });

      patterns.forEach(({ name: patternName, styles }) => {
        components[`.pattern-${patternName}`] = styles;
      });

      addUtilities(utilities);
      addComponents(components);
    },
    function ({ addUtilities, theme }) {
      const utilities = {
        ".bg-stripes": {
          backgroundImage:
            "linear-gradient(45deg, var(--stripes-color) 12.50%, transparent 12.50%, transparent 50%, var(--stripes-color) 50%, var(--stripes-color) 62.50%, transparent 62.50%, transparent 100%)",
          backgroundSize: "5.66px 5.66px",
        },
      };

      const addColor = (name, color) =>
        (utilities[`.bg-stripes-${name}`] = { "--stripes-color": color });

      const colors = flattenColorPalette(theme("backgroundColor"));
      for (let name in colors) {
        try {
          const [r, g, b, a] = toRgba(colors[name]);
          if (a !== undefined) {
            addColor(name, colors[name]);
          } else {
            addColor(name, `rgba(${r}, ${g}, ${b}, 0.4)`);
          }
        } catch (_) {
          addColor(name, colors[name]);
        }
      }

      addUtilities(utilities);
    },
    nextui({}),
    require("preline/plugin"),
  ],
};
export default config;
