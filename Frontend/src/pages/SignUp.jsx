import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerService } from "../API/authService";

export default function SignupForm() {

    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const  navigateHandler = () =>{
      navigate('/');
  } 

  const onSubmit = async (data) => {
    const response = await registerService(data);
    console.log("Signup Data:", data); // Integrate with signup API
    try{
      console.log("Signup data response", response.data);
       navigateHandler();

    }
    catch(error){

    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-[#1F1F2E] text-white rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Create Your Account</h2>
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
            className="w-full bg-green-600 hover:bg-green-700 transition duration-200 py-2 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <button onClick={()=> navigate('/login')} className="text-green-400 hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
