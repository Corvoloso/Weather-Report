import React, { useCallback, useEffect, useState } from 'react';

import geolocation from '@react-native-community/geolocation';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import { keys } from '../../config/keys';

import { formatKelvinToCelsius } from '../../utils/formatTemperature';

import sunnyBackgroundImg from '../../assets/sunnyBackground.png';
import colderBackgroundImg from '../../assets/colderBackground.png';

import {
  LoadingContainer,
  Container,
  WeatherContainer,
  Weather,
  Location,
  InfoContainer,
  Info,
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
  sky: string;
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
          sky: response.data.weather[0].description,
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

          setWeatherData({
            temperature: formatKelvinToCelsius(response.data.main.temp),
            humidity: response.data.main.humidity,
            sky: response.data.weather[0].description,
            feelsLike: formatKelvinToCelsius(response.data.main.temp),
            tempMax: formatKelvinToCelsius(response.data.main.temp),
            tempMin: formatKelvinToCelsius(response.data.main.temp),
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
        <Container
          source={
            weatherData.temperature >= 25
              ? sunnyBackgroundImg
              : colderBackgroundImg
          }
        >
          <WeatherContainer>
            <Weather temp={weatherData.temperature}>
              {`${weatherData.temperature}°C`}
            </Weather>

            <Location temp={weatherData.temperature}>
              {`${weatherData.address.street}, ${weatherData.address.country}`}
            </Location>
          </WeatherContainer>

          <InfoContainer>
            <Info>{`Sensação: ${weatherData.feelsLike}`}</Info>

            <Info>{`Umidade: ${weatherData.humidity}%`}</Info>

            <Info>{`Maxima: ${weatherData.tempMax}`}</Info>
            <Info>{`Mínima: ${weatherData.tempMin}`}</Info>
          </InfoContainer>

          <Button temp={weatherData.temperature} onPress={handleUpdateWeather}>
            <ButtonText>Atualizar</ButtonText>
          </Button>
        </Container>
      )}
    </>
  );
};

export default App;
