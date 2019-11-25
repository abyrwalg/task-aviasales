import React from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import classes from './App.module.css';
import SortList from './components/SortList/SortList';
import ConnectionsFilter from './components/ConnectionsFilter/ConnectionsFilter';
import Ticket from './components/Ticket/Ticket';
import Loader from "./components/Loader/Loader";

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

    let tickets = [];

    async function getDataFromServer(searchId) {

      try {
        const response = await Axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
        tickets = await tickets.concat(response.data.tickets);
        if (response.data.stop === false) {
          await getDataFromServer(searchId);
        } else if (response.data.stop === true) {
          return tickets;
        }
      } catch (error) {
        console.log(error);
        await getDataFromServer(searchId);
      }

    }
    const searchId = await Axios.get('https://front-test.beta.aviasales.ru/search');
    await getDataFromServer(searchId.data.searchId);
    this.setState({ tickets: [tickets[0], tickets[1], tickets[2], tickets[3], tickets[4]] });
  }

  checkboxHandler = event => {

    const { checkboxes } = this.state;
    checkboxes.find((item, index) => {
      if (item.value == event.target.value) {
        checkboxes[index].checked = !checkboxes[index].checked;
      }
    });

    this.setState({ checkboxes });


  }

  onButtonClick = event => {
    this.setState({ sortList: event.target.id });
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
            {this.state.tickets.map((item, index) => <Ticket key={index} data={this.state.tickets[index]} />)}
          </div> : <Loader />}
        </main>
      </div>
    );
  }
}


export default App;
