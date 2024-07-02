import { FC } from 'react'

export const ResponseTime: FC<{ message: Message }> = ({ message }) => {
    return (
        <>
            {
                !message.isUser ? (
                    <div className="mt-1 text-xs">
                        <span className={`font-bold ${message.responseTime && message.responseTime < 2 ? "text-green-500" : "text-red-500"}`}>{Math.round(Number(message.responseTime) * 100) / 100}s</span>
                    </div>
                ) : (
                    <span className='hidden'>Hidden</span>
                )
            }
        </>
    )
}
