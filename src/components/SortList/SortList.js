import React from 'react';
import classes from './SortList.module.css';

const SortList = props => {
  const { active } = props;
  const cheapestClasses = active === 'cheapest' ? [classes.cheapest, classes.active].join(' ') : classes.cheapest;
  const fastestClasses = active === 'fastest' ? [classes.fastest, classes.active].join(' ') : classes.fastest;
  return (
    <div className={classes.SortList}>
      <button
        className={cheapestClasses}
        onClick={props.handler}
        id="cheapest"
      >Самый дешевый</button>
      <button
        className={fastestClasses}
        onClick={props.handler}
        id="fastest"
      >
      Самый быстрый</button>
    </div>
  );
};

export default SortList;
