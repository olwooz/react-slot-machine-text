import { SlotMachine } from './lib';

function App() {
  const textData = [...Array(15)].map(_ => String(Math.round(Math.random() * 30)));

  return (
    <SlotMachine initialText={'Click me!'} textData={textData}/>
  )
}

export default App;
