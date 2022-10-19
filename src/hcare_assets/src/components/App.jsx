import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HForm from "./HForm";


function App() {
 


  async function fetchData() {
    // const notesArray = await dkeeper.readNotes();
    // setNotes(notesArray);
  }

  return (
    <div>
      <Header />
        <HForm />
      <Footer />
    </div>
  );
}

export default App;
