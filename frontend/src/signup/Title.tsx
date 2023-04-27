import { StyleSheet, Text, View } from "react-native"

export function Title(props: { lable: string }) {
  const styles = StyleSheet.create({
    textStyle: {
      fontSize: 32,
    },
    containerStyle: {
      flex: 1,
      textAlign: "center",
    },
  })

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{props.lable}</Text>
    </View>
  )
}
