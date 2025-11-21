import React from 'react';
import Navbar from '../Navbar';
import Header from '../Header';
import CreateProfile from '../CreateProfile';
import ProfileList from '../ProfileList';

const HomePage = () => {
  const styles = {
    pageWrapper: {
      margin: 0,
      padding: 0,
      fontFamily: "'Jost', sans-serif",
      backgroundColor: '#212121', // dark theme background
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
      color: 'white', // default text color
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '3rem 1rem 5rem',
      boxSizing: 'border-box',
    },
    contentWrapper: {
      width: '100%',
      maxWidth: '960px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2.5rem',
      padding: '0 1rem',
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.mainContent}>
          <div style={styles.contentWrapper}>
            <Header />
            <CreateProfile />
            <ProfileList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
