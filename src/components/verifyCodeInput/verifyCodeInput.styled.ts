import styled from 'styled-components';
import { Button as AntButton } from 'antd';

import * as mixins from '../../styles/mixins';
import { colors } from '../../styles';

export const SendVerifyCodeButton = styled(AntButton)`
  height: 22px !important;
  line-height: 22px !important;
  padding: 0 4px !important;

  span {
    ${mixins.typography('p2')}

    &:hover {
      color: ${colors.B1};
    }
  }

  &::before {
    background-color: transparent;
  }
`;
