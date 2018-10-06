import fetch from 'node-fetch';

export const issuesUrl = 'https://api.github.com/repos/TGmeetup/website/issues?labels=Event&state=open';

export const fetchEvents = () =>
  fetch(issuesUrl)
    .then((res) => {
      if (res.status !== 200) throw res.json();
      return res.json();
    })
    .then(issues =>
      issues.map((issue) => {
        const reDetailText = /<details>((?:.|[\r\n])*?)<\/detail>/gm;
        const encEventStr = reDetailText.exec(issue.body)[1];

        const event = JSON.parse(unescape(encEventStr));

        return {
          ...event,
          datetime: new Date(event.datetime),
          title: issue.title,
        };
      }));
