const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form className="max-w-md w-full space-y-8 bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          Sign In
        </h1>
        <p className="text-center text-gray-500 italic">
          Welcome back. Let’s pick up where you left off
        </p>
        <input
          type="email"
          placeholder="Email address"
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none focus:border-gray-900 transition-colors duration-300"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none focus:border-gray-900 transition-colors duration-300"
          required
        />

        <button
          type="submit"
          className="w-full text-gray-900 py-3 rounded-md text-lg font-medium hover:bg-gray-900 hover:text-white transition-colors duration-500"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-500">
          Forgot your password?{" "}
          <a href="#" className="text-gray-900 underline">
            Reset here
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
