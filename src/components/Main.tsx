import React, { FC } from 'react'

export const Main: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pr-3 pl-3">
            {children}
        </div>
    )
}
