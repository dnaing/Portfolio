import { useRef } from "react"

export default function Projects({ isMobile, audioState })
{

    const audio = useRef()

    const playClick = () =>
    {
        if (audio.current && audioState === true)
        {
            audio.current.volume = 0.1
            audio.current.currentTime = 0
            audio.current.play()
        }
    }

    return <>

        {/* <audio ref={ audio } className="click-audio" src="./audio/click.wav" preload="auto"></audio> */}

        <div className="projects">

            { isMobile && <h1 className="project-title">PROJECTS</h1> }
            
            <div className="projects-section">

                <div className="project-card">

                    <div className="left-card">
                        <h1> Personal Portfolio </h1>
                        <hr/>
                        <p>
                            You're looking at it! This is my first portfolio website, and I wanted it to be 
                            something that truly represents me. After browsing countless examples online, the ones 
                            that left a lasting impression were those that incorporated 3D rendered scenes. 
                            That sparked the idea to bring 3D into my own site. As someone who's always been drawn 
                            to fantasy and mystical themes — and more recently, cardistry — I decided to build my 
                            portfolio around those inspirations.
                        </p>
                        <div className="project-skills">
                            <p>React 3 Fiber</p>
                            <p>Three.js</p>
                            <p>Blender</p>
                        </div>
                        <div className="project-links">
                            <a className="project-link-button neon-effect" href="https://github.com/dnaing/Portfolio" onPointerEnter={playClick}>Github</a>
                        </div>
                    </div>
                    

                    <div className="right-card">
                        <video
                            src="/videos/finalportfolio.mp4"
                            muted
                            onPointerEnter={(e) => e.currentTarget.play() }
                            onPointerLeave={(e) =>
                            {
                                e.currentTarget.pause()
                                e.currentTarget.currentTime = 0
                            }}
                        />
                    </div>

                </div>

                <div className="project-card">

                    <div className="left-card">
                        <h1> Night Timer </h1>
                        <hr/>
                        <p>
                            I often fall asleep to long videos or podcasts, but the problem was 
                            that my phone would continue playing for hours after I was already asleep. 
                            This not only drained my battery but also made it harder to find where I left off the next day.
                            To fix this, I came up with the idea for a simple mobile app that lets you set a timer to stop all 
                            audio playback on your device once the timer ends. It helped me save battery life and 
                            made it easier to pick up where I left off in a video or podcast the next day.
                        </p>
                        <div className="project-skills">
                            <p>Flutter</p>
                            <p>Dart</p>
                            <p>Kotlin</p>
                        </div>
                        <div className="project-links">
                            <a className="project-link-button neon-effect" href="https://github.com/dnaing/Night-Timer" onPointerEnter={playClick}>Github</a>
                        </div>
                    </div>

                    <div className="right-card">
                        <div className="nighttimer-container">
                            <video
                                className="nighttimer"
                                src="/videos/nighttimer.mp4"
                                width={200}
                                muted
                                preload="none"
                                loading="lazy"
                                onPointerEnter={(e) => e.currentTarget.play() }
                                onPointerLeave={(e) =>
                                {
                                    e.currentTarget.pause()
                                    e.currentTarget.currentTime = 0
                                }}
                            />
                        </div>
                    </div>

                </div>

                <div className="project-card">

                    <div className="left-card">
                        <h1> The Star Wars Codex </h1>
                        <hr/>
                        <p>
                            This project was a fun way to dive deeper into full stack web development while building 
                            something based on a universe I love — Star Wars. It's a wiki-style site that covers 
                            characters, species, planets, starships, and vehicles from the first six films. What makes 
                            it stand out is the ability to sort data by interesting attributes like character height or 
                            starship cost, allowing users to see everything from the shortest characters to the most 
                            expensive ships.
                        </p>
                        <div className="project-skills">
                            <p>React</p>
                            <p>Express</p>
                            <p>Node.js</p>
                            <p>MongoDB</p>
                            <p>GCP</p>
                        </div>
                        <div className="project-links">
                            <a className="project-link-button neon-effect" href="https://github.com/dnaing/Star-Wars" onPointerEnter={playClick}>Github</a>
                            <a className="project-link-button neon-effect" href="https://www.thestarwarscodex.com/" onPointerEnter={playClick}>Live</a>
                        </div>
                    </div>
                    

                    <div className="right-card">
                        <video
                            src="/videos/starwars.mp4"
                            muted
                            onPointerEnter={(e) => e.currentTarget.play() }
                            onPointerLeave={(e) =>
                            {
                                e.currentTarget.pause()
                                e.currentTarget.currentTime = 0
                            }}
                        />
                    </div>

                </div>

                <div className="project-card">

                    <div className="left-card">
                        <h1> Conquest </h1>
                        <hr/>
                        <p>
                        This was a class project I worked on with a team at UCI. Our goal was to build a custom 
                        search engine from scratch, capable of indexing and retrieving information from a wide 
                        range of UCI's webpages. We implemented information retrieval techniques and ranking 
                        algorithms to return the most relevant results for a given query. The project also 
                        featured a functional frontend that allowed users to interact through a familiar search 
                        bar interface and view results in real time.
                        </p>
                        <div className="project-skills">
                            <p>React</p>
                            <p>Python</p>
                            <p>Flask</p>
                        </div>
                        <div className="project-links">
                            <a className="project-link-button neon-effect" href="https://github.com/dnaing/SearchEngine" onPointerEnter={playClick}>Github</a>
                        </div>
                    </div>
                    

                    <div className="right-card">
                        <video
                            src="/videos/searchengine.mp4"
                            muted
                            onPointerEnter={(e) => e.currentTarget.play() }
                            onPointerLeave={(e) =>
                            {
                                e.currentTarget.pause()
                                e.currentTarget.currentTime = 0
                            }}
                        />
                    </div>

                </div>

                <div className="project-card">

                    <div className="left-card">
                        <h1> My Recipes </h1>
                        <hr/>
                        <p>
                        This project was created during an intense 3-day hackathon at UCI, where I collaborated 
                        with a team of four. Our goal was to develop a website that allowed users to input the 
                        ingredients they had on hand and receive a list of possible recipes they could cook. In 
                        addition to the recipes, the site also provided detailed nutritional information for each 
                        dish, helping users make more informed decisions about what to prepare based on their 
                        dietary needs.
                        </p>
                        <div className="project-skills">
                            <p>React</p>
                            <p>Python</p>
                            <p>Flask</p>
                        </div>
                        <div className="project-links">
                            <a className="project-link-button neon-effect" href="https://github.com/dnaing/MyRecipes" onPointerEnter={playClick}>Github</a>
                        </div>
                    </div>
                    

                    <div className="right-card">
                        <video
                            src="/videos/myrecipes.mp4"
                            muted
                            onPointerEnter={(e) => e.currentTarget.play() }
                            onPointerLeave={(e) =>
                            {
                                e.currentTarget.pause()
                                e.currentTarget.currentTime = 0
                            }}
                        />
                    </div>

                </div>

            </div>
            

        </div>

    </>
}