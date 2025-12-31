'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Event {
    id: string
    title: string
    type: 'Technical' | 'Cultural' | 'Gaming'
    price: number
    image: string
}

interface AppContextType {
    cart: Event[]
    addToCart: (event: Event) => void
    removeFromCart: (id: string) => void
    totalAmount: number
    isLoggedIn: boolean
    login: () => void
    logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Event[]>([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const addToCart = (event: Event) => {
        if (!cart.find(item => item.id === event.id)) {
            setCart([...cart, event])
        }
    }

    const removeFromCart = (id: string) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const totalAmount = cart.reduce((total, item) => total + item.price, 0)

    const login = () => setIsLoggedIn(true)
    const logout = () => setIsLoggedIn(false)

    return (
        <AppContext.Provider value={{ cart, addToCart, removeFromCart, totalAmount, isLoggedIn, login, logout }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
