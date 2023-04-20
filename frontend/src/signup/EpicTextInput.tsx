import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleProp, ViewStyle, TextInput, View, Text, StyleSheet, Animated, Easing } from "react-native"

const EpicTextInputHeight = 70;
const TextInputStyleHeight = 35;

export function EpicTextInput(props: {
    label: string,
    onChangeText: (text: string) => void
    style?: StyleProp<ViewStyle>
    textInputProps?: Omit<React.ComponentProps<typeof TextInput>, "onChangeText">
}) {
    
    useEffect(()=>{
        cancelAnimation.current
    }, [])

    const cancelAnimation = useRef<(()=>void) | undefined>(undefined)

    const containerStyle = useMemo(
        (): StyleProp<ViewStyle> => [
            { height: EpicTextInputHeight, justifyContent: "flex-end" },
            props.style
        ],
        []
    )

    const textInputStyle = useMemo(
        () => ({
            height: TextInputStyleHeight,
            outlineStyle: 'none',
        }),
        []
    )

    const [isFocused, setIsFocused] = useState(false);
    const labelOffsetAnimation = useRef(new Animated.Value(0)).current

    const onFocus = useCallback(() => {
        setIsFocused(true)

        const animation = Animated.timing(labelOffsetAnimation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        })
        animation.start()
        cancelAnimation.current = animation.stop

    }, []);

    const onBlur = useCallback(() => {
        setIsFocused(false)

        const animation = Animated.timing(labelOffsetAnimation, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        })

        animation.start()

        cancelAnimation.current = animation.stop
    }, [])

    const animatedStyle = useMemo(() => ({
        marginBottom: labelOffsetAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-25, 0],
        })
    }), [])

    return (
        <View style={containerStyle}>
            <Animated.View style={animatedStyle}>
                <Text>{props.label}</Text>
            </Animated.View>
            <TextInput
                onFocus={onFocus}
                onBlur={onBlur}
                style={textInputStyle}
                onChangeText={props.onChangeText}
                {...props.textInputProps}
            />
            <View style={{ backgroundColor: "#747980", height: StyleSheet.hairlineWidth }} />
        </View >
    )
}