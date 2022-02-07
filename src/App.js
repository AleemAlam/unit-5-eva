import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(1);
  const getData = (url = "http://localhost:3001/games") => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = (data) => {
    fetch("http://localhost:3001/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => err);
  };
  const handleSorting = (sort) => {
    const url = `http://localhost:3001/games?_sort=${sort}&_order=asc`;
    getData(url);
  };
  const handleDoubleClick = (sort) => {
    const url = `http://localhost:3001/games?_sort=${sort}&_order=desc`;
    getData(url);
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    const url = `http://localhost:3001/games?q=${value}`;
    getData(url);
  };
  return (
    <div>
      <Form handleSubmit={handleSubmit} />
      <input type="text" id="searchbox" onChange={handleSearch} />
      <>
        <table id="table" border="1">
          <thead>
            <tr>
              <th>
                game name
                <button
                  onDoubleClick={() => {
                    handleDoubleClick("gamename");
                  }}
                  onClick={() => handleSorting("gamename")}
                >
                  ^
                </button>
              </th>
              <th>game author</th>
              <th>game tags</th>
              <th>
                game price
                <button
                  onDoubleClick={() => {
                    handleDoubleClick("gameprice");
                  }}
                  onClick={() => handleSorting("gameprice")}
                >
                  ^
                </button>
              </th>
              <th>is for kids</th>
              <th>
                rating
                <button
                  onDoubleClick={() => {
                    handleDoubleClick("gamerating");
                  }}
                  onClick={() => handleSorting("gamerating")}
                >
                  ^
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="gamerow">
                <td className="gamename">{item.gamename}</td>
                <td>{item.gameauthor}</td>
                <td>{item.gametags}</td>
                <td className="gameprice">{item.gameprice}</td>
                <td>{item.forkids ? "Yes" : "No"}</td>
                <td className="gamerating">{item.gamerating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}

export default App;
