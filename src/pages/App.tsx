import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { CANCELICON, DISCOUNT, LOGO, MAGNIFYICON, SERVER } from 'utils/url';
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
  max-width: ${SLIDEWIDTH}px;
  height: auto;
`;

const Btn = styled.button<{ active: boolean; pointX: number; pointY: number }>`
  position: absolute;
  width: ${(props) => props.theme.icon.size};
  height: ${(props) => props.theme.icon.size};
  background-color: transparent;
  background: url(${(props) => (props.active ? CANCELICON : MAGNIFYICON)});
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

  const moveSlide = (x: number) => {
    if (productsData) {
      if (x > ITEMWIDTH * productsData.productList.length - SLIDEWIDTH)
        setSlideX(ITEMWIDTH * productsData.productList.length - SLIDEWIDTH);
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
              <Btn
                key={(item.productId, idx)}
                active={userSelect[idx]}
                pointX={item.pointX}
                pointY={item.pointY}
                onClick={selectProduct}
                value={idx}
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
