import React, { ReactElement } from 'react';
import * as S from 'components/tag/styles';
import { TOOLLINKICON } from 'utils/url';

interface Props {
  active: boolean;
  item: {
    productName: string;
    imageUrl: string;
    pointX: number;
    pointY: number;
    outside: boolean;
    discountRate: number;
    priceDiscount: number;
  };
  idx: number;
  imgHeight: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Tag(props: Props): ReactElement {
  const { active, item, idx, imgHeight, onClick } = props;

  return (
    <>
      <S.Btn
        active={active}
        pointX={item.pointX}
        pointY={item.pointY}
        onClick={onClick}
        value={idx}
      />
      <S.Tooltip
        active={active}
        height={imgHeight}
        pointX={item.pointX}
        pointY={item.pointY}
      >
        <S.ToolImg src={item.imageUrl} />
        <S.ToolDesc>
          <S.ToolName>{item.productName}</S.ToolName>
          <div>
            {item.outside ? (
              <S.ToolOutside>예상가</S.ToolOutside>
            ) : (
              <S.ToolDiscount>{item.discountRate}%</S.ToolDiscount>
            )}
            <S.ToolPrice>
              {new Intl.NumberFormat().format(item.priceDiscount)}
            </S.ToolPrice>
          </div>
        </S.ToolDesc>
        <S.ToolLink src={TOOLLINKICON} />
      </S.Tooltip>
    </>
  );
}

export default Tag;
