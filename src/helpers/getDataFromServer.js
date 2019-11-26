import Axios from 'axios';

let tickets = [];

async function getDataFromServer(searchId) {
  try {
    const response = await Axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    tickets = await tickets.concat(response.data.tickets);
    if (response.data.stop === false) {
      await getDataFromServer(searchId);
    }
  } catch (error) {
    console.log(error);
    await getDataFromServer(searchId);
  }
  return tickets;
}

export default getDataFromServer;