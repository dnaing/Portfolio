import Header from './components/ui/Header'
import Contacts from './components/ui/Contacts'
import About from './components/ui/About'

export default function Interface()
{
    return <div className="interface">

        {/* Header */}
        <Header />

        {/* About */}
        <About />

        {/* Contacts */}
        <Contacts />

    </div>
}