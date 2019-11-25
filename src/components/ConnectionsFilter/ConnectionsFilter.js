import React from 'react';
import classes from './ConnectionsFilter.module.css';

const ConnectionsFilter = props => (
  <div className={classes.ConnectionsFilter}>
    <p>Количество пересадок</p>
    <div>
      {props.checkboxes.map((item, index) => (
        <label key={index}>
          <input
            onChange={props.handler}
            type="checkbox"
            value={item.value}
            checked={item.checked}
          />
          {item.text}<span className={classes.checkmark} />
        </label>
      ))}
    </div>
  </div>
);

export default ConnectionsFilter;