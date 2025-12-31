'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { X, Activity, Search, MousePointer2, Zap, Rocket, Globe, ShoppingCart, Users, Clock, ChevronDown } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import ProEventBackground from '@/components/ui/ProEventBackground'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Mission {
    id: string
    title: string
    type: 'Technical' | 'Cultural' | 'Gaming'
    category?: 'Hobby Club' | 'General' | 'Promotional'
    description: string
    rules: string[]
    prizePool: string
    coordinators: string[]
    fee: number
    visual: string
    date: string
    specs: string[]
}

const missions: Mission[] = [
    // --- TECHNICAL MISSIONS (V_TECH) ---
    {
        id: 't-algo',
        title: 'ALGORITHM_ROULETTE',
        type: 'Technical',
        description: 'Team-based machine learning challenge. A random algorithm is assigned via the roulette interface, requiring instant adaptation and model deployment.',
        rules: ['Team of 2', '2-hour implementation window', 'No pre-trained models allowed', 'Spin for algorithm at start'],
        prizePool: '₹20,000+',
        coordinators: ['Ananya Bhat', 'Yathika P Amin'],
        fee: 200,
        visual: '/brain/5ee9f092-bf3b-476d-abd8-f1a3fc9c22f7/algorithm_roulette_mission_1767081820438.png',
        date: '11 MAR',
        specs: ['ML', 'SCIKIT', 'PYTHON']
    },
    {
        id: 't-hunt',
        title: 'HACK_HUNT',
        type: 'Technical',
        description: 'Flag-finding coding competition. Breach encrypted nodes and solve multi-layered algorithmic puzzles in a race against the clock.',
        rules: ['Individual participation', '90 min snippet phase', '2 hr deep-dive phase', 'No external internet allowed'],
        prizePool: '₹15,000+',
        coordinators: ['Ramachandra Udupa', 'Anurag R Rao'],
        fee: 200,
        visual: '/brain/5ee9f092-bf3b-476d-abd8-f1a3fc9c22f7/hackhunt_mission_1767081838512.png',
        date: '12 MAR',
        specs: ['CYBER', 'LOGIC', 'NODE']
    },
    {
        id: 't-prompt',
        title: 'PROMPT_TO_PRODUCT',
        type: 'Technical',
        description: 'AI-powered product engineering. Leverage LLM architecture to transform a prompt into a functional, deployed technical product.',
        rules: ['Individual/Team of 2', 'Must document prompt chain', 'Live deployment required', 'Judged on innovation'],
        prizePool: '₹12,000+',
        coordinators: ['Bhushan Poojary', 'Suraj Bhagwat'],
        fee: 200,
        visual: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
        date: '21 MAR',
        specs: ['AI', 'LLM', 'GEN_TECH']
    },
    {
        id: 't-line',
        title: 'FASTEST_LINE_FOLLOWER',
        type: 'Technical',
        description: 'Autonomous robotics racing. Design a high-speed bot capable of navigating complex circuit paths with zero human intervention.',
        rules: ['Autonomous bots only', '3-minute run limit', 'Points for speed and path accuracy', 'Max dimensions: 20x20cm'],
        prizePool: '₹10,000',
        coordinators: ['Kaushik A', 'Raveesha Padmashali'],
        fee: 200,
        visual: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
        date: '20 MAR',
        specs: ['BOT', 'PATH', 'SENSOR']
    },
    {
        id: 't-soccer',
        title: 'ROBO_SOCCER',
        type: 'Technical',
        description: 'Hydraulic and electric kinetic combat. A tactical robot soccer tournament where technical precision meets high-speed sports.',
        rules: ['Team of 2-3', 'Knockout format', '5-minute match duration', 'Tactical timeouts allowed'],
        prizePool: '₹12,000',
        coordinators: ['Pavan R Gond', 'Vishwas Bhat'],
        fee: 200,
        visual: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&q=80',
        date: '21 MAR',
        specs: ['METAL', 'STRIKE', 'FORCE']
    },
    {
        id: 't-wright',
        title: 'WRIGHT_BROTHERS',
        type: 'Technical',
        description: 'Aeronautical design challenge. Construct and launch a non-powered glider that maximizes air-time and stability.',
        rules: ['Build at venue (3 hrs)', 'Hand-launched only', 'Max weight: 500g', 'No chemical propulsion'],
        prizePool: '₹8,000',
        coordinators: ['Pavan R Gond', 'Vishwas Bhat'],
        fee: 200,
        visual: 'https://images.unsplash.com/photo-1544625345-d368097b3986?w=1200&q=80',
        date: '21 MAR',
        specs: ['AERO', 'GLIDE', 'FLIGHT']
    },
    {
        id: 't-electro',
        title: 'ELECTRO_DETECTIVES',
        type: 'Technical',
        description: 'Hardware debugging and circuit forensics. Identify and fix points of failure in complex electronic ecosystems.',
        rules: ['Solo entry', 'No external textbooks', 'Standard lab equipment provided', 'Time-attack format'],
        prizePool: '₹6,000',
        coordinators: ['Prerana Shetty', 'Nishmitha'],
        fee: 200,
        visual: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
        date: '20 MAR',
        specs: ['VOLT', 'DEBUG', 'CIRCUIT']
    },
    {
        id: 't-route',
        title: 'ROUTE_RUSH',
        type: 'Technical',
        description: 'Intelligent maze navigation. Program your micro-unit to map and solve a kinetic maze in record time.',
        rules: ['Autonomous code only', 'Max size: 15x15cm', '3 attempts per team', 'Maze revealed at start'],
        prizePool: '₹10,000',
        coordinators: ['Athula A Bhat', 'G Rahul Rao'],
        fee: 200,
        visual: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=1200&q=80',
        date: '21 MAR',
        specs: ['MAZE', 'AUTO', 'LOGIC']
    },
    {
        id: 't-pitch',
        title: 'PITCHATHON',
        type: 'Technical',
        description: 'Next-gen startup and innovation pitching. Present your planetary solution to a panel of expert architects.',
        rules: ['5-7 minute pitch', '3 minute Q&A', 'Problem statement predated', 'Pitch deck mandatory'],
        prizePool: '₹25,000+',
        coordinators: ['Pai Avani', 'Bhushan Poojary'],
        fee: 200,
        visual: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
        date: '12 MAR',
        specs: ['IDEA', 'VC', 'SCALE']
    },

    // --- GAMING SECTOR (V_GAME) ---
    {
        id: 'g-val',
        title: 'CLASH_OF_RADIANTS',
        type: 'Gaming',
        description: '5v5 Valorant Tactical Tournament. High-stakes competition on our dedicated ultra-low latency servers.',
        rules: ['Team of 5', 'Standard competitive rules', 'Double elimination', 'Bring own peripherals'],
        prizePool: '₹40,000',
        coordinators: ['U Pradyumna', 'Sathwik S Bhat'],
        fee: 500,
        visual: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
        date: 'MAR 24-25',
        specs: ['5v5', 'TACTIC', 'FPS']
    },

    // --- CULTURAL MISSIONS (V_CULT) ---
    // CLUB: MUSIC
    {
        id: 'cm-marathon',
        title: 'MUSICAL_MARATHON',
        type: 'Cultural',
        category: 'Hobby Club',
        description: 'Elite competitive singing championship. Showcasing vocal range across classical and contemporary sectors.',
        rules: ['Max 3 per group', 'No auto-tune allowed', '5 min time limit', 'Live instruments permitted'],
        prizePool: '₹15,000',
        coordinators: ['Chitkala', 'Akash'],
        fee: 150,
        visual: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80',
        date: '21 MAR',
        specs: ['VOICE', 'LIVE', 'PITCH']
    },
    // CLUB: DANCE
    {
        id: 'cd-groove',
        title: 'GROOVE_GALA',
        type: 'Cultural',
        category: 'Hobby Club',
        description: 'High-energy solo dance battle. Fusing modern street-style with traditional rhythmic patterns.',
        rules: ['Solo participation', 'Original choreography', 'Props allowed', '3 min performance'],
        prizePool: '₹10,000',
        coordinators: ['Rachana', 'Ananya'],
        fee: 150,
        visual: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80',
        date: '22 MAR',
        specs: ['MOVE', 'BEAT', 'FUSE']
    },
    // CLUB: DRAMA
    {
        id: 'cd-mime',
        title: 'NEON_MIME',
        type: 'Cultural',
        category: 'Hobby Club',
        description: 'The art of silent storytelling. Express complex planetary themes without a single spoken syllable.',
        rules: ['Group performance (4-8)', 'No background vocals', 'White face-paint mandatory', '10 min maximum'],
        prizePool: '₹12,000',
        coordinators: ['Surabhi', 'Viraj'],
        fee: 150,
        visual: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&q=80',
        date: '21 MAR',
        specs: ['SILENT', 'EMOTE', 'ACT']
    },
    // CLUB: FINE ARTS
    {
        id: 'cf-3d',
        title: '3D_DRAW_TECH',
        type: 'Cultural',
        category: 'Hobby Club',
        description: 'Perspective based 3D drawing competition. Constructing optical illusions on a flat surface.',
        rules: ['Solo entry', 'Canvas provided', 'Dry media only', '3 hour duration'],
        prizePool: '₹5,000',
        coordinators: ['Fine Arts Unit'],
        fee: 150,
        visual: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
        date: '20 MAR',
        specs: ['DEPTH', 'ILLUSION', 'ART']
    },
    // CLUB: MEDIA
    {
        id: 'cm-pixel',
        title: 'PIXEL_PERFECT',
        type: 'Cultural',
        category: 'Promotional',
        description: 'On-spot photography mission. Capture the festival through a technological and environmental lens.',
        rules: ['On-spot registration', 'Edit within camera apps only', 'Max 3 submissions', 'Theme-based'],
        prizePool: '₹8,000',
        coordinators: ['Media Club'],
        fee: 150,
        visual: 'https://images.unsplash.com/photo-1452784444945-3f422708fe5e?w=1200&q=80',
        date: 'FEST_DURATION',
        specs: ['LENS', 'FRAME', 'SNAP']
    },
    {
        id: 'cm-reels',
        title: 'REEL_FLOW',
        type: 'Cultural',
        category: 'Promotional',
        description: 'Short-form cinematic storytelling. Create high-engagement social media reels capturing the energy floor.',
        rules: ['Duration: 15-60s', 'Original music/audio', 'Must include fest branding', 'Judged on reach & edit'],
        prizePool: '₹5,000',
        coordinators: ['Media Club'],
        fee: 150,
        visual: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
        date: 'FEST_DURATION',
        specs: ['EDIT', 'SYNC', 'SOCIAL']
    },
    // GENERAL CULTURAL
    {
        id: 'cg-anime',
        title: 'ANIME_PROTOCOL_QUIZ',
        type: 'Cultural',
        category: 'General',
        description: 'Deep-dive trivia on otaku culture and animation systems. Compete to be the ultimate sector expert.',
        rules: ['Team of 2', '3 rounds of trivia', 'Visual & Audio rounds', 'No mobile usage'],
        prizePool: '₹3,000',
        coordinators: ['Advaith'],
        fee: 100,
        visual: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=1200&q=80',
        date: '22 MAR',
        specs: ['OTAKU', 'QUIZ', 'LORE']
    },
    {
        id: 'cg-ink',
        title: 'INK & IMAGINATION',
        type: 'Cultural',
        category: 'General',
        description: 'Creative writing and poetry slam. Express the intersection of nature and technology through verse.',
        rules: ['Solo entry', 'Theme given on spot', 'Multi-language support', 'Original pieces only'],
        prizePool: 'TBA',
        coordinators: ['Advaith'],
        fee: 100,
        visual: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
        date: '21 MAR',
        specs: ['WRITE', 'SOUL', 'INK']
    },
    {
        id: 'cg-mehandi',
        title: 'BIOMETRIC_MEHANDI',
        type: 'Cultural',
        category: 'General',
        description: 'Traditional patterns meets crystalline tech aesthetics. Redefining Mehandi for the future.',
        rules: ['Solo participation', 'Traditional & Modern mix', '2 hour limit', 'Judged on detail'],
        prizePool: '₹2,500',
        coordinators: ['Cultural Unit'],
        fee: 100,
        visual: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80',
        date: '20 MAR',
        specs: ['TRAD', 'TECH', 'SKIN']
    }
]

