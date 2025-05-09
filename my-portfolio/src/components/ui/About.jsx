import { GiDragonSpiral } from 'react-icons/gi'
import { GiFlamedLeaf } from "react-icons/gi";
import { GiAncientSword } from "react-icons/gi";

export default function About({ isMobile })
{
    return <>

        <div id="about" className="about">

            <div className="about-section">

                { isMobile && <h1 className="about-title">ABOUT</h1> }

                <div className="about-description">

                    
                    <div className="about-profile">
                        <img className="about-profile" src="./images/me.jpg" alt="Picture of Derek" />
                    </div>
                    
                    {/* <hr /> */}
                    
                    <div className="about-item">
                        <div className="section-title">
                            <h1>Origins</h1>
                            <GiDragonSpiral className="icon" />
                        </div>
                        <hr/>
                        <p>
                            Hello! My name is Derek Naing and my love for technology started as a kid.
                            Whether it be playing games on the Playstation 2 or just messing around on those old,
                            janky computers back then, I was fascinated with it all. In high school, that curiosity deepened.
                            I learned how computers worked under the hood and eventually built my own PC from the ground up.
                            Around that time, I also got involved in robotics and joined my school's team, where
                            I had the opportunity to compete in several VEX Robotics and Botball competitions,
                            contributing both as a builder and a coder. This hands-on experience inspired me to pursue computer science, and I went on
                            to study it as my major at the University of California - Irvine. Eventually, I earned my Bachelor's degree in Computer Science
                            and was ready to step into the next chapter of my journey.
                        </p>
                    </div>

                    <div className="about-item">
                        <div className="section-title">
                            <h1>Pursuits</h1>
                            <GiFlamedLeaf className="icon" />
                        </div>
                        <hr/>
                        <p>
                        There are so many exciting paths in software, and I’ve explored several. I started with a fascination for AI, 
                        then moved into game development, building small projects in Unity. Eventually, I was drawn to web development — 
                        the idea of creating something accessible to anyone online really resonated with me. I began with the basics: 
                        JavaScript, HTML, and CSS, then moved into full-stack development with React, Node.js or Python Flask, and SQL or 
                        MongoDB. Recently, I rediscovered my love for 3D through Three.js, which reminded me of Unity. Bruno Simon’s 
                        "Three.js Journey" sparked a new passion for blending web and 3D. Now, I’m focused on crafting immersive, playful 
                        web experiences.
                        </p>
                    </div>

                    <div className="about-item">
                        <div className="section-title">
                            <h1>Curiosities</h1>
                            <GiAncientSword className="icon" />
                        </div>
                        <hr/>
                        <p>
                            Outside of coding and software, I have a wide range of interests that keep me inspired and balanced. I'm an avid gamer,
                            with a love for roguelike titles, as well as the soulsborne series. This passion extends into board games and tabletop RPGs
                            like Dungeons and Dragons. I also enjoy diving into anime and manga - Hunter X Hunter is my current favorite. In my downtime,
                            I find myself drawn to horror and uncanny videos. To stay active, I like to train martial arts, having been influenced by
                            action movies as a kid. I've practiced a little bit of taekwondo in the past, and I'm currently focused on Muay Thai.
                            Lately, I've also been exploring cardistry, and you've probably noticed that woven throughout this portfolio as well.
                        </p>
                    </div>

                </div>
                
            </div>
            

        </div>

    </>
}