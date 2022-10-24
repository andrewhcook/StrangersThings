import React, {useState} from "react";




const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (<form className="login-form">
        <h1>Login Form</h1>
        <div className="field">
            <label>Username</label>
            <input
            type = "text"
            value = {username}
            placeholder = "username"
            required
            onChange = {(event) => {setUsername(event.target.value)}}
            />
            
        </div>
        <div className="field">
            <label>Password</label>
            <input
            type = "password"
            value = {password}
            placeholder = "password"
            minlength = "8"
            required
            onChange={(event) => {setPassword(event.target.value)}}
            />
        </div>
        <button className="submit-form" type = "submit"></button>
    </form>);
}

export default Login