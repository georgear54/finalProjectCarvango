import classes from "./header.module.css";
import Nav from "./nav/nav";
import NavCase from "./nav/navCase";
export default function Header({flag}) {
  return (
    <header className={classes.Header}>
      <Nav/>
    </header>
  );
}
