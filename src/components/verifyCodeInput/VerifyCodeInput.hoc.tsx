import React, { useCallback, useState } from 'react';

import * as Styled from './verifyCodeInput.styled';
import * as constants from './verifyCodeInput.constant';
import CountDown from '../countDown';

const VerifyCodeSuffix = (props: any) => {
  const {
    state,
    disabled,
    sendVerifyCodeBtnText,
    onClickSendButton,
    countDownTotal,
    countDownFormatter,
    onCountDownFinished,
  } = props;
  switch (state) {
    case constants.STATE_LIMIT:
      return (
        <Styled.SendVerifyCodeButton type="link" disabled size="small">
          <CountDown total={countDownTotal} onFinished={onCountDownFinished} formatter={countDownFormatter} />
        </Styled.SendVerifyCodeButton>
      );
    default:
      return (
        <Styled.SendVerifyCodeButton
          disabled={disabled}
          loading={state === constants.STATE_SENDING}
          type="link"
          onClick={onClickSendButton}
          size="small"
        >
          {sendVerifyCodeBtnText}
        </Styled.SendVerifyCodeButton>
      );
  }
};

const withVerifyCode =
  (Input: any) =>
  (props: any) => {
    const {
      sendVerifyCode,
      sendVerifyCodeBtnText,
      limitSeconds,
      countDownFormatter,
      initialLimited,
      buttonDisabled,
      ...rest
    } = props;
    const [state, setState] = useState(initialLimited ? constants.STATE_LIMIT : constants.STATE_NORMAL);
    const onCountDownFinished = useCallback(() => setState(constants.STATE_NORMAL), []);

    const onClickSendButton = () => {
      if (state) return;

      const prevState = state;

      setState(constants.STATE_SENDING);

      sendVerifyCode()
        .then(() => {
          setState(constants.STATE_LIMIT);
        })
        .catch(() => {
          setState(prevState);
        });
    };

    const suffixProps = {
      countDownFormatter,
      countDownTotal: limitSeconds,
      disabled: buttonDisabled || props.disabled,
      onClickSendButton,
      onCountDownFinished,
      sendVerifyCodeBtnText,
      state,
    };

    return <Input {...rest} suffix={<VerifyCodeSuffix {...suffixProps} />} />;
  };

export default withVerifyCode;
