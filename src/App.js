//import logo from './logo.svg';
import './App.css';
import Agenda from './Agenda.js';
import { HoyProvider } from './context/HoyContext.js';
import { EventosProvider } from './context/EventosContext.js';

function App() {
  return (
    <HoyProvider>
      <EventosProvider>
        <Agenda />
      </EventosProvider>
    </HoyProvider>
  );
}

export default App;
