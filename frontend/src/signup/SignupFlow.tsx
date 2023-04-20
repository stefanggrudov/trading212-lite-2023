import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Button } from "react-native";
import { SignupFlowConfig } from "./SignupFlowT";
import { EpicTextInput } from "./EpicTextInput";
import { CountriesDropdown } from "./CountriesDropdown";
import { CountryT } from "./Country";
import { AppConfig } from "../config";

function SignupFlowStepCustomerDetails(props: { onNextPress: () => void }) {


    const [countries, setCountries] = useState([])

    const fetchCountries = useCallback(async() => {

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

    const [firstName, setFirstName] = useState("");
    const [givenName, setGivenName] = useState("")

    return (
        <View>
            <CountriesDropdown countries={countries} />

            <EpicTextInput
                label="First Name"
                onChangeText={(text) => {
                    setFirstName(text)
                }}
                textInputProps={{
                    textContentType: "name",
                    autoCapitalize: "words"
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
                    autoCapitalize: "words"
                }}
                style={{
                    marginBottom: 20
                }}
            />

            <Button title="Next" onPress={onPress} />
        </View>
    )
}

function SignupFlowStepLoginDetails(props: { onNextPress: () => void }) {

    const onPress = useCallback(() => {
        props.onNextPress()
    }, [])

    return (
        <View>
            <TextInput
                textContentType="emailAddress"
                placeholder="Email"
            />

            <TextInput
                textContentType="password"
                placeholder="Password"
            />

            <TextInput
                textContentType="password"
                placeholder="Repeat Password"
            />

            <Button title="Sign up" onPress={onPress} />

        </View>
    )
}


export function SignupFlow() {
    const [currentStep, setCurrentStep] = useState(0);
    const onNextPress = useCallback(() => {
        const newStep = currentStep + 1;

        if (newStep >= SignupFlowConfig.maxSteps) {
            //TODO handle last step
            return
        }
        setCurrentStep(currentStep + 1);
    }, [currentStep])

    return (
        <View>
            {currentStep === 0 ? <SignupFlowStepCustomerDetails onNextPress={onNextPress} /> : null}
            {currentStep === 1 ? <SignupFlowStepLoginDetails onNextPress={onNextPress} /> : null}
        </View>

    )
}