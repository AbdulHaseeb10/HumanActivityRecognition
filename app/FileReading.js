import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
} from "react-native";
import { Accelerometer } from "expo-sensors";
import { color } from "react-native-reanimated";
let prediction;
const AccelerometerDataRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [data, setData] = useState([]);
  const [subscription, setSubscription] = useState(null);



  const styles= StyleSheet.create({
    heading:{
      fontSize: 26,
       textAlign: 'center',
       paddingTop:50,
       fontWeight:600,
       color:"#362FD9"
    },
    recordingButton:{
      alignItems: "center",
            justifyContent: "center",
            width: 170,
            height: 60,
            borderRadius: 10,
            backgroundColor: "#19A7CE",
            marginTop:50,

    },
    butText:{
      color:"#DAF5FF",
      fontSize:18,
      fontWeight:600
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    column1: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:"red"
    },
    column2: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:"blue",
      color:"#fff"
    },
    headingCats: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subComponent:{
      margin:12
    },
    image: {
      width: 200,
      height: 200,
      alignItems:"center",
      justifyContent:"center"
    },
    subHeading:{

      fontSize:20,
      color:"#19A7CE"

    }
  })

  




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
    <View style={{backgroundColor:"#ffff"}}>
    <View>
    <View style={{alignItems:"center",justifyContent:"center"}}>
            <Text style={styles.heading}>"Smartphone Sensor-Based Human Activity Recognition: KNN and Decision Tree Approach"</Text>

      <TouchableOpacity
        style={styles.recordingButton}
        onPress={isRecording ? handleStopRecording : handleStartRecording}
      >
        <Text style={styles.butText}>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>
      </View>



       <View >

       <Text style={styles.heading}>Recorded Results </Text>


          <View style={styles.subComponent}>

              <Text style={styles.subHeading}>KNN model</Text>
                {prediction!==undefined&&RenderModelResults(prediction.knn)}

           </View>
      
          <View style={styles.subComponent}>

            <Text style={styles.subHeading}>Decison Tree model</Text>
              {prediction!==undefined&&RenderModelResults(prediction.decisionTree)}


          </View>
     

      </View> 

      
      


      
     
    </View>
    <View >
    <Image source={require('./assets/bg.jpg')} style={styles.image} />
  </View>
  </View>
  );
};

export default AccelerometerDataRecorder;
