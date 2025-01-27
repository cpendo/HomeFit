import Display from "./pages/home/Display";
import Navbar from "./pages/home/Navbar";
import Sidebar from "./pages/home/Sidebar";

const App = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Navbar />
      <main className="flex flex-1 w-screen h-full pt-4">
         <Sidebar/>
       <Display />

      </main> 
    </div>
  );
};

export default App;
