import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import axios from 'axios';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    let subscription;
    if (isRecording) {
      const accelerometerObservable = Accelerometer.addListener(({ x, y, z }) => {
        setData(prevData => [...prevData, { x, y, z }]);
      });
  
      subscription = accelerometerObservable;
    }
  
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isRecording]);
  

  const handleStartRecording = () => {
    setData([]);
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    // Prepare data for CSV
    const csvData = data.map(({ x, y, z }) => `${x},${y},${z}`).join('\n');

    // Send data to server
    axios.post('http://192.168.0.107:3000/save-data', csvData)
      .then(response => {
        console.log('Data saved on the server');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View >
      <TouchableOpacity
        onPress={handleStartRecording}
        disabled={isRecording}
      >
        <Text style={{margin:25,fontSize:30}} >Start</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleStopRecording}
        disabled={!isRecording}
      >
        <Text style={{margin:25,fontSize:30}}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
