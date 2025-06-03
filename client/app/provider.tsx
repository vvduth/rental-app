"use client"

import StoreProvider from "@/state/redux"
import Auth from "./(auth)/authProvider"
import { Authenticator } from "@aws-amplify/ui-react"
export const Provider = ({ children }: { children: React.ReactNode }) => {
    
    
    return <StoreProvider>
        <Authenticator.Provider>
            <Auth>
                {children}
            </Auth>
        </Authenticator.Provider>
    </StoreProvider>
}