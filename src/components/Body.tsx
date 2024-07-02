import React, { FC } from 'react'

export const Body: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full max-w-lg flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
            {children}
        </div>
    )
}
