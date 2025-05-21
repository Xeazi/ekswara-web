export const DestinationPopularCard = (props) => {
    const {
        icon,
        title,
    } = props;

    return (
        <div className="flex flex-col items-center gap-4 bg-white rounded-2xl w-[180px] h-[200px] p-7 text-center">
            {icon}
            <p className="">{title}</p>
        </div>
    )
}