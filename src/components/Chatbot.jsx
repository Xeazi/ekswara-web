import { useState } from "react";

import avatar from "../assets/image/avatar 1.png"

export const Chatbot = () => {

    const sendIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="33" height="35" viewBox="0 0 33 35" fill="none">
  <g clip-path="url(#clip0_335_22821)">
    <path d="M2.76375 30.625L31.625 17.5L2.76375 4.375L2.75 14.5833L23.375 17.5L2.75 20.4167L2.76375 30.625Z" fill="#2E7D32"/>
  </g>
  <defs>
    <clipPath id="clip0_335_22821">
      <rect width="33" height="35" fill="white"/>
    </clipPath>
  </defs>
</svg>);
    
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-1">
          {isOpen ? (
            <div className="w-80 h-100 bg-garis shadow-lg rounded-md flex flex-col overflow-hidden">

              <div className="bg-main text-white px-6 py-2 flex gap-4 items-center shadow-lg">

                <div className="h-[2rem] bg-white rounded-full overflow-hidden">
                    <img src={avatar} alt="🙍‍♀️" className="h-full" />
                </div>

                <span className="font-bold">Ask Urbania</span>

                <button onClick={() => setIsOpen(false)} className="ml-auto">✕</button>

              </div>

              <div className="flex-1 p-4 overflow-y-auto text-sm">

                <p className="relative bg-white p-4 pb-6 rounded-md shadow-sm">
                    Halo! Lorem ipsum der amet something engga hafal aku
                    <span className="absolute bottom-2 right-4 text-gray-500">18:28</span>
                </p>

              </div>

              <div className="flex p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">

                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-2 text-sm outline-0"
                />

                {sendIcon}

              </div>
            </div>

          ) : (

            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-main text-white rounded-full shadow-lg flex items-center justify-center overflow-hidden"
            >
              <img src={avatar} alt="🙍‍♀️" />
            </button>
          )}
        </div>
  );

}