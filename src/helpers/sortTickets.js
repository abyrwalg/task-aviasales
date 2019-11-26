function sortTickets(tickets, sortParameter, connnections) {

  let ticketsArray = tickets;

  if (connnections.length !== 0 && !connnections.includes('all')) {
    ticketsArray = ticketsArray
      .filter(ticket => connnections.some(connection => connection
        == ticket.segments[0].stops.length + ticket.segments[1].stops.length));
  }

  if (sortParameter === 'cheapest') {
    ticketsArray.sort((a, b) => a.price - b.price);
  } else if (sortParameter === 'fastest') {
    ticketsArray.sort((a, b) =>
      (a.segments[0].duration + a.segments[1].duration)
      - (b.segments[0].duration + b.segments[1].duration));
  }

  const result
  = [ticketsArray[0], ticketsArray[1], ticketsArray[2], ticketsArray[3], ticketsArray[4]];
  return result;

}

export default sortTickets;