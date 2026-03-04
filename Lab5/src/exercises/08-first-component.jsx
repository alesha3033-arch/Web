import React from 'react';
import PropTypes from 'prop-types';

const BootstrapCard = (props) => {
  return (
    <div className="card m-5" style={{ maxWidth: '400px', margin: '20px auto' }}>
      <img 
        className="card-img-top" 
        src={props.imageUrl} 
        alt="Card image cap"
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <a href={props.buttonUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          {props.buttonLabel}
        </a>
      </div>
    </div>
  );
};

BootstrapCard.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  buttonUrl: PropTypes.string,
  buttonLabel: PropTypes.string
};

const Hero = (props) => {
  return (
    <div className="container m-5">
      <h1 className="display-4">{props.title}</h1>
      <p className="lead">{props.description}</p>
      <a className="btn btn-primary btn-lg" href={props.buttonURL} role="button">{props.buttonLabel}</a>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonURL: PropTypes.string
};

function Exercise08() {
  return (
    <div>
      <BootstrapCard 
        title="Bob Dylan"
        imageUrl="/img/Dylan.png"
        description="Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer-songwriter."
        buttonUrl="https://en.wikipedia.org/wiki/Bob_Dylan"
        buttonLabel="Go to wikipedia"
      />
      
      <Hero
        title="Welcome to react"
        description="React is the most popular rendering library in the world"
        buttonLabel="Go to the official website"
        buttonURL="https://reactjs.org/"
      />
    </div>
  );
}

export default Exercise08;
