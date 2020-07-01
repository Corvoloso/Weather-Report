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
  Button,
  ButtonText,
} from './styles';

interface WeatherDataAddress {
  street: string;
  country: string;
}

interface WeatherData {
  temperature: number;
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
              {`${weatherData.temperature}° C`}
            </Weather>

            <Location>{`${weatherData.address.street}, ${weatherData.address.country}`}</Location>
          </WeatherContainer>

          <Button temp={weatherData.temperature} onPress={handleUpdateWeather}>
            <ButtonText>Atualizar</ButtonText>
          </Button>
        </Container>
      )}
    </>
  );
};

export default App;
