export const DestinationPopularCard = ({icon, title}) => {
  
    return (
        <div className="flex flex-col items-center gap-4 bg-white w-[180px] rounded-2xl p-7 text-center">
            {icon}
            <p className="">{title}</p>
        </div>
    )
}