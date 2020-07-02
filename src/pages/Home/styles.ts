import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  background: #e2fdff;

  justify-content: space-evenly;
  align-items: center;

  padding: 0 24px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  background: #e2fdff;

  justify-content: space-evenly;
  align-items: center;

  padding: 0 24px;
`;

export const WeatherContainer = styled.View`
  align-items: center;
`;

export const WeatherPrimaryContainer = styled.View``;

export const WeatherSecondaryContainer = styled.View`
  margin-top: 16px;
  width: 100%;
  flex-flow: row;

  justify-content: space-evenly;
`;

export const Weather = styled.Text`
  font-size: 64px;
  color: #fff;
`;

export const WeatherInfo = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const WeatherInfoMini = styled.Text`
  font-size: 12px;
  color: #fff;
`;

export const Button = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;
