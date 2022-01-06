
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'


function NavBar({setFavoriteWords, userLogin, setLoggedInUser, loggedInUser, setIsLoggedIn, isLoggedIn}) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    function handleChange(e){
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value})

    }

    function handleLogOut() {
        fetch('logout', {method: "DELETE"})
        .then(resp => {
            if (resp.ok) {
                setLoggedInUser(null)
            } else {
                console.log(resp)
            }
        })
    }

    const loginForm = 
        <Form onSubmit={(e)=>userLogin(credentials.username, credentials.password, e)}>
            <input type="text" name="username" placeholder="Name" value={credentials.username} onChange={handleChange} />
            <input type="text" name="password" placeholder="Password" value={credentials.password} onChange={handleChange}/>
            <Button type="submit" name="Submit">Login</Button>
        </Form>   
    
    const loggedIn = 
        <Div>
            <h3>Hello {loggedInUser?.username}</h3>
            <Button onClick={handleLogOut}>Log Out</Button>
        </Div>

    return(
        <Header>
            <h1>React-ionary</h1>
            {loggedInUser ? loggedIn : loginForm}
            {loggedInUser ? null : <NavLink to="/newuser">Create New User</NavLink>}
            <NavLink to="/randomword">Random Word</NavLink>
            <br/>
        </Header>
    )
}

export default NavBar

const Header = styled.div `
    display: flex;
    font-family: Helvetica, sans-serif;
    justify-content: space-evenly;
    align-items: center;
    font-family: Helvetica, sans-serif;
    border-radius: 15px;
    margin: 10px 0;
    padding: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .5), 0 0 40px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
    & h1 {
        margin: 0;
    }
    & input {
        font-family: Helvetica, sans-serif;
        height: 30px;
        border-radius: 15px;
    }
    & a {
        background-color: ##5CD64C;
        color: black;
        padding: 10px;
        border-radius: 10px;
        text-decoration: none;

    }
    & a:hover {
        color: white;
        background-color: #3165a5;
    }
`

const Div = styled.div `
    display: flex;
    font-family: Helvetica, sans-serif;
    & h3 {
        margin: 0 5px;
    }
`
const Button = styled.button `
border-radius: 15px;
padding: 5px 10px;
font-family: Helvetica, sans-serif;

`
const Form = styled.form `
font-family: Helvetica, sans-serif;
;

& input {
    font-family: Helvetica, sans-serif;
    margin: 10px
}

& button {
        background-color: ##5CD64C;
        font-family: Helvetica
        color: black;
        padding: 10px;
        border-radius: 10px;
        text-decoration: none;

    }

& button:hover {
        color: white;
        background-color: #3165a5;
    }
`