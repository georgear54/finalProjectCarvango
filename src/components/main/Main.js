import classes from "./main.module.css";
import mainImage from "../../assets/imgs/main.jpg";
export default function Main() {
  return (
    <main className={classes.main}>
      <div>
        <h1>Why Choosing Us?</h1>
        <p>
          dfgfdgfdsgfdgfdgrewtretgf dbcvbvcxbdsfggretregfdgfvxcvsdferffdvd
          fvcxvdsfdsfdsfdsfcvc vcdsfdsfdvcvcvdsfdsfsdvcxzvdz fdsfsdfcxvxzvdszf
        </p>
        <p>
          Immerse yourself in Specialty Coffee and Irresistible Asian Rolls,
          Crafted with Love and Passion. Let's "nou(ri)sh" your way!
        </p>
      </div>

      <div>
        <img src={mainImage} alt="Al Wadi Falafel" />
      </div>
    </main>
  );
}
