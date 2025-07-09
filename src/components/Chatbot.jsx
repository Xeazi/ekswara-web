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
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
      { sender: "bot", text: "Halo! Ada yang bisa saya bantu?" }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
      if (!input.trim()) return;
      const userMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);
      try {
        const res = await fetch("https://devinfaiz-chatbot.hf.space/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input })
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.response || "Maaf, saya tidak mengerti." }
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Maaf, terjadi kesalahan. Silakan coba lagi." }
        ]);
      } finally {
        setLoading(false);
      }
    };

    const handleInputKeyDown = (e) => {
      if (e.key === "Enter" && !loading) {
        handleSend();
      }
    };

    return (
        <div className="fixed bottom-6 right-6 z-1">
          {isOpen ? (
            <div className="w-80 h-100 bg-garis shadow-lg rounded-md flex flex-col overflow-hidden">

              <div className="bg-main text-white px-6 py-2 flex gap-4 items-center shadow-lg">

                <div className="h-[2rem] bg-white rounded-full overflow-hidden">
                    <img src={avatar} alt="🙍‍♀️" className="h-full" />
                </div>

                <span className="font-bold">Ask Urbania</span>

                <button onClick={() => setIsOpen(false)} className="ml-auto hover:font-extrabold">✕</button>

              </div>

              <div className="flex-1 p-4 overflow-y-auto text-sm">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-md px-3 py-2 max-w-[80%] shadow-sm ${msg.sender === "user" ? "bg-main text-white" : "bg-white text-text"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="mb-2 flex justify-start">
                    <div className="rounded-md px-3 py-2 bg-white text-text max-w-[80%] shadow-sm opacity-70 italic">Sedang mengetik...</div>
                  </div>
                )}
              </div>

              <div className="flex p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">

                <input
                  type="text"
                  placeholder="Tulis pertanyaan..."
                  className="w-full p-2 text-sm outline-0"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  disabled={loading}
                />

                <button onClick={handleSend} disabled={loading || !input.trim()} className="ml-2">
                  {sendIcon}
                </button>

              </div>
            </div>

          ) : (

            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-main text-white rounded-full shadow-lg flex items-center justify-center overflow-hidden hover:scale-125 transition ease-out active:scale-90"
            >
              <img src={avatar} alt="🙍‍♀️" /> 
            </button>
          )}
        </div>
  );
}