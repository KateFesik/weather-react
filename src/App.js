import "./App.css";

// import "./styles.css";
import CardMainWeather from "./CardMainWeather";
import CardDailyWeather from "./CardDailyWeather";
import Footer from "./Footer";
import { useState } from "react";

export default function App() {
  let [coord, setCoord] = useState({
    lat: "",
    lon: "",
  });
  return (
    <div className="App">
      <CardMainWeather saveNewCoord={setCoord} />
      <CardDailyWeather coord={coord} />
      <Footer />
    </div>
  );
}
