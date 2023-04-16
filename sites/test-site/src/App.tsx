import './index.css';
import { SlotMachine } from 'react-slot-machine-text';

function App() {
  function generateTextData(n: number) {
    return [...Array(n)].map(
      (_) => `Data #${String(Math.round(Math.random() * n))}`
    );
  }
  const textData = [...Array(15)].map(
    (_) => `Data #${String(Math.round(Math.random() * 30))}`
  );

  return (
    <div className='App'>
      <SlotMachine textData={generateTextData(5)} />
      <SlotMachine textData={generateTextData(15)} />
      <SlotMachine textData={generateTextData(100)} />
      <SlotMachine textData={generateTextData(1000)} />
    </div>
  );
}

export default App;
