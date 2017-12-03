import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    isAFoodTruck: false
  }

  componentWillMount() {
    document.body.style.backgroundColor = "#a0081e";
  }

  componentWillUnmount() {
      document.body.style.backgroundColor = null;
  }

  handleChange = (e) => {
    if (e.target.id === 'isAFoodTruck') return this.setState({ isAFoodTruck: !this.state.isAFoodTruck });

    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post('/signup/newuser', this.state);
      console.log(res.data);
      alert('Signup successful!');
      window.location.href = '/';
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className='SignUp container'>
        <div className="row">
          <div className="col-sm-6 mx-auto mt-5 ">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Create a username" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange} />
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" id='isAFoodTruck' onChange={this.handleChange} />
                      Is this a food truck account?
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
              </div>
              <div className="card-footer">
                <p>Already a user? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
