import React from "react";

export const BottomNavigation: React.FC<BottomNavigationProps> = ({activeItem, setActiveItem}) => {
    const menuItems = [
        {
            label: 'Timer',
            id: 1
        }, {
            label: 'Daily Tasks',
            id: 2
        }
    ]
    return (
        <ul className="fixed w-11/12 bottom-1 rounded-3xl h-12 flex justify-center items-center gap-5 bg-[#272a2f] text-xs transform z-50">
            {
                menuItems.map((item) => {
                    const active = item.id === activeItem;
                    return <li key={item.id}>
                        <button
                            className={`flex justify-center items-center text-center text-[#85827d] bg-[#1c1f24] h-10 w-28 rounded-2xl transition-colors duration-300 ${active && 'text-[#007BEC]'}`}
                            onClick={() => setActiveItem(item.id)}>
                            {item.label}
                        </button>
                    </li>
                })
            }
        </ul>
    )
}