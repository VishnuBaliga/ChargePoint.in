
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import MapView from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import RazorpayCheckout from 'react-native-razorpay';

const EVStationsData = [
    {
        name: 'Maruti Charging Station',
        pin: '3 pin, Fast charging',
        rating: '4.5',
        distance: '400',
        slots: '13',
        image: require('../assets/stations/station-1.png'),
    },
    {
        name: 'Vikas EV Station',
        pin: '3 pin, Normal/Fast charging',
        rating: '4.5',
        distance: '400',
        slots: '13',
        image: require('../assets/stations/station-2.png'),
    },
    {
        name: 'Bajaj EV',
        pin: '3 pin, Normal/Fast charging',
        rating: '4.5',
        distance: '400',
        slots: '13',
        image: require('../assets/stations/station-3.png'),
    },
    {
        name: 'Ather Energy - HSR',
        pin: '3 pin, Normal/Fast charging',
        rating: '4.5',
        distance: '400',
        slots: '13',
        image: require('../assets/stations/station-2.png'),
    },
    {
        name: 'TATA EV',
        pin: '3 pin, Fast charging',
        rating: '4.5',
        distance: '400',
        slots: '13',
        image: require('../assets/stations/station-1.png'),
    },
    {
        name: 'Bajaj EV',
        pin: '3 pin, Normal/Fast charging',
        rating: '4.5',
        distance: '400',
        slots: '13',
        image: require('../assets/stations/station-3.png'),
    },
    {
        name: 'Ather Energy - HSR',
        pin: '3 pin, Normal/Fast charging',
        rating: '4.5',
        distance: '400',
        slots: '13',
        image: require('../assets/stations/station-2.png'),
    },
    {
        name: 'TATA EV',
        pin: '3 pin, Fast charging',
        rating: '4.5',
        distance: '400',
        slots: '13',
        image: require('../assets/stations/station-1.png'),
    },
]



const Dashboard = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedStn, setStn] = useState(false)

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      };

    const BookNow = (station) => {
        setStn(station)
        console.log('BookNow', station);
        setModalVisible(true);
    }

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const makePayment = () => {
        var options = {
            description: 'Booking EV STation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_sawffBRKMBGKQT',
            amount: '100',
            name: 'ChargePoint Payments',
            order_id: 'order_I4lnOPcyV4hkZI',
            prefill: {
                email: 'baliga.vishnu@gmail.com',
                contact: '8129603963',
                name: 'Baliga'
            },
            theme: { color: '#0ACFC9' }
        }
        // console.log("razorpay options-->", options)
        // console.log("razorpay RazorpayCheckout-->",RazorpayCheckout)
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            // handle failure
            console.log(`Error:-->`, error);
            console.log(`Error: ${error.code} | ${error.description}`);
        });
    }
    return (
        <>
            {/* <Text>{`Dashboard location ${location}`}</Text> */}

            <MapView style={styles.map}
                showsUserLocation={true}
                initialRegion={{
                    "latitude": location ? location?.coords?.latitude : 12.9121167,
                    "latitudeDelta": location ? 120 : 0.5,
                    "longitude": location ? location?.coords?.longitude : 77.6445533,
                    "longitudeDelta": location ? 120 : 0.5,
                    'zoom': 10
                }}
                zoomEnabled={true}
            />

            <ScrollView style={styles.scrollView}>
                {EVStationsData.map((item, index) => {
                    return <View key={index} style={styles.card}>
                        <View style={styles.cardLeft}>
                            <Image style={styles.cardImage} source={item.image} />
                        </View>
                        <View style={styles.cardRight}>
                            <Text style={styles.cardTitle} >{item.name}</Text>
                            <Text style={{ marginBottom: 3 }}>{item.pin}</Text>
                            <Text>{`${item.rating}    ${item.distance}m    ${item.rating} Slots`}</Text>
                        </View>
                        <TouchableOpacity style={styles.bookBtn} onPress={() => BookNow(item)} >
                            <Text style={styles.textLight}>Book</Text>
                        </TouchableOpacity>
                    </View>
                }
                )}
            </ScrollView>




            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={styles.card}>
                            <View style={styles.cardLeft}>
                                <Image style={styles.cardImage} source={selectedStn.image} />
                            </View>
                            <View style={styles.cardRight}>
                                <Text style={styles.cardTitle} >{selectedStn.name}</Text>
                                <Text style={{ marginBottom: 3 }}>{selectedStn.pin}</Text>
                                <Text>{`${selectedStn.rating}    ${selectedStn.distance}m    ${selectedStn.rating} Slots`}</Text>
                            </View>
                        </View>


                        <View style={styles.bookCol}>
                            <Text style={styles.textDark} >Choose your slots 123</Text>
                            <View style={styles.bookRow}>
                                <TouchableOpacity style={styles.dateBtn} onPress={showDatepicker} >
                                    <Text style={styles.textLight}>Select Date</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dateBtn} onPress={showTimepicker} >
                                    <Text style={styles.textLight}>Select Time slot</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableHighlight
                                style={styles.bookBtn1} onPress={makePayment}>
                                <Text style={styles.textLight}>Confirm and Pay</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.bookBtn2}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textLight}>Cancel</Text>
                            </TouchableHighlight>



                        </View>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}


                    </View>
                </View>
            </Modal>


        </>
    );
}



const styles = StyleSheet.create({
    bookRow: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 12,
    },
    bookCol: {
        justifyContent: 'flex-start',
        marginBottom: 50,
        paddingHorizontal: 12,
        width: '100%',
    },
    scrollView: {
        // backgroundColor: 'pink',
        width: '100%',
        marginHorizontal: 5,
    },
    textLight: {
        fontSize: 16,
        color: '#fff',
    },
    bookBtn: {
        // width:'60%',
        color: '#fff',
        marginLeft: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#0ACFC9',
        borderRadius: 10,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookBtn1: {
        // width:'60%',
        color: '#fff',
        marginLeft: 10,
        marginTop: 30,
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#0ACFC9',
        borderRadius: 10,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookBtn2: {
        width: '40%',
        color: '#000',
        marginLeft: 10,
        marginTop: 80,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#bbb',
        borderRadius: 10,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    dateBtn: {
        // width:'60%',
        color: '#fff',
        marginLeft: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#868686',
        borderRadius: 10,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 34,
        color: '#fff',
    },
    mapContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    map: {
        width: '100%',
        height: '30%',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
        marginBottom: 5
    },
    card: {
        // backgroundColor:'red',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLeft: {
        // paddingVertical: 5,
        // paddingHorizontal: 10, 
        // backgroundColor:'grey',
        // height: 80,
        // width: 80
    },
    cardRight: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cardImage: {
        width: 80,
        height: 80,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    textDark: {
        fontSize: 18,
        color: '#222',
    },
    modalView: {
        margin: 12,
        width: '90%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


export default Dashboard