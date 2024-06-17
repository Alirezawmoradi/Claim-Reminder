import {ReactNode} from "react";

export type TimerRef = {
    start: () => void;
    pause: () => void;
    restart: (expiryTimestamp: Date) => void;
    resume: () => void;
}

type MatchTypes = {
    className?: string;
    size?: Size;
    variant?: Variant | 'gradient';
    showTitle?: boolean;
}

export type TimerProps = MatchTypes & {
    expiryTimestamp: Date;
    autoStart?: boolean;
    onExpire?: () => void;
}

export type Size =
    'tiny'
    | 'small'
    | 'normal'
    | 'large';

export type Variant =
    'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'

export type TimerProgressProps = MatchTypes & {
    value: number;
    maxValue: number;
    datePart: string;
    children: ReactNode;
}