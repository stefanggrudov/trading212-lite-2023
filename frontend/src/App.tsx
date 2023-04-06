import { StyleSheet, View } from "react-native"
import { SignupForm } from "./signup/SignupForm"
import { SignupFlow } from "./signup/SignupFlow"


export default function App() {
  return (
    <View style={styles.container}>
      <SignupFlow />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
