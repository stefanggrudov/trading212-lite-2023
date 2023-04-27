import React, { useCallback, useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { AppConfig } from "../config"
import { CountriesDropdown } from "./CountriesDropdown"
import { EpicButton } from "./EpicButton"
import { EpicTextInput } from "./EpicTextInput"
import { SignupFlowConfig } from "./SignupFlowT"
import { Title } from "./Title"

function SignupFlowStepCustomerDetails(props: { onNextPress: () => void }) {
  const [countries, setCountries] = useState([])

  const fetchCountries = useCallback(async () => {
    const responce = await fetch(`${AppConfig.CUSTOMER_SERVICE_URL}/countries`)

    const countries = await responce.json()

    setCountries(countries)
  }, [])

  useEffect(() => {
    fetchCountries()
  }, [])

  const onPress = useCallback(() => {
    props.onNextPress()
  }, [])

  const [firstName, setFirstName] = useState("")
  const [givenName, setGivenName] = useState("")

  const containerStyle = useMemo(
    () => ({
      width: 300,
      backgroundColor: "white",
      borderRadius: 10,
      top: 40,
    }),
    []
  )

  return (
    <View style={containerStyle}>
      <Title lable="Sign up" />

      <CountriesDropdown countries={countries} />

      <EpicTextInput
        label="First Name"
        onChangeText={(text) => {
          setFirstName(text)
        }}
        textInputProps={{
          textContentType: "name",
          autoCapitalize: "words",
        }}
        style={{
          marginVertical: 20,
        }}
      />

      <EpicTextInput
        label="Given Name"
        onChangeText={(text) => {
          setGivenName(text)
        }}
        textInputProps={{
          textContentType: "givenName",
          autoCapitalize: "words",
        }}
        style={{
          marginBottom: 20,
        }}
      />

      <EpicButton label="Next" onPress={onPress} />
    </View>
  )
}

function SignupFlowStepLoginDetails(props: { onNextPress: () => void }) {
  const onPress = useCallback(() => {
    props.onNextPress()
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const containerStyle = useMemo(
    () => ({
      width: 300,
      backgroundColor: "white",
      borderRadius: 10,
      top: 40,
    }),
    []
  )

  return (
    <View style={containerStyle}>
      <Title lable="Login details" />

      <EpicTextInput
        label="Email"
        onChangeText={(text) => {
          setEmail(text)
        }}
        textInputProps={{
          textContentType: "emailAddress",
          autoCapitalize: "none",
        }}
        style={{
          marginVertical: 20,
        }}
      />

      <EpicTextInput
        label="Password"
        onChangeText={(text) => {
          setPassword(text)
        }}
        textInputProps={{
          textContentType: "password",
          secureTextEntry: true,
          autoCapitalize: "none",
        }}
        style={{
          marginVertical: 20,
        }}
      />

      <EpicTextInput
        label="Repeat Password"
        onChangeText={(text) => {
          setConfirmPassword(text)
        }}
        textInputProps={{
          textContentType: "password",
          secureTextEntry: true,
          autoCapitalize: "none",
        }}
        style={{
          marginVertical: 20,
        }}
      />

      <EpicButton label="Sign Up" onPress={onPress} />
    </View>
  )
}

export function SignupFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const onNextPress = useCallback(() => {
    const newStep = currentStep + 1

    if (newStep >= SignupFlowConfig.maxSteps) {
      //TODO handle last step
      return
    }
    setCurrentStep(currentStep + 1)
  }, [currentStep])

  return (
    <View>
      {currentStep === 0 ? (
        <SignupFlowStepCustomerDetails onNextPress={onNextPress} />
      ) : null}
      {currentStep === 1 ? (
        <SignupFlowStepLoginDetails onNextPress={onNextPress} />
      ) : null}
    </View>
  )
}
