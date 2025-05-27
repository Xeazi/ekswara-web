export const DetailsDetails = ({durationOfVisit, groupSize, ages, languages}) => {

    return (

        <div className="flex w-full gap-12">

            <div className="flex gap-4">
                
                <div className="w-12 h-12 rounded-2xl border border-garis" />

                <div>
                    <p className="text-text">
                        Duration of Visit
                    </p>
                    <p className="text-text-gray">
                        {durationOfVisit}
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                
                <div className="w-12 h-12 rounded-2xl border border-garis" />

                <div>
                    <p className="text-text">
                        Group Size
                    </p>
                    <p className="text-text-gray">
                        {groupSize}
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                
                <div className="w-12 h-12 rounded-2xl border border-garis" />

                <div>
                    <p className="text-text">
                        Ages
                    </p>
                    <p className="text-text-gray">
                        {ages}
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                
                <div className="w-12 h-12 rounded-2xl border border-garis" />

                <div>
                    <p className="text-text">
                        Languages
                    </p>
                    <p className="text-text-gray">
                        {languages}
                    </p>
                </div>
            </div>

        </div>
    );

}