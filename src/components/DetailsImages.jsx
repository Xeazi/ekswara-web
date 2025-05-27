import testImage from "../assets/image/taman-ismail-marzuki/Perpustakaan-Taman-Ismail-Marzuki-Cikini.jpg";

export const DetailImages = () => {
    const images = Array(4).fill(testImage);
    return (
        <div className="grid grid-rows-3 grid-cols-2 lg:grid-rows-2 lg:grid-cols-5 gap-3 w-[670px] my-8 lg:w-full h-full lg:max-h-[520px]">
            <div className="row-span-1 col-span-2 lg:row-span-2 lg:col-span-3 object-cover max-h-[520px]">
                <img className="w-[100%] h-[100%]" src={images[0]} alt="gambar besar" />
            </div>
            <div className="row-span-1 col-span-2 object-cover w-full h-full">
                <img className="w-[100%] h-[100%]" src={images[1]} alt="gambar kecil" />
            </div>
            <div className="object-cover w-full h-full">
                <img className="w-[100%] h-[100%]" src={images[2]} alt="gambar kotak" />
            </div>
            <div className="object-cover w-full h-full">
                <img className="w-[100%] h-[100%]" src={images[3]} alt="gambar kotak" />
            </div>
        </div>
    )
}