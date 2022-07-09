import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Header edit={true} />
      <Footer />
    </div>
  );
}

export default App;
