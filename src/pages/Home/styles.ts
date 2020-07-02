import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  background: #e2fdff;

  align-items: center;
  justify-content: center;

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
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 16px;
  font-size: 20px;
  color: #fff;
`;

export const TodayData = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: center;

  margin-top: 16;
`;

export const TodayTitle = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const TodayDescription = styled.Text`
  font-size: 12px;
  color: #fff;
`;

export const WeatherDataContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Weather = styled.Text`
  margin-top: 32px;

  font-size: 48px;
  color: #fff;
`;

export const LocationText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: #fff;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 60px;

  margin-bottom: 16px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #000;
  font-size: 20px;
`;
