import React, {useRef} from "react";
import logo from '../../public/images/9.avif'
import hamster from '../../public/images/hamster-coin.webp'
import {IoIosAddCircleOutline} from "react-icons/io";
import {Timer} from "../components/timer/timer.tsx";
import {TimerRef} from "../components/timer/timer.types.ts";

export const Reminder: React.FC = () => {
    const getTwoMinutesFromNow = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 120);
        return time;
    };

    const timerRef = useRef<TimerRef>(null);


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
                <Timer className='my-8' size='tiny' ref={timerRef} expiryTimestamp={getTwoMinutesFromNow()} />
            </div>
        </div>
    )
}