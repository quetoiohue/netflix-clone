import React from "react"
import Icons from "./icons"
import "./Navbar.css"

const Navbar = (props) => {
  const [isDarkNavbar, setIsDarkNavbar] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsDarkNavbar(true)
      } else {
        setIsDarkNavbar(false)
      }
    })

    return () => {
      window.removeEventListener("scroll")
    }
  }, [])

  return (
    <div className={`nav ${isDarkNavbar && "nav__dark"}`}>
      <a className="nav__logo" href="/">
        <img src={Icons.Logo} alt="NETFLIX LOGO" />
      </a>
      <button className="nav__avatar">
        <img src={Icons.DefaultAvatar} alt="Avartar" />
      </button>
    </div>
  )
}

Navbar.propTypes = {}

export default Navbar
