import React from "react";
import logo from '../../public/images/9.avif'

export const Reminder: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-xl tracking-widest uppercase'>Airdrop Claim Reminder</h1>
            <img src={logo} alt='hamster'/>
            <span>Floating action button</span>
            <div className='flex gap-44 mt-20'>
                <span>Logo</span>
                <span>Timer</span>
            </div>
        </div>
    )
}