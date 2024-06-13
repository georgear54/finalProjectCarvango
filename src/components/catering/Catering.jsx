import React from "react";
import classes from "./catering.module.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import background from "../../assets/imgs/cateringTempBackground.png";
import img1 from "../../assets/imgs/cMeal.jpg.png";
import img2 from "../../assets/imgs/dMeal.jpg.png";
import img3 from "../../assets/imgs/bMeal.jpg.png";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Event 1",
    start: new Date(2024, 5, 13), // June 13, 2024
    end: new Date(2024, 5, 13),
  },
  {
    title: "Event 2",
    start: new Date(2024, 5, 14, 10, 8), // June 14, 2024, 10:08 AM
    end: new Date(2024, 5, 14, 12, 0), // June 14, 2024, 12:00 PM
  },
  {
    title: "Event 3",
    start: new Date("2024-06-15T09:00:00"), // June 15, 2024, 09:00 AM
    end: new Date("2024-06-15T11:00:00"), // June 15, 2024, 11:00 AM
  },
];
console.log(events);
function Catering() {
  return (
    <main className={classes.main}>
      <section className={classes.headerSection}>
        <img
          src={background}
          alt="Food Truck"
          className={classes.headerImage}
        />
        <h1>Food Truck</h1>
        <p>
          From corporate events to weddings, Zia's is ready to provide the
          perfect culinary backdrop.
        </p>
      </section>
      <section className={classes.imagesSection}>
        <img src={img1} alt="Event 1" className={classes.image} />
        <img src={img2} alt="Event 2" className={classes.image} />
        <img src={img3} alt="Event 3" className={classes.image} />
      </section>
      <button className={classes.moreInfoButton}>More Info</button>
      <section className={classes.calendarSection}>
        <h1>React Big Calendar</h1>
        <div className={classes.calendarWrapper}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </section>
    </main>
  );
}

export default Catering;
