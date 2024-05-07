import { Header } from '../components/pageHeader.js'
import { useState } from 'react';

/*simple login form without any meaningful validation or local storage */
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-page">
      <form className = "overlay-text" id ="login-overlay">
        <label id="email-label" htmlFor="email">Email</label>
        <input className = "login-field" type="text" name="email" value={email}
          onChange={(e) => setEmail(e.target.value)}></input>
        <br />
        <label className = "login-label" htmlFor="password">Password</label>
        <input className="login-field" type="password" name="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        < br/>
        <div className="button-container">
        <button className = "login-button" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}


export const Login = () => {

  const primaryMessage = "Welcome!";
  const secondaryMessage = "Enter your username and password to login.";
  const tertiaryMessage = "";
  const quaternaryMessage = "";

  return (
    <div>
      <Header primaryMsg={primaryMessage} secondaryMsg={secondaryMessage} tertiaryMsg={tertiaryMessage} quaternaryMsg={quaternaryMessage} />
      <LoginForm />
    </div>
  )
}