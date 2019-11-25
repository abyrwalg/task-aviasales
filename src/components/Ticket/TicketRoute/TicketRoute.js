import React from 'react';
import classes from './TicketRoute.module.css';
import minutesToHours from '../../../helpers/minutesToHours';
import formatSchedule from '../../../helpers/formatSchedule';

const TicketRoute = props => {
  const schedule = formatSchedule(props.data.date, props.data.duration);
  let connectionsString = '';

  if (props.data.stops.length === 0) {
    connectionsString = 'Прямой';
  } else if (props.data.stops.length === 1) {
    connectionsString = '1 пересадка';
  } else if (props.data.stops.length > 1) {
    connectionsString = `${props.data.stops.length} пересадки`;
  }

  return (
    <div className={classes.TicketRoute}>
      <div className={classes.destination}>
        <span className={classes.header}>{`${props.data.origin} - ${props.data.destination}`}</span>
        <span>{`${schedule[0]} - ${schedule[1]}`}</span>
      </div>
      <div className={classes.travelTime}>
        <span className={classes.header}>В пути</span>
        <span>{minutesToHours(props.data.duration)}</span>
      </div>
      <div className={classes.connections}>
        <span className={classes.header}>{connectionsString}</span>
        <span>{props.data.stops.join(', ')}</span>
      </div>
    </div>
  );
};

export default TicketRoute;