import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);
  const key = "?key=1a241c5c61df493a988bd27f9d1048ec";
  const season = "2024REG";
  const url =
    "https://api.sportsdata.io/v3/nfl/scores/json/Standings/" + season + key;

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };
  fetchData();

  return (
    <>
      <h1>Welcome to NFL App</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <button onClick={() => setCount((count) => (count = 0))}>
        clear count
      </button>
    </>
  );
};

export default Home;
