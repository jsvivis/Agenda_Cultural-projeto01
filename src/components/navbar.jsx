// import { logo } from "../../public/android-chrome-512x512.png";
export default function Navbar() {
    return (
        <nav>
            <div className="navbar">
            <div className="logo">
                {/* <img src={logo} alt="logo" /> */}
            </div>
            <div className="menu">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="login">
                <button>Login</button>
            </div>
            </div>
        </nav>
    )
}