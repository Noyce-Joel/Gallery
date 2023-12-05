'use client'

import { useRouter } from "next/navigation"

export function ForceRefresh() {
    const router = useRouter()
    router.refresh()
    return <>
    </>
}