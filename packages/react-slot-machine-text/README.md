# react-slot-machine-text
![react-slot-machine-text](https://user-images.githubusercontent.com/24418404/224548045-af045483-59e1-4a26-b70f-628c1ea6e2b5.gif)

https://www.npmjs.com/package/react-slot-machine-text

# Installation
```
npm i react-slot-machine-text
```

# Usage
```tsx
import { SlotMachine } from 'react-slot-machine-text';

/* ... */
<SlotMachine 
  initialText={'Click Me!'}
  textData={['Option #1', 'Option #2', ...]} // array of string
  random={true} // whether the options are displayed in a random order (true) or in sequential order (false), true by default
/>
/* ... */
```

# Style
```css
/* change the style of the inner text (<p>) */

.slotMachineText {
  font-size: xx-large;
  caret-color: transparent;
  cursor: pointer;
}
```
