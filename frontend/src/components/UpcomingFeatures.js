import React from 'react';
import '../index.css';

const UpcomingFeatures = () => {
  return (
    <div className="container mt-4">
      <h2>Upcoming Features</h2>
      <ul>
        <li>Integrate more chains like BTC, Monero, ZCash, Solana and many more in addition to ETH.</li>
        <li>Integrate a custom trained <b>Machine Learning</b> model like <b>Ollama</b> to automate the process of finding the end reciever by parsing through various transaction paths and ease the process for our app's end users.</li>
        <li>Use <b>Bitquery's GraphQL APIs</b> for a pulling data about the chain which is more customized and faster than other APIs.</li>
      	<li>Give more options to users in monitoring section to get notification via browser push, E-Mail and Slack, already implemented <b>Telegram notifications</b>.</li>
	      <li>Improve UI/UX of the website.</li>
	      <li>Collaborate and take feedback from users to further improve our webapp.</li>
        <li>Introduce more <b>Github Actions CI/CD piplelines</b> for automating boilerplate work.</li>
        <li>and much more !!!</li>
      </ul>
    </div>
  );
};

export default UpcomingFeatures;
