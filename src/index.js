import { screen, messageBox, messageText, eventTable } from './ui';
import { fetchEvents } from './api';

screen.render();

fetchEvents()
  .then(events => events.sort((e1, e2) => e1.datetime - e2.datetime))
  .then((events) => {
    messageBox.hide();

    eventTable.setData([
      ['Title', 'City', 'Location', 'Link'],
      ...events.map(event => ([
        `{yellow-fg}${event.title.slice(0, 30)}{/yellow-fg}`,
        event.local_city,
        event.location.slice(0, 15),
        event.link,
      ])),
    ]);

    eventTable.focus();
  })
  .catch(err => messageText.setContent(`${err}`))
  .finally(() => screen.render());
