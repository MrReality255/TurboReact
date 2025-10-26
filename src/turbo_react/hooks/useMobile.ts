import { useState } from "react";

export function useMobile() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', function(e) {
        setMobile(e.matches)    
    })
    const [isMobile, setMobile] = useState(mediaQuery.matches)
    return isMobile
}
