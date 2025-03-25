import ContactForm from "./sections/ContactForm";
import FAQs from "./sections/FAQs";

const HelpPage = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center pt-5 sm:pt-10 mb-10 sm:mb-20 bg-gray-200">
      <h1 className="font-secondary text-4xl sm:text-6xl">How can we help?</h1>
      <ContactForm />
      <div className="w-full flex flex-col justify-center items-center pt-15 bg-white">
        <FAQs />
      </div>
    </section>
  );
};

export default HelpPage;
