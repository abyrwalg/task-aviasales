import React from 'react';
import classes from './Ticket.module.css';
import TicketRoute from './TicketRoute/TicketRoute';

const Ticket = props => {
  let price = props.data.price.toString().split("");
  price.splice(2, 0, " ");
  price = price.join("");
  return (
    <div className={classes.Ticket}>
      <header>
        <span className={classes.price}>{price + " Р"}</span>
        <img src={`https://pics.avs.io/99/36/${props.data.carrier}.png`} alt="Company logo" />
      </header>
      <div className={classes.mainContent}>
        <TicketRoute data={props.data.segments[0]}/>
        <TicketRoute data={props.data.segments[1]}/>
      </div>
    </div>
  );
}

export default Ticket;