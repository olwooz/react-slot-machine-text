import { SlotMachine } from './lib';

function App() {
  function generateTextData(n: number) {
    return [...Array(n)].map((_, i) => `Data #${i}`);
  }

  return (
    <div className='App'>
      <SlotMachine textData={generateTextData(5)} />
      <SlotMachine textData={generateTextData(15)} />
      <SlotMachine textData={generateTextData(200)} />
    </div>
  );
}

export default App;
