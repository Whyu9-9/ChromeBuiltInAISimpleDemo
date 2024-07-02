import { FC } from 'react'

export const BrowserException: FC<{ isChrome: boolean }> = ({ isChrome }) => {
    return (
        <>
            {!isChrome ? (
                <div className="text-sm text-red-500 mt-2 text-center">
                    Sorry, this demo website is only available in Chrome Browser.
                </div>
            ) : (
                <span className="hidden">Hidden</span>
            )}
        </>
    )
}
