import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Accelerometer } from "expo-sensors";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import AccelerometerWaveform from "./AccelerometerWaveform";
let prediction;
const AccelerometerDataRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [data, setData] = useState([]);
  const [subscription, setSubscription] = useState(null);

  const styles = StyleSheet.create({
    heading: {
      fontSize: 25,
      textAlign: "center",
      paddingTop: 50,
      padding: 5,
      fontWeight: 600,
      color: "#362FD9",
      fontFamily: "Poppins",
    },
    recordingButton: {
      alignItems: "center",
      justifyContent: "center",
      width: 170,
      height: 60,
      borderRadius: 10,
      backgroundColor: "#0014FF",
      marginTop: 50,
    },
    butText: {
      color: "#ffff",
      fontSize: 19,
      fontWeight: 600,
      fontFamily: "Poppins",
    },
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Poppins",
    },
    column1: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "red",
    },
    column2: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "blue",
      color: "#fff",
    },
    headingCats: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      fontFamily: "Poppins",
    },
    subComponent: {
      margin: 12,
      fontFamily: "Poppins",
    },
    image: {
      width: 200,
      height: 200,
      alignItems: "center",
      justifyContent: "center",
    },
    subHeading: {
      fontSize: 20,
      color: "#009EFF",
      fontFamily: "Poppins",
    },
    resultText: {
      fontFamily: "Poppins",
      fontSize: 15,
    },
    scrollContainer:{
      marginBottom:10
    }
  });

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
    setData([]);
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    try {
      const response = await fetch("https://har-model.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Data saved to file");
        const jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse);
        // setPrediction(jsonResponse)
        prediction = jsonResponse;
      } else {
        console.error("Failed to save data to file:", response.status);
      }
    } catch (error) {
      console.error("Failed to save data to file:", error);
    }
  };

  const RenderModelResults = (model) => {
    return (
      <View>
        <Text style={styles.resultText}>
          Jogging: {model.activities.jogging}
        </Text>
        <Text style={styles.resultText}>
          Sitting: {model.activities.sitting}
        </Text>
        <Text style={styles.resultText}>
          Standing: {model.activities.standing}
        </Text>
        <Text style={styles.resultText}>
          Walking: {model.activities.walking}
        </Text>
        <Text style={styles.resultText}>
          Activity with Highest Probablity: {model.mostProbableActivity}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#ffff" }}>
      <View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.heading}>
            Smartphone Sensor-Based Human Activity Recognition
          </Text>

          <TouchableOpacity
            style={styles.recordingButton}
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            <Text style={styles.butText}>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.heading}>Recorded Results </Text>





              {isRecording&& 
                  <View>

                  <View style={styles.subComponent}>
                    <Text style={styles.subHeading}>KNN model</Text>
                  </View>

                  <View style={styles.subComponent}>
                    <Text style={styles.subHeading}>Decison Tree model</Text>
                    
                  </View>

                  <View style={styles.subComponent}>
                    <Text style={styles.subHeading}>LSTM Model</Text>
                  </View>
                  </View> }
                        















          {(!isRecording)&&
          
          <View>

          <View style={styles.subComponent}>
            <Text style={styles.subHeading}>KNN model</Text>
            {prediction !== undefined && RenderModelResults(prediction.knn)}
          </View>

          <View style={styles.subComponent}>
            <Text style={styles.subHeading}>Decison Tree model</Text>
            {prediction !== undefined &&
              RenderModelResults(prediction.decisionTree)}
          </View>

          <View style={styles.subComponent}>
            <Text style={styles.subHeading}>LSTM Model</Text>
            {prediction !== undefined && RenderModelResults(prediction.lstm)}
          </View>
          </View>

          
          
          
          
          
          
          
          }
         
          <View>{isRecording && <AccelerometerWaveform />}</View>
          {/* <View>{isRecording && <Image style={{width:300,height:200}} source={require('./assets/bg.jpg')} />}</View> */}

        </ScrollView>
      </View>
    </View>
  );
};

export default AccelerometerDataRecorder;
