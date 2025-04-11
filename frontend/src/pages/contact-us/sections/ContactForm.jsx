const ContactForm = () => {
  return (
    <section className="w-4/5 sm:w-2/3 mt-10 sm:mt-15 mb-20 bg-gray-200">
      <div className="w-full h-full  flex flex-col gap-5">
        <header className="w-full mb-6">
          <h2 className="text-3xl sm:text-4xl font-secondary text-red-secondary">
            Contact us
          </h2>
          <p className="text-base sm:text-xl font-light mt-2">
            Got any questions or suggestions? Fill out this form to reach out
          </p>
        </header>

        <form className="w-full font-light text-base sm:text-lg">
          <div className="w-full flex flex-1 flex-col sm:flex-row gap-6 mb-6 sm:mb-8">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="flex-1 w-full border-b-2 border-[#D3D3D3] focus:border-black focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="flex-1 w-full border-b-2 border-[#D3D3D3] focus:border-black focus:outline-none"
            />
          </div>

          <div className="w-full mb-6 sm:mb-8">
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject "
              className="flex-1 w-full border-b-2 border-[#D3D3D3] focus:border-black focus:outline-none"
            />
          </div>

          <div className="w-full">
            <textarea
              rows="2"
              placeholder="Enter your message"
              className="w-full border-b-2 border-[#D3D3D3] focus:border-black focus:outline-none"
            ></textarea>
          </div>
          <button type="button" className="w-full bg-black p-2 mt-8 font-secondary text-white text-xl sm:text-2xl rounded-xs hover:bg-red-secondary">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
