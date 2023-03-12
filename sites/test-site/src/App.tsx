import './App.css'
import { SlotMachine } from 'react-slot-machine';

function App() {
  const textData = [...Array(15)].map(_ => `Data #${String(Math.round(Math.random() * 30))}`);

  return (
    <div className="App">
      <SlotMachine initialText={'Click Me!'} textData={textData} />
    </div>
  )
}

export default App
