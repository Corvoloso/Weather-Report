import React, { useCallback, useEffect, useState } from 'react';

import geolocation from '@react-native-community/geolocation';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import { keys } from '../../config/keys';

import { formatKelvinToCelsius } from '../../utils/formatTemperature';

import backgroundImg from '../../assets/background.jpg';

import {
  LoadingContainer,
  Container,
  WeatherContainer,
  WeatherPrimaryContainer,
  WeatherSecondaryContainer,
  Weather,
  WeatherInfo,
  WeatherInfoMini,
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
          tempMax: formatKelvinToCelsius(response.data.main.temp),
          tempMin: formatKelvinToCelsius(response.data.main.temp),
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

          console.log(response.data.main);
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
            <WeatherPrimaryContainer>
              <Weather>{`${weatherData.temperature}°C`}</Weather>
              <WeatherInfo>{`${weatherData.address.street}, ${weatherData.address.country}`}</WeatherInfo>
            </WeatherPrimaryContainer>
            <WeatherSecondaryContainer>
              <WeatherInfoMini>{`Sensação de ${weatherData.feelsLike}°C`}</WeatherInfoMini>
              <WeatherInfoMini>{`Umidade de ${weatherData.humidity}%`}</WeatherInfoMini>
            </WeatherSecondaryContainer>
            <WeatherSecondaryContainer>
              <WeatherInfoMini>{`Máxima - ${weatherData.tempMax}°C`}</WeatherInfoMini>
              <WeatherInfoMini>{`Mínima - ${weatherData.tempMin}°C`}</WeatherInfoMini>
            </WeatherSecondaryContainer>
          </WeatherContainer>

          <Button onPress={handleUpdateWeather}>
            <ButtonText>Atualizar</ButtonText>
          </Button>
        </Container>
      )}
    </>
  );
};

export default App;
