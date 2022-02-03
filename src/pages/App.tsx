import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {
  DISCOUNT,
  LOGO,
  MAGNIFYICON,
  CANCELICON,
  TOOLTIP,
  SERVER,
  TOOLLINKICON,
} from 'utils/url';
import { IMGRATE, ITEMWIDTH, IMGWIDTH } from 'utils/constants';

interface ProductsProps {
  id: number;
  imageUrl: string;
  productList: [
    {
      productId: number;
      productName: string;
      outside: boolean;
      pointX: number;
      pointY: number;
      priceOriginal: number;
      priceDiscount: number;
      discountRate: number;
      imageUrl: string;
    },
  ];
}

const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px 0px;
`;

const Logo = styled.div`
  background: url(${LOGO});
  background-repeat: no-repeat;
  background-size: cover;
  width: 170px;
  height: 50px;
`;

const Content = styled.div`
  position: relative;
`;

const Img = styled.img`
  max-width: ${IMGWIDTH}px;
  height: auto;
`;

const Tag = styled.button<{ active: boolean; pointX: number; pointY: number }>`
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

const Swiper = styled.div`
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

function App(): ReactElement {
  const [loading, setLoaidng] = useState<boolean>(true);
  const [productsData, setProductsData] = useState<ProductsProps>();
  const [userSelect, setUserSelect] = useState<boolean[]>([]);

  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [slideX, setSlideX] = useState<number>(0);
  const [imgHeight, setImgHeight] = useState<number>(0);

  const getProducts = async () => {
    try {
      const res = await axios.get(SERVER);
      setLoaidng(false);
      setProductsData(res.data);
      setUserSelect(
        Array.from({ length: res.data.productList.length }, () => false),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getImgHeight = () => {
    const img = new Image();
    if (productsData) img.src = productsData?.imageUrl;

    setImgHeight(img.height * (IMGRATE / 2));
  };

  const moveSlide = (x: number) => {
    if (productsData) {
      if (x > ITEMWIDTH * productsData.productList.length - IMGWIDTH)
        setSlideX(ITEMWIDTH * productsData.productList.length - IMGWIDTH);
      else if (x < 0) setSlideX(0);
      else setSlideX(x);
    }
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (e.nativeEvent instanceof TouchEvent) {
      setTouchStart(e.nativeEvent.touches[0].clientX);
    }
    if (e.nativeEvent instanceof MouseEvent) {
      setTouchStart(e.nativeEvent.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (e.nativeEvent instanceof TouchEvent) {
      setTouchEnd(e.nativeEvent.touches[0].clientX);
    }
    if (e.nativeEvent instanceof MouseEvent) {
      setTouchEnd(e.nativeEvent.clientX);
    }
  };

  const handleTouchEnd = () => {
    const touch = slideX + touchStart - touchEnd;

    moveSlide(touch);
  };

  const selectProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    const arr = [...userSelect];
    const idx = Number(e.currentTarget.value);
    const before = arr.findIndex((i) => i === true);

    if (before === idx) arr[idx] = false;
    else {
      if (before > -1) arr[before] = false;
      arr[idx] = true;
    }

    getImgHeight();
    setUserSelect(arr);
    moveSlide(ITEMWIDTH * idx);
  };

  useEffect(() => {
    if (loading) getProducts();
  }, [loading]);

  return (
    <>
      {loading && <div>loading</div>}
      {productsData && (
        <Container>
          <Logo />
          <Content>
            <Img src={productsData.imageUrl} alt="photo1" />
            {productsData.productList.map((item, idx) => (
              <div key={(item.productId, idx)}>
                <Tag
                  active={userSelect[idx]}
                  pointX={item.pointX}
                  pointY={item.pointY}
                  onClick={selectProduct}
                  value={idx}
                />
                <Tooltip
                  active={userSelect[idx]}
                  height={imgHeight}
                  pointX={item.pointX}
                  pointY={item.pointY}
                >
                  <ToolImg src={item.imageUrl} />
                  <ToolDesc>
                    <ToolName>{item.productName}</ToolName>
                    <div>
                      {item.outside ? (
                        <ToolOutside>예상가</ToolOutside>
                      ) : (
                        <ToolDiscount>{item.discountRate}%</ToolDiscount>
                      )}
                      <ToolPrice>
                        {new Intl.NumberFormat().format(item.priceDiscount)}
                      </ToolPrice>
                    </div>
                  </ToolDesc>
                  <ToolLink src={TOOLLINKICON} />
                </Tooltip>
              </div>
            ))}
          </Content>
          <Swiper
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
          >
            <Slide
              width={ITEMWIDTH * productsData.productList.length}
              transX={slideX}
            >
              {productsData.productList.map((item, idx) => (
                <SlideItem key={(item.productId, idx)} active={userSelect[idx]}>
                  <SlideImg
                    src={item.imageUrl}
                    onClick={selectProduct}
                    value={idx}
                  >
                    {item.discountRate !== 0 && (
                      <DiscountBadge>{item.discountRate}%</DiscountBadge>
                    )}
                  </SlideImg>
                </SlideItem>
              ))}
            </Slide>
          </Swiper>
        </Container>
      )}
    </>
  );
}

export default App;
