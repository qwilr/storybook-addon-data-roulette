import React, { CSSProperties } from 'react';
export interface ISpinnerProps {
    size?: number;
    strokeWidth?: number;
    style?: CSSProperties;
    className?: string;
}
declare const Spinner: React.ForwardRefExoticComponent<ISpinnerProps & React.RefAttributes<HTMLDivElement>>;
export default Spinner;
