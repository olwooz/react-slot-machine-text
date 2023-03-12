import './App.css'
import { SlotMachine } from 'react-slot-machine';

function App() {
  return (
    <div className="App">
      <SlotMachine initialText={'Click Me!'} textData={['1', '2', '3']} />
    </div>
  )
}

export default App
