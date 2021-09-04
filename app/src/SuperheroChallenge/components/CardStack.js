import * as React from "react";
import { useState } from "react";
import { wrap } from "popmotion";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import * as Ricons from 'react-icons/io5'

const variants = {
  enter: (direction) => {
    return {
      scale: 0,
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    scale: 1,
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      scale: 0,
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity * 4;
};

const CardStack = ({heroPage}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const stackIndex = wrap(0, heroPage.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className='text-center w-100 h-100'
          key={page}
          children={<Card hero={heroPage[stackIndex]} displayOneByOne/>}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 2000, damping: 50, duration: 0.1 },
            opacity: { duration: 1 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div className='p-1 my-4 text-muted'>
          <Ricons.IoChevronBack size={23}/>
          <Ricons.IoChevronBack size={23}/>
          <Ricons.IoChevronBack size={23}/>
          <Ricons.IoChevronBack size={23}/>
          <p className='display-5' style={{display: 'inline-block', verticalAlign: 'middle'}}>Swipe to change</p>
          <Ricons.IoChevronForward size={23}/>
          <Ricons.IoChevronForward size={23}/>
          <Ricons.IoChevronForward size={23}/>
          <Ricons.IoChevronForward size={23}/>
      </div>
    </div>
  );
};

export default CardStack