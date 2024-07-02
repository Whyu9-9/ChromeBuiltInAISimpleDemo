import { FC, MouseEventHandler } from 'react'
import Markdown from 'react-markdown'
import { ResponseTime } from './ResponseTime'
import { Loader } from './Loader'
import { TfiReload } from "react-icons/tfi";
import { MdContentCopy } from "react-icons/md";

export const Chat: FC<{
    messages: Message[],
    loading: boolean,
    handleCopyMessage: (text: string) => void
    handleReload: (id: number) => void
}> = ({ messages, loading, handleCopyMessage, handleReload }) => {
    return (
        <div className={`flex-1 max-h-[540px] p-4 overflow-scroll ${messages.length > 0 ? '' : 'hidden'}`}>
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex mb-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[300px] relative rounded-xl p-2 ${message.isUser ? 'bg-blue-500 text-white rounded-br-none ml-5' : 'bg-gray-300 text-black rounded-bl-none mr-5'}`}>
                            <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start mb-1'} text-sm font-bold `}>
                                {message.isUser ? '' : 'Response:'}
                            </div>
                            <div className="overflow-scroll">
                                <Markdown>{message.text}</Markdown>
                            </div>
                            {message.isUser ? (
                                <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[10px] border-t-blue-500 border-l-[10px] border-l-transparent"></div>
                            ) : (
                                <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[10px] border-t-gray-300 border-r-[10px] border-r-transparent"></div>
                            )}
                        </div>
                        {
                            !message.isUser && (
                                <div className='flex justify-start items-center gap-2'>
                                    <TfiReload className='mt-1 h-4 w-4 cursor-pointer' onClick={() => handleReload(message.id)} />
                                    <MdContentCopy className='mt-1 h-4 w-4 cursor-pointer' onClick={() => handleCopyMessage(message.text)} />
                                    <ResponseTime message={message} />
                                </div>
                            )
                        }
                    </div>
                </div>
            ))}
            <Loader loading={loading} />
        </div>
    )
}
