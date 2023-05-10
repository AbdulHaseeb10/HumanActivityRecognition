import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Accelerometer } from "expo-sensors";
let prediction;
const AccelerometerDataRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [data, setData] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const accelerometer = Accelerometer;
    setSubscription(
      accelerometer.addListener(({ x, y, z }) => {
        if (isRecording) {
          setData((prevData) => [...prevData, [x, y, z]]);
        }
      })
    );

    return () => {
      subscription && subscription.remove();
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setData([])
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    try {
      const response = await fetch('https://har-model.onrender.com/predict', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Data saved to file");
        const jsonResponse = await response.json();
        console.log("jsonResponse",jsonResponse)
        // setPrediction(jsonResponse)
        prediction=jsonResponse
      } else {
        console.error("Failed to save data to file:", response.status);
      }
    } catch (error) {
      console.error("Failed to save data to file:", error);
    }
  };

  const RenderModelResults= (model)=>{
    return (
      <View>
      <Text fontSize={{fontSize:12}}>Jogging: {model.activities.jogging}</Text>
      <Text fontSize={{fontSize:12}}>Sitting: {model.activities.sitting}</Text>
      <Text fontSize={{fontSize:12}}>Standing: {model.activities.standing}</Text>
      <Text fontSize={{fontSize:12}}>Walking: {model.activities.walking}</Text>
      <Text style={{fontSize:13}}>Activity with Highest Probablity: {model.mostProbableActivity}</Text>
      
      </View>
    )
  }

  return (
    <View>
      <TouchableOpacity
        style={{display: 'flex',alignItems: 'center',justifyContent: 'center',width:100,height:50,margin:5,backgroundColor:'grey'}}
        onPress={isRecording ? handleStopRecording : handleStartRecording}
      >
        <Text>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>
      <Text style={{fontSize:15,color:'red'}}>KNN model</Text>
      {prediction!==undefined&&RenderModelResults(prediction.knn)}
      <Text style={{fontSize:15,color:'green'}}>Decison Tree model</Text>
      {prediction!==undefined&&RenderModelResults(prediction.decisionTree)}
    </View>
  );
};

export default AccelerometerDataRecorder;
