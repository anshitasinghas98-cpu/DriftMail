import React, { useState } from 'react';
import { useNavigate } from "react-router";
const Login = () => {
  const navigate=useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {

    e.preventDefault();
    let isValid = true;

    if (!validateEmail(signupEmail)) {
      alert('Please enter a valid email address');
      isValid = false;
      return;
    }

   

    if (isValid) {
      console.log('Signup Data:', {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });

    const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:signupEmail,password:signupPassword,name:signupUsername}),
          })
        
        setSignupEmail("");
        setSignupPassword("");
        setSignupUsername("");
        const data = await res.json();

        if (res.ok) {
            setIsChecked((prev)=>!prev);
            alert("registration successfull , login please")
        }
        else {
              alert(data.error);
        }

    }
  };

  const handleLogin =async  (e) => {
    e.preventDefault();
    let isValid = true;

   
    if (!validateEmail(loginEmail)) {
      alert('Please enter a valid email address');
      isValid = false;
      return;
    }



    if (isValid) {
      console.log('Login Data:', {
        email: loginEmail,
        password: loginPassword,
      });


    const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:loginEmail,password:loginPassword }),
    })

    setLoginEmail("");
    setLoginPassword("");
   const data = await res.json();

   if (res.ok) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      console.log(data.error);
    }
    }
  };

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: "'Jost', sans-serif",
      background: 'linear-gradient(to bottom, #3D52A0, #8697C4, #ADBBDA)',
    },
    main: {
      width: '350px',
      height: '90vh',
      overflow: 'hidden',
      borderRadius: '10px',
      boxShadow: '5px 20px 50px #000',
      position: 'relative',
      margin: '1vh 0',
    },
    signup: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    login: {
      height: '460px',
      background: '#EDE8F5',
      borderRadius: '60% / 10%',
      transform: isChecked ? 'translateY(-500px)' : 'translateY(-180px)',
      transition: '0.8s ease-in-out',
    },
    label: {
      color: '#fff',
      fontSize: '2.3em',
      justifyContent: 'center',
      display: 'flex',
      margin: '50px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: '0.5s ease-in-out',
    },
    loginLabel: {
      color: '#3D52A0',
      transform: isChecked ? 'scale(1)' : 'scale(0.6)',
    },
    signupLabel: {
      transform: isChecked ? 'scale(0.6)' : 'scale(1)',
    },
    input: {
      width: '60%',
      height: '10px',
      background: '#ADBBDA',
      justifyContent: 'center',
      display: 'flex',
      margin: '20px auto',
      padding: '12px',
      border: 'none',
      outline: 'none',
      borderRadius: '5px',
    },
    button: {
      width: '60%',
      height: '40px',
      margin: '10px auto',
      justifyContent: 'center',
      display: 'block',
      color: '#fff',
      background: '#3D52A0',
      fontSize: '1em',
      fontWeight: 'bold',
      marginTop: '30px',
      outline: 'none',
      border: 'none',
      borderRadius: '5px',
      transition: '0.2s ease-in',
      cursor: 'pointer',
    },
    buttonHover: {
      background: '#7091E6',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={isChecked}
          onChange={handleToggle}
          style={{ display: 'none' }}
        />
        <div style={styles.signup}>
          <div>
            <label htmlFor="chk" style={{ ...styles.label, ...styles.signupLabel }}>
              Sign up
            </label>
            <input
              type="text"
              placeholder="User name"
              required
              style={styles.input}
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              style={styles.input}
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              style={styles.input}
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button
              onClick={handleSignup}
              style={styles.button}
              onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
              onMouseOut={(e) => (e.target.style.background = styles.button.background)}
            >
              Sign up
            </button>
          </div>
        </div>
        <div style={styles.login}>
          <div>
            <label htmlFor="chk" style={{ ...styles.label, ...styles.loginLabel }}>
              Login
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              style={styles.input}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              style={styles.input}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              style={styles.button}
              onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
              onMouseOut={(e) => (e.target.style.background = styles.button.background)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;