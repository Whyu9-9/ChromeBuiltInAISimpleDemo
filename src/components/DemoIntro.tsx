import { FC } from 'react'

export const DemoIntro: FC<{ messages: Message[] }> = ({ messages }) => {
    return (
        <>
            {messages.length === 0 ? (
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
            ) : (
                <span className="hidden">Hidden</span>
            )}
        </>
    )
}
