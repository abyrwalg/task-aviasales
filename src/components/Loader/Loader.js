import React from 'react';
import classes from './Loader.module.css';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', width: '502px', float: 'right', marginTop: '15px' }}>
    <div className={classes.Loader}><div /><div /><div /><div /></div>
  </div>
);

export default Loader;