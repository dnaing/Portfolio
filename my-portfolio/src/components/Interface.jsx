import Header from './Header'
import Contacts from './Contacts'
import About from './About'

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