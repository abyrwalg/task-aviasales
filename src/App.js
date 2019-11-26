import React from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import classes from './App.module.css';
import SortList from './components/SortList/SortList';
import ConnectionsFilter from './components/ConnectionsFilter/ConnectionsFilter';
import Ticket from './components/Ticket/Ticket';
import Loader from './components/Loader/Loader';
import getDataFromServer from './helpers/getDataFromServer';
import sortTickets from './helpers/sortTickets';
import makeFilters from './helpers/makeFilters';

let tickets = [];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortList: 'cheapest',
      checkboxes: [
        {
          text: 'Все',
          value: 'all',
          checked: false,
        },
        {
          text: 'Без пересадок',
          value: 0,
          checked: true,
        },
        {
          text: '1 пересадка',
          value: 1,
          checked: true,
        },
        {
          text: '2 пересадки',
          value: 2,
          checked: true,
        },
        {
          text: '3 пересадки',
          value: 3,
          checked: false,
        },
      ],
      tickets: [],
    };
  }

  async componentDidMount() {

    const { sortList } = this.state;

    const filters = makeFilters(this.state.checkboxes);

    try {
      const searchId = await Axios.get('https://front-test.beta.aviasales.ru/search');
      tickets = await getDataFromServer(searchId.data.searchId);
      this.setState({ tickets: sortTickets(tickets, sortList, filters) });
    } catch (error) {
      console.log(error);
    }


  }

  checkboxHandler = event => {

    const { checkboxes } = this.state;
    const { sortList } = this.state;

    if (event.target.value === 'all') {
      checkboxes[0].checked = !checkboxes[0].checked;
      if (checkboxes[0].checked === true) {
        checkboxes.forEach((item, index) => {
          if (item.value !== 'all') {
            checkboxes[index].checked = true;
          }
        });
      } else {
        checkboxes.forEach((item, index) => {
          if (item.value !== 'all') {
            checkboxes[index].checked = false;
          }
        });
      }
    } else {
      checkboxes.forEach((item, index) => {
        if (item.value == event.target.value) {
          checkboxes[index].checked = !checkboxes[index].checked;
          if (!checkboxes[index].checked) {
            checkboxes[0].checked = false;
          }
        }
      });
    }

    if (checkboxes.every(item => item.value === 'all' || item.checked)) {
      checkboxes[0].checked = true;
    }

    let filters = this.state.checkboxes.map(item => {
      if (item.checked) {
        return item.value;
      }

      return undefined;
    });

    filters = filters.filter(item => item !== undefined);

    this.setState({ checkboxes, tickets: sortTickets(tickets, sortList, filters) });


  }

  onButtonClick = event => {
    const filters = makeFilters(this.state.checkboxes);
    const sortedTickets = sortTickets(tickets, event.target.id, filters);
    this.setState({ sortList: event.target.id, tickets: sortedTickets });
  };


  render() {
    return (
      <div className={classes.App}>
        <header>
          <img src={logo} className={classes.AppLogo} alt="logo" />
        </header>
        <main>
          <SortList handler={this.onButtonClick} active={this.state.sortList} />
          <ConnectionsFilter checkboxes={this.state.checkboxes} handler={this.checkboxHandler} />
          {this.state.tickets.length != 0 ? <div className={classes.tickets}>
            {this.state.tickets.map((item, index) =>
              <Ticket key={index} data={this.state.tickets[index]} />)}
          </div> : <Loader />}
        </main>
      </div>
    );
  }
}


export default App;
