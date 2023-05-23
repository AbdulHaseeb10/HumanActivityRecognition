import React,{useEffect,useState} from 'react'
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const ActivitiesChart = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const chartConfig = {
      color: (opacity = 1) => `rgba(26, 147, 111, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2, // Border width of pie chart slices
    };
    
    useEffect(() => {
      // Format data for the pie chart
      const formattedData = Object.keys(data.activities).map((activity) => ({
        name: activity,
        population: data.activities[activity],
        color: getRandomColor(), // Custom function to get random colors
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }));
  
      setChartData(formattedData);
    }, [data]);
  
    return (
      <View>
        <Text style={{ alignSelf: 'center', fontSize: 20 }}>
          Most Probable Activity: {data.mostProbableActivity}
        </Text>
        <PieChart
          marginLeft="15"
          data={chartData}
          width={300}
          height={300}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    );
  };
  
  export default ActivitiesChart;