import React, {useState} from 'react';
import "../css/login.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/authContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchData = async () => {
    try {
          const postData = {
            email: email,
            password: password
          };

          const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(postData), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result);
      login(result);
      if (result.account_type == "student") {
        navigate('/student-page');
      } else {
        navigate('/teacher-page');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="Login">
      <div className="login-box">
        <h1>Login</h1>
        <form>
            <div>
                <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                
            </div>
            <div>
                <input 
                type="password" 
                id="parola" 
                name="parola" 
                required 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type="submit" value="Autentificare" id="submit" onClick={handleClick} />
        </form>

      </div>
    </div>
  );
}

export default Login;
