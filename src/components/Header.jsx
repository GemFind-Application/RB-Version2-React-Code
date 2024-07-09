import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="head1">
            <img className="jewellery-icon1" loading="lazy" alt="" src="/jewellery.svg" />
            <nav className="menu-container-wrapper">
                <nav className="menu-container">
                    <Link className="menu-element10" href="/">Home</Link>
                    <Link className="menu-element10" href="#">About</Link>
                    <Link className="menu-element10" href="#">Blog</Link>
                    <Link className="menu-element10" href="#">Contact</Link>
                </nav>
            </nav>
            <div className="image-gallery-wrapper">
                <div className="image-gallery">
                    <div className="acc-wrapper">
                        <img className="acc-icon1" loading="lazy" alt="" src="/acc.svg" />
                    </div>
                    <div className="vector-parent">
                        <img className="vector-icon9" loading="lazy" alt="" src="/vector.svg" />
                        <div className="div37">
                            <a className="a10">2</a>
                        </div>
                    </div>
                    <div className="vector-parent">
                        <img className="vector-icon10" loading="lazy" alt="" src="/vector-1.svg" />
                        <div className="div37">
                            <a className="a10">5</a>
                        </div>
                    </div>
                    <div className="vector-parent">
                        <img className="vector-icon11" alt="" src="/vector-2.svg" />
                        <div className="div37">
                            <a className="a10">3</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header