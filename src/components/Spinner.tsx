import React, { CSSProperties, forwardRef } from 'react';
import { styled } from '@storybook/theming';

export interface ISpinnerProps {
  size?: number;
  strokeWidth?: number;
  style?: CSSProperties;
  className?: string;
}

const Spinner = forwardRef<HTMLDivElement, ISpinnerProps>(
  ({ size = 32, strokeWidth = 2, style, ...rest }, ref) => {
    const radius = size / 2;
    const offsetRadius = radius - strokeWidth / 2;
    const circumference = size * Math.PI;

    return (
      <SpinnerWrapper ref={ref} style={style}>
        <svg
          className="spinner__element"
          fill="none"
          strokeWidth={strokeWidth}
          width={size}
          height={size}
          strokeLinecap="round"
          viewBox={`${radius} ${radius} ${size} ${size}`}
          {...rest}
        >
          <circle
            className="spinner__path"
            cx={size}
            cy={size}
            r={offsetRadius}
            strokeDasharray={`${circumference} ${circumference * 0.25}`}
            strokeDashoffset={circumference}
          />
        </svg>
      </SpinnerWrapper>
    );
  }
);

const SpinnerWrapper = styled.div`
  @keyframes spinner-rotate {
    100% {
      transform: rotate(360deg) translate3d(0, 0, 0);
    }
  }

  svg {
    fill: none;
    display: block;
    animation: spinner-rotate 1s linear infinite;
    transform-origin: center center;
  }

  circle {
    stroke: currentColor;
  }
`;

export default Spinner;
