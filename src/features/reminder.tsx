import React, {useEffect, useRef, useState} from "react";
import logo from '../../public/images/9.avif'
import hamster from '../../public/images/hamster-coin.webp'
import {IoIosAddCircleOutline} from "react-icons/io";
import {Timer} from "../components/timer/timer.tsx";
import {TimerRef} from "../components/timer/timer.types.ts";
import {sendMessage} from "../api/send-message.ts";

export const Reminder: React.FC = () => {

    const savedExpireTimeStamp = localStorage.getItem('expiryTimeStamp');

    const getTwoMinutesFromNow = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 100);
        return time;
    };

    const [expiryTimeStamp, setExpiryTimeStamp] = useState<Date>(() => {
        return savedExpireTimeStamp ? new Date(savedExpireTimeStamp) : getTwoMinutesFromNow();
    })

    const timerRef = useRef<TimerRef>(null);

    const handleExpire = () => {
        sendMessage('1499174122', 'Reminder: Your timer has finished. Please check the app.');
        localStorage.removeItem('expiryTimeStamp');
    };

    const handleTimerChange = (newExpiryTimeStamp: Date) => {
        setExpiryTimeStamp(newExpiryTimeStamp);
        localStorage.setItem('expiryTimeStamp', newExpiryTimeStamp.toString())
    }

    useEffect(() => {
        if (savedExpireTimeStamp) {
            timerRef.current?.restart(new Date(savedExpireTimeStamp));
        }
    }, []);

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-xl tracking-widest uppercase'>
                Airdrop Claim Reminder
            </h1>
            <span className='font-light text-sm uppercase tracking-wider'>Save your Time with me</span>
            <img src={logo} alt='hamster'/>
            <div className='flex flex-col justify-center items-center gap-3'>
                <IoIosAddCircleOutline className='h-10 w-10'/>
                <p className='font-medium text-sm'>Add</p>
            </div>
            <div className='flex  flex-col justify-center items-center mt-10'>
                <div className='flex justify-center items-center gap-5'>
                    <p className='font-medium text-sm'>Hamster</p>
                    <img src={hamster} width={25} height={25} alt='hamster-coin'/>
                </div>
                <Timer className='my-8' size='tiny' ref={timerRef} expiryTimestamp={expiryTimeStamp}
                       onExpire={handleExpire}  onTimerChange={handleTimerChange}/>
            </div>
        </div>
    )
}