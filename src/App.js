import "./App.css";

import "./styles.css";
import CardMainWeather from "./CardMainWeather";
import CardDailyWeather from "./CardDailyWeather";
import Footer from "./Footer";
import { useState } from "react";

function App() {
  let [coord, setCoord] = useState({
    lat: "",
    lon: "",
  });
  return (
    <header className="App-header">
      <CardMainWeather saveNewCoord={setCoord} />
      <CardDailyWeather coord={coord} />
      <Footer />
    </header>
  );
}

export default App;
