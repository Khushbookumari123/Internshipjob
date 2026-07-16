const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-600 to-blue-600">

      <div className="bg-white p-10 rounded-xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg w-full mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg w-full mb-6"
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">
          Login
        </button>

      </div>

    </div>
  );
};

export default Login;