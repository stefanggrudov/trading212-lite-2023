import { useMemo } from "react";
import { StyleProp, View, ViewStyle, Text, StyleSheet, TouchableOpacity } from "react-native";

export function EpicButton(props: {
    label: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>
}) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            backgroundColor: 'blue',
            borderRadius: 8,
            padding: 16,
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress = {props.onPress} style = {styles.button}>
                <Text style={styles.buttonText}>{props.label}</Text>
            </TouchableOpacity>
        </View>
    )
}