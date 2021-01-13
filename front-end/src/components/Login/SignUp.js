import React, { useState, useEffect, useContext } from 'react';
import { signupUser } from "../../actions/authUtils";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { Link } from "react-router-dom";
import classnames from "classnames";


const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const history = useHistory();
    const { auth } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const [errors, setErrors] = useState(error);

    const onSubmit = e => {
        e.preventDefault();
        signupUser(formData, setError, history);
    }

    useEffect(() => {
        if (error) setErrors(error);
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }, [error, auth.isAuthenticated, history]);

    return (
        <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2" style={{ display: "inline-block", padding: "32px 48px 32px 48px" }}>
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
        home
      </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4><b>Sign Up</b> below</h4>
                        <p className="grey-text text-darken-1">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="input-field col s12">
                            <input
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                value={formData.name}
                                id="name"
                                type="text"
                            />
                            <label style={{ pointerEvents: 'none' }} htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                value={formData.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />
                            <label style={{ pointerEvents: 'none' }} htmlFor="email">Email</label>
                            <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                value={formData.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <label style={{ pointerEvents: 'none' }} htmlFor="password">Password</label>
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "250px",
                                    borderRadius: "3px",
                                    letterSpacing: "2px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light blue accent-3"
                            >
                                Sign Up
          </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default SignUp;



