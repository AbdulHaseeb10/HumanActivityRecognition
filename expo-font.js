import * as Font from "expo-font";

export const loadFonts = () => {
  return Font.loadAsync({
    Poppins: require("./app/assets/fonts/poppinsmed.ttf"),
    // Add more variations or weights of the Poppins font if needed
  });
};
