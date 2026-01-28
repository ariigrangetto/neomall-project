import { useEffect, useId } from "react";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const usernameId = useId();
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const { registerUser, isAuthenticated, errorMessage } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    await registerUser(data);
  });

  return (
    <>
      <h1>Register</h1>
      {errorMessage &&
        errorMessage.map((error, i) => (
          <div key={i}>
            <p>{error}</p>
          </div>
        ))}
      <form onSubmit={onSubmit}>
        <label htmlFor={usernameId}>Username</label>
        <input type='text' {...register("username", { required: true })} />
        {errors.username && <p>Username required</p>}
        <label htmlFor={emailId}>Email</label>
        <input type='email' {...register("email", { required: true })} />
        {errors.email && <p>Email required</p>}
        <label htmlFor={passwordId}>Password</label>
        <input type='password' {...register("password", { required: true })} />
        {errors.password && <p>Password required</p>}
        <button type='submit'>Register</button>
      </form>
      <p>
        Ya tienes cuenta?
        <button>
          <Link to='/login'>Login</Link>
        </button>
      </p>
    </>
  );
}
