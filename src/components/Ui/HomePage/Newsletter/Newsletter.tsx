export default function Newsletter() {
  return (
    <section className="py-12 bg-indigo-700 text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold">Subscribe to Newsletter</h3>
        <p className="text-indigo-200 mt-2">
          Get research updates and latest publications
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-2 rounded-xl text-gray-800 border-0 focus:ring-2 focus:ring-white outline-none"
          />
          <button className="px-6 py-2 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
