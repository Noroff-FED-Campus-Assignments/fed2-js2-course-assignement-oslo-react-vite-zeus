import { Link } from "@tanstack/react-router";
/**
 * Contains form for logging a registered user profile.
 * @see https://docs.noroff.dev/social-endpoints/authentication
 */
export default function LoginPage() {
  
  return (
    <>
      
      <div className="relative flex flex-col justify-center min-h-screen p-5 overflow-hidden ">
        <div className="w-full max-w-xl p-5 m-auto bg-white border-2 border-blue-500 py-28 rounded-xl ">
          <h1 className="text-3xl font-normal text-center text-gray-700 ">
            Login
          </h1>
          <form className="max-w-sm m-auto mt-6">
            <div className="py-1 mb-2">
              <input
                type="email"
                placeholder="Username or Email"
                className="block w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            <div className="py-3 mb-2">
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            <div className="flex justify-center mt-6">
              <Link
                to="/profile"
                className="w-full px-4 py-2 tracking-wide text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-3xl hover:bg-blue-700 focus:outline-none focus:bg-blue-500"
              >
                Log in
              </Link>
            </div>
            <a
              href="#"
              className="flex justify-center pt-10 text-xs text-blue-500 hover:underline"
            >
              Forgot your password?
            </a>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don`t have an account?{" "}
            <Link to="/register" className="font-medium text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
