export const DestinationCard = (props) => {
    
    const {
        href,
        imageUrl,
        name,
        location,
        parkHours, // mungkin harus dikasih string format `${openingHour} to ${closingHour}`
    } = props;

    return (
        <a href={href}  className={`relative block mt-0 w-[480px] h-[440px]`}>
            <div style={{backgroundImage: `url(${imageUrl.destinationImage})`}} className="bg-[length:100%_100%] bg-no-repeat bg-center rounded-2xl w-full h-full">
                <div className="absolute bottom-0 w-full px-6 py-8">
                    <div className="flex flex-col gap-2.5 bg-white/80 rounded-2xl w-full px-3 pt-4 pb-10">
                        <h1 className="text-main text-2xl font-semibold">{name}</h1>
                        <p className="text-base font-semibold">{location}</p>
                        <p><span className="text-base font-semibold">Park hours:</span> {parkHours}</p>
                    </div>
                </div>
            </div>
        </a>
    ); 
}

// size pake px buat sementara aja

// bg ga ngerti knp image di pass ke imageUrl di access harus imageUrl.destinationImage gajelas

// style={{backgroundImage: `url(${imageUrl.destinationImage})`}}

// bg-[url(${imageUrl.destinationImage})]

{/* awalnya <a> punya bg-img tpi di design backgroundnya di stretch jdi gatau sementara aku simpen dulu
    
    <a href={href} style={{backgroundImage: `url(${imageUrl.destinationImage})`}} className={`bg-center bg-cover relative block mt-0 rounded-md w-[479px] h-[445px]`}>
            <div className="absolute bottom-0 w-full px-4 py-6">
                <div className="flex flex-col gap-2.5 bg-white/80 rounded-2xl w-full px-3 pt-4 pb-10">
                    <h1 className="text-main text-2xl font-semibold">{name}</h1>
                    <p className="text-base font-semibold">{location}</p>
                    <p><span className="text-base font-semibold">Park hours:</span> {parkHours}</p>
                </div>
            </div>
        </a> */}