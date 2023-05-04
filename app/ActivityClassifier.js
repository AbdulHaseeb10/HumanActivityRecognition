import * as tf from '@tensorflow/tfjs';
import { View, Text } from 'react-native';
import * as ttf from '@tensorflow/tfjs-core';

const modelJSON = 'https://keras.onrender.com/model.json';
const modelWeights = 'https://keras.onrender.com/group1-shard1of1.bin';

const ActivityClassifier = () => {
  const loadModel = async () => {
    try {
      const response = await fetch(`${modelJSON}`);
      const modelTopology = await response.json();
      const weightsManifest = [
        {
          paths: [`${modelWeights}`],
          weights: null
        }
      ];
      const model = await tf.loadLayersModel(
        tf.io.fromMemory(modelTopology, weightsManifest)
      );
      console.log('Model loaded successfully');
      // console.log(model);
      // use the loaded model
    } catch (err) {
      console.log('Error loading the model:', err);
      // handle the error
    }
  }

  loadModel();

  // Create an array of 80 arrays each of size 3
const input = Array.from({length: 80}, () => Array.from({length: 3}, () => Math.random() * 2 - 1));

// Create a 3D tensor with shape [null, 80, 3]
const tensor = ttf.tensor3d(input, [1, 80, 3]);

// Print the tensor
console.log(tensor);

  
return (
  <View>
    <Text>Activity Classifier</Text>
  </View>
)
}

export default ActivityClassifier;