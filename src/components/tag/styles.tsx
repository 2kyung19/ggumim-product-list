import styled from 'styled-components';
import { CANCELICON, MAGNIFYICON, TOOLTIP } from 'utils/url';
import { IMGRATE, IMGWIDTH } from 'utils/constants';

const Btn = styled.button<{ active: boolean; pointX: number; pointY: number }>`
  position: absolute;
  width: ${(props) => props.theme.icon.size};
  height: ${(props) => props.theme.icon.size};
  background-color: transparent;
  background: url(${(props) => (props.active ? CANCELICON : MAGNIFYICON)});
  background-repeat: no-repeat;
  background-size: cover;
  border: 0px;
  left: ${(props) => props.pointY * IMGRATE}px;
  top: ${(props) => props.pointX * IMGRATE}px;
  z-index: 1;
`;

const Tooltip = styled.div<{
  active: boolean;
  height: number;
  pointX: number;
  pointY: number;
}>`
  position: absolute;
  left: ${(props) => {
    if (props.pointY * IMGRATE < IMGWIDTH / 2)
      return props.pointY * IMGRATE - 24;
    return props.pointY * IMGRATE - 24 - 140;
  }}px;
  top: ${(props) => {
    if (props.pointX * IMGRATE < props.height / 2)
      return props.pointX * IMGRATE + 28;
    return props.pointX * IMGRATE - 28 - 86;
  }}px;
  width: 220px;
  height: 86px;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 7px;
  display: ${(props) => {
    if (props.active) return 'flex';
    return 'none';
  }};
  align-items: center;
  padding: 8px 0 8px 8px;
  box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 20%);
  color: #4a4a4a;
  font-size: 14px;
  z-index: 1000;

  ::before {
    content: '';
    position: absolute;
    ${(props) => {
      if (props.pointX * IMGRATE < props.height / 2) return 'top:-8px';
      return 'bottom:-8px; transform: rotate(180deg)';
    }};
    ${(props) => {
      if (props.pointY * IMGRATE < IMGWIDTH / 2) return 'left:34px';
      return 'right:34px';
    }};
    width: 12px;
    height: 8px;
    background-image: url(${TOOLTIP});
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1100;
  }
`;

const ToolImg = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 8px;
`;

const ToolDesc = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 2px;
  overflow: hidden;
  text-align: left;
`;

const ToolName = styled.div`
  width: 100%;
  overflow: hidden;
  color: #333c45;
  text-overflow: ellipsis;
  line-height: 1.3em;
  font-size: 14px;
`;

const ToolLink = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 3px;
  position: relative;
  bottom: -22px;
`;

const ToolPrice = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
const ToolDiscount = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 4px;
  color: #ff585d;
`;

const ToolOutside = styled.span`
  position: relative;
  bottom: 1px;
  font-size: 11px;
  font-weight: bold;
  margin-right: 4px;
  color: #898f94;
`;

export {
  Btn,
  Tooltip,
  ToolImg,
  ToolDesc,
  ToolName,
  ToolLink,
  ToolPrice,
  ToolDiscount,
  ToolOutside,
};
