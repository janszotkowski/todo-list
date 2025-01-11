import * as React from 'react';
import { IconSvgProps } from '@/dto/Common.ts';

const ChevronLowIcon: React.FC<IconSvgProps> = ({size = 24, width, height, ...props}): React.ReactElement => (
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
        {/*<path d="M12 16 L16 12 L12 8 L8 12 Z" fill="green"/>*/}
        {/*<polyline points="12,16 16,12 12,8 8,12 12,16" fill="green"/>*/}


        <polyline
            points={'16,12 12,8 8,12 '}
            fill={'none'}
            stroke={'green'}
            strokeWidth={'2.5'}
        />
    </svg>
);

export { ChevronLowIcon };