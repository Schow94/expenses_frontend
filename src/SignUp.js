import React, { Component } from 'react';

export default class SignUp extends Component {
  

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form>
          <input type="text" placeholder="Enter an email"></input>
          <input type="text" placeholder="Choose a username"></input>
          <input type="text" placeholder="Choose a password"></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
