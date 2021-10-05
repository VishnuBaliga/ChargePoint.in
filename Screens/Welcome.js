import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';


const Welcome = ({ navigation }) => {

    const [isAuthScreen, setisAuthScreen] = useState(false);
    const [text, onChangeText] = React.useState("Useless Text");
    const [MobNumber, onChangeNumber] = React.useState(null);


    const TWILIO_SID = `SKbf865f6fd2d2587f293afd2bd6ac8a73`;
    const TWILIO_SECRET = `Ht01UzAaJpeDYUrZrD5VkztZUkLLenV3`;
    const TWILIO_VERIFY_URL = `https://verify-5864-i2tbbn.twil.io/start-verify`;

    const getOTP = (num) => {

        console.log('MobNumber', MobNumber);

        //   axios.post(TWILIO_VERIFY_URL, {
        //     "to": 'MobNumber',
        //     "channel": "sms",
        //     "locale": "en"
        // })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (res) {
        //     // console.log(res.data.error);
        //     // Toast.show("Not a valid Mobile number", {
        //     //   duration: Toast.durations.LONG,
        //     // });
        //     ToastAndroid.show('Invalid OTP, Please check!', ToastAndroid.LONG, ToastAndroid.TOP);
        //   });
        navigation.navigate('Dashboard');

    }

    return (
        <>
            {
                !isAuthScreen ?

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.touchableArea} onPress={() => setisAuthScreen(true)} >
                            <Text style={styles.text}>ChargePoint.in</Text>

                            <StatusBar style="auto" />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.authContainer}>
                        <Image
                            style={styles.bgImage}
                            source={require('../assets/splash-1.png')}
                        />
                        <Text style={styles.textDark}>Let’s Get Started</Text>
                        <Text style={styles.textDarkDesc}>Please enter mobile number to verify</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber}
                            value={MobNumber}
                            placeholder="+91 Mobile number"
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.actionBtn} onPress={() => getOTP()} >
                            <Text style={styles.textLight}>Login</Text>
                        </TouchableOpacity>

                    </View>

            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#55C595',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionBtn: {
        width: '60%',
        color: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginTop: 24,
        backgroundColor: '#55C595',
        borderRadius: 10,
        flex: 0,
        backgroundColor: '#55C595',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableArea: {
        height: '100%',
        width: '100%',
        flex: 1,
        backgroundColor: '#55C595',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeBtn: {
        color: "#fff",
        backgroundColor: '#359D9E',

    },
    authContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 34,
        color: '#fff',
    },
    textDark: {
        fontSize: 28,
        color: '#222',
    },
    textDarkDesc: {
        fontSize: 16,
        color: '#605F5F',
    },
    textLight: {
        fontSize: 16,
        color: '#fff',
    },
    bgImage: {
        width: '90%',
        maxHeight: '40%',
        resizeMode: 'contain',
    },
    input: {
        height: 60,
        fontSize: 24,
        marginTop: 36,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '80%',
        borderColor: 'transparent',
        borderBottomColor: '#6BC7A6'

    },
});

export default Welcome