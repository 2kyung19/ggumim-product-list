import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { LOGO, MAGNIFYICON, SERVER } from 'utils/url';
import { ITEMWIDTH, SLIDEWIDTH } from 'utils/constants';

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

// background-color: ${(props) => props.theme.color.main};
const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px 0px;
`;

const Logo = styled.div`
  background-image: url(${LOGO});
  background-repeat: no-repeat;
  background-size: cover;
  width: 170px;
  height: 50px;
`;

const Content = styled.div`
  position: relative;
`;

const Img = styled.img`
  max-width: ${SLIDEWIDTH}px;
  height: auto;
`;

const Btn = styled.button<{ pointX: number; pointY: number }>`
  position: absolute;
  width: ${(props) => props.theme.icon.size};
  height: ${(props) => props.theme.icon.size};
  background-color: transparent;
  background-image: url(${MAGNIFYICON});
  background-repeat: no-repeat;
  background-size: cover;
  border: 0px;
  left: ${(props) => props.pointY}px;
  top: ${(props) => props.pointX}px;
  z-index: 1;
`;

const Swiper = styled.div`
  width: ${SLIDEWIDTH}px;
  height: 160px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const Slide = styled.div<{ transX: number }>`
  transform: translateX(-${(props) => props.transX}px);
  transition: transform 300ms;
  display: flex;
  width: auto;
  height: 160px;
  align-items: center;
`;

const SlideItem = styled.img`
  width: 106px;
  height: 106px;
  border-radius: 16px;
  border: 0.5px solid #aaafb9;
  margin: 6px;
  -webkit-user-drag: none;
`;

function App(): ReactElement {
  const [loading, setLoaidng] = useState<boolean>(true);
  const [productsData, setProductsData] = useState<ProductsProps>();

  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [slideX, setSlideX] = useState<number>(0);

  const getProducts = async () => {
    try {
      const res = await axios.get(SERVER);
      setLoaidng(false);
      setProductsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) getProducts();
  }, [loading]);

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

    if (productsData) {
      if (touch > ITEMWIDTH * productsData.productList.length - SLIDEWIDTH)
        setSlideX(ITEMWIDTH * productsData.productList.length - SLIDEWIDTH);
      else if (touch < 0) setSlideX(0);
      else setSlideX(touch);
    }
  };

  return (
    <>
      {loading && <div>loading</div>}
      {productsData && (
        <Container>
          <Logo />
          <Content>
            <Img src={productsData.imageUrl} alt="photo1" />
            {productsData.productList.map((item, idx) => (
              <Btn
                key={(item.productId, idx)}
                pointX={item.pointX}
                pointY={item.pointY}
              />
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
            <Slide transX={slideX}>
              {productsData.productList.map((item, idx) => (
                <SlideItem key={(item.productId, idx)} src={item.imageUrl} />
              ))}
            </Slide>
          </Swiper>
        </Container>
      )}
    </>
  );
}

export default App;
