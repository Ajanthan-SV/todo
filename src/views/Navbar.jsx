import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("authTokens")) // Initialize state with token
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    localStorage.removeItem("authTokens") // Remove token on logout
    setToken(null) // Update state to reflect logout
    window.location.href = "/" // Redirect to homepage after logout
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authTokens")) // Update token state if it changes in local storage
    }

    window.addEventListener('storage', handleStorageChange);// Listen for storage changes

    return () => {
      window.removeEventListener('storage', handleStorageChange);// Cleanup listener on unmount
    }
  }, [])

  return (
    <div>
        <nav className="navbar navbar-expand-lg  navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
        {token === null ? (
          <Link className="navbar-brand" to="/">
          <img style={{width:"50px", padding:"6px"}} src="./list.png" alt=""  />
        </Link> 
        ):(
          <Link className="navbar-brand" to="/todo">
            <img style={{width:"50px", padding:"6px"}} src="./list.png" alt=""  />
          </Link> 
        )}
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              
              {token === null && 
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/"><b>Home</b></Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login"><b>Login</b></Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} to="/register"><b>Register</b></Link>
                </li>
              </>
              }

            { token !== null && 
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/todo' ? 'active' : ''}`} to="/todo"><b>Todo</b></Link>
                </li>
                <li className="nav-item">
                <a 
  className="nav-link" 
  href="/" 
  onClick={(e) => { 
    e.preventDefault(); // Prevent default navigation
    handleLogout(); // Call logout function
  }} 
  role="button"
>
  <b>Logout</b>
</a>

                </li>
              </>
              }   
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar