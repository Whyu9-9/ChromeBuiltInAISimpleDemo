import { FC } from 'react'
import Markdown from 'react-markdown'
import { ResponseTime } from './ResponseTime'
import { Loader } from './Loader'

export const Chat: FC<{ messages: Message[], loading: boolean }> = ({ messages, loading }) => {
    return (
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
                            <Markdown>{message.text}</Markdown>
                            {message.isUser ? (
                                <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[10px] border-t-blue-500 border-l-[10px] border-l-transparent"></div>
                            ) : (
                                <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[10px] border-t-gray-300 border-r-[10px] border-r-transparent"></div>
                            )}
                        </div>
                        <ResponseTime message={message} />
                    </div>
                </div>
            ))}
            <Loader loading={loading} />
        </div>
    )
}
