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
        },
        button: {
            backgroundColor: '#00A7E1',
            borderRadius: 8,
            padding: 16,

            //TODO chnge color and size of the button
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16
            
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