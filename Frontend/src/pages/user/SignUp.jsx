import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../API/authService";
import { useDispatch } from 'react-redux'
import { asyncRegister } from "../../store/actions/userAction";

export default function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigateHandler = () => {
    navigate('/');
  }

  const onSubmit = (data) => {
    const response =  dispatch(asyncRegister(data));
    navigateHandler();
    // const response = await registerService(data);
    console.log("Signup Data:", data); // Integrate with signup API
    // try {
    //   console.log("Signup data response", response.data);
    //   navigateHandler();

    // }
    // catch (error) {

    // }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#18191B]  px-4">
      <div className="w-full max-w-md bg-[#252629] text-white rounded-xl shadow-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold  text-center">Welcome to HireReady.Ai <br /><span  className="text-base font-medium  text-center text-white/70">Sign Up to start your journey with us</span> </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 bg-[#2A2A3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              placeholder="john_doe"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 bg-[#2A2A3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 bg-[#2A2A3B] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-lg text-sm  items-center transition-all duration-200 outline-none cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <button onClick={() => navigate('/login')} className="text-green-400  font-medium cursor-pointer">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
