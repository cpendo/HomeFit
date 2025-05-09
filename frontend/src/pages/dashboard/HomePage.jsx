import Section1 from "./home/sections/Section1";
import Section2 from "./home/sections/Section2";
import Section3 from "./home/sections/Section3";

const HomePage = () => {
  return (
    <div className="w-full h-fit mt-4">
      <div className="grid grid-cols-4 gap-4">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
};

export default HomePage;
