import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { View, Text } from "react-native";
const modelJSON = "https://keras.onrender.com/model.json";
const modelWeights = "https://keras.onrender.com/group1-shard1of1.bin";

const ActivityClassifier = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [outputValues, setOutputValues] = useState(null);
  let model;
  const loadModel = async () => {
    try {
      const response = await fetch(`${modelJSON}`);
      const modelTopology = await response.json();
      const weightsManifest = [
        {
          paths: [`${modelWeights}`],
          weights: null,
        },
      ];
      model = await tf.loadLayersModel(
        tf.io.fromMemory(modelTopology, weightsManifest)
      );
      console.log("Model loaded successfully");
      setModelLoaded(true);

      // call predict on the loaded model
      let inputValues = [];
      for (let i = 0; i < 80; i++) {
        let arr = [];
        for (let j = 0; j < 3; j++) {
          arr.push(Math.random() * 2 - 1);
        }
        inputValues.push(arr);
      }
      inputValues=[inputValues];
      const inputTensor = tf.tensor(inputValues);
      // console.log(model.summary());
      const outputTensor = model.predict(inputTensor);
      const outputValues = outputTensor.arraySync();
      setOutputValues(outputValues);
    } catch (err) {
      console.log("Error loading the model:", err);
      // handle the error
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <View>
      {modelLoaded ? (
        <View>
          <Text>
            Activity Classifier
            {outputValues && <div>{outputValues}</div>}
          </Text>
        </View>
      ) : (
        <Text>Loading model...</Text>
      )}
    </View>
  );
};

export default ActivityClassifier;

// import React, { useEffect } from "react";
// import { Text, View } from "react-native";
// import { Accelerometer } from "expo-sensors";

// export default function App() {
// let accelerometerData=[]
//   useEffect(() => {
//     // Subscribe to accelerometer updates
//     const subscription = Accelerometer.addListener((accData) => {
//       let arr = [accData.x, accData.y,accData.z];
//       accelerometerData.push(arr);
//     });

//     // Unsubscribe when component is unmounted
//     return () => {
//       subscription.remove();
//       ax = [];
//       ay = [];
//       az = [];
//     };
//   }, []);

//   const sendDataToServer = () => {
//     // Define the URL of the server
//     const serverUrl = "http://localhost:3000/predict";

//     // Define the data to be sent in the request body
//     const requestBody = {
//       accelerometerData:
//         accelerometerData.length >= 80 ? [accelerometerData.slice(0, 80)] : [],
//     };

//     // Define the options for the request
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     };

//     // Make the request to the server
//     fetch(serverUrl, options)
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response data
//         console.log(data);
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error(error);
//       });
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Text style={{ marginVertical: 10 }}>
//         Accelerometer data: {JSON.stringify(accelerometerData)}
//       </Text>
//       <Text
//         style={{
//           backgroundColor: "#0000ff",
//           color: "#ffffff",
//           padding: 10,
//         }}
//         onPress={sendDataToServer}
//       >
//         Send Data to Server
//       </Text>
//     </View>
//   );
// }

// import { Text, View } from "react-native";

// export default function ActivityClassifier() {

//   // console.log("accelerometerData",accelerometerData,"size",accelerometerData['accelerometerData'].length);

//   const sendDataToServer = () => {
//     // Define the URL of the server
//     const serverUrl = "http://localhost:3000/predict";

//     // Define the data to be sent in the request body
//     // const requestBody = {
//     //   accelerometerData:
//     //     accelerometerData.length >= 80 ? [accelerometerData.slice(0, 80)] : [],
//     // };

//     let inputValues = [];
// for (let i = 0; i < 80; i++) {
//   let arr = [];
//   for (let j = 0; j < 3; j++) {
//     arr.push(Math.random() * 3 - 2);
//   }
//   inputValues.push(arr);
// }
// inputValues = [inputValues];
// const requestBody = {
//   accelerometerData: inputValues
// };
//     // Define the options for the request
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     };

//     // Make the request to the server
//     fetch(serverUrl, options)
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response data
//         console.log(data);
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error(error);
//       });
//   };

//   return (
//     <View
//       // style={{
//       //   flex: 1,
//       //   backgroundColor: "#fff",
//       //   alignItems: "center",
//       //   justifyContent: "center",
//       // }}
//     >
//       <Text>
//         {/* Accelerometer data: {JSON.stringify(accelerometerData)} */}
//         Activity
//       </Text>
//       <Text
//         style={{
//           backgroundColor: "#0000ff",
//           color: "#ffffff",
//           padding: 10,
//         }}
//         onPress={sendDataToServer}
//       >
//         Send Data to Server
//       </Text>
//     </View>
//   );
// }

// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { View,Text } from 'react-native';

// const inputValues = [];
// for (let i = 0; i < 80; i++) {
//   let arr = [];
//   for (let j = 0; j < 3; j++) {
//     arr.push(Math.random() * 3 - 2);
//   }
//   inputValues.push(arr);
// }
// const payload = { accelerometerData: inputValues };

// const App = () => {
//   useEffect(() => {
//     axios.post('http://localhost:3000/predict', payload, {
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(response => console.log(response))
//       .catch(error => console.error(error));
//   }, []);

//   // useEffect(() => {

//   //     axios.post("http://localhost:3000/predict",{

//   //     })

//   //   fetch('http://localhost:3000/predict', {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify(payload)
//   //   })
//   //     .then(response => response.json())
//   //     .then(data => console.log(data))
//   //     .catch(error => console.error(error));
//   // }, []);

//   return (
//     <View>
//       <Text>Activity Classifier</Text>
//     </View>
//   );
// };

// export default App;
