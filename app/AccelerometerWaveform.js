    import React, { useEffect, useState } from 'react';
    import { StyleSheet, View ,Text} from 'react-native';
    import { Accelerometer } from 'expo-sensors'; // Install expo-sensors package

    const AccelerometerWaveform = () => {
    const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        let subscription;
        const subscribeToAccelerometer = async () => {
        subscription = Accelerometer.addListener(data => {
            setAccelerometerData(data);
        });
        };

        subscribeToAccelerometer();

        return () => {
        subscription && subscription.remove();
        };
    }, []);

    const { x, y, z } = accelerometerData;

    // Calculate the height of each waveform based on accelerometer values
    const waveformHeight = 100;
    const waveformX = (x || 0) * waveformHeight + waveformHeight / 2;
    const waveformY = (y || 0) * waveformHeight + waveformHeight / 2;
    const waveformZ = (z || 0) * waveformHeight + waveformHeight / 2;

    return (
        <View style={styles.container}>
        <View style={[styles.waveform, { height: (waveformHeight*1.6) }]}>
            <Text style={styles.label}>X</Text>
            <View style={[styles.waveformBar,{backgroundColor:"#FF1E00"}, { height: waveformX *1.6}]} />
            <Text style={styles.label}>Y</Text>

            <View style={[styles.waveformBar,{backgroundColor:"#16FF00"}, { height: waveformY*1.6 }]} />
            <Text style={styles.label}>Z</Text>

            <View style={[styles.waveformBar,{backgroundColor:"#77037B"}, { height: waveformZ*1.6 }]} />
        </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
        label:{
            fontFamily:'Poppins',
            fontSize:17,
            color:"#1D1CE5",
            fontWeight:"bold"
        },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    waveform: {
        flexDirection: 'row',
        width: '70%',
        backgroundColor: '#ffff',
    },
    waveformBar: {
        flex: 1,
        // backgroundColor: '#4287f5',
        marginHorizontal: 10,
        
    },
    });

    export default AccelerometerWaveform;