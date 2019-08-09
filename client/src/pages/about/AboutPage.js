import React from 'react';

import './about.styles.scss';

const AboutPage = () => {
  return (
    <div id="about">
      <div className="card">
        <div className="card-body">
          <h1>About Us</h1>
          <div className="dont-sue-me">
            I am in no way affiliated with Bob&apos;s Burgers. This is just a
            project for me to practice my web development skills. Enjoy yourself
            and don&apos;t get me sued!
          </div>
          <img
            src="https://vignette.wikia.nocookie.net/bobsburgerpedia/images/b/b7/Gene_Belcher.png/revision/latest?cb=20130114043308"
            className="responsive-img"
            alt="Burger Boy"
          />
          <div className="content">
            Chowster serves all users who are passionate about food trucks! Our
            aim is to provide a safe haven for food truckers and truckees to
            connect with each other and do whatever weird things you guys do!
            Probably a lot of food fetishes out there. Don&apos;t be gross on
            here... Just mingle and have fun. But not too much fun.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
