import React, { useCallback, useEffect, useState } from 'react';

import geolocation from '@react-native-community/geolocation';
import { ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

import { keys } from '../../config/keys';

import { formatKelvinToCelsius } from '../../utils/formatTemperature';

import backgroundImg from '../../assets/background.jpg';

import {
  LoadingContainer,
  Container,
  WeatherContainer,
  Title,
  TodayData,
  TodayTitle,
  TodayDescription,
  WeatherDataContainer,
  Weather,
  LocationText,
  Button,
  ButtonText,
} from './styles';

interface WeatherDataAddress {
  street: string;
  country: string;
}

interface WeatherData {
  temperature: number;
  tempMax: number;
  tempMin: number;
  feelsLike: number;
  humidity: number;
  address: WeatherDataAddress;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData>(
    {} as WeatherData,
  );

  const handleUpdateWeather = useCallback(() => {
    try {
      geolocation.getCurrentPosition(async position => {
        const response = await api.get(
          `/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${keys.api}`,
        );

        setWeatherData({
          temperature: formatKelvinToCelsius(response.data.main.temp),
          humidity: response.data.main.humidity,
          feelsLike: formatKelvinToCelsius(response.data.main.temp),
          tempMax: formatKelvinToCelsius(response.data.main.temp_max),
          tempMin: formatKelvinToCelsius(response.data.main.temp_min),
          address: {
            street: response.data.name,
            country: response.data.sys.country,
          },
        });
      });
    } catch (err) {
      console.log(`ERROR - ${err}`);
    }
  }, []);

  useEffect(() => {
    const loadWeather = (): void => {
      try {
        geolocation.getCurrentPosition(async position => {
          const response = await api.get(
            `/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${keys.api}`,
          );

          setWeatherData({
            temperature: formatKelvinToCelsius(response.data.main.temp),
            humidity: response.data.main.humidity,
            feelsLike: formatKelvinToCelsius(response.data.main.temp),
            tempMax: formatKelvinToCelsius(response.data.main.temp_max),
            tempMin: formatKelvinToCelsius(response.data.main.temp_min),
            address: {
              street: response.data.name,
              country: response.data.sys.country,
            },
          });
          setLoading(false);
        });
      } catch (err) {
        console.log(`ERROR - ${err}`);
      }
    };

    loadWeather();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#5465FF" />
        </LoadingContainer>
      ) : (
        <Container source={backgroundImg}>
          <WeatherContainer>
            <Title>Weather Report</Title>

            <TodayData>
              <Icon
                name="sun"
                color="#FFA500"
                size={32}
                style={{ marginRight: 16 }}
              />

              <View>
                <TodayTitle>Hoje</TodayTitle>
                <TodayDescription>18/05</TodayDescription>
              </View>
            </TodayData>

            <WeatherDataContainer>
              <Weather>{`${weatherData.temperature}°C`}</Weather>

              <LocationText>
                {`${weatherData.address.street}, ${weatherData.address.country}`}
              </LocationText>
            </WeatherDataContainer>
          </WeatherContainer>

          <Button onPress={handleUpdateWeather}>
            <Icon name="globe" size={48} color="#fff" />
          </Button>
        </Container>
      )}
    </>
  );
};

export default App;
