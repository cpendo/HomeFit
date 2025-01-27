import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const categories = [
  {
    name: "Cardio",
    count: 30,
  },
  {
    name: "Strengh",
    count: 10,
  },
  {
    name: "Pilates",
    count: 15,
  },
  {
    name: "Stretches",
    count: 10,
  },
  {
    name: "Core",
    count: 20,
  },
  {
    name: "Cardio",
    count: 30,
  },
  {
    name: "Strengh",
    count: 10,
  },
  {
    name: "Pilates",
    count: 15,
  },
  {
    name: "Stretches",
    count: 10,
  },
  {
    name: "Core",
    count: 20,
  },
];

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(selectedCategory.toLowerCase())
  );
  return (
    <div className="w-1/5 h-screen p-4 border-2 hidden md:block">
      <div className="relative w-full space-x-2 pb-2">
        <IoSearchOutline className="absolute inline-block left-3 inset-y-1.5" />
        <input
          type="text"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          placeholder="Search Category"
          className="bg-[#D3D3D3] text-sm w-full py-1 md:px-8 px-6 rounded-xs"
        />
      </div>
      <h3 className="font-secondary uppercase font-medium text-2xl">
        Categories
      </h3>
      <ul className="mt-4 overflow-y-auto max-h-[calc(100%-150px)]">
        {filteredCategories.length > 0 ? (filteredCategories.map((category, index) => (
          <li
            key={index}
            className="flex flex-col bg-[#D3D3D3] mb-2 p-1 rounded-xs"
          >
            <h4 className="font-secondary text-xl">{category.name}</h4>
            <p className="text-sm tracking-tight">{`${category.count} workouts`}</p>
          </li>
        ))) : (<p className="text-gray-500 text-center">No Categories Found</p>)}
      </ul>
    </div>
  );
};

export default Sidebar;
