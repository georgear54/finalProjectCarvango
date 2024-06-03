import classes from "./main.module.css";
import mainImage from "../../assets/imgs/main.jpg";
export default function Main() {
  return (
    <main className={classes.main}>
      <div>
        <h1>Why Choosing Us?</h1>
        <p>helloooooooooooooooo</p>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Content here, 
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>

      <div>
        <img src={mainImage} alt="Al Wadi Falafel" />
      </div>
    </main>
  );
}
