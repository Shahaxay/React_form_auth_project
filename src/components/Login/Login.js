import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'EMAIL_CHANGED') {
    return { val: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'EMAIL_BLURED') {
    return { val: state.val, isValid: state.val.includes('@') };
  }
}

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_CHANGED') {
    return { val: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'PASSWORD_BLURED') {
    return { val: state.val, isValid: state.val.trim().length > 6 }
  }
}

const collegeReducer = (state, action) => {
  if (action.type === 'COLLEGE_CHANGED') {
    return { val: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === 'COLLEGE_BLURED') {
    return { val: state.val, isValid: state.val.trim().length > 0 }
  }
}

const Login = (props) => {
  const context = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { val: '', isValid: null });
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { val: '', isValid: null });
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [collegeState, dispatchCollege] = useReducer(collegeReducer, { val: '', isValid: null })
  // const [enteredCollege, setEnteredCollege]=useState('');
  // const [collegeIsValid,setCollegeIsValid]=useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;
  const { isValid: isCollegeValid } = collegeState;

  //side effect handler
  useEffect(() => {
    //debouncing
    const timer = setTimeout(() => {
      console.log("side effect");
      setFormIsValid(
        isEmailValid && isPasswordValid && isCollegeValid
      );
    }, 500)
    //cleanup function
    return () => {
      console.log("cleanup");
      clearTimeout(timer);
    };
  }, [isEmailValid, isPasswordValid, isCollegeValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'EMAIL_CHANGED', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'PASSWORD_CHANGED', val: event.target.value });
  };

  const collegeChangeHandler = (e) => {
    dispatchCollege({ type: 'COLLEGE_CHANGED', val: e.target.value });
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'EMAIL_BLURED' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PASSWORD_BLURED' });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: 'COLLEGE_BLURED' });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.val, passwordState.val, collegeState.val);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          text="E-Mail"
          isValid={isEmailValid}
          type="email"
          id="email"
          value={emailState.val}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          text="Password"
          isValid={isPasswordValid}
          type="password"
          id="password"
          value={passwordState.val}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          text="College Name"
          isValid={isCollegeValid}
          type="text"
          id="college"
          value={collegeState.val}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
