import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Card from "./Card";

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

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
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
    <div className='d-flex align-items-center'>
      <div className="next" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
        layout
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
      <div className="prev" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
    </div>
  );
};

export default CardStack