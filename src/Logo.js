import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Logo = () => {
  const [loaded] = useFonts({
    PatuaOne: require("../assets/fonts/PatuaOne-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  } else {
    return (
      <View style={styles.logoArea}>
        <Text style={styles.logo}>beeb</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  logo: {
    fontFamily: "PatuaOne",
    fontSize: 38,
    marginTop: -6,
    color: "#333",
  },
});

export default Logo;
