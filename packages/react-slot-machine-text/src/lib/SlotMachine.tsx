import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface Props {
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

const SlotMachine = ({ textData, random = true }: Props) => {
  if (textData.length === 0) {
    return (
      <div>
        <p>Please enter at least one element in textData.</p>
      </div>
    );
  }

  if (random) textData = shuffle(textData);

  const dataCount =
    textData.length < MIN_ARR_LEN
      ? Math.round(MIN_ARR_LEN / textData.length) * textData.length
      : textData.length;
  const textArr =
    textData.length < MIN_ARR_LEN
      ? Array(Math.round(MIN_ARR_LEN / textData.length))
          .fill(textData)
          .flat()
      : textData;

  const [data, setData] = useState(textArr);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = dataCount - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev < lastIndex ? prev + 1 : prev;
      });
    }, getDuration(15, currentIndex));

    return () => clearInterval(interval);
  });

  const getDuration = useCallback(
    (base: number, index: number) => {
      console.log(
        base,
        index,
        dataCount,
        base * (index + 1) * (MIN_ARR_LEN / dataCount)
      );
      return (
        base * (((index + 1) / MIN_ARR_LEN) * 10) * (MIN_ARR_LEN / dataCount)
      );
    },
    [dataCount]
  );

  function handleClick() {
    const nextIndex = random
      ? Math.round(Math.random() * (dataCount - 1))
      : dataCount - 1;

    setData((prev) => {
      return [
        ...prev.slice(nextIndex + 1, prev.length),
        ...prev.slice(0, nextIndex + 1),
      ];
    });

    setCurrentIndex(0);
  }

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
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  return (
    <div>
      <AnimatePresence mode='popLayout'>
        {data.map((text, i) => {
          const isLast = i === lastIndex;

          return (
            i === currentIndex && (
              <motion.p
                className='slotMachineText'
                key={text}
                custom={{ isLast }}
                variants={variants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{
                  duration: isLast ? 1 : getDuration(0.015, i),
                  ease: isLast ? 'easeInOut' : 'linear',
                }}
                onClick={handleClick}
                whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
                whileTap={{
                  scaleY: 0.7,
                  y: '-30%',
                  transition: { duration: 0.2 },
                }}
                style={{
                  overflow: 'hidden',
                  margin: 0,
                }}
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
