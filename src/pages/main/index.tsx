import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import * as S from 'pages/main/styled';
import { SERVER } from 'utils/url';
import { IMGRATE, ITEMWIDTH, IMGWIDTH } from 'utils/constants';
import Tag from 'components/tag';
import Swiper from 'components/swiper';

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

function App(): ReactElement {
  const [loading, setLoaidng] = useState<boolean>(true);
  const [productsData, setProductsData] = useState<ProductsProps>();
  const [userSelect, setUserSelect] = useState<boolean[]>([]);
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
        <S.Container>
          <S.Logo />
          <S.Content>
            <S.Img src={productsData.imageUrl} alt="photo1" />
            {productsData.productList.map((item, idx) => (
              <Tag
                key={(item.productId, idx)}
                active={userSelect[idx]}
                item={item}
                idx={idx}
                imgHeight={imgHeight}
                onClick={selectProduct}
              />
            ))}
          </S.Content>
          <Swiper
            slideX={slideX}
            productList={productsData.productList}
            userSelect={userSelect}
            moveSlide={moveSlide}
            onClick={selectProduct}
          />
        </S.Container>
      )}
    </>
  );
}

export default App;
