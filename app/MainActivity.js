// import React, { useState, useEffect } from 'react';
// import { Text, View } from 'react-native';
// import { Accelerometer } from 'expo-sensors';
// import ActivityClassifier from './ActivityClassifier';

// export default function MainActivity() {
//   const [accArray, setAccArray] = useState([]);
//   const [subscription, setSubscription] = useState(null);

//   useEffect(() => {
//     // Subscribe to accelerometer updates
//     setSubscription(Accelerometer.addListener((accData) => {
//       // Push new data into array
//       const newAccArray = [...accArray, [accData.x, accData.y, accData.z]];
//       setAccArray(newAccArray);

//       // If we have collected 80 arrays, send to other component and clear accArray
//       if (newAccArray.length === 80) {
//         SendAccDataToComponent(newAccArray);
//         setAccArray([]);
//       }
//     }));

//     // Unsubscribe when component is unmounted
//     return () => {
//       subscription && subscription.remove();
//     };
//   }, []);

//   const SendAccDataToComponent = (data) => {
//     // Do something with the data
//     console.log(data);
//     return(
//       <ActivityClassifier accelerometerData={data}/>
//     )
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//      <Text>Main Activity</Text>
//     </View>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Text, View } from 'react-native';
// import { Accelerometer } from 'expo-sensors';
// import ActivityClassifier from './ActivityClassifier';

// let sendData;
// let arr=[];
// export default function MainActivity() {
//   const [accArray, setAccArray] = useState([]);
//   const [activityData, setActivityData] = useState(null);
//   const [subscription, setSubscription] = useState(null);

//   useEffect(() => {
//     // Subscribe to accelerometer updates
//     setSubscription(Accelerometer.addListener((accData) => {
//       // Push new data into array
//       const newAccArray = [...accArray, [accData.x, accData.y, accData.z]];
//       arr.push([accData.x, accData.y, accData.z])
//       if (arr.length === 80) {
//         // console.log(arr);
//         SendAccDataToComponent(arr);
//         setAccArray([]);
//       } else {
//         setAccArray(newAccArray);
//       }
//     }));
  
//     // Unsubscribe when component is unmounted
//     return () => {
//       subscription && subscription.remove();
//     };
//   }, []);
  
//   const SendAccDataToComponent = (data) => {
//     // Do something with the data
//     // console.log(data);
//     // if (data.length===80)
//     // setActivityData(data);
//     sendData = data;
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Main Activity</Text>
//       {sendData && <ActivityClassifier accelerometerData={sendData}/>}
//     </View>
//   );
// }
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';

const AccelerometerDataRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [data, setData] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const accelerometer = Accelerometer;
    setSubscription(
      accelerometer.addListener(({ x, y, z }) => {
        if (isRecording) {
          setData(prevData => [...prevData, [x, y, z]]);
        }
      })
    );

    return () => {
      subscription && subscription.remove();
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    const csvData = data.map(row => row.join(',')).join('\n');
    const filePath = `${FileSystem.documentDirectory}activity1.csv`;

    try {
      await FileSystem.writeAsStringAsync(filePath, csvData);
      console.log('Data saved to file:', filePath);
    } catch (error) {
      console.error('Failed to save data to file:', error);
    }
  };

  return (
    <View >
      <TouchableOpacity
        onPress={isRecording ? handleStopRecording : handleStartRecording}
      >
        <Text>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  recording: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AccelerometerDataRecorder;


