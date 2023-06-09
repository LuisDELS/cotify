// color design tokens export
export const colorTokens = {
    grey: {
      0: "#FFFFFF", //blanco
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000", //negro
    },
    blue: {
      50: "#E6FBFF",
      100: "#CCF7FE",
      200: "#99EEFD",
      300: "#66E6FC",
      400: "#33DDFB",
      500: "#00D5FA",
      600: "#00A0BC",
      700: "#006B7D",
      800: "#00353F",
      900: "#001519",
    },
    orange: {
        50: "#FFF7E6",
        100: "#FFE7BF",
        200: "#FFD699",
        300: "#FFC266",
        400: "#FFAD33",
        500: "#FF9900",
        600: "#CC7A00",
        700: "#995B00",
        800: "#663D00",
        900: "#331E00",
      }
  };
  
  // mui theme settings
  export const themeSettings = () => {
    return {
      palette: {
       
              secondary: {
                dark: colorTokens.blue[200],
                main: colorTokens.blue[500],
                mediumMain: colorTokens.blue[300],
                medium: colorTokens.blue[400],
                light: colorTokens.blue[800],
              },
              primary: {
                dark: colorTokens.orange[200],
                main: colorTokens.orange[500],
                mediumMain: colorTokens.orange[300],
                medium: colorTokens.orange[400],
                light: colorTokens.orange[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            },
          
      
      typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };