import React from "react";
import { Navigate } from "react-router-dom"; // Update the import
// import  AuthContext  from "../context/AuthContext"; // Import AuthContext

function Homepage() {
  // const { token } = useContext(AuthContext); 
  
  const token = localStorage.getItem("authTokens"); // Access token from local storage which remain even after the refresh of page

  // Redirect to Todo page if logged in
  if (token) {
    return <Navigate to="/todo" />; // Redirect to /todo if logged in
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column",backgroundColor: "black"}}>
       <>
        <main role="main"  style={{ marginTop: 50 }}>
          {/* Main jumbotron for a primary marketing message or call to action */}
          <div className="jumbotron ">
            <div className="frontpage">
              <>
                <h1 className="display-3">Hello, All!</h1>
                <p>
                  Welcome to My To-do list application! Here, you can
                  effortlessly manage your daily tasks. My platform
                  offers a variety of features designed to enhance your
                  productivity, including the ability to create, update, and
                  delete tasks with just a few clicks.helps to ensure you
                  never miss an important due date. With a clean and intuitive
                  user interface, organizing your life has never been easier. Dive
                  in and start taking control of your tasks today!
                </p>


                <a className="btn btn-primary btn-lg" href="/login" role="button">
                  Let's Go »
                </a>
              </>
            </div>
          </div>
          <footer className="footer" style={{  backgroundColor:"" }}>
            <p style={{ margin: 0,color:"white" }}>AJANTHAN's © To-do App (ReactJs)</p>
          </footer>
        </main>
        
      </>
    </div>
  );
}

export default Homepage;