export function EventGrid() {
    const [selected, setSelected] = useState<Mission | null>(null)
    const [filter, setFilter] = useState<'All' | 'Technical' | 'Cultural' | 'Gaming'>('All')
    const [subFilter, setSubFilter] = useState<'All' | 'Hobby Club' | 'General' | 'Promotional'>('All')
    const [searchQuery, setSearchQuery] = useState('')
    const { addToCart, cart } = useApp()

    const gridRef = useRef<HTMLDivElement>(null)

    const filtered = missions.filter(m => {
        const matchesType = filter === 'All' || m.type === filter
        const matchesSub = filter !== 'Cultural' || subFilter === 'All' || m.category === subFilter
        const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesType && matchesSub && matchesSearch
    })

    // Dynamic color theme based on event type
    // Only Cultural events get amber/gold - Technical and Gaming stay emerald
    const getEventTheme = (type: 'Technical' | 'Cultural' | 'Gaming') => {
        if (type === 'Cultural') {
            return {
                primary: 'amber-500',
                secondary: 'orange-400',
                glow: 'rgba(245, 158, 11, 0.6)', // amber-500
                border: 'text-amber-500/60 group-hover:text-amber-400',
                borderHover: 'border-amber-500/50',
                text: 'text-amber-400',
                textHover: 'group-hover:text-amber-300',
                bg: 'bg-amber-500',
                bgHover: 'hover:bg-amber-500',
                shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
                gradient: 'from-amber-500 via-amber-400 to-orange-300',
                pulse: 'bg-amber-500/5 group-hover:bg-amber-500/20',
                radarColor: 'rgba(245, 158, 11, 0.15)'
            }
        }

        // Default emerald theme for Technical and Gaming
        return {
            primary: 'emerald-500',
            secondary: 'green-400',
            glow: 'rgba(16, 185, 129, 0.6)', // emerald-500
            border: 'text-emerald-500/60 group-hover:text-emerald-400',
            borderHover: 'border-emerald-500/50',
            text: 'text-emerald-400',
            textHover: 'group-hover:text-emerald-300',
            bg: 'bg-emerald-500',
            bgHover: 'hover:bg-emerald-500',
            shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
            gradient: 'from-emerald-500 via-emerald-400 to-emerald-300',
            pulse: 'bg-emerald-500/5 group-hover:bg-emerald-500/20',
            radarColor: 'rgba(16, 185, 129, 0.15)'
        }
    }

    useEffect(() => {
        if (!gridRef.current) return

        const cards = gridRef.current.querySelectorAll('.event-card-reveal')

        // 1. Header Elements Entrance
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
        tl.fromTo(".header-reveal",
            { opacity: 0, y: -40, filter: "blur(10px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.2 }
        )

        // 2. Card Batch Reveal
        gsap.set(cards, { opacity: 0, y: 80, scale: 0.9, rotateX: -15 })

        ScrollTrigger.batch(cards, {
            onEnter: (elements) => {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    overwrite: true
                })
            },
            onLeaveBack: (elements) => {
                gsap.to(elements, {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                    rotateX: -15,
                    duration: 0.6,
                    overwrite: true
                })
            },
            start: "top bottom-=100",
        })

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [filtered])

    const complexClip = filter === 'Cultural'
        ? `polygon(
            15px 0, calc(100% - 15px) 0, 100% 15px, 
            100% calc(100% - 15px), calc(100% - 15px) 100%, 
            15px 100%, 0 calc(100% - 15px), 0 15px
        )`
        : `polygon(
            30px 0, 100% 0, 
            100% 100%, 
            70% 100%, 65% 94%, 35% 94%, 30% 100%, 
            0 100%, 
            0 60%, 10px 60%, 10px 40%, 0 40%, 
            0 30px
        )`

    // Determine background theme based on filter
    const getBackgroundTheme = (): 'emerald' | 'amber' | 'cyan' => {
        if (filter === 'Cultural') return 'amber'
        if (filter === 'Gaming') return 'emerald' // Keep gaming as emerald
        return 'emerald' // Default for 'All' and 'Technical'
    }

    // Get dynamic glow colors based on current filter
    const getGlowColors = () => {
        if (filter === 'Cultural') {
            return {
                primary: 'rgba(245, 158, 11, 0.12)', // amber
                secondary: 'rgba(245, 158, 11, 0.08)'
            }
        }
        return {
            primary: 'rgba(16, 185, 129, 0.12)', // emerald
            secondary: 'rgba(16, 185, 129, 0.08)'
        }
    }

    const getGlobalTheme = () => {
        if (filter === 'Cultural') {
            return {
                text: 'text-amber-400',
                textMuted: 'text-amber-500/80',
                bg: 'bg-amber-500',
                border: 'border-amber-500/50',
                focusBorder: 'group-focus-within/search:border-amber-500/50',
                focusText: 'group-focus-within/search:text-amber-300',
                focusPlaceholder: 'group-focus-within/search:placeholder:text-amber-400/50',
                glow: 'shadow-[0_0_10px_rgba(245,158,11,0.5)]',
                dropGlow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]',
                gradient: 'from-amber-600 via-amber-400 to-amber-200',
                searchBorder: 'group-focus-within/search:text-amber-500',
                searchGlow: 'rgba(245,158,11,0.3)',
                focusBg: 'group-focus-within/search:bg-amber-500/10'
            }
        }
        return {
            text: 'text-emerald-400',
            textMuted: 'text-emerald-500/80',
            bg: 'bg-emerald-500',
            border: 'border-emerald-500/50',
            focusBorder: 'group-focus-within/search:border-emerald-500/50',
            focusText: 'group-focus-within/search:text-emerald-300',
            focusPlaceholder: 'group-focus-within/search:placeholder:text-emerald-400/50',
            glow: 'shadow-[0_0_10px_rgba(16,185,129,0.5)]',
            dropGlow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]',
            gradient: 'from-emerald-500 via-emerald-400 to-emerald-300',
            searchBorder: 'group-focus-within/search:text-emerald-500',
            searchGlow: 'rgba(16,185,129,0.3)',
            focusBg: 'group-focus-within/search:bg-emerald-500/10'
        }
    }

    const glowColors = getGlowColors()
    const gTheme = getGlobalTheme()

    return (
        <section className="relative min-h-screen pt-20 pb-24 px-6 bg-[#020603] overflow-hidden">
            <ProEventBackground theme={getBackgroundTheme()} />

            {/* High-Luminosity Center Backlight (Lifting Visibility for Event Cards) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80vh] bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_80%)] pointer-events-none z-0" />

            {/* Dynamic Global Glow Accents */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                animate={{
                    background: `radial-gradient(circle at 20% 20%, ${glowColors.primary}, transparent 60%)`
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-0"
                animate={{
                    background: `radial-gradient(circle at 80% 80%, ${glowColors.secondary}, transparent 50%)`
                }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
            />

            <div className="container mx-auto max-w-7xl relative z-10 px-4 md:px-6">
                {/* Advanced Structural Header Unit */}
                <div className={`flex flex-col xl:flex-row items-center xl:items-end justify-between ${(searchQuery === '' && filter === 'All') ? 'mb-8 md:mb-16' : 'mb-4 md:mb-8'} gap-10 border-b border-white/10 pb-10 relative`}>
                    {/* Background Glass Panel for Header structure - Enhanced visibility */}
                    <div className="absolute inset-x-[-4rem] inset-y-[-2rem] bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-[4px] -z-10 xl:block hidden border-x border-t border-white/5"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />

                    {/* LEFT: Title Area */}
                    <div className="header-reveal space-y-1 w-full xl:w-auto text-center xl:text-left py-2">
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className={`flex items-center justify-center xl:justify-start gap-3 ${gTheme.text} font-mono text-[9px] uppercase tracking-[0.4em] font-black mb-4`}
                        >
                            <div className={`w-2 h-2 ${gTheme.bg} rounded-full animate-pulse ${gTheme.glow}`} />
                            <span>SYSTEM_OPERATIONS // TERMINAL_V3.0</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.8] drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            EVENT<br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gTheme.gradient} not-italic`}>
                                .CATEGORIES_
                            </span>
                        </h2>
                    </div>

                    {/* CENTER: Tactical Search Bar - Enhanced Visibility */}
                    <div className="header-reveal relative w-full lg:max-w-xl group/search order-2 xl:order-2">
                        {/* Outer Geometric Border (Sharp White/Emerald) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 400 50">
                            <path
                                d="M 12 0 L 400 0 L 400 38 L 388 50 L 0 50 L 0 12 Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className={`text-white/50 ${gTheme.searchBorder} group-hover/search:text-white/70 transition-all duration-500`}
                                style={{ filter: `drop-shadow(0 0 15px ${gTheme.searchGlow})` }}
                            />
                        </svg>

                        {/* High-Luminosity Glow for Focus */}
                        <div className={`absolute inset-0 bg-white/0 ${gTheme.focusBg} shadow-[inner_0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 pointer-events-none`}
                            style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }} />

                        <div
                            className={`relative flex items-center bg-white/[0.08] backdrop-blur-2xl overflow-hidden border border-white/10 ${gTheme.focusBorder} transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]`}
                            style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
                        >
                            <div className={`pl-6 ${gTheme.text} ${gTheme.focusText} group-focus-within/search:scale-110 transition-all flex items-center gap-2`}>
                                <Search className={`w-5 h-5 ${gTheme.dropGlow}`} />
                                <div className={`w-[1.5px] h-5 ${gTheme.bg}/30 mx-1`} />
                            </div>
                            <input
                                type="text"
                                placeholder="SEARCH THE EVENT // ENTER_QUERY..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full bg-transparent border-none outline-none px-2 py-5 text-[12px] md:text-[13px] font-black uppercase tracking-[0.2em] text-white placeholder:text-white/60 ${gTheme.focusPlaceholder} transition-all`}
                            />
                        </div>
                    </div>

                    {/* RIGHT: Geometric Filters Area - Responsive Stack */}
                    <div className="header-reveal relative p-1 group/filter order-3 xl:order-3 w-full lg:w-auto mt-4 xl:mt-0">
                        {/* Outer Geometric Border (Sharp White) - Desktop Only or Responsive SVG */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block" preserveAspectRatio="none" viewBox="0 0 360 50">
                            <path
                                d="M 12 0 L 360 0 L 360 38 L 348 50 L 0 50 L 0 12 Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-white/30 group-hover/filter:text-white/60 transition-colors duration-500"
                            />
                        </svg>

                        <div
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-1 bg-white/[0.05] p-1.5 backdrop-blur-2xl relative z-0 border border-white/5 md:border-none"
                            style={{ clipPath: 'md:polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
                        >
                            {['All', 'Technical', 'Cultural', 'Gaming'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { setFilter(t as any); setSubFilter('All'); }}
                                    className={`px-4 md:px-6 py-2.5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${filter === t
                                        ? 'text-black z-10'
                                        : 'text-white/70 hover:text-white'
                                        }`}
                                >
                                    {filter === t && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className={`absolute inset-0 ${t === "Cultural" ? "bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]" : "bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"}`}
                                            style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-20 font-black tracking-widest">{t}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sub-Filter System for Cultural Section */}
                <AnimatePresence>
                    {filter === 'Cultural' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-wrap justify-center mb-8 gap-4"
                        >
                            {['All', 'Hobby Club', 'General', 'Promotional'].map((sf) => (
                                <div key={sf} className="relative group/sub">
                                    {/* Outer Border (Sharp White) */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 160 40">
                                        <path
                                            d="M 8 0 L 160 0 L 160 30 L 150 40 L 0 40 L 0 8 Z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className={`${subFilter === sf ? 'text-white' : 'text-white/20 group-hover/sub:text-white/40'} transition-all duration-500`}
                                            style={subFilter === sf ? { filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' } : {}}
                                        />
                                    </svg>

                                    <button
                                        onClick={() => setSubFilter(sf as any)}
                                        className={`relative px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all z-0 ${subFilter === sf
                                            ? 'text-black'
                                            : 'text-white/40 hover:text-white'
                                            }`}
                                        style={{
                                            clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 8px)',
                                            background: subFilter === sf ? (filter === 'Cultural' ? '#fbbf24' : '#ffffff') : 'rgba(255,255,255,0.03)'
                                        }}
                                    >
                                        {sf === 'Hobby Club' ? 'Club Events' : sf === 'General' ? 'General Events' : sf === 'Promotional' ? 'Media & Promo' : 'All Events'}

                                        {/* Glow effect for active tab */}
                                        {subFilter === sf && (
                                            <motion.div
                                                layoutId="subGlow"
                                                className={`absolute inset-0 ${filter === "Cultural" ? "bg-amber-400" : "bg-white"} blur-xl opacity-20 -z-10`}
                                            />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* High-End Scroll Directive - Hidden during Search or Filtering */}
                {/* Professional HUD Scroll Directive */}
                {searchQuery === '' && (filter === 'All' || filter === 'Cultural') && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="flex flex-col items-center gap-4 mb-32 mt-8 relative z-20"
                    >
                        {/* Subtle Ambient Mask for Text Readability */}
                        <div className="absolute inset-x-[-10vw] inset-y-[-2rem] bg-gradient-to-r from-transparent via-black/50 to-transparent blur-3xl pointer-events-none" />

                        <div className="flex flex-col items-center gap-5 relative z-10 text-center">
                            {/* Technical Header with Brackets */}
                            <div className="flex items-center gap-4">
                                <div className={`h-[1px] w-12 md:w-32 bg-gradient-to-r from-transparent ${filter === 'Cultural' ? 'via-amber-500/80 to-amber-500' : 'via-emerald-500/80 to-emerald-500'}`} />
                                <div className="flex items-center gap-3">
                                    <div className={`w-1 h-1 ${filter === 'Cultural' ? 'bg-amber-400' : 'bg-emerald-400'} rotate-45`} />
                                    <span className={`text-[10px] md:text-[11px] font-black ${filter === 'Cultural' ? 'text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]'} uppercase tracking-[0.4em] font-mono`}>
                                        INIT_SCROLL_SEQUENCE
                                    </span>
                                    <div className={`w-1 h-1 ${filter === 'Cultural' ? 'bg-amber-400' : 'bg-emerald-400'} rotate-45`} />
                                </div>
                                <div className={`h-[1px] w-12 md:w-32 bg-gradient-to-l from-transparent ${filter === 'Cultural' ? 'via-amber-500/80 to-amber-500' : 'via-emerald-500/80 to-emerald-500'}`} />
                            </div>

                            <div className="relative group/scroll flex flex-col items-center gap-3">
                                {/* Minimalist Scroll Icon Unit */}
                                <div className="relative flex flex-col items-center mt-2">
                                    <motion.div
                                        animate={{ y: [0, 8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className={`relative w-6 h-10 border border-white/20 rounded-full flex justify-center p-1.5 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.05)]`}
                                    >
                                        <motion.div
                                            animate={{ opacity: [1, 0.4, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className={`w-1 h-2 ${filter === 'Cultural' ? 'bg-amber-500' : 'bg-emerald-500'} rounded-full`}
                                        />
                                    </motion.div>

                                    {/* Side Decorative Brackets */}
                                    <div className={`absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-6 border-l border-y ${filter === 'Cultural' ? 'border-amber-500/10' : 'border-emerald-500/10'}`} />
                                    <div className={`absolute -right-6 top-1/2 -translate-y-1/2 w-3 h-6 border-r border-y ${filter === 'Cultural' ? 'border-amber-500/10' : 'border-emerald-500/10'}`} />
                                </div>

                                <span className={`text-[8px] font-black ${filter === 'Cultural' ? 'text-amber-500/30' : 'text-emerald-500/30'} uppercase tracking-[0.6em] mt-1`}>
                                    V_DRIVE_ACTIVE_EXPLORE
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Dynamic Grid Layout: 3 Columns for Cultural Space, 4 Columns for Professional Density */}
                <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-2 ${filter === 'Cultural' ? 'xl:grid-cols-3 gap-24' : 'xl:grid-cols-4 gap-8 lg:gap-10'} px-4 md:px-8`}>
                    {filtered.map((mission, idx) => {
                        const theme = getEventTheme(mission.type)

                        return (
                            <div
                                key={mission.id}
                                className="event-card-reveal"
                            >
                                <Tilt
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    scale={1.04}
                                    perspective={2000}
                                    transitionSpeed={2000}
                                    className={`${mission.type === 'Cultural' ? 'h-[460px]' : 'h-[440px]'} w-full group`}
                                >
                                    <div className="w-full h-full relative cursor-pointer" onClick={() => setSelected(mission)}>
                                        {/* SUPER-GLOW BACKDROP (The "Card Halo") - Dynamic Color */}
                                        <div
                                            className="absolute inset-[-15px] blur-[60px] transition-all duration-500 opacity-20 group-hover:opacity-100"
                                            style={{
                                                background: `${theme.radarColor}`,
                                                boxShadow: `0 0 70px ${theme.glow}`
                                            }}
                                        />

                                        {/* GEOMETRIC SVG BORDER SYSTEM - Expanded for Cultural Luxury */}
                                        <svg
                                            className={`absolute ${mission.type === 'Cultural' ? 'inset-[-45px] w-[calc(100%+90px)] h-[calc(100%+90px)]' : 'inset-0 w-full h-full'} pointer-events-none z-10 overflow-visible`}
                                            preserveAspectRatio="none"
                                            viewBox={mission.type === 'Cultural' ? "-45 -45 390 530" : "0 0 300 440"}
                                        >
                                            <defs>
                                                <filter id={`glow-${mission.type}-${idx}`} x="-30%" y="-30%" width="160%" height="160%">
                                                    <feGaussianBlur stdDeviation="8" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>

                                                <linearGradient id={`gold-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#78350f" />
                                                    <stop offset="30%" stopColor="#fbbf24" />
                                                    <stop offset="50%" stopColor="#fffbeb" />
                                                    <stop offset="70%" stopColor="#fbbf24" />
                                                    <stop offset="100%" stopColor="#b45309" />
                                                </linearGradient>
                                            </defs>

                                            {/* MAIN OUTER FRAME (Geometric Engine) */}
                                            <path
                                                d={mission.type === 'Cultural'
                                                    ? "M 50 0 L 250 0 L 300 50 L 300 390 L 260 440 L 205 440 L 190 415 L 110 415 L 95 440 L 40 440 L 0 400 L 0 50 Z"
                                                    : "M 30 0 L 300 0 L 300 440 L 210 440 L 195 414 L 105 414 L 90 440 L 0 440 L 0 264 L 14 264 L 14 176 L 0 176 L 0 30 Z"
                                                }
                                                fill="none"
                                                stroke={mission.type === 'Cultural' ? "#fbbf24" : "currentColor"}
                                                strokeWidth={mission.type === 'Cultural' ? "1.5" : "5"}
                                                className={mission.type === 'Cultural' ? "opacity-30" : theme.border}
                                                style={{ filter: mission.type === 'Cultural' ? 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))' : `url(#glow-${mission.type}-${idx})` }}
                                            />

                                            {/* CULTURAL ONLY: THE EXACT ORNATE "LIFAFA" FRAME SYSTEM */}
                                            {mission.type === 'Cultural' && (
                                                <g>
                                                    {/* 1. Underlying Rich Halo Foundation */}
                                                    <path
                                                        d="M 50 0 L 250 0 L 300 50 L 300 390 L 260 440 L 205 440 L 190 415 L 110 415 L 95 440 L 40 440 L 0 400 L 0 50 Z"
                                                        fill="none"
                                                        stroke="rgba(245, 158, 11, 0.4)"
                                                        strokeWidth="45"
                                                        style={{ filter: 'blur(45px)' }}
                                                    />

                                                    {/* 2. THE SCULPTED GOLD FRAME (MUSEUM GRADE FILIGREE) */}
                                                    <g style={{ filter: 'drop-shadow(0 12px 25px rgba(0,0,0,0.9))' }}>
                                                        {/* Molten Base Shadow Layer */}
                                                        <g stroke="#5c2d0b" strokeWidth="4" fill="none" transform="translate(2, 2)" opacity="0.5">
                                                            {[...Array(14)].map((_, i) => (
                                                                <path key={`sh-l-${i}`} d={`M-18,${25 + i * 28} q-15,14 0,28`} />
                                                            ))}
                                                            {[...Array(14)].map((_, i) => (
                                                                <path key={`sh-r-${i}`} d={`M318,${25 + i * 28} q15,14 0,28`} />
                                                            ))}
                                                        </g>

                                                        {/* Main Carved Gold Pattern (Dense Imperial Filigree) */}
                                                        <g stroke={`url(#gold-grad-${idx})`} strokeWidth="3.5" fill="none" strokeLinecap="round">
                                                            {/* Dense Acanthus Leaf Scrolls (The "Royal" Border) - Balanced Position */}
                                                            {[...Array(15)].map((_, i) => (
                                                                <g key={`l-royal-${i}`} transform={`translate(-22, ${i * 28 + 25})`}>
                                                                    <path d="M0,0 c-18,5 -18,15 0,20 c-12,-8 -12,-12 0,-20" strokeWidth="2.8" />
                                                                    <path d="M-8,10 c-5,0 -8,5 -2,5" strokeWidth="1" opacity="0.6" />
                                                                    <path d="M-2,6 a3,3 0 1,0 0.1,0" fill={`url(#gold-grad-${idx})`} stroke="none" />
                                                                </g>
                                                            ))}
                                                            {[...Array(15)].map((_, i) => (
                                                                <g key={`r-royal-${i}`} transform={`translate(322, ${i * 28 + 25}) scale(-1, 1)`}>
                                                                    <path d="M0,0 c-18,5 -18,15 0,20 c-12,-8 -12,-12 0,-20" strokeWidth="2.8" />
                                                                    <path d="M-8,10 c-5,0 -8,5 -2,5" strokeWidth="1" opacity="0.6" />
                                                                    <path d="M-2,6 a3,3 0 1,0 0.1,0" fill={`url(#gold-grad-${idx})`} stroke="none" />
                                                                </g>
                                                            ))}

                                                            {/* Detailed Top/Bottom Cresting - Relaxed */}
                                                            {[...Array(10)].map((_, i) => (
                                                                <g key={`t-royal-${i}`} transform={`translate(${i * 30 + 15}, -22)`}>
                                                                    <path d="M0,8 c5,-18 15,-18 20,0 c-8,-12 -12,-12 -20,0" strokeWidth="2.2" />
                                                                    <circle cx="10" cy="-2" r="1.5" fill="#fff" stroke="none" />
                                                                </g>
                                                            ))}
                                                            {[...Array(10)].map((_, i) => (
                                                                <g key={`b-royal-${i}`} transform={`translate(${i * 30 + 15}, 462)`}>
                                                                    <path d="M0,-8 c5,18 15,18 20,0 c-8,12 -12,12 -20,0" strokeWidth="2.2" />
                                                                    <circle cx="10" cy="2" r="1.5" fill="#fff" stroke="none" />
                                                                </g>
                                                            ))}

                                                            {/* GRAND IMPERIAL CORNERS - Definitive Reference Match */}
                                                            {[
                                                                { t: "translate(-30, -30)", s: "1, 1" },
                                                                { t: "translate(330, -30)", s: "-1, 1" },
                                                                { t: "translate(-30, 470)", s: "1, -1" },
                                                                { t: "translate(330, 470)", s: "-1, -1" }
                                                            ].map((c, i) => (
                                                                <g key={`hero-c-${i}`} transform={`${c.t} scale(${c.s})`}>
                                                                    <path d="M0,100 c0,-70 30,-100 100,-100" strokeWidth="12" strokeOpacity="0.3" />
                                                                    <path d="M0,100 c0,-70 30,-100 100,-100" strokeWidth="5" />
                                                                    <path d="M20,80 c0,-50 30,-80 80,-80" strokeWidth="2.5" opacity="0.6" />
                                                                    {/* Center Jewel */}
                                                                    <circle cx="45" cy="45" r="14" fill={`url(#gold-grad-${idx})`} stroke="#fff" strokeWidth="0.5" />
                                                                    <circle cx="45" cy="45" r="8" fill="#fff" opacity="0.3" />
                                                                    {/* Crosshair Accents */}
                                                                    <path d="M0,0 l40,40" stroke="#fff" strokeWidth="2.5" strokeLinecap="square" />
                                                                    <path d="M10,0 l-10,0 l0,10" stroke="#fff" strokeWidth="3" fill="none" />
                                                                </g>
                                                            ))}
                                                        </g>
                                                    </g>

                                                    {/* 3. SHARP GEOMETRIC INNER BORDER (Elite Focus) */}
                                                    <g>
                                                        {/* Thick Underlying Gold Shadow */}
                                                        <path
                                                            d="M 50 12 L 250 12 L 288 50 L 288 390 L 255 428 L 204 428 L 188 405 L 112 405 L 96 428 L 45 428 L 12 395 L 12 50 Z"
                                                            fill="none"
                                                            stroke="#b45309"
                                                            strokeWidth="8"
                                                            opacity="0.4"
                                                            style={{ filter: 'blur(10px)' }}
                                                        />
                                                        {/* Primary Sharp Gold Line */}
                                                        <path
                                                            d="M 50 12 L 250 12 L 288 50 L 288 390 L 255 428 L 204 428 L 188 405 L 112 405 L 96 428 L 45 428 L 12 395 L 12 50 Z"
                                                            fill="none"
                                                            stroke="url(#gold-grad-)"
                                                            strokeWidth="3.2"
                                                        />
                                                        {/* Ultra Sharp White Highlight Edge */}
                                                        <path
                                                            d="M 50 12 L 250 12 L 288 50 L 288 390 L 255 428 L 204 428 L 188 405 L 112 405 L 96 428 L 45 428 L 12 395 L 12 50 Z"
                                                            fill="none"
                                                            stroke="#fff"
                                                            strokeWidth="0.8"
                                                            opacity="0.6"
                                                        />
                                                    </g>

                                                    {/* THIN DIAMOND EDGE (Laser Sharp Highlight) */}
                                                    <path
                                                        d="M 50 0 L 250 0 L 300 50 L 300 390 L 260 440 L 205 440 L 190 415 L 110 415 L 95 440 L 40 440 L 0 400 L 0 50 Z"
                                                        fill="none"
                                                        stroke="#fff"
                                                        strokeWidth="1.5"
                                                        opacity="0.5"
                                                        strokeDasharray="2 10"
                                                    />
                                                </g>
                                            )}
                                        </svg>

                                        {/* RADAR SWEEP SECTOR - Clipped Area */}
                                        <div
                                            className="absolute inset-[2px] overflow-hidden opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                                            style={{ clipPath: complexClip }}
                                        >
                                            <div className="radar-sweep-line animate-radar-sweep" />
                                        </div>

                                        {/* INNER BORDER SVG - Dynamic based on theme */}
                                        <svg className="absolute inset-[8px] w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 280 420">
                                            <path
                                                d={mission.type === 'Cultural'
                                                    ? "M 15 0 L 265 0 L 280 15 L 280 405 L 265 420 L 15 420 L 0 405 L 0 15 Z"
                                                    : "M 28 0 L 280 0 L 280 420 L 196 420 L 182 394.8 L 98 394.8 L 84 420 L 0 420 L 0 252 L 13 252 L 13 168 L 0 168 L 0 28 Z"
                                                }
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={mission.type === 'Cultural' ? "1" : "2.5"}
                                                className={theme.border.replace('60', '30')}
                                                style={{ filter: `drop-shadow(0 0 12px ${theme.glow})` }}
                                            />
                                        </svg>

                                        <div
                                            className={`absolute inset-[10px] flex flex-col overflow-hidden transition-all duration-700 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] ${mission.type === 'Cultural' ? 'backdrop-blur-2xl border border-white/5' : 'bg-gradient-to-b from-[#242725] via-[#121413] to-[#000000] group-hover:from-[#2a2d2b] group-hover:via-[#181a19] group-hover:to-[#050505]'}`}
                                            style={{
                                                clipPath: complexClip,
                                                background: mission.type === 'Cultural' ? 'linear-gradient(180deg, rgba(20,22,21,0.6) 0%, rgba(0,0,0,0.8) 100%)' : undefined
                                            }}
                                        >
                                            {/* Blueprint Grid Texture Overlay - Enhanced for Transparency */}
                                            <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />

                                            {/* Internal HUD Tech Pulse - Premium Depth */}
                                            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                                                {/* Gradient Overlay for Premium Depth */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{ background: `radial-gradient(circle at 50% 0%, ${theme.radarColor} 0%, transparent 70%)` }}
                                                />

                                                {/* Brighter Tech Pulse Hearth - Increased intensity */}
                                                <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 blur-[100px] animate-tech-pulse opacity-40 group-hover:opacity-80 transition-opacity ${theme.pulse}`} />
                                            </div>

                                            {/* Scanning Shine Effect (Accelerated on hover) */}
                                            <div className="scanning-shine group-hover:animate-[shine_2s_infinite] opacity-50" />

                                            {/* Side Technical Decal - Responsive Hidden/Shown */}
                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className={`absolute top-[35%] bottom-[35%] left-0 w-[16px] flex items-center justify-center ${theme.pulse} transition-colors z-20 border-r ${theme.borderHover.replace('border-', 'border-').replace('/50', '/20')} md:flex hidden`}
                                            >
                                                <span className={`[writing-mode:vertical-rl] rotate-180 text-[9px] font-black tracking-[0.4em] ${theme.text}/80 uppercase ${theme.textHover} transition-colors`}>
                                                    MISSION_UNIT_{idx + 1}
                                                </span>
                                            </motion.div>

                                            {/* HUD Corner Decals */}
                                            <div className="absolute top-4 right-4 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                                <div className={`w-1 h-1 ${theme.bg}`} />
                                                <div className={`w-4 h-1 ${theme.bg}`} />
                                            </div>

                                            <div className="pt-10 px-8 text-center z-20 relative">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className={`text-[9px] font-black ${theme.text}/80 tracking-[0.3em] ${theme.textHover} transition-colors uppercase`}>ID__{mission.id}</div>
                                                    <div className={`text-[9px] font-black text-white/50 tracking-[0.1em] px-2.5 py-0.5 border border-white/10 rounded-full uppercase ${theme.borderHover.replace('border-', 'group-hover:border-')} transition-all`}>
                                                        {mission.type}_UNIT
                                                    </div>
                                                </div>
                                                <h3 className={`${mission.type === 'Cultural' ? 'text-[17px] md:text-[18px]' : 'text-[20px] md:text-[22px]'} font-black uppercase text-white tracking-[0.05em] transition-all leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-3`}>
                                                    {mission.title}
                                                </h3>
                                            </div>

                                            <div
                                                className={`relative overflow-hidden bg-black/40 border transition-all duration-700 z-10 shadow-2xl ${mission.type === 'Cultural' ? 'mx-6 mt-0 mb-4 h-32 border-amber-500/30' : 'h-52 mx-5 mt-6 mb-4 border-white/10 group-hover:border-emerald-500/50'}`}
                                                style={{ clipPath: mission.type === 'Cultural' ? 'polygon(0 28%, 50% 0, 100% 28%, 100% 100%, 0 100%)' : 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                                            >
                                                <img
                                                    src={mission.visual}
                                                    alt={mission.title}
                                                    className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-[1200ms] cubic-bezier(0.4, 0, 0.2, 1)"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent " />

                                                {/* Scanline Effect */}
                                                <div
                                                    className={`absolute inset-0 bg-[size:100%_4px] pointer-events-none opacity-10`}
                                                    style={{ backgroundImage: `linear-gradient(transparent 50%, ${mission.type === 'Cultural' ? '#f59e0b' : '#10b981'} 50%)` }}
                                                />

                                                {/* Targeting Crosshair - On Hover (Technical Only) */}
                                                {mission.type !== 'Cultural' && (
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-emerald-500/30 rounded-full animate-ping" />
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full" />
                                                        <div className="absolute top-4 left-4 text-[9px] font-mono text-emerald-500/80 uppercase tracking-widest bg-black/50 px-2 py-1 rounded">VISUAL_FEED_ACTIVE</div>
                                                    </div>
                                                )}

                                                <div className={`absolute inset-x-0 top-0 h-[1px] transition-all ${mission.type === 'Cultural' ? 'bg-amber-500/20' : 'bg-emerald-500/20 group-hover:h-[2px]'}`} />
                                            </div>

                                            {/* Data Readouts Block */}
                                            <div className="px-10 flex justify-between items-center z-10 w-full mt-auto mb-2">
                                                <div className="flex flex-col gap-0.5 items-start">
                                                    <span className={`text-[7px] font-black ${theme.text}/50 uppercase tracking-[0.2em]`}>{mission.type === 'Cultural' ? 'DATE.' : 'EST_DATE'}</span>
                                                    <span className={`text-[11px] font-black ${theme.text} italic`}>{mission.date}</span>
                                                </div>

                                                <div className="flex flex-col gap-0.5 items-center">
                                                    <span className={`text-[7px] font-black ${theme.text}/30 uppercase tracking-[0.2em]`}>{mission.type === 'Cultural' ? 'UNIT.' : 'SQUAD'}</span>
                                                    <span className="text-[11px] font-black text-white/90 italic uppercase">
                                                        {mission.rules.find(r => r.includes('Team') || r.includes('Solo') || r.includes('Squad'))?.split(' ')[0] || 'OPEN'}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col items-end gap-0.5">
                                                    <span className={`text-[7px] font-black ${theme.text}/50 uppercase tracking-[0.2em]`}>{mission.type === 'Cultural' ? 'POOL.' : 'PRIZE_POOL'}</span>
                                                    <span className={`font-black text-white italic drop-shadow-sm ${mission.type === 'Cultural' ? 'text-[14px]' : 'text-[11px]'}`}>{mission.prizePool}</span>
                                                </div>
                                            </div>

                                            <div className="px-10 pb-3 text-center z-20">
                                                <p className="text-[9px] text-white/50 font-medium font-mono uppercase tracking-tight line-clamp-2 leading-relaxed group-hover:text-white/80 transition-colors italic">
                                                    "{mission.description}"
                                                </p>
                                            </div>

                                            {/* Spec Tags Block - Symmetrical */}
                                            <div className="px-10 pb-3 flex flex-wrap justify-center gap-1.5 opacity-10 group-hover:opacity-100 transition-opacity">
                                                {mission.specs.map(spec => (
                                                    <span key={spec} className={`text-[6.5px] font-black ${theme.text}/100 tracking-widest px-1.5 py-0.5 bg-${theme.primary}/5 border ${theme.borderHover.replace('border-', 'border-').replace('/50', '/20')} uppercase rounded-[2px]`}>
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className={`px-6 ${mission.type === 'Cultural' ? 'pb-10' : 'pb-8'} z-20 w-full`}>
                                                <div className="flex gap-3 w-full">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addToCart({
                                                                id: mission.id,
                                                                title: mission.title,
                                                                type: mission.type,
                                                                price: mission.fee,
                                                                image: mission.visual
                                                            });
                                                        }}
                                                        className={`flex-[3] py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative overflow-hidden group/btn ${cart.find(c => c.id === mission.id)
                                                            ? `${theme.bg} text-black ${theme.shadow}`
                                                            : `bg-white/5 backdrop-blur-xl border ${mission.type === 'Cultural' ? 'border-amber-500/50' : `border-${theme.primary}/40`} ${theme.text} hover:bg-${theme.primary} hover:text-white shadow-lg`
                                                            }`}
                                                        style={{ clipPath: mission.type === 'Cultural' ? 'polygon(5% 0, 95% 0, 100% 20%, 100% 100%, 0 100%, 0 20%)' : 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)', borderRadius: mission.type === 'Cultural' ? '0' : '0' }}
                                                    >
                                                        {cart.find(c => c.id === mission.id) ? 'MISSION_READY' : 'SELECT_MNVR'}
                                                    </button>

                                                    <div
                                                        className={`flex-1 py-3 flex items-center justify-center bg-black/40 backdrop-blur-xl border ${mission.type === 'Cultural' ? 'border-amber-500/30' : 'border-white/10'} ${theme.borderHover.replace('border-', 'group-hover:border-')} transition-colors shadow-xl`}
                                                        style={{ clipPath: mission.type === 'Cultural' ? 'polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)', borderRadius: mission.type === 'Cultural' ? '0' : '0' }}
                                                    >
                                                        <span className="text-[13px] font-black text-white tracking-tighter">₹{mission.fee}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Professional Bottom Data Rail (Stable) */}
                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 items-center opacity-30 transition-all duration-500 group-hover:opacity-60">
                                                <div className={`w-[3px] h-[3px] ${theme.bg}/80 rotate-45`} />
                                                <div className={`w-12 h-[1px] ${theme.bg}`} />
                                                <div className={`w-[3px] h-[3px] ${theme.bg}/80 rotate-45`} />
                                            </div>
                                        </div>
                                    </div>
                                </Tilt>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Modal - Green Sync Layout */}
            <AnimatePresence>
                {selected && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelected(null)}
                            className="fixed inset-0 bg-black/95 z-[600] backdrop-blur-xl"
                        />
                        <div className="fixed inset-0 flex items-center justify-center p-6 z-[700] pointer-events-none">
                            <motion.div
                                layoutId={`card-${selected.id}`}
                                className="w-full max-w-5xl bg-[#020a05]/95 backdrop-blur-3xl border border-white/10 pointer-events-auto flex flex-col md:flex-row shadow-[0_0_100px_rgba(245,158,11,0.1)] overflow-hidden"
                                style={{ clipPath: 'polygon(40px 0, 100% 0, 100% 40px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 40px 100%, 0 calc(100% - 40px), 0 40px)' }}
                            >
                                <div className="w-full md:w-1/2 h-80 md:h-auto relative bg-black">
                                    <img src={selected.visual} className="w-full h-full object-cover opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050805] via-transparent to-transparent" />
                                    <div className="absolute top-10 left-10 p-4 border-l-2 border-amber-500">
                                        <div className="text-[9px] font-black text-amber-400 tracking-[0.3em] uppercase mb-2">TARGET_MODULE</div>
                                        <div className="text-3xl font-black text-white italic tracking-tighter uppercase">{selected.title}</div>
                                    </div>
                                </div>

                                <div className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto bg-[#020a05] scrollbar-thin scrollbar-thumb-amber-500/20">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black text-white/30 tracking-widest uppercase mb-4">LOG_ENTRY // ECO_DESCRIPTION</div>
                                            <p className="text-white/50 text-base leading-relaxed font-light italic">"{selected.description}"</p>
                                        </div>
                                        <button onClick={() => setSelected(null)} className={`p-2 border border-white/20 hover:border-${getEventTheme(selected.type).primary} transition-all group`}>
                                            <X className={`w-6 h-6 text-white/40 group-hover:text-${getEventTheme(selected.type).primary}`} />
                                        </button>
                                    </div>

                                    <div className="grid gap-10 pt-10 border-t border-white/10">
                                        <div className="space-y-4">
                                            <h4 className={`flex items-center gap-3 ${getEventTheme(selected.type).text} font-black text-[9px] uppercase tracking-widest`}>
                                                <Zap className="w-4 h-4" /> Participation_Directives
                                            </h4>
                                            <div className="grid gap-3">
                                                {selected.rules.map((rule, i) => (
                                                    <div key={i} className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase">
                                                        <div className={`w-1.5 h-1.5 ${getEventTheme(selected.type).bg} rounded-full`} />
                                                        {rule}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-10 border-t border-white/10">
                                            <div>
                                                <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">ECO_CREDITS</div>
                                                <div className="text-4xl font-black text-white italic tracking-tighter">₹{selected.fee}</div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    addToCart({
                                                        id: selected.id,
                                                        title: selected.title,
                                                        type: selected.type,
                                                        price: selected.fee,
                                                        image: selected.visual
                                                    });
                                                    setSelected(null);
                                                }}
                                                className={`${getEventTheme(selected.type).bg} text-white px-12 py-4 font-black text-[11px] opacity-80 hover:opacity-100 transition-all uppercase tracking-widest ${getEventTheme(selected.type).shadow}`}
                                                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 100px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                                            >
                                                SYNC_TO_PROFILE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    )
}