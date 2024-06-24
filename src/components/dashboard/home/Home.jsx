import React from "react";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <div className={styles.filters}>
          <button>Last 30 days</button>
          <button>All channels</button>
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <p>Online store sessions</p>
          <h2>384</h2>
          <span className={styles.change}>+26%</span>
        </div>
        <div className={styles.statItem}>
          <p>Total sales</p>
          <h2>$0.00</h2>
          <span className={styles.change}>0%</span>
        </div>
        <div className={styles.statItem}>
          <p>Total orders</p>
          <h2>0</h2>
          <span className={styles.change}>0%</span>
        </div>
        <div className={styles.statItem}>
          <p>Conversion rate</p>
          <h2>0%</h2>
          <span className={styles.change}>0%</span>
        </div>
      </div>
      <div className={styles.chart}>
        {/* Placeholder for chart */}
        <img src="/path/to/your/chart.png" alt="Chart" />
      </div>
      <div className={styles.actions}>
        <div className={styles.actionItem}>
          <h3>Things to do next</h3>
          <button>Unavailable items</button>
          <button>Table</button>
        </div>
        <div className={styles.actionItem}>
          <h3>Upcoming events</h3>
          <button>Event details</button>
          <button>Event details</button>
          <button>More info...</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
