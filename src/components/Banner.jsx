const Banner = () => {
  return (
    <section className="w-full max-w-4xl min-h-50 mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center border border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">ProjectEuler+</h2>
          <p className="text-sm text-gray-500">Open Indefinitely</p>
        </div>
        <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition duration-200">
          View Details
        </button>
      </div>
    </section>
  );
};

export default Banner;
