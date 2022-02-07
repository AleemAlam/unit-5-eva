import React, { useState } from "react";

// Input name=gamename For game name eg: tetris
// Input name=gameauthor for creator of games: nintendo
// Input name=gametags for comma separated tags on game eg arcade, adventure
// Input name=gameprice for price of game
// Checkbox name=forkids to check if game is meant for younger kids
// Textarea name=gamedesc for adding game of description
// Select dropdown name=gamerating for rating game from 1 to 5
// Input type=Submit button for submitting form
const initInput = {
  gamename: "",
  gameauthor: "",
  gametags: "",
  gameprice: "",
  forkids: false,
  gamedesc: "",
  gamerating: "1",
};
export default function Form({ handleSubmit }) {
  const [input, setInput] = useState(initInput);

  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const payload =
      type === "checkbox" ? { [name]: e.target.checked } : { [name]: value };
    setInput({ ...input, ...payload });
  };

  const validateInput = () => {
    for (let key in input) {
      if (input[key] === "") {
        return false;
      }
    }
    return true;
  };
  return (
    <>
      <form
        id="addgame"
        onSubmit={(e) => {
          e.preventDefault();

          if (validateInput()) {
            setError(false);
            setInput(initInput);
            handleSubmit(input);
          } else setError(true);
        }}
      >
        <input
          type="text"
          name="gamename"
          value={input.gamename}
          id=""
          onChange={handleChange}
        />
        <input
          type="text"
          name="gameauthor"
          value={input.gameauthor}
          id=""
          onChange={handleChange}
        />
        <input
          type="text"
          name="gametags"
          value={input.gametags}
          id=""
          onChange={handleChange}
        />
        <input
          type="text"
          name="gameprice"
          value={input.gameprice}
          id=""
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="forkids"
          checked={input.forkids}
          id=""
          onChange={handleChange}
        />
        <textarea
          name="gamedesc"
          value={input.gamedesc}
          id=""
          onChange={handleChange}
          cols="30"
          rows="10"
        ></textarea>
        <select
          name="gamerating"
          id=""
          onChange={handleChange}
          value={input.gamerating}
        >
          {[1, 2, 3, 4, 5].map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
        <input type="Submit" />
      </form>
      {error && <p style={{ color: "red" }}>All Fields are mandatory*</p>}
    </>
  );
}
