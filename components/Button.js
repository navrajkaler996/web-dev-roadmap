import { Image, Pressable, StyleSheet, Text } from "react-native";

const getImage = (image) => {
  if (image == "right-arrow")
    return (
      <Image
        source={require(`../assets/images/right-arrow.png`)}
        style={buttonStyles.image}
      />
    );

  return null;
};

const Button = ({ title, onPress, styles, titleStyles, image = false }) => {
  return (
    <Pressable
      style={{ ...buttonStyles.button, ...styles, ...buttonStyles["shadow-1"] }}
      onPress={onPress}>
      <Text
        style={{
          ...buttonStyles.text,
          ...titleStyles,
        }}>
        {title}
      </Text>
      {image && getImage(image)}
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#2BC0E4",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "lato-black",
    letterSpacing: 1,
  },
  "shadow-1": {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  image: {
    marginLeft: 10,
    height: 20,
    width: 40,
  },
});

export default Button;
