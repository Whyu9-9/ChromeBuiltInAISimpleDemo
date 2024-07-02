import { FC } from 'react'
import { FaPaperPlane } from "react-icons/fa";

export const Form: FC<FormProps> = (
    { handleSubmit, handleChange, input, textareaRef, isChrome }
) => {
    return (
        <form className="flex p-4 bg-gray-200" onSubmit={handleSubmit}>
            <div className="flex w-full items-end">
                <textarea
                    ref={textareaRef}
                    className="flex-1 mr-2 disabled:opacity-50 rounded-md border-2 border-gray-300 bg-white py-2 px-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black resize-none overflow-hidden"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={handleChange}
                    disabled={!isChrome}
                    rows={1}
                />
                <button
                    className="w-[55px] h-[35px] disabled:opacity-50 text-white rounded-md bg-blue-500 py-2 px-4 align-middle text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-center mb-[1px]"
                    type="submit"
                    id="submit-button"
                    disabled={!isChrome}
                >
                    <FaPaperPlane />
                </button>
            </div>
        </form>
    )
}
