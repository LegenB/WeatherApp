
import { createSignal, onCleanup } from "solid-js";


export const DayCard = ({date,temp,wind,hum,time,icon,desc}) => {


    const parts = date.split('-');
    const sortedDate = `${parts[2]}-${parts[1]}`;


    return (
        <div className=" w-[140px] sm:w-[150px] h-[280px] sm:h-[300px] bg-sky-700 border border-sky-500 rounded-lg p-1 m-1 drop-shadow-sm ">
           
            <h1 className="text-white text-center text-lg sm:text-xl">{sortedDate}</h1>
            <div className="flex justify-center">
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" className="size-24" />
            </div>
            <div>               
                <h2  className="text-white text-center text-lg sm:text-2xl">{Math.round(temp)}°C</h2>
                <p className="text-sm sm:text-base text-gray-300 text-center ">{desc}</p>
            </div>
            <div className="flex justify-center">
                <ul className="text-sm sm:text-base">
                    <li className="text-gray-100 flex mt-2">
                        <span className="mr-4"><img src="/images/clock.png" alt="wind"  className="size-5 sm:size-6 drop-shadow-sm"/></span><span> {time}</span> 
                    </li>
                    <li className="text-gray-100 flex mt-2">
                        <span className="mr-4"><img src="/images/wind.png" alt="droplet"  className="size-5 sm:size-6 drop-shadow-sm"/></span> <span> {wind}</span> 
                    </li>
                    <li className="text-gray-100 flex mt-2">
                        <span className="mr-4"><img src="/images/droplet.png" alt="temp"  className="size-5 sm:size-6 drop-shadow-sm"/></span> <span> {hum}</span> 
                    </li>
                </ul>

            </div>
            

            
        </div>
    )
}
