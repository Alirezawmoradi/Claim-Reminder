import React, {useEffect, useRef, useState} from "react";
import logo from '../../public/images/9.avif'
import hamster from '../../public/images/hamster-coin.webp'
import {Timer} from "../components/timer/timer.tsx";
import {TimerRef} from "../components/timer/timer.types.ts";
import {sendMessage} from "../api/send-message.ts";
import {VscDebugStart} from "react-icons/vsc";
import {RiRestartLine} from "react-icons/ri";

export const Reminder: React.FC = () => {

    const savedExpireTimeStamp = localStorage.getItem('expiryTimeStamp');

    const getThreeHoursFromNow = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 10800);
        return time;
    };

    const [expiryTimeStamp, setExpiryTimeStamp] = useState<Date>(() => {
        return savedExpireTimeStamp ? new Date(savedExpireTimeStamp) : getThreeHoursFromNow();
    })

    const timerRef = useRef<TimerRef>(null);

    const [chatId, setChatId] = useState<string | number>('');

    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        const userData = (window as any).Telegram?.WebApp.initDataUnsafe;
        setChatId(userData.user?.id || null)

        if (savedExpireTimeStamp) {
            timerRef.current?.restart(new Date(savedExpireTimeStamp));
        }
    }, []);

    const handleExpire = () => {

        sendMessage(chatId, 'Reminder: Your timer has finished. Please check the app.');

        localStorage.removeItem('expiryTimeStamp');
    };

    const handleTimerChange = (newExpiryTimeStamp: Date) => {
        setExpiryTimeStamp(newExpiryTimeStamp);
        localStorage.setItem('expiryTimeStamp', newExpiryTimeStamp.toString())
    }

    const handleStart = () => {
        setIsRunning(true)
        timerRef.current?.start();
    };

    const handleRestart = () => {
        const newExpiryTime = getThreeHoursFromNow();
        timerRef.current?.restart(newExpiryTime);
        handleTimerChange(newExpiryTime);
    };

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-xl tracking-widest uppercase'>
                Airdrop Claim Reminder
            </h1>
            <span className='font-light text-sm uppercase tracking-wider'>Save your Time with me</span>
            <img src={logo} alt='hamster'/>
            <div className='flex  flex-col justify-center items-center'>
                <div className='flex justify-center items-center gap-5'>
                    {
                        isRunning ?
                            <RiRestartLine
                                className='h-6 w-6 cursor-pointer hover:text-gray-400 transition-colors duration-200'
                                onClick={handleRestart}/>
                            :
                            <VscDebugStart
                                className='h-6 w-6 cursor-pointer hover:text-gray-400 transition-colors duration-200'
                                onClick={handleStart}/>
                    }
                    <p className='font-medium text-sm'>Hamster</p>
                    <img src={hamster} width={25} height={25} alt='hamster-coin'/>
                </div>
                <Timer className='my-8' size='tiny' ref={timerRef} expiryTimestamp={expiryTimeStamp}
                       onExpire={handleExpire} onTimerChange={handleTimerChange}/>
            </div>
        </div>
    )
}