import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'

import App from './App.jsx'
import MobileApp from './MobileApp.jsx'
import useCheckMobileScreen from './stores/useCheckMobileScreen.js'

// Inject the correct stylesheet ASAP
const initialIsMobile = window.innerWidth < 1024
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = initialIsMobile ? '/css/MobileApp.css' : '/css/App.css'
link.id = 'dynamic-css'
document.head.appendChild(link)

const Root = () =>
{
    const isMobile = useCheckMobileScreen()
    useEffect(() => {
        const existingLink = document.getElementById('dynamic-css')

        if (existingLink) {
            existingLink.href = isMobile ? '/css/MobileApp.css' : '/css/App.css'
        }
    }, [isMobile])

    // const isMobile = false

    return <>
        {/* { isMobile ? <MobileApp/> : <App/> } */}
        <App isMobile={ isMobile }/>
    </>
}

// Currently this takes resizes into account
// If we don't want that, just do isMobile = window.innerWidth < 1024

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Root/>
    // </StrictMode>
)
