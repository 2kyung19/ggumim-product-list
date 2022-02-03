import styled from 'styled-components';
import { IMGWIDTH } from 'utils/constants';
import { LOGO } from 'utils/url';

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

export { Container, Logo, Content, Img };
