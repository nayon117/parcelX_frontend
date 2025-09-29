import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-black mt-3 card w-full max-w-sm shadow-2xl p-5">
      {/* header */}
      <h1 className="text-2xl font-bold">Create an Account</h1>
      <p className="mb-4">Register with parcelX</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input bg-white "
            placeholder="Name"
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}

          {/* email */}
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

          {/* password */}
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
        </fieldset>
        <button className="bg-color1 px-4 py-2 mt-4 font-semibold w-80 cursor-pointer">
          Register
        </button>
        {/* already have an account? */}
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-color2">
          Login
        </Link>
      </p>
      </form>
      
      {/* social login */}
      <SocialLogin />
    </div>
  );
};
export default Register;
