import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Accelerometer } from "expo-sensors";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native";
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
    scrollContainer: {
      marginBottom: 100,
    },
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
      const response = await fetch("http://192.168.105.185:5000/predict", {
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
        prediction = jsonResponse;
      } else {
        console.error("Failed to get data:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const RowItem = ({ imageSource, text }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <Image
        source={{ uri: imageSource }}
        style={{ width: 40, height: 40, borderRadius: 10, marginRight: 10 }}
      />
      <Text style={styles.resultText}>{text}</Text>
    </View>
  );

  const RenderModelResults = (model) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <RowItem
          imageSource={
            "https://media.istockphoto.com/id/1334658317/photo/adult-male-runner-in-park-at-autumn-sunrise.jpg?b=1&s=170667a&w=0&k=20&c=fAYIfN7KsjwIILGChKJmjSAIsxTSeSve-2RF2uPnais="
          }
          text={`Jogging: ${model.activities.jogging}`}
        />
        <RowItem
          imageSource={
            "https://images.unsplash.com/photo-1563729610706-f85f32ef3846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNpdHRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          }
          text={`Sitting: ${model.activities.sitting}`}
        />
        <RowItem
          imageSource={
            "https://images.unsplash.com/photo-1612465538492-bf22b3a264e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHN0YW5kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          }
          text={`Standing: ${model.activities.standing}`}
        />
        <RowItem
          imageSource={
            "https://images.unsplash.com/photo-1519255122284-c3acd66be602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2Fsa2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          text={`Walking: ${model.activities.walking}`}
        />
        <Text
          style={{
            fontSize: 17,
            paddingTop: 5,
            fontWeight: "bold",
          }}
        >
          Activity with Highest Probablity: {model.mostProbableActivity}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      scrollToEnd={true}
      scrollEnabled={true}
      style={{ backgroundColor: "#ffff" }}
    >
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

        <View style={styles.scrollContainer}>
          <Text style={styles.heading}>Recorded Results </Text>
          <View>
            <View style={styles.subComponent}>
              <Text style={styles.subHeading}>KNN model</Text>
              {!isRecording &&
                prediction !== undefined &&
                RenderModelResults(prediction.knn)}
            </View>

            <View style={styles.subComponent}>
              <Text style={styles.subHeading}>Decison Tree model</Text>
              {!isRecording &&
                prediction !== undefined &&
                RenderModelResults(prediction.decisionTree)}
            </View>

            <View style={styles.subComponent}>
              <Text style={styles.subHeading}>LSTM Model</Text>
              {!isRecording &&
                prediction !== undefined &&
                RenderModelResults(prediction.lstm)}
            </View>
          </View>

          <View>{isRecording && <AccelerometerWaveform />}</View>
          {/* <View>{isRecording && <Image style={{width:300,height:200}} source={'./assets/bg.jpg')} />}</View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default AccelerometerDataRecorder;
