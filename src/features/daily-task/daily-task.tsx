import {useEffect, useState} from "react";
import axios from "axios";
import {Loading} from "../../components/loading/loading.tsx";
import {Details} from "../../components/details/details.tsx";

export const DailyTask = (activeItem: any) => {
    const [data, setData] = useState<DailyTask | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fetchData = async () => {
        setLoading(true);
        const result = await axios.get('https://nabikaz.github.io/HamsterKombat-API/config.json');
        setData(result.data);
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, [activeItem]);
    return (
        <div className='flex justify-center items-center'>
            {
                loading ?
                    <Loading/>
                    :
                    <Details data={data}/>
            }
        </div>
    )
}