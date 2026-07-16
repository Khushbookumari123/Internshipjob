const Profile = () => {
  return (
    <div className="p-8">

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg">

        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="rounded-full w-32 mx-auto"
        />

        <h2 className="text-2xl font-bold text-center mt-5">
          Rahul Kumar
        </h2>

        <p className="text-center text-gray-500">
          Computer Science
        </p>

      </div>

    </div>
  );
};

export default Profile;