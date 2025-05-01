import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import MobileApp from './MobileApp.jsx'
import useCheckMobileScreen from './stores/useCheckMobileScreen.js'

const Root = () =>
{
    const isMobile = useCheckMobileScreen()

    return <>
        { isMobile ? <MobileApp/> : <App/> }
    </>
}

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Root/>
    // </StrictMode>
)
