import React, { useState } from "react";
import axios from "axios";

const initialArr = [null, null, null, null, "B", null, null, null, null];
const initialData = { message: "", steps: 0, email: "" };

export default function AppFunctional(props) {
  const [arr, setArr] = useState(initialArr);
  const [data, setData] = useState(initialData);

  function getXY() {
    return arr.indexOf("B");
  }

  function getXYMesaj() {
    const table = [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ];

    let index = getXY();

    return `Koordinatlar (${table[index][0]}, ${table[index][1]})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setArr(initialArr);
    setData(initialData);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,

    setData({ ...data, message: "" });
    const yonler = {
      left: "Sola",
      right: "Sağa",
      up: "Yukarıya",
      down: "Aşağıya",
    };

    let index = getXY();
    if (yon === "left" && [1, 2, 4, 5, 7, 8].includes(index)) {
      index -= 1;
      return index;
    } else if (yon === "right" && [0, 1, 3, 4, 6, 7].includes(index)) {
      index += 1;
      return index;
    } else if (yon === "up" && [3, 4, 5, 6, 7, 8].includes(index)) {
      index -= 3;
      return index;
    } else if (yon === "down" && [0, 1, 2, 3, 4, 5].includes(index)) {
      index += 3;
      return index;
    } else {
      setData({ ...data, message: `${yonler[yon]} gidemezsiniz` });
      return "Error";
    }
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    let index = sonrakiIndex(evt);
    if (index !== "Error") {
      let newArr = Array(9).fill(null);
      newArr[index] = "B";
      setArr(newArr);
      setData({ ...data, steps: data.steps + 1 });
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setData({ ...data, email: evt.target.value });
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    const table = [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ];
    let index = getXY();
    const postData = {
      x: table[index][0],
      y: table[index][1],
      steps: data.steps,
      email: data.email,
    };

    axios
      .post("http://localhost:9000/api/result", postData)
      .then(function (response) {
        console.log(response);
        setData({ ...data, email: "", message: response.data.message });
      })
      .catch(function (error) {
        console.log(error);
        setData({ ...data, email: "", message: error.response.data.message });
      });
    console.log(data);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{data.steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {arr.map((idx, i) => (
          <div key={i} className={`square${idx === "B" ? " active" : ""}`}>
            {idx === "B" ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{data.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => ilerle("left")}>
          SOL
        </button>
        <button id="up" onClick={() => ilerle("up")}>
          YUKARI
        </button>
        <button id="right" onClick={() => ilerle("right")}>
          SAĞ
        </button>
        <button id="down" onClick={() => ilerle("down")}>
          AŞAĞI
        </button>
        <button id="reset" onClick={() => reset()}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={data.email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
