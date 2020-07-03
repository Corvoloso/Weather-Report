import React, { useCallback, useEffect, useState } from 'react';

import Geolocation from 'react-native-geolocation-service';
import { ActivityIndicator, View, PermissionsAndroid } from 'react-native';
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
  WeatherMinMaxContainer,
  MinMaxContainer,
  WeatherMinMax,
  LocationText,
  Button,
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

interface GeolocationProps {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge?: number;
}

const geoOptions: GeolocationProps = {
  enableHighAccuracy: false,
  timeout: 3000,
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    address: {
      country: '',
      street: '',
    },
  } as WeatherData);

  const handleUpdateWeather = useCallback(() => {
    try {
      Geolocation.getCurrentPosition(
        async position => {
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
        },
        error => {
          console.log(error);
        },
        geoOptions,
      );

      setLoading(false);
    } catch (err) {
      console.log(`ERROR - ${err}`);
    }
  }, []);

  useEffect(() => {
    const loadWeather = async (): Promise<void> => {
      try {
        await PermissionsAndroid.requestMultiple([
          'android.permission.ACCESS_COARSE_LOCATION',
          'android.permission.ACCESS_FINE_LOCATION',
        ]);

        Geolocation.getCurrentPosition(
          async position => {
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
          },
          error => {
            console.log(`${error.code} - ${error.message}`);
          },
          geoOptions,
        );
      } catch (err) {
        console.log(`ERROR - ${err}`);

        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#333" />
        </LoadingContainer>
      ) : (
        <Container source={backgroundImg}>
          <WeatherContainer>
            <Title>Weather Report</Title>

            <TodayData>
              <Icon
                name={
                  Number(new Date().toLocaleTimeString().split(':')[0]) >= 6 &&
                  Number(new Date().toLocaleTimeString().split(':')[0]) <= 18
                    ? 'sun'
                    : 'moon'
                }
                color={
                  Number(new Date().toLocaleTimeString().split(':')[0]) >= 6 &&
                  Number(new Date().toLocaleTimeString().split(':')[0]) <= 18
                    ? '#FFA500'
                    : '#D8DAD3'
                }
                size={32}
                style={{ marginRight: 16 }}
              />

              <View>
                <TodayTitle>Hoje</TodayTitle>
                <TodayDescription>
                  {new Date().toLocaleDateString()}
                </TodayDescription>
              </View>
            </TodayData>

            <WeatherDataContainer>
              <Weather>{`${weatherData.temperature}°C`}</Weather>

              <WeatherMinMaxContainer>
                <MinMaxContainer>
                  <Icon name="chevron-up" size={24} color="#029f40" />
                  <WeatherMinMax>{`${weatherData.tempMax}°C`}</WeatherMinMax>
                </MinMaxContainer>

                <MinMaxContainer>
                  <Icon name="chevron-down" size={24} color="#c53030" />
                  <WeatherMinMax>{`${weatherData.tempMin}°C`}</WeatherMinMax>
                </MinMaxContainer>
              </WeatherMinMaxContainer>

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
