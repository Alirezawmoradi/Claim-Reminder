import {Reminder} from "./features/reminder/reminder.tsx";
import {BottomNavigation} from "./components/bottom-navigation/bottom-navigation.tsx";
import {useState} from "react";
import {DailyTask} from "./features/daily-task/daily-task.tsx";

function App() {
    const [activeItem, setActiveItem] = useState<number>(1);

    return (
        <div className='flex min-h-screen text-gray-100 justify-center items-center bg-[#13111c] font-bold text-base'>
            <div className='flex flex-col justify-center items-center gap-2'>
                {
                    activeItem === 1 ?
                        <Reminder/>
                        :
                        <DailyTask activeItem={activeItem}/>
                }
            </div>
            <BottomNavigation activeItem={activeItem} setActiveItem={setActiveItem}/>
        </div>
    )
}

export default App
