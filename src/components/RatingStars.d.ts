import React from 'react';
interface RatingStarsProps {
    value: number;
    onChange?: (value: number) => void;
    readOnly?: boolean;
    size?: 'small' | 'medium' | 'large';
    showValue?: boolean;
}
export declare const RatingStars: React.FC<RatingStarsProps>;
export default RatingStars;
