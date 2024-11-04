import React, {useEffect, useMemo, useState} from 'react';
import {Collapsible} from "@/components/Collapsible";
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import {BillingInformation, ShippingAddress} from "@/models/checkoutInfo";
import {Checkbox} from "expo-checkbox";
import {Picker} from "@react-native-picker/picker";

export default function Checkout() {
    const [billingInformation, setBillingInformation] = useState(new BillingInformation());
    const [shippingInformation, setShippingInformation] = useState(new ShippingAddress());
    const [paymentMethod, setPaymentMethod] = useState('');

    const onChangeBillingHandler = (value: string, fieldName: string) => {
        setBillingInformation({...billingInformation, [fieldName]: value})
    }

    const onChangeBillingHandlerBoolean = (value: boolean, fieldName: string) => {
        setBillingInformation({...billingInformation, [fieldName]: value})
    }

    const onChangeShippingHandler = (value: string, fieldName: string) => {
        setShippingInformation({...shippingInformation, [fieldName]: value})
    }

    const validateBillingInformation = useMemo(() => {
        return billingInformation && billingInformation.firstName
            && billingInformation.lastName
            && billingInformation.addressLine1
            && billingInformation.addressLine2
            && billingInformation.city
            && billingInformation.state
            && billingInformation.zipCode
            && billingInformation.country
            && billingInformation.phoneNumber
            && billingInformation.email
    }, [billingInformation]);

    const validateOrderButton = useMemo(() => {
        return billingInformation && billingInformation.firstName
            && billingInformation.lastName
            && billingInformation.addressLine1
            && billingInformation.addressLine2
            && billingInformation.city
            && billingInformation.state
            && billingInformation.zipCode
            && billingInformation.country
            && billingInformation.phoneNumber
            && billingInformation.email
            && billingInformation.cardNumber
            && billingInformation.expirationDate
            && billingInformation.cvv
            && shippingInformation && shippingInformation.firstName
            && shippingInformation.lastName
            && shippingInformation.addressLine1
            && shippingInformation.addressLine2
            && shippingInformation.city
            && shippingInformation.state
            && shippingInformation.zipCode
            && shippingInformation.country
            && shippingInformation.phoneNumber
    }, [billingInformation, shippingInformation]);

    useEffect(() => {
        if (billingInformation?.shippingAddressSameAsBilling) {
            setShippingInformation({
                firstName: billingInformation?.firstName,
                lastName: billingInformation?.lastName,
                addressLine1: billingInformation?.addressLine1,
                addressLine2: billingInformation?.addressLine2,
                city: billingInformation?.city,
                state: billingInformation?.state,
                zipCode: billingInformation?.zipCode,
                country: billingInformation?.country,
                phoneNumber: billingInformation?.phoneNumber,
            });
        } else {
            setShippingInformation({
                firstName: "",
                lastName: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
                phoneNumber: "",
            });
        }
    }, [billingInformation])

    return (
        <>
            <ScrollView>
                <View style={{flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>

                    <Collapsible title="Billing Information">
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>First Name:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter first name"
                                       value={billingInformation?.firstName}
                                       onChangeText={(text) => onChangeBillingHandler(text, "firstName")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Last Name:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter last name"
                                       value={billingInformation?.lastName}
                                       onChangeText={(text) => onChangeBillingHandler(text, "lastName")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Address 1:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter address 1"
                                       value={billingInformation?.addressLine1}
                                       onChangeText={(text) => onChangeBillingHandler(text, "addressLine1")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Address 2:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter address 2"
                                       value={billingInformation?.addressLine2}
                                       onChangeText={(text) => onChangeBillingHandler(text, "addressLine2")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>City:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter city"
                                       value={billingInformation?.city}
                                       onChangeText={(text) => onChangeBillingHandler(text, "city")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>State:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter State"
                                       value={billingInformation?.state}
                                       onChangeText={(text) => onChangeBillingHandler(text, "state")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Zip Code:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter zip code"
                                       keyboardType="numeric"
                                       maxLength={6}
                                       value={billingInformation?.zipCode}
                                       onChangeText={(text) => onChangeBillingHandler(text, "zipCode")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Country:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter country"
                                       value={billingInformation?.country}
                                       onChangeText={(text) => onChangeBillingHandler(text, "country")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Phone no:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter Ph no"
                                       keyboardType="phone-pad"
                                       maxLength={10}
                                       value={billingInformation?.phoneNumber}
                                       onChangeText={(text) => onChangeBillingHandler(text, "phoneNumber")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Email:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter email"
                                       keyboardType="email-address"
                                       value={billingInformation?.email}
                                       onChangeText={(text) => onChangeBillingHandler(text, "email")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Shipping Address:</Text>
                            <Checkbox style={{marginHorizontal: 15}} disabled={!validateBillingInformation}
                                      value={billingInformation?.shippingAddressSameAsBilling}
                                      onValueChange={(value) => onChangeBillingHandlerBoolean(value, "shippingAddressSameAsBilling")}/>
                        </View>
                    </Collapsible>

                    <Collapsible title="Shipping Information">
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>First Name:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter first name"
                                       value={shippingInformation?.firstName}
                                       onChangeText={(text) => onChangeShippingHandler(text, "firstName")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Last Name:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter last name"
                                       value={shippingInformation?.lastName}
                                       onChangeText={(text) => onChangeShippingHandler(text, "lastName")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Address 1:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter address 1"
                                       value={shippingInformation?.addressLine1}
                                       onChangeText={(text) => onChangeShippingHandler(text, "addressLine1")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Address 2:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter address 2"
                                       value={shippingInformation?.addressLine2}
                                       onChangeText={(text) => onChangeShippingHandler(text, "addressLine2")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>City:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter city"
                                       value={shippingInformation?.city}
                                       onChangeText={(text) => onChangeShippingHandler(text, "city")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>State:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter State"
                                       value={shippingInformation?.state}
                                       onChangeText={(text) => onChangeShippingHandler(text, "state")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Zip Code:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter zip code"
                                       keyboardType="numeric"
                                       maxLength={6}
                                       value={shippingInformation?.zipCode}
                                       onChangeText={(text) => onChangeShippingHandler(text, "zipCode")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Country:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter country"
                                       value={shippingInformation?.country}
                                       onChangeText={(text) => onChangeShippingHandler(text, "country")}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Phone no:</Text>
                            <TextInput style={{paddingLeft: 10}} placeholder="Enter Ph no"
                                       keyboardType="number-pad"
                                       maxLength={10}
                                       value={shippingInformation?.phoneNumber}
                                       onChangeText={(text) => onChangeShippingHandler(text, "phoneNumber")}/>
                        </View>
                    </Collapsible>

                    <View style={styles.paymentOptionsContainer}>
                        <Text style={styles.paymentOptionLabel}>Payment Options:</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <TouchableOpacity style={styles.paymentOption} onPress={() => {
                                setPaymentMethod('card');
                            }}>
                                <Image source={require('@/assets/images/credit-card.png')}
                                       style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.paymentOption} onPress={() => {
                                setPaymentMethod('upi');
                            }}>
                                <Image source={require('@/assets/images/upi.png')} style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.paymentOption} onPress={() => {
                                setPaymentMethod('cod');
                            }}>
                                <Image source={require('@/assets/images/cash-on-delivery.png')}
                                       style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                        </View>

                        {paymentMethod && paymentMethod == "card" ? (
                            <>
                                <View style={styles.fieldContainer}>
                                    <Text style={styles.fieldLabel}>Card Number:</Text>
                                    <TextInput style={{paddingLeft: 10}} placeholder="Enter Card No"
                                               keyboardType="number-pad"
                                               maxLength={12}
                                               value={billingInformation?.cardNumber}
                                               onChangeText={(text) => onChangeBillingHandler(text, "cardNumber")}/>
                                </View>
                                <View style={styles.fieldContainer}>
                                    <Text style={styles.fieldLabel}>Card Type:</Text>
                                    <Picker style={{width: 200, paddingLeft: 10}} selectedValue={billingInformation?.cardType}
                                            onValueChange={(itemValue, itemIndex) => {
                                                onChangeBillingHandler(itemValue, "cardType")
                                            }}>
                                        <Picker.Item label="Visa" value="Visa"/>
                                        <Picker.Item label="MasterCard" value="MasterCard"/>
                                        <Picker.Item label="American Express" value="American Express"/>
                                        <Picker.Item label="Discover" value="Discover"/>
                                        <Picker.Item label="JCB" value="JCB"/>
                                        <Picker.Item label="Diners Club" value="Diners Club"/>
                                        <Picker.Item label="Discover" value="Discover"/>
                                        <Picker.Item label="Maestro" value="Maestro"/>
                                        <Picker.Item label="UnionPay" value="UnionPay"/>
                                        <Picker.Item label="Other" value="Other"/>
                                    </Picker>
                                    {/*<TextInput style={{paddingLeft: 10}} placeholder="Enter Card Type"*/}
                                    {/*           value={billingInformation?.cardType}*/}
                                    {/*           onChangeText={(text) => onChangeBillingHandler(text, "cardType")}/>*/}
                                </View>
                                <View style={styles.fieldContainer}>
                                    <Text style={styles.fieldLabel}>Expiration Date:</Text>
                                    <TextInput style={{paddingLeft: 10}} placeholder="Enter Expiration date"
                                               keyboardType="number-pad"
                                               value={billingInformation?.expirationDate}
                                               onChangeText={(text) => onChangeBillingHandler(text, "expirationDate")}/>
                                </View>
                                <View style={styles.fieldContainer}>
                                    <Text style={styles.fieldLabel}>CVV:</Text>
                                    <TextInput style={{paddingLeft: 10}} placeholder="Enter CVV"
                                               value={billingInformation?.cvv}
                                               keyboardType="numeric"
                                               maxLength={3}
                                               onChangeText={(text) => onChangeBillingHandler(text, "cvv")}/>
                                </View>
                            </>
                        ) : (
                            <>
                                {paymentMethod && paymentMethod == 'upi' ? (
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.fieldLabel}>UPI:</Text>
                                        <TextInput style={{paddingLeft: 10}} placeholder="Enter UPI ID"
                                                   keyboardType="email-address"
                                                   value={billingInformation?.upiId}
                                                   onChangeText={(text) => onChangeBillingHandler(text, "upiId")}/>
                                    </View>
                                ) : (
                                    <>
                                        {paymentMethod && paymentMethod=="cod"?(
                                            <Text style={styles.paymentOptionLabel}>Cash on Delivery selected</Text>
                                        ):null}
                                    </>
                                )}
                            </>
                        )}

                    </View>

                </View>
            </ScrollView>
            <View style={styles.placeOrderContainer}>
                <TouchableOpacity
                    style={{...styles.placeOrder, backgroundColor: `${validateOrderButton ? 'orange' : 'gray'}`,}}
                    disabled={!validateOrderButton}
                    onPress={() => {
                        Alert.alert('Order', 'Place order', [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => {
                                    return false;
                                }
                            },
                        ]);
                    }}>
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
    fieldLabel: {fontSize: 14, fontWeight: 'bold'},
    placeOrderContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    placeOrder: {
        padding: 10,
        borderRadius: 20,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paymentOption: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paymentOptionsContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    paymentOptionLabel: {fontSize: 14, fontWeight: "bold"}
})