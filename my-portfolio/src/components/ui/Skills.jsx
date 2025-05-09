import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
import { BiLogoTypescript } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { FaDartLang } from "react-icons/fa6";
import { PiFileCSharpDuotone } from "react-icons/pi";
import { BiLogoCPlusPlus } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaNode } from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { SiFlask } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { SiMongodb } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { SiAmazonwebservices } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { SiBlender } from "react-icons/si";



export default function Skills({ isMobile })
{
    return <>

        <div id="skills" className="skills">

            <div className="skills-section">

                { isMobile && <h1 className="skills-title">SKILLS</h1> }
                
                <div className="skills-category">
                    <h1>LANGUAGES</h1>
                    
                    <hr />

                    <div className="skills-list">

                        <div className="skills-item">
                            <FaHtml5 />
                            <h4>HTML</h4>
                        </div>
                        <div className="skills-item">
                            <FaCss3Alt />
                            <h4>CSS</h4>
                        </div>
                        <div className="skills-item">
                            <BiLogoJavascript />
                            <h4>JavaScript</h4>
                        </div>
                        <div className="skills-item">
                            <BiLogoTypescript />
                            <h4>TypeScript</h4>
                        </div>
                        <div className="skills-item">
                            <FaPython />
                            <h4>Python</h4>
                        </div>
                        <div className="skills-item">
                            <FaJava />
                            <h4>Java</h4>
                        </div>
                        <div className="skills-item">
                            <FaDartLang />
                            <h4>Dart</h4>
                        </div>
                        <div className="skills-item">
                            <PiFileCSharpDuotone />
                            <h4>C#</h4>
                        </div>
                        <div className="skills-item">
                            <BiLogoCPlusPlus />
                            <h4>C++</h4>
                        </div>
                        
                    </div>

                    
                </div>

                <div className="skills-category">
                    <h1>FRAMEWORKS</h1>
                    <hr />

                    <div className="skills-list">

                        <div className="skills-item">
                            <FaReact />
                            <h4>React</h4>
                        </div>
                        <div className="skills-item">
                            <SiExpress />
                            <h4>Express</h4>
                        </div>
                        <div className="skills-item">
                            <FaNode />
                            <h4>Node.js</h4>
                        </div>
                        <div className="skills-item">
                            <FaFlutter />
                            <h4>Flutter</h4>
                        </div>
                        <div className="skills-item">
                            <SiFlask />
                            <h4>Flask</h4>
                        </div>


                    </div>

                </div>

                <div className="skills-category">
                    <h1>DATABASES</h1>
                    <hr />

                    <div className="skills-list">

                        <div className="skills-item">
                            <GrMysql />
                            <h4>MySQL</h4>
                        </div>
                        <div className="skills-item">
                            <SiMongodb />
                            <h4>MongoDB</h4>
                        </div>

                    </div>

                </div>

                <div className="skills-category">
                    <h1>TOOLS</h1>
                    <hr />

                    <div className="skills-list">

                        <div className="skills-item">
                            <FaGithub />
                            <h4>Git</h4>
                        </div>
                        <div className="skills-item">
                            <SiGooglecloud />
                            <h4>GCP</h4>
                        </div>
                        <div className="skills-item">
                            <SiAmazonwebservices />
                            <h4>AWS</h4>
                        </div>

                    </div>
                </div>

                <div className="skills-category">
                    <h1>3D GRAPHICS</h1>
                    <hr />

                    <div className="skills-list">

                        <div className="skills-item">
                            <TbBrandThreejs />
                            <h4>Three.js</h4>
                        </div>
                        <div className="skills-item">
                            <FaReact />
                            <h4>R3F</h4>
                        </div>
                        <div className="skills-item">
                            <SiBlender />
                            <h4>Blender</h4>
                        </div>

                    </div>
                </div>

            </div>
            

        </div>

    </>
}