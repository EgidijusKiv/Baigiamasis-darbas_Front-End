import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { useState, createContext } from "react";
export const EditContext = createContext();

function App() {
  const [edit, setEdit] = useState(false);
  const context = {edit, setEdit}
  return (
    <div className="App">
      <EditContext.Provider value={context}>
      <Navigation />
      <Header edit={edit} />
      <Footer />
      </EditContext.Provider>

    </div>
  );
}

export default App;
