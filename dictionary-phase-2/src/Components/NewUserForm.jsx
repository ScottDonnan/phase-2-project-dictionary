
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../styled/card'
import styled from 'styled-components'

function NewUserForm() {
    const [credentials, setCredentials] =useState({
        username: '',
        password: '',
        passwordConfirmation: '',
    })
    
    const history = useHistory()

    const routeChange = () => {
        let path = './'
        history.push(path)
    }

    function handleChange(e) {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        addUser(credentials.username, credentials.password, credentials.passwordConfirmation)
        alert('Thank you for signing up to use the dictionary.')
    }

    function addUser(username, password, passConfirmation){
        const userObj = {
            username: username,
            password: password,
            password_confirmation: passConfirmation 
        }

        console.log(username, password, passConfirmation);

        fetch('signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(newUser => {
                    console.log(newUser)
                    routeChange()
                })
            } else {
                resp.json().then(data => alert(data.errors))
            }
        })
    }
        


    return(
        <Card>
            <Form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input type="text" name="username" onChange={handleChange} value={credentials.username} />
                <br/>
                <label>Password: </label>
                <input type="text" name="password" onChange={handleChange} value={credentials.password} />
                <br/>
                <label>Confirm Password: </label>
                <input type="text" name="passwordConfirmation" onChange={handleChange} value={credentials.passwordConfirmation} />
                <br/>
                <input type="submit" name="Submit" value="Create"/>
            </Form>
        </Card>
    )
}

export default NewUserForm

const Form = styled.form `
font-family: Helvetica, sans-serif;
;

& input {
    font-family: Helvetica, sans-serif;
    margin: 10px
    height: 30px;
    border-radius: 15px;
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