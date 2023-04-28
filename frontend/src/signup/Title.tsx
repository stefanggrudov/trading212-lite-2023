import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"

export function Title(props: { lable: string; style?: StyleProp<ViewStyle> }) {
  const styles = StyleSheet.create({
    textStyle: {
      fontSize: 32,
    },
    containerStyle: {
      flex: 1,
      textAlign: "center",
      alignSelf: "flex-start",
      top: 50,
    },
  })

  return (
    <View style={[styles.containerStyle, props.style]}>
      <Text style={styles.textStyle}>{props.lable}</Text>
    </View>
  )
}
