import styled, { css } from 'styled-components/native';

interface WeatherProps {
  temp: number;
}

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
  justify-content: center;
  align-items: center;
`;

export const Weather = styled.Text<WeatherProps>`
  font-size: 48px;

  ${props =>
    props.temp >= 25
      ? css`
          color: #5465ff;
        `
      : css`
          color: #1e96fc;
        `}
`;

export const Location = styled.Text<WeatherProps>`
  font-size: 16px;
  color: #fff;
`;

export const InfoContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Info = styled.Text`
  min-width: 200px;
  font-size: 16px;
  color: #000;
`;

export const Button = styled.TouchableOpacity<WeatherProps>`
  ${props =>
    props.temp >= 25
      ? css`
          background: #5465ff;
        `
      : css`
          background: #1e96fc;
        `}

  width: 100%;
  padding: 16px;
  border-radius: 4px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<WeatherProps>`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;
