import Index from './Page';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  mirror: true
});

function App() {
  return (
    <div className="App">
        <Index />
    </div>
  );
}


export default App;
