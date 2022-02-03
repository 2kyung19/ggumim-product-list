import React, { ReactElement, useState } from 'react';
import * as S from 'components/swiper/styles';
import { ITEMWIDTH } from 'utils/constants';

interface Props {
  slideX: number;
  productList: Array<{
    productId: number;
    imageUrl: string;
    discountRate: number;
  }>;
  userSelect: Array<boolean>;
  moveSlide: (x: number) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Swiper(props: Props): ReactElement {
  const { slideX, productList, userSelect, moveSlide, onClick } = props;
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

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

  return (
    <S.Container
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
    >
      <S.Slide width={ITEMWIDTH * productList.length} transX={slideX}>
        {productList.map((item, idx) => (
          <S.SlideItem key={(item.productId, idx)} active={userSelect[idx]}>
            <S.SlideImg src={item.imageUrl} onClick={onClick} value={idx}>
              {item.discountRate !== 0 && (
                <S.DiscountBadge>{item.discountRate}%</S.DiscountBadge>
              )}
            </S.SlideImg>
          </S.SlideItem>
        ))}
      </S.Slide>
    </S.Container>
  );
}

export default Swiper;
