import React from "react";
import "./styles.css";

export default function Footer() {
  return (
    <footer className="mt-4">
      <p className="sign">
        Coded by Kateryna Ivanova
        <br />
        <a
          href="https://github.com/KateFesik/weather-react/tree/main/src"
          target="_blank"
          className="source-code"
          rel="noreferrer"
          title="There is a link github this to Kateryna Ivanova project"
        >
          Open-source code
        </a>
      </p>
    </footer>
  );
}
