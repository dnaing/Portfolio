export default function Experience({ isMobile })
{
    return <>

        <div className="experience">

            <div className="experience-section">

                { isMobile && <h1 className="experience-title">EXPERIENCE</h1> }
                
                <div className="experience-card">

                    <div className="experience-card-header">
                        <h1>DataAnnotation - AI Trainer</h1> 
                        <h2>Dec 2023 - Apr 2025</h2>
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
            </div>
        </div>

    </>
}