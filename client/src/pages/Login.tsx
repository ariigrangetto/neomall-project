import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useEffect, useId } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const { login, errorMessage, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    await login(data);
  });
  return (
    <>
      <h1>Login</h1>
      {errorMessage &&
        errorMessage.map((error, i) => (
          <div key={i}>
            <p>{error}</p>
          </div>
        ))}
      <form onSubmit={onSubmit}>
        <label htmlFor={emailId}>Email</label>
        <input type='email' {...register("email", { required: true })} />
        {errors.email && <p>Email required</p>}
        <label htmlFor={passwordId}>Password</label>
        <input type='password' {...register("password", { required: true })} />
        {errors.password && <p>Password required</p>}
        <button type='submit'>Login</button>
      </form>
      <p>
        Aún no tienes cuenta?
        <button>
          <Link to='/register'>Register</Link>
        </button>
      </p>
    </>
  );
}
