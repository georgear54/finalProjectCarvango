import classes from "./main.module.css";
import mainImage from "../../assets/imgs/main.jpg";
export default function Main() {
  return (
    <main className={classes.main}>
      <div>
        <h1>Why Choosing Us?</h1>
        <p>helloooooooooooooooo</p>
        <p>
          Why do we use it? It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that it has a more-or-less
          normal distribution of letters, as opposed to using 'Content here,
          content here', making it look like readable English. Many desktop
          publishing packages and web page editors now use Lorem Ipsum as their
          default model text, and a search for 'lorem y accident, sometimes on purpose (injected
          humour and the like).
        </p>
      </div>

      <div>
        <img src={mainImage} alt="Al Wadi Falafel" />
      </div>
    </main>
  );
}
