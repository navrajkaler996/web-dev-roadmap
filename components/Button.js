import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({ title, styles }) => {
  return (
    <Pressable style={{ ...buttonStyles.button }}>
      <Text style={buttonStyles.text}>{title}</Text>
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    backgroundColor: "#2BC0E4",
  },
  text: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "lato-black",
    letterSpacing: 1,
  },
});

export default Button;
