import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Animated,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native"
import { SeparationLine } from "./SeparationLine"

const EpicTextInputHeight = 70
const TextInputStyleHeight = 35

export function EpicTextInput(props: {
  label: string
  onChangeText: (text: string) => void
  style?: StyleProp<ViewStyle>
  textInputProps?: Omit<React.ComponentProps<typeof TextInput>, "onChangeText">
}) {
  useEffect(() => {
    cancelAnimation.current
  }, [])

  const cancelAnimation = useRef<(() => void) | undefined>(undefined)

  const containerStyle = useMemo(
    (): StyleProp<ViewStyle> => [
      {
        height: EpicTextInputHeight,
        justifyContent: "flex-end",
        marginTop: 0,
      },
      props.style,
    ],
    []
  )

  const textInputStyle = useMemo(
    () => ({
      height: TextInputStyleHeight,
      outlineStyle: "none",
      marginLeft: 20,
      width: 350,
      hight: 19,
      top: 35,
    }),
    []
  )

  const [isFocused, setIsFocused] = useState(false)
  const labelOffsetAnimation = useRef(new Animated.Value(0)).current

  const onFocus = useCallback(() => {
    setIsFocused(true)

    const animation = Animated.timing(labelOffsetAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    })
    animation.start()
    cancelAnimation.current = animation.stop
  }, [])

  const onBlur = useCallback(() => {
    setIsFocused(false)

    const animation = Animated.timing(labelOffsetAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    })

    animation.start()

    cancelAnimation.current = animation.stop
  }, [])

  const animatedStyle = useMemo(
    () => ({
      marginBottom: labelOffsetAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-25, 0],
      }),
    }),
    []
  )

  const labelStyle = useMemo(
    () => ({
      color: "#747980",
      marginLeft: 20,
    }),
    []
  )

  return (
    <View style={containerStyle}>
      <Animated.View style={animatedStyle}>
        <Text style={labelStyle}>{props.label}</Text>
      </Animated.View>
      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        style={textInputStyle}
        onChangeText={props.onChangeText}
        {...props.textInputProps}
      />
      <SeparationLine />
    </View>
  )
}
