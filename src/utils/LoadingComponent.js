import React from 'react';
import { css } from "@emotion/react";
import { CircleLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`

const LoadingComponent = () => {
  return <CircleLoader color='red' loading={true} css={override} />
}

export default LoadingComponent