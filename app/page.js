"use client"
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaStop } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { TonConnectButton } from "@tonconnect/ui-react";
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [iswaiting, setiswaiting] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      setiswaiting(true)
      setMessages([ { type: "user", text: input },...messages]);
      setInput(""); // Clear input
      setTimeout(() => {
        // Simulate assistant reply
        setMessages((prev) => [
         
          {
            type: "assistant",
            text: "I’m here to assist you with anything you need.",
          }, ...prev
        ]);
        setiswaiting(false)
      }, 3000);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line
      handleSendMessage();
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-black via-zinc-900 to-neutral-900 text-neutral-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 shadow-lg border-b border-neutral-800">
        <h1 className="text-xl font-semibold tracking-widest text-neutral-100">
          AI Chat
        </h1>
        <TonConnectButton></TonConnectButton>
        <button className="text-sm font-medium text-neutral-400 hover:text-neutral-300 transition">
        <RxHamburgerMenu size={30} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col-reverse p-4  overflow-y-auto space-y-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-sm px-4 py-3 rounded-full shadow ${
              message.type === "user"
                ? "ml-auto bg-neutral-800 text-neutral-100"
                : "bg-neutral-700 text-neutral-300"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 bg-zinc-900 border-t border-neutral-800">
        <input
        disabled={iswaiting}
          type="text"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-700 shadow-sm transition"
        />
        {iswaiting ? <button
          
          onClick={()=>{setiswaiting(false)}}
          className="ml-3 px-4 py-3 bg-neutral-800 text-neutral-100 rounded-full shadow-lg hover:bg-neutral-700 transition"
        >
         <FaStop size={20} className="p-0.5" />
        </button>:
        <button
          onClick={handleSendMessage}
          className="ml-3 px-4 py-3 flex items-start bg-neutral-800 text-neutral-100 rounded-full shadow-lg hover:bg-neutral-700 transition"
        >
         <IoSend size={20} />
        </button>}
      </div>
    </div>
  );
}


