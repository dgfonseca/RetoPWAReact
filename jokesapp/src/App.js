import React from "react";
import ReactDOM from "react-dom";

import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  /*Hook que hace el fetch del api y guarda su resultado en la memoria local del DOM*/
  const [jokeInfo, setJoke] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("joke") === null || localStorage.getitem("")) {
        setJoke("Loading...");
      } else {
        setJoke(localStorage.getItem("joke"));
      }
    } else {
      const URL =
        "https://gateway.marvel.com/v1/public/characters?ts=abc&apikey=29f3c5f2dc49cb05a1b310fbf5473de6&hash=23a2ea8bc1216fddb17563bb864c45ca";
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setJoke(res.data.results);
          localStorage.setItem("joke", res.data.results);
        });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Marvel</h1>
        <div>
          <table>
            {jokeInfo.map((product, index) => itemMarvel(product, index))}
          </table>
        </div>
      </header>
    </div>
  );
}

function itemMarvel(product, index) {
  if (product.descripcion == undefined) {
    product.descripcion = "No description";
  }
  if (product.name == undefined) {
    product.name = "No name";
  }
  return (
    <tr key={index}>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>
        <img
          src={product.thumbnail.path + "." + product.thumbnail.extension}
          style={{ height: "100px", width: "100px" }}
        ></img>
      </td>
    </tr>
  );
}

export default App;
