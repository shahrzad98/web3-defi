import styled from "styled-components";

import { Center, Column, Row } from "app/components/blocks";
import { mediaQueries } from "types/constants";


export const Div = styled(Center)`
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

export const Top = styled(Row)`
  width: 100%;
  justify-content: center;
  min-width: 720px;
  ${mediaQueries.lessThan("medium")`
    min-width: auto;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;
export const TimerWrapper = styled.div`
  ${mediaQueries.lessThan("small")`
    display: none;
  `}
`;
export const BottomContent = styled(Row)`
  padding: 5px 20px 30px 20px;
  width: 100%;
  background-color: rgba(39, 46, 56, 0.4);
  ${mediaQueries.lessThan("medium")`
    flex-direction: column;
    height: 100%;
    align-items: center;
    padding: 10px 20px;
  `}
  ${mediaQueries.lessThan("small")`
    width: 100%;
    flex-direction: column-reverse;
  `}
`;

export const Bottom = styled(Column)`
  margin-top: 20px;
  width: 100%;
  max-width: 820px;
  align-items: center;
  ${mediaQueries.lessThan("medium")`
    align-items: center;
    padding: 0;
  `}
  ${mediaQueries.lessThan("medium")`
    width: 100%;
  `}
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 55px;
  ${mediaQueries.lessThan("medium")`
    display: none;
  `}
`;