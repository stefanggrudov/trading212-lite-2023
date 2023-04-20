import { Pressable, View, Text, FlatList, Modal, ListRenderItem, ListRenderItemInfo, StyleProp, ViewStyle } from "react-native"
import { CountryT } from "./Country"
import { useCallback, useMemo, useState } from "react"


export function CountriesDropdown(props: {
    countries: CountryT[]
}) {

    const [isCountriesListVisible, setIsCountriesListVisible] = useState(false)

    const onPress = useCallback(() => {
        setIsCountriesListVisible(!isCountriesListVisible)
    }, [isCountriesListVisible])

    const onCountryPress = useCallback(() => { }, [])

    const countryItemStyle = useMemo(():StyleProp<ViewStyle> => ({
        borderWidth : 1,
        borderColor : "##747980",
        

    }), [])

    const renderCountryItem = useCallback((countryRow: ListRenderItemInfo<CountryT>) => (
        <Pressable onPress={onCountryPress} style={countryItemStyle}>
            <Text>{countryRow.item.code}</Text>

        </Pressable>
    ), [])

    const renderListPerchance = useCallback(() => (
        isCountriesListVisible ?
            <FlatList data={props.countries} renderItem={renderCountryItem} />
            : null

        //     < Modal visible = { isCountriesListVisible } >
        //     <FlatList data={props.countries} renderItem={renderCountryItem} />
        // </Modal >
    ), [props.countries, isCountriesListVisible])

    return (
        <View>
            <Pressable onPress={onPress}>
                <Text>Select country</Text>
            </Pressable>

            {renderListPerchance()}

        </View>

    )
}