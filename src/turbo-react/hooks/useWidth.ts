import { useState } from 'react'

type TWidthCategory = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const widthCategory: Record<TWidthCategory, number> = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
}

export function useWidth(width: number | TWidthCategory) {
    const mq =
        '(min-width: ' +
        (typeof width === 'string' ? widthCategory[width] : width) +
        'px)'
    const mediaQuery = window.matchMedia(mq)
    mediaQuery.addEventListener('change', function (e) {
        setIsWider(e.matches)
    })
    const [isWider, setIsWider] = useState(mediaQuery.matches)
    return isWider
}
