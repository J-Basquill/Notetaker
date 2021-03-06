import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Toaster, Intent } from '@blueprintjs/core'
import { app } from '../firebase_Config'

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  background: "#fcc93d",
  opacity: "0.7",
  margin: "20px auto",
  border: "3px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
  }


  authWithEmailPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf("password") === -1) {
          // they used facebook
          this.loginForm.reset()
          this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          this.props.setCurrentUser(user)
          this.setState({redirect: true})
        }
      })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } }

    if (this.state.redirect === true) {
      return <Redirect to={from} />
    }

    return (
      <div style={loginStyles}>
        <Toaster ref={(element) => { this.toaster = element }} />

        <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
          <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
            <h5>Log in to your account.</h5>
          </div>
          <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>

        </form>
      </div>
    )
  }
}

export default Login
