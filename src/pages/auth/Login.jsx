import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="text-black mt-3 card w-full max-w-sm shadow-2xl p-5">
      {/* header */}
      <h1 className="text-2xl font-bold">Welcome Back</h1>
      <p className="mb-4">Login with parcelX</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input bg-white "
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
          <label className="label">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="input bg-white"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <span className="text-red-500">
              Password must be at least 6 characters
            </span>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
        </fieldset>
        <button className="bg-color1 px-4 py-2 mt-4 font-semibold w-80">
          Login
        </button>
        {/* don't have an account? */}
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-color2">
            Register
          </Link>
        </p>
      </form>
      {/* social login */}
      <SocialLogin />
    </div>
  );
};
export default Login;
