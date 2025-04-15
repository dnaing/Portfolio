export default function Projects()
{

    return <>

        <div className="projects">

            <div className="projects-section">

                <div className="project-card">

                    <div className="left-card">
                        <h1> Personal Portfolio </h1>
                    </div>
                    

                    <div className="right-card">
                        <video
                            src="/videos/portfolio.mp4"
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
                    </div>

                    <div className="right-card">
                        <video
                            src="/videos/nighttimer.mp4"
                            width={200}
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
                        <h1> The Star Wars Codex </h1>
                    </div>
                    

                    <div className="right-card">
                        <video
                            src="/videos/portfolio.mp4"
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
                        <h1> Search Engine </h1>
                    </div>
                    

                    <div className="right-card">
                        <video
                            src="/videos/portfolio.mp4"
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
                        <h1> My Recipe </h1>
                    </div>
                    

                    <div className="right-card">
                        <video
                            src="/videos/portfolio.mp4"
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