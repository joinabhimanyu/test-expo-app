import React, {useState} from 'react';
import {Collapsible} from "@/components/Collapsible";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BillingInformation, ShippingAddress} from "@/models/checkoutInfo";

export default function Checkout() {
    const [billingInformation, setBillingInformation] = useState(new BillingInformation())
    const [shippingInformation, setShippingInformation] = useState(new ShippingAddress())

    const onChangeBillingHandler = (value: string, fieldName: string) => {
        setBillingInformation({...billingInformation, [fieldName]: value})
    }

    const onChangeShippingHandler = (value: string, fieldName: string) => {
        setShippingInformation({...shippingInformation, [fieldName]: value})
    }

    return (
        <>
            <ScrollView>
                <View style={{flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>

                    <Collapsible title="Billing Information">
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>First Name:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter first name" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "firstName")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Last Name:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter last name" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "lastName")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Address 1:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter address 1" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "addressLine1")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Address 2:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter address 2" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "addressLine2")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>City:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter city" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "city")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>State:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter State" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "state")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Zip Code:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter zip code" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "zipCode")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Phone no:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter Ph no" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "phoneNumber")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Email:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter email" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "email")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Card Number:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter Card No" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "cardNumber")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Expiration Date:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter Expiration date" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "expirationDate")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>CVV:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter CVV" value=""
                                       onChangeText={(text) => onChangeBillingHandler(text, "cvv")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Shipping Address same as billing address:</Text>

                        </View>
                    </Collapsible>

                    <Collapsible title="Shipping Information">
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>First Name:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter first name" value=""
                                       onChangeText={(text) => onChangeShippingHandler(text, "firstName")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Last Name:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter last name" value=""
                                       onChangeText={(text) => onChangeShippingHandler(text, "lastName")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Address 1:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter address 1" value=""
                                       onChangeText={(text) => onChangeShippingHandler(text, "addressLine1")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Address 2:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter address 2" value=""
                                       onChangeText={(text) => onChangeShippingHandler(text, "addressLine2")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>City:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter city" value=""
                                       onChangeText={(text) => onChangeShippingHandler(text, "city")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>State:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter State" value=""
                                       onChangeText={(text) => onChangeShippingHandler(text, "state")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Zip Code:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter zip code" value=""
                                       onChangeText={(text) => onChangeShippingHandler(text, "zipCode")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Phone no:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter Ph no" value=""
                                       onChangeText={(text) => onChangeShippingHandler(text, "phoneNumber")}/>
                        </View>
                    </Collapsible>

                </View>
            </ScrollView>
            <View style={styles.placeOrderContainer}>
                <TouchableOpacity style={styles.placeOrder}
                                  onPress={() => false}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    fieldLabel: {fontSize: 16, fontWeight: 'bold'},
    placeOrderContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    placeOrder: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 20,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    }
})