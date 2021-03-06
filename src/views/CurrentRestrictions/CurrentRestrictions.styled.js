import styled from 'styled-components';
import { Color } from '../../theme/colors';

export const CurrentRestrictions = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-flow: wrap column;
  justify-content: flex-start;
  width: 100%;
  max-width: 338px;
  margin: 24px auto 0;
  @media (max-width: 320px) {
    max-width: 290px;
  }
`;

export const Title = styled.h2`
  margin: ${({ noMargin }) => (noMargin ? '0' : '0 0 22px 0')};
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: ${Color.black};
`;

export const Paragraph = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: ${Color.black};
`;

export const ButtonWrapper = styled.div`
  margin-top: 22px;
  width: 100%;
`;

export const Small = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
  font-size: 10px;
  line-height: 14px;
  font-weight: 400;
  color: ${Color.primary};
`;

export const UrlLink = styled.a`
  display: inline-block;
  width: 100%;
`;

export const SearchWrapper = styled.div`
  display: block;
  width: 100%;
  padding: 18px;
`;
