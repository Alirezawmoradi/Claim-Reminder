import React from "react";
import dailyTask from '../../../public/images/daily-reward-BQbFIOL9.png'

interface DailyTaskProps {
    data: DailyTask | null;
}

export const Details: React.FC<DailyTaskProps> = ({data}) => {
    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen mb-24'>
            <div className='flex flex-col mb-16'>
                <img src={dailyTask} alt='daily task' className='w-32 mb-5'/>
                <h1 className='text-center uppercase font-extrabold'>Daily Tasks</h1>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <span className='text-sm mb-4 uppercase'>Combo Cards</span>
                <ul className='flex flex-col justify-center items-center gap-5 text-xs'>
                    {data?.dailyCards.map((item: string) => (
                        <li key={item}>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-col mt-8 justify-center items-center gap-5'>
                <span className='text-sm mt-10 uppercase'>morse code</span>
                <p className='text-xs'>{data?.morseCode}</p>
            </div>
        </div>
    )
}