import { Pressable, View, Text, FlatList, Modal, ListRenderItem, ListRenderItemInfo, StyleProp, ViewStyle, Animated } from "react-native"
import { CountryT } from "customer-commons"
import { useCallback, useMemo, useRef, useState } from "react"
import { SeparationLine } from "./SeparationLine"


export function CountriesDropdown(props: {
    countries: CountryT[]
}) {

    const [isCountriesListVisible, setIsCountriesListVisible] = useState(false)

    const drodownFadeAnimationValue = useRef(new Animated.Value(0)).current

    const onPress = useCallback(() => {
        setIsCountriesListVisible(!isCountriesListVisible)
        Animated.timing(drodownFadeAnimationValue, {
            toValue: !isCountriesListVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }, [isCountriesListVisible])

    const onCountryPress = useCallback(() => {
        //TODO manage country press
    }, [])

    const countryItemStyle = useMemo((): StyleProp<ViewStyle> => ({
        borderWidth: 1,
        borderColor: "##747980",


    }), [])

    const renderCountryItem = useCallback((countryRow: ListRenderItemInfo<CountryT>) => (
        <Pressable onPress={onCountryPress} style={countryItemStyle}>
            <Text>{countryRow.item.code}</Text>

        </Pressable>
    ), [])

    const countryContainerStyle = useMemo((): StyleProp<ViewStyle> => ({
        position: "absolute",
        maxHeight: 200,
        left: 0,
        right: 0,
        top: 20,
        backgroundColor: "white",
    }), [])

    const renderListPerchance = useCallback(() => {
        return (
            <Animated.View
                style={[
                    countryContainerStyle,
                    {
                        opacity: drodownFadeAnimationValue,
                        marginTop: 70

                    },
                ]}>
                <FlatList data={props.countries}
                    renderItem={renderCountryItem}
                    keyExtractor={(country) => country.code} />
            </Animated.View>
        )


    }, [props.countries, isCountriesListVisible])

    const moveViewForwardStyle = useMemo(() => ({
        zIndex: isCountriesListVisible ? 1 : 0
    }), [isCountriesListVisible])

    const labelStyle = useMemo(()=>({
        color: "#747980",
        fontSize: 12,
        marginTop: 50
    }), [])

    return (
        <View style={moveViewForwardStyle}>
            <Text style={labelStyle}>
                COUNTRY OF RESIDENCE
            </Text>
            <Pressable onPress={onPress} >
                <Text style={{fontSize: 17}}>Select country</Text>
            </Pressable>

            {renderListPerchance()}

            <SeparationLine/>
        </View>

    )
}