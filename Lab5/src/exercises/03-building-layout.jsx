import React from 'react';

function Exercise03() {
  const data = {
    image: "/img/Dylan.png",
    cardTitle: "Bob Dylan",
    cardDescription: "Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.",
    button: {
      url: "https://en.wikipedia.org/wiki/Bob_Dylan",
      label: "Go to wikipedia"
    }
  };
  
  return (
    <div className="card m-5" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <img 
        className="card-img-top" 
        src={data.image} 
        alt="Card image cap"
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{data.cardTitle}</h5>
        <p className="card-text">{data.cardDescription}</p>
        <a href={data.button.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          {data.button.label}
        </a>
      </div>
    </div>
  );
}

export default Exercise03;
