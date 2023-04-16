import { useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface Props {
  initialText: String;
  textData: string[];
  random?: boolean;
}

interface VariantProps {
  scaleY: number;
  y: string | number;
  opacity: number;
  filter?: string;
}

const MIN_ARR_LEN = 15;

const SlotMachine = ({ initialText, textData, random=true }: Props) => {
  if (textData.length === 0) {
    return <div><p>Please enter at least one element in textData.</p></div>
  }

  if (random) textData = shuffle(textData);

  const dataCount = textData.length < MIN_ARR_LEN ? Math.round(MIN_ARR_LEN / textData.length) * textData.length : textData.length;
  const textArr = textData.length < MIN_ARR_LEN ? Array(Math.round(MIN_ARR_LEN / textData.length)).fill(textData).flat() : textData;
  
  const [data, setData] = useState([initialText, ...textArr]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev < selectedIndex ? prev + 1 : prev;
      });
    }, getDuration(10, currentIndex));

    return () => clearInterval(interval);
  }, [currentIndex, selectedIndex]);

  const variants: Variants = {
    initial: { scaleY: 0.3, y: '-50%', opacity: 0 },
    animate: ({ isLast }) => {
      let props: VariantProps = { scaleY: 1, y: 0, opacity: 1 };
      if (!isLast) props['filter'] = 'blur(1.5px)';

      return props;
    },
    exit: { scaleY: 0.3, y: '50%', opacity: 0 },
  };

  function shuffle(array: string[]) {
    const shuffled = Array(array.length);

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [array[j], array[i]];
    }

    return shuffled;
  }

  function handleClick() {
    const prevIndex = currentIndex;
    const nextIndex = random ? data.length - prevIndex + Math.round(Math.random() * (textArr.length - 1)) : textArr.length - 1;
    setData([...data.slice(prevIndex), ...textArr]);
    setCurrentIndex(0);
    setSelectedIndex(nextIndex);
  }

  function getDuration(base: number, index: number) {
    return base * (index + 1) * (5 / dataCount);
  }

  return (
    <div>
      <AnimatePresence mode="popLayout">
        {data.map((text, i) => {
          const isLast = i === selectedIndex;

          return (
            i === currentIndex && (
              <motion.p
                className="slotMachineText"
                key={text}
                custom={{ isLast }}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: getDuration(isLast ? 0.1 : 0.01, i), ease: isLast ? 'easeInOut' : 'linear' }}
                onClick={handleClick}
                whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
                whileTap={{ scaleY: 0.7, y: '-30%', transition: { duration: 0.2 } }}
              >
                {text}
              </motion.p>
            )
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SlotMachine;
