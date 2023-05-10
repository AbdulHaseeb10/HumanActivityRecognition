// import React, { useState } from 'react';
// import { Text, View, Button } from 'react-native';
// import { Accelerometer } from 'expo-sensors';

// export default function App() {
//   const [accData, setAccData] = useState([]);
//   const [prediction, setPrediction] = useState('');

//   const startRecording = () => {
//     setAccData([]);
//     Accelerometer.addListener((data) => {
//       setAccData((prevData) => [...prevData, data]);
//     });
//   };

//   const stopRecording = () => {
//     Accelerometer.removeAllListeners();
//     fetch('http://192.168.0.107:5000/predict', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ accData }),
//     })
//       .then((response) => response.json())
//       .then((data) => setPrediction(data.prediction))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <View >
//       <Text>Accelerometer Data: {JSON.stringify(accData)}</Text>
//       <Text>Prediction: {prediction}</Text>
//       <Button title="Start" onPress={startRecording} />
//       <Button title="Stop" onPress={stopRecording} />
//     </View>
//   );
// }


import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [accData, setAccData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setAccData([]);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    const data = {
      accelerometer_data: accData
    };
    const response = await fetch('http://192.168.0.107:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const jsonResponse = await response.json();
    setPrediction(jsonResponse.predictions);
  };

  const onAccelerometerData = ({ x, y, z }) => {
    if (isRecording) {
      setAccData(prevData => [...prevData, [x, y, z]]);
    }
  };

  Accelerometer.addListener(onAccelerometerData);

  return (
    <View >
      <Text>Accelerometer Data</Text>
      <Button
        title={isRecording ? 'Stop' : 'Start'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      {prediction && (
        <Text>{`Prediction: ${prediction}`}</Text>
      )}
    </View>
  );
}