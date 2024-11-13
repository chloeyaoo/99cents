// src/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-MD40Q0Q938"'); // Replace with your Google Analytics Tracking ID
};

export const logPageView = (page) => {
  ReactGA.send({ hitType: 'pageview', page });
};
