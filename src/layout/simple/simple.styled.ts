import styled from 'styled-components';
import { colors, mixins } from '../../styles';

export const Container = styled.div`
  ${mixins.flexCenter()};
  background-color: ${colors.M2};
  min-height: 100vh;
`;

export const Main = styled.main`
  box-sizing: content-box;
  padding: 24px;
  border: 1px solid #ededed;
  border-radius: 4px;
  background-color: ${colors.M1};
  width: 360px;
`;

export const Title = styled.h2`
  ${mixins.typography('h2')};
  text-align: center;
  margin: 24px 0 0;
`;

export const SubTitle = styled.p`
  ${mixins.typography('p')};
  text-align: center;
  margin: 0 0 32px;
`;
