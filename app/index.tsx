import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';

import Weather from "@/components/Weather";

const API_KEY = 'dae8ec51bd214266a65164251241806';

export default function Index() {

  type Position = {
    latitude: number;
    longitude: number;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState(0);
  const [conditions, setConditions] = useState('');

  async function fetchWeather (latitude: number, longitude: number) {
    if (latitude && longitude) {
      const resp = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`);
      const weatherData = await resp.json();

      return weatherData;
    }

    return null;
  }

  useEffect(() => {
    function onSuccess (position: {coords: {latitude: number, longitude: number}}) {
      setPosition(position.coords);
    }

    function onError () {
      console.error('Error getting position');
    }

    Location.installWebGeolocationPolyfill()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      console.error('Geolocation not supported');
    }
  }, []);

  useEffect(() => {
    async function fetchWeatherData () {
      try {
        if (position) {
          const { latitude, longitude } = position;
          const data = await fetchWeather(latitude, longitude);

          const temp = data.current.temp_c;
          const conditions = data.current.condition.text;
          const city = data.location.name

          setTemp(temp);
          setConditions(conditions);
          setCity(city);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchWeatherData();
  }, [position]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {
        isLoading ?
        <View style={style.loader}>
          <ActivityIndicator size={'large'} color={'white'}/>
        </View> :
        <Weather city={city} temp={temp} conditions={conditions}/>
      }
    </View>
  );
}


const style = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: '#7776B3',
    justifyContent: 'center',
    alignItems: 'center'
  }
})