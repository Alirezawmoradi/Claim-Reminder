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
    variant?: Variant
    showTitle?: boolean;
}

export type TimerProps = MatchTypes & {
    expiryTimestamp: Date;
    autoStart?: boolean;
    onExpire?: () => void;
    onTimerChange?: (newExpiryTimeStamp: Date) => void;
}

export type Size = 'tiny' |'normal'

export type Variant = 'primary'

export type TimerProgressProps = MatchTypes & {
    value: number;
    maxValue: number;
    datePart: string;
    children: ReactNode;
}