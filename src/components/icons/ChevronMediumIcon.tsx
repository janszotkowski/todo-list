import * as React from 'react';
import { IconSvgProps } from '@/dto/Common.ts';

const ChevronMediumIcon: React.FC<IconSvgProps> = ({size = 24, width, height, ...props}): React.ReactElement => (
    <svg
        aria-hidden={'true'}
        fill={'none'}
        focusable={'false'}
        height={size ?? height}
        role={'presentation'}
        viewBox={'0 0 24 24'}
        width={size ?? width}
        {...props}
    >
        <polyline
            points={'16,16 12,12 8,16'}
            fill={'none'}
            stroke={'yellow'}
            strokeWidth={'2'}
        />
        <polyline
            points={'16,12 12,8 8,12'}
            fill={'none'}
            stroke={'yellow'}
            strokeWidth={'2'}
        />
    </svg>
);

export { ChevronMediumIcon };