import { DivideIcon } from "@heroicons/react/20/solid";
import React from "react";
import Title from "./components/title";
import Cards from "./components/cards";
import Card2 from "./components/card2";
// import Cursor from "./components/Cursor"; // Import the Cursor component
// import Cursor from "./components/cursor";
import Cursor from "./components/cursor"; // Import the Cursor component
import Footer from "./components/footer";
import Rainbow from "./components/Rainbow";
import Xray from "./components/xray"; // Import the Xray component
import Symtoms from "./components/symptoms";

function App() {
  return (
    <div>
      {/* Add Custom Cursor Component */}
      <Cursor /> 

      <Title />
      <div className="relative z-10 overflow-x-hidden">
      <Symtoms/>
        <Cards />
        <Card2 />
        <Xray/>
        
       
        </div>
      <Rainbow  /> {/* Rainbow circles on the right */}
   
       <Footer/>
       
       
    </div>
  );
}

export default App;
