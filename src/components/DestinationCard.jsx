import { Link } from "react-router-dom";

export const DestinationCard = ({
        id,
        image_url,
        name,
        location,
        park_hours, // mungkin harus dikasih string format `${openingHour} to ${closingHour}`
    }) => {

    return ( 
        <Link to={`./${id}`}  className={`relative block mt-0 max-w-[480px] aspect-[12/11]`}>
            <div style={{backgroundImage: `url(http://localhost:3000${image_url})`}} className="bg-[length:100%_100%] bg-no-repeat bg-center rounded-2xl w-full h-full">
                <div className="absolute bottom-0 w-full px-6 py-8">
                    <div className="flex flex-col gap-2.5 bg-white/80 rounded-2xl w-full px-3 pt-4 pb-10">
                        <h1 className="text-main text-2xl font-semibold">{name}</h1>
                        <p className="text-base font-semibold">{location}</p>
                        <p><span className="text-base font-semibold">Park hours:</span> {park_hours}</p>
                    </div>
                </div>
            </div>
        </Link>
    ); 
}

// w-[480px] h-[440px]

// size pake px buat sementara aja

// bg ga ngerti knp image di pass ke image_url di access harus image_url.destinationImage gajelas

// style={{backgroundImage: `url(${image_url.destinationImage})`}}

// bg-[url(${image_url.destinationImage})]

{/* awalnya <a> punya bg-img tpi di design backgroundnya di stretch jdi gatau sementara aku simpen dulu
    
    <a id={id} style={{backgroundImage: `url(${image_url.destinationImage})`}} className={`bg-center bg-cover relative block mt-0 rounded-md w-[479px] h-[445px]`}>
            <div className="absolute bottom-0 w-full px-4 py-6">
                <div className="flex flex-col gap-2.5 bg-white/80 rounded-2xl w-full px-3 pt-4 pb-10">
                    <h1 className="text-main text-2xl font-semibold">{name}</h1>
                    <p className="text-base font-semibold">{location}</p>
                    <p><span className="text-base font-semibold">Park hours:</span> {park_hours}</p>
                </div>
            </div>
        </a> */}