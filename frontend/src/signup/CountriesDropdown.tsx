import { CountryT } from "customer-commons"
import { useCallback, useMemo, useRef, useState } from "react"
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native"
import { SeparationLine } from "./SeparationLine"

export function CountriesDropdown(props: { countries: CountryT[] }) {
  const [isCountriesListVisible, setIsCountriesListVisible] = useState(false)

  const dropdownFadeAnimationValue = useRef(new Animated.Value(0)).current

  const onPress = useCallback(() => {
    setIsCountriesListVisible(!isCountriesListVisible)
    Animated.timing(dropdownFadeAnimationValue, {
      toValue: !isCountriesListVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isCountriesListVisible])

  const [textColor, setTextColor] = useState("black")

  const [pressed, setPressed] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState("")

  const [hovered, setHovered] = useState("")

  const onCountryPress = useCallback(
    (selectedCountry: string) => {
      //TODO manage country press
      setPressed(pressed ? false : true)
      setTextColor(pressed ? "blue" : "black")
      setSelectedCountry(selectedCountry)
    },
    [textColor, pressed]
  )

  const onHoverContainer = useMemo(
    (): StyleProp<ViewStyle> => ({
      marginLeft: 5,
      position: "absolute",
      borderRadius: 10,
      backgroundColor: "red",
    }),
    []
  )

  const countryItemStyle = useMemo(
    (): StyleProp<ViewStyle> => ({
      borderWidth: 1,
      borderColor: "white",
      marginBottom: 5,
    }),
    []
  )

  const renderCountryItem = useCallback(
    (countryRow: ListRenderItemInfo<CountryT>) => (
      <Pressable
        onPress={() => onCountryPress(countryRow.item.code)}
        style={countryItemStyle}
        onHoverIn={() => setHovered(countryRow.item.code)}
        onHoverOut={() => setHovered("")}
      >
        {countryRow.item.code == hovered ? (
          <View style={onHoverContainer}>
            <Text
              style={{
                color:
                  countryRow.item.code == selectedCountry ? textColor : "black",
              }}
            >
              {countryRow.item.code}
            </Text>
          </View>
        ) : (
          <Text
            style={{
              color:
                countryRow.item.code == selectedCountry ? textColor : "black",
            }}
          >
            {countryRow.item.code}
          </Text>
        )}
      </Pressable>
    ),
    [textColor, pressed, hovered]
  )

  const countryContainerStyle = useMemo(
    (): StyleProp<ViewStyle> => ({
      position: "absolute",
      maxHeight: 200,
      left: 0,
      right: 0,
      top: 20,
      backgroundColor: "white",
    }),
    []
  )

  const renderListPerchance = useCallback(() => {
    return (
      <Animated.View
        style={[
          countryContainerStyle,
          {
            opacity: dropdownFadeAnimationValue,
            marginTop: 70,
          },
        ]}
      >
        <FlatList
          data={props.countries}
          renderItem={renderCountryItem}
          keyExtractor={(country) => country.code}
        />
      </Animated.View>
    )
  }, [props.countries, isCountriesListVisible, textColor, pressed])

  const moveViewForwardStyle = useMemo(
    () => ({
      zIndex: isCountriesListVisible ? 1 : 0,
    }),
    [isCountriesListVisible]
  )

  const labelStyle = useMemo(
    () => ({
      color: "#747980",
      fontSize: 12,
      marginTop: 50,
    }),
    []
  )

  return (
    <View style={moveViewForwardStyle}>
      <Text style={labelStyle}>COUNTRY OF RESIDENCE</Text>
      <Pressable onPress={onPress}>
        <Text style={{ fontSize: 17 }}>Select country</Text>
      </Pressable>

      {renderListPerchance()}

      <SeparationLine />
    </View>
  )
}
