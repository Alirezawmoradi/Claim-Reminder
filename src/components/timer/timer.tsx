// @ts-ignore
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import {Size, TimerProps, TimerRef} from "./timer.types.ts";
import {useTimer} from "react-timer-hook";
import classNames from "classnames";
import {TimerProgress} from "./timer-progress.tsx";

const sizeClasses: Record<Size, string> = {
    tiny: 'timer-xs',
    small: 'timer-sm',
    normal: 'timer-md',
    large: 'timer-lg'
};

const calculateTotalSeconds = (hours: number, minutes: number, seconds: number): number => hours * 60 * 60 + minutes * 60 + seconds;

export const Timer = forwardRef<TimerRef, TimerProps>(
    (
        {
            expiryTimestamp,
            autoStart,
            onExpire,
            onTimerChange=()=>{},
            size = 'tiny',
            className,
            showTitle = true,
            variant = 'primary'
        },
        ref
    ) => {
        const {hours, minutes, seconds, start, pause, resume, restart} = useTimer({
            expiryTimestamp,
            onExpire,
            autoStart
        });

        useEffect(() => {
            onTimerChange(expiryTimestamp);
        }, [expiryTimestamp]);

        const classes = classNames(
            'timer',
            {[`${sizeClasses[size]}`]: size},
            {[`timer-${variant}`]: variant},
            className
        )

        useImperativeHandle(ref, () => (
            {
                start,
                pause,
                resume,
                restart:(newExpiryTimestamp: Date)=>{
                    restart(newExpiryTimestamp);
                    onTimerChange(newExpiryTimestamp);
                }
            }
        ))

        const maxHoursValue = calculateTotalSeconds(24, 0, 0);
        const maxMinutesValue = calculateTotalSeconds(0, 60, 0);
        const maxSecondsValue = calculateTotalSeconds(0, 0, 60);

        const hoursValue = calculateTotalSeconds(hours, 0, 0);
        const minutesValue = calculateTotalSeconds(0, minutes, 0);
        const secondsValue = calculateTotalSeconds(0, 0, seconds);

        const renderTimerProgress = (
            unit: number,
            value: number,
            maxValue: number,
            datePart: string
        ) => {
            if (value != null) {
                return (
                    <>
                        <TimerProgress value={value}
                                       maxValue={maxValue}
                                       datePart={datePart}
                                       size={size}
                                       showTitle={showTitle}
                                       variant={variant}
                        >
                            {unit}
                        </TimerProgress>
                    </>
                )
            }
        }


        const timeUnits = [
            {
                show: seconds != null,
                unit: seconds,
                value: secondsValue,
                maxValue: maxSecondsValue,
                datePart: 'seconds'
            }, {
                show: minutes != null,
                unit: minutes,
                value: minutesValue,
                maxValue: maxMinutesValue,
                datePart: 'minutes'
            }, {
                show: hours != null,
                unit: hours,
                value: hoursValue,
                maxValue: maxHoursValue,
                datePart: 'hours'
            },
        ]

        return (
            <div className={`${classes} flex flex-row-reverse justify-center gap-4`}>
                {
                    timeUnits.map(
                        ({show, unit, value, maxValue, datePart}) => show ?
                            renderTimerProgress(unit, value, maxValue, datePart)
                            :
                            null
                    )
                }
            </div>
        )
    }
)