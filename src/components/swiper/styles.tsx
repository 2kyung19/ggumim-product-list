import styled from 'styled-components';
import { IMGWIDTH } from 'utils/constants';
import { DISCOUNT } from 'utils/url';

const Container = styled.div`
  width: ${IMGWIDTH}px;
  height: 160px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const Slide = styled.div<{ width: number; transX: number }>`
  transform: translateX(-${(props) => props.transX}px);
  transition: transform 300ms;
  display: flex;
  width: ${(props) => props.width}px;
  height: 160px;
  align-items: center;
`;

const SlideItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  background: linear-gradient(
    ${(props) => {
      if (props.active) return '163.54deg, #ff659e 8.22%, #f56b30 94.1%';
      return '#ffffff';
    }}
  );
  border-radius: 18px;
  padding: 2px;
  margin: 6px;
`;

const SlideImg = styled.button<{ src: string }>`
  position: relative;
  width: 106px;
  height: 106px;
  padding: 0px;
  border-radius: 16px;
  border: 0.5px solid #aaafb9;
  background: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 0px;
  right: 5px;
  width: 24px;
  height: 28px;
  background: url(${DISCOUNT});
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-left: 1px;
  color: white;
  font-size: 11px;
  font-weight: bold;
  line-height: 25px;
`;

export { Container, Slide, SlideItem, SlideImg, DiscountBadge };
