import React, { useEffect, useMemo, useRef } from 'react';
import { Title } from 'react-head';
import { useSize } from 'ahooks';

import * as Styled from './simple.styled';
import { getSize } from './theme';

type SimpleLayoutProps = {
  headTitle?: any,
  title?: any,
  subtitle?: any,
  children: any,
};

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ headTitle = 'TST | 10', title = 'TST | 10', subtitle = '抓到你了', children }) => {
  useEffect(() => {
    // react-head would not overwrite default title tag
    // see https://github.com/tizmagik/react-head/issues/83
    // why here? if we remove title tag early than react-head injected it, the title will change to the host shortly.
    const defaultTitle = document.getElementById('default-title');
    if (defaultTitle) defaultTitle.parentNode!.removeChild(defaultTitle);
  }, []);

  const containerRef = useRef(null);
  const { width } = useSize(containerRef);

  const size = useMemo(() => getSize(width), [width]);

  return (
    <>
      <Title>{headTitle}</Title>
      <Styled.Container ref={containerRef}>
        <Styled.Main>
          <Styled.Logo />
          <Styled.Title>{title}</Styled.Title>
          <Styled.SubTitle>{subtitle}</Styled.SubTitle>
          {children}
        </Styled.Main>
      </Styled.Container>
    </>
  );
};

export default SimpleLayout;
