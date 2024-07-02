import { FC } from 'react'

export const Loader: FC<{ loading: boolean }> = ({ loading }) => {
    return (
        <>
            {loading ? (
                <div
                    className="flex mb-2 justify-start"
                    data-testid="loader"
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
            ) : (
                <span className="hidden">Hidden</span>
            )}
        </>
    )
}
