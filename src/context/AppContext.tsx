'use client'

import { getAuthToken, getCurrentUser, loginRequired, loginWithEmail, signOut } from '@/lib/firebaseClient'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useState, useEffect } from 'react'

export interface UserData {
    id: string
    name: string
    email: string
    usn: string
    collegeName: string
    age: string
    phone: string
    idCardUrl?: string
    profileCode: string
    hasPaid: boolean
    registeredEvents: { id: string, teamName: string }[]
    avatar: string
    studentType: 'internal' | 'external'
    password?: string
}

interface Event {
    id: string
    title: string
    type: 'Technical' | 'Cultural' | 'Gaming'
    fee: number
    visual: string
}

interface AppContextType {
    cart: Event[]
    addToCart: (event: Event) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
    totalAmount: number
    isLoggedIn: boolean
    needsOnboarding: boolean
    userData: UserData | null
    login: (email: string, password: string) => void
    logout: () => void
    registerUser: (data: Omit<UserData, 'id' | 'profileCode' | 'hasPaid' | 'registeredEvents' | 'avatar' | 'studentType'>) => void
    markAsPaid: () => void
    updateRegisteredEvents: (events: { id: string, teamName: string }[]) => void
    updateAvatar: (avatarUrl: string) => void,
    mountUser: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

async function getUserData() {
    const token = await getAuthToken();
    if (!token) {
        return null;
    }
    const response = await fetch('/api/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data.user;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Event[]>([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [needsOnboarding, setNeedsOnboarding] = useState(false)
    const router = useRouter();

    // On mount, check auth and user profile
    const mountUser = async () => {
        const currentUser = getCurrentUser();
        console.log("Mounting user, currentUser:", currentUser);
        if (currentUser) {
            try {
                const userData = await getUserData();
                if (userData) {
                    setUserData(userData);
                    setIsLoggedIn(true);
                    setNeedsOnboarding(false);
                } else {
                    // Authenticated but no user profile in DB
                    setUserData(null);
                    setIsLoggedIn(true);
                    setNeedsOnboarding(true);
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } else {
            setIsLoggedIn(false);
            setUserData(null);
            setNeedsOnboarding(false);
        }
    }

    const addToCart = (event: Event) => {
        if (!cart.find(item => item.id === event.id)) {
            setCart([...cart, event])
        }
    }

    const removeFromCart = (id: string) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const clearCart = () => setCart([])

    const totalAmount = cart.reduce((total, item) => total + item.fee, 0)

    const login = async (email: string, password: string) => {
        if(email === '' || password === '') {
            alert("Please enter a password.")
            return;
        }

        try {
            const user = await loginWithEmail(email, password);
            if (user) {
                const userData = await getUserData();
                if (userData) {
                    setUserData(userData);
                    setIsLoggedIn(true);
                    setNeedsOnboarding(false);
                } else {
                    // Authenticated but no user profile in DB
                    setUserData(null);
                    setIsLoggedIn(true);
                    setNeedsOnboarding(true);
                    router.push('/login');
                }
            } else {
                alert("Invalid credentials or user not found. Please register.")
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials and try again.")
        }
    }

    const logout = () => {
        signOut();
        setIsLoggedIn(false)
        setUserData(null)
    }

    const registerUser = async (data: Omit<UserData, 'id' | 'profileCode' | 'hasPaid' | 'registeredEvents' | 'avatar' | 'studentType'>) => {
        const profileCode = Math.random().toString(36).substring(2, 8).toUpperCase()
        const currentUser = getCurrentUser();
        const id = currentUser ? currentUser.uid : Math.random().toString(36).substring(2, 10);

        const studentType = data.email.endsWith('@sode-edu.in') ? 'internal' : 'external'

        const newUser: UserData = {
            ...data,
            id,
            profileCode,
            hasPaid: false,
            registeredEvents: [],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
            studentType
        }

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser ? (await getAuthToken()) : ''}`
            },
            body: JSON.stringify({ user: newUser, uid: id }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return response.json();
        }).then(data => {
            console.log('User registered successfully:', data);
            setUserData(newUser);
            setIsLoggedIn(true);
            setNeedsOnboarding(false);
        }).catch(error => {
            console.error('Error registering user:', error);
        });
    }

    const markAsPaid = () => {
        if (userData) {
            const updatedUser = { ...userData, hasPaid: true }
            setUserData(updatedUser)

            // Update in all users list too
            const users = JSON.parse(localStorage.getItem('v_all_users') || '[]')
            const index = users.findIndex((u: UserData) => u.email === userData.email)
            if (index !== -1) {
                users[index] = updatedUser
                localStorage.setItem('v_all_users', JSON.stringify(users))
            }
        }
    }

    const updateRegisteredEvents = (events: { id: string, teamName: string }[]) => {
        if (userData) {
            // Merge existing with new, avoiding duplicates by event ID
            const existing = userData.registeredEvents || []
            const newEvents = events.filter(ne => !existing.find(ee => ee.id === ne.id))

            const updatedUser = {
                ...userData,
                registeredEvents: [...existing, ...newEvents]
            }
            setUserData(updatedUser)

            const users = JSON.parse(localStorage.getItem('v_all_users') || '[]')
            const index = users.findIndex((u: UserData) => u.email === userData.email)
            if (index !== -1) {
                users[index] = updatedUser
                localStorage.setItem('v_all_users', JSON.stringify(users))
            }
        }
    }

    const updateAvatar = (avatarUrl: string) => {
        if (userData) {
            const updatedUser = { ...userData, avatar: avatarUrl }
            setUserData(updatedUser)

            const users = JSON.parse(localStorage.getItem('v_all_users') || '[]')
            const index = users.findIndex((u: UserData) => u.email === userData.email)
            if (index !== -1) {
                users[index] = updatedUser
                localStorage.setItem('v_all_users', JSON.stringify(users))
            }
        }
    }

    return (
        <AppContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            totalAmount,
            isLoggedIn,
            userData,
            needsOnboarding,
            login,
            logout,
            registerUser,
            markAsPaid,
            updateRegisteredEvents,
            updateAvatar,
            mountUser
        }}>
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
