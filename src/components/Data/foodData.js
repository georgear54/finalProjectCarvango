import AMealImg from "../../assets/imgs/aMeal.jpg.png";
import BMealImg from "../../assets/imgs/bMeal.jpg.png";
import CMealImg from "../../assets/imgs/cMeal.jpg.png";
import DMealImg from "../../assets/imgs/dMeal.jpg.png";
import EMealImg from "../../assets/imgs/eMeal.jpg.png";
import FMealImg from "../../assets/imgs/fMeal.jpg.png";
import GMealImg from "../../assets/imgs/gMeal.jpg.png";
import HMealImg from "../../assets/imgs/hMeal.jpg.png";
import IMealImg from "../../assets/imgs/iMeal.jpg.png";
import JMealImg from "../../assets/imgs/jMeal.jpg.png";
import KMealImg from "../../assets/imgs/kMeal.jpg.png";
import LMealImg from "../../assets/imgs/lMeal.jpg.png";
import MMealImg from "../../assets/imgs/mMeal.jpg.png";
import MainImg from "../../assets/imgs/main.jpg";
import MainBackgroundImg from "../../assets/imgs/mainBackGround.jpg";

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

const NewFoodData = [
  {
    name: "A Meal",
    img: AMealImg,
    section: "Meal",
    price: 200,
  },
  {
    name: "B Meal",
    img: BMealImg,
    section: "Meal",
    price: 250,
  },
  {
    name: "C Meal",
    img: CMealImg,
    section: "Meal",
    price: 300,
  },
  {
    name: "D Meal",
    img: DMealImg,
    section: "Meal",
    price: 350,
  },
  {
    name: "E Meal",
    img: EMealImg,
    section: "Meal",
    price: 180,
  },
  {
    name: "F Meal",
    img: FMealImg,
    section: "Meal",
    price: 220,
  },
  {
    name: "G Meal",
    img: GMealImg,
    section: "Meal",
    price: 150,
  },
  {
    name: "H Meal",
    img: HMealImg,
    section: "Meal",
    price: 270,
  },
  {
    name: "I Meal",
    img: IMealImg,
    section: "Meal",
    price: 350,
  },
  {
    name: "J Meal",
    img: JMealImg,
    section: "Meal",
    price: 210,
  },
  {
    name: "K Meal",
    img: KMealImg,
    section: "Meal",
    price: 230,
  },
  {
    name: "L Meal",
    img: LMealImg,
    section: "Meal",
    price: 190,
  },
  {
    name: "M Meal",
    img: MMealImg,
    section: "Meal",
    price: 260,
  },
  {
    name: "Main",
    img: MainImg,
    section: "Special",
    price: 500,
  },
  {
    name: "Main Background",
    img: MainBackgroundImg,
    section: "Special",
    price: 600,
  },
];

const NewFoodItems = NewFoodData.reduce((res, food) => {
  if (!res[food.section]) {
    res[food.section] = [];
  }
  res[food.section].push(food);
  return res;
}, {});

export { NewFoodItems };
