import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import useCheckMobileScreen from './stores/useCheckMobileScreen.js'

const Root = () =>
{
    const isMobile = useCheckMobileScreen()

    return <>
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
