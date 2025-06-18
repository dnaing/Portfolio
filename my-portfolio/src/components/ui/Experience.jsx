export default function Experience({ isMobile })
{
    return <>

        <div id="experience" className="experience">

            <div className="experience-section">

                { isMobile && <h1 className="experience-title">EXPERIENCE</h1> }
                
                <div className="experience-card">

                    <div className="experience-card-header">
                        <h1>DataAnnotation - AI Trainer</h1> 
                        <h2>Dec 2023 - Current</h2>
                    </div>

                    <hr />

                    <div className="experience-card-body">
                        <p>
                            This is a freelance, contract-based position where I evaluate the quality of 
                            AI-generated responses to a wide range of coding prompts. My work primarily involves 
                            reviewing and validating answers related to JavaScript, HTML, CSS, React, Python, and 
                            SQL. I also identify and correct inaccuracies in responses to help inform future model 
                            improvements. This role requires strong attention to detail, deep technical 
                            understanding, and has significantly sharpened my debugging and code review skills.
                        </p>
                    </div>
                </div>

                <div className="experience-card">

                    <div className="experience-card-header">
                        <h1>WorkUp Externship - Software Engineer</h1> 
                        <h2>Feb 2025 - Current</h2>
                    </div>

                    <hr />

                    <div className="experience-card-body">
                        <p>
                            As part of this externship, I actively contribute to the continuous improvement of a 
                            live web application by addressing reported bugs and implementing feature enhancements 
                            on a weekly basis. My responsibilities include reviewing an existing backlog of issues 
                            and feature requests, selecting tasks based on priority and scope, and developing 
                            solutions that align with the project's goals. In addition to this, I take initiative 
                            in identifying new bugs and proposing features that could improve user experience, 
                            performance, or maintainability. These contributions are documented and presented to 
                            the team during regular review meetings. This collaborative process has provided me 
                            valuable insight into real-world software development workflows.
                        </p>
                    </div>
                </div>

            </div>
        </div>

    </>
}