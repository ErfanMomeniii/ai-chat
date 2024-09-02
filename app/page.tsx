"use client";
import { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [all_messages,setAllMessages]=useState(Array())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true)
    
    all_messages.push({role:'user',content:message})
    
    const data = {
      message:message,
      all_messages:all_messages
    };
    
    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data) 
    };

    const response = await fetch("/api/chat",options);
    const result = await response.json()
    
    all_messages.push({role:'ai',content:result.content})

    setAllMessages(all_messages)
    setResponse(result.content);
    setMessage("");
    setIsLoading(false)
  };

  return (
    <div className="flex flex-col w-full h-screen max-w-md py-24 mx-auto stretch overflow-hidden">
      <div className="overflow-auto w-full mb-8">
        {all_messages.map((m) => (
          <div
            key="message"
            className={`whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-green-200 p-3 m-2 rounded-lg"
                : "bg-slate-300 p-3 m-2 rounded-lg"
            }`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end pr-4">
            <span className="animate-pulse text-2xl">...</span>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            className="w-[90%] p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
            value={message}
            placeholder="Say something..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
                type="submit"
                className="ml-6 mb-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Send
              </button>
        </form>
      </div>
    </div>
  );

};

export default Home;