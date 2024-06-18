import { StyleSheet, Text, View } from "react-native";

export default function Weather ({city, temp, conditions}: {city: string, temp: number, conditions: string}) {
    return (
        <View style={style.container}>
            <View style={style.position}>
                <Text style={style.temp}>{city}</Text>
                <Text style={style.temp}>{temp}°</Text>
            </View>
            <Text style={style.conditions}>{conditions}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
      backgroundColor: '#7776B3',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    position: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    temp: {
        fontSize: 50,
        paddingTop: 40
    },
    conditions: {
        fontSize: 40,
        paddingBottom: 100
    }
  })