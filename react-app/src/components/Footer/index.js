import React from "react";
import './Footer.css'

export default function Footer() {

    return (
        <>
                <div className="footer">
                    <div className="tech-outer-container">
                        <span>Technologies: </span>
                        <div className="technology-container">
                            <div className="tech-container-1">
                                <span>Flask</span>
                                <span>React</span>
                                <span>Redux</span>
                            </div>
                            <div className="tech-container-2">
                                <span>Alembic</span>
                                <span>Python 3</span>
                                <span>Html/CSS</span>
                            </div>
                            <div className="tech-container-3">
                                <span>Node.js</span>
                                <span>JSX</span>
                                <span>Javascript</span>
                            </div>
                            <div className="tech-container-4">
                                <span>PostgreSQL</span>
                                <span>SQLalchemy</span>
                                <span>SQLite3</span>
                            </div>
                        </div>
                    </div>
                    <div className="github-container">
                        <span className="git-links-title">Creator Links: </span>
                        <a href='https://github.com/vinceviet' target='_blank' rel='noopener' className="git-links">Github</a>
                        <a href='https://www.linkedin.com/in/vincent-viet-72349272/' target='_blank' rel='noopener' className="git-links">LinkedIn</a>
                    </div>
                </div>
        </>
    )
}
