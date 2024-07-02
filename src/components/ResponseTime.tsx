import { FC } from 'react'

export const ResponseTime: FC<{ message: Message }> = ({ message }) => {
    return (
        <>
            {
                !message.isUser ? (
                    <div className="mt-1 text-xs">
                        Response Time: <span className={`font-bold ${message.responseTime && message.responseTime < 2 ? "text-green-500" : "text-red-500"}`}>{message.responseTime}s</span>
                    </div>
                ) : (
                    <span className='hidden'>Hidden</span>
                )
            }
        </>
    )
}
