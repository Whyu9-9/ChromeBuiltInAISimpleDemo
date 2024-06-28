import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface Message {
  text: string;
  isUser: boolean;
}

declare const window: any;

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { text: input, isUser: true };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        return updatedMessages.length > 10 ? updatedMessages.slice(1) : updatedMessages;
      });
      setInput('');
      setLoading(true);
      setTimeout(async () => {
        try {
          const canCreate = await window.ai.canCreateTextSession();

          if (canCreate !== "no") {
            const session = await window.ai.createTextSession();
            const result = await session.prompt(input);

            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages, { text: result, isUser: false }];
              return updatedMessages.length > 10 ? updatedMessages.slice(1) : updatedMessages;
            });

            session.destroy();
            setLoading(false);
          } else {
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages, { text: "Sorry, I can't create a session right now. Please try again later.", isUser: false }];
              return updatedMessages.length > 10 ? updatedMessages.slice(1) : updatedMessages;
            });
            setLoading(false);
          }
        } catch (e) {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, { text: "You run this code in a non-dev version browser. Please try using the dev version browser (Chrome Canary or Chrome Dev).", isUser: false }];
            return updatedMessages.length > 10 ? updatedMessages.slice(1) : updatedMessages;
          });
          setLoading(false);
        }
      }, 1000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pr-3 pl-3">
      {messages.length === 0 && (
        <>
          <span className="text-4xl text-center mb-3">
            <span className="font-bold">
              <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
            </span>
            &nbsp;
            <span className="text-gray-500">Chrome</span>
          </span>
          <span className="text-xl font-bold text-center text-blue-500 mb-3">Built-in AI Demo</span>
        </>
      )}
      <div className="w-full max-w-lg flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <div className={`flex-1 max-h-[540px] p-4 overflow-scroll ${messages.length > 0 ? '' : 'hidden'}`}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
                <div className={`relative rounded-xl p-2 ${message.isUser ? 'bg-blue-500 text-white rounded-br-none ml-5' : 'bg-gray-300 text-black rounded-bl-none mr-5'}`}>
                  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start mb-1'} text-sm font-bold `}>
                    {message.isUser ? '' : 'Response:'}
                  </div>
                  {message.text}
                  {message.isUser ? (
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[10px] border-t-blue-500 border-l-[10px] border-l-transparent"></div>
                  ) : (
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[10px] border-t-gray-300 border-r-[10px] border-r-transparent"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div
              className="flex mb-2 justify-start"
            >
              <div className="flex flex-col items-start">
                <div className="relative rounded-xl p-2 bg-gray-300 text-black rounded-bl-none mr-5">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[10px] border-t-gray-300 border-r-[10px] border-r-transparent"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <form className="flex p-4 bg-gray-200" onSubmit={handleSubmit}>
          <input
            className="flex-1 mr-2 rounded-md border-2 border-gray-300 bg-white py-2 px-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            placeholder="Ask me anything..."
            type="text"
            onChange={handleChange}
            value={input}
          />
          <button
            className="w-sm text-white rounded-md bg-blue-500 py-2 px-4 align-middle text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="submit"
            id="submit-button"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}
