import { createContext, useContext, type FC, type ReactNode } from 'react'
import { brand, type BrandConfig } from '@openclaw/shared'

const BrandContext = createContext<BrandConfig>(brand)

export const useBrand = () => useContext(BrandContext)

export const BrandProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <BrandContext.Provider value={brand}>
            {children}
        </BrandContext.Provider>
    )
}