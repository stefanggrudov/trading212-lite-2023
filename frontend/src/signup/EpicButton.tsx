import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

export function EpicButton(props: {
  label: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      width: 350,
      height: 60,
      left: 20,
      bottom: 20,
      marginTop: 30,
    },
    button: {
      backgroundColor: "#00A7E1",
      borderRadius: 8,
      padding: 16,

      //TODO chnge color and size of the button
    },
    buttonText: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  )
}
