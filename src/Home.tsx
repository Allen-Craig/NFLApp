import { useState } from "react";

type TeamData = {
  name: string;
  teamID: number;
};

const Home = () => {
  const [season, setSeason] = useState("");
  const [response, setResponse] = useState<TeamData>({} as TeamData);

  const key = "?key=1a241c5c61df493a988bd27f9d1048ec";
  const url =
    "https://api.sportsdata.io/v3/nfl/scores/json/Standings/" + season + key;

  const getTeamData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <h1>Welcome to NFL App</h1>
      <label htmlFor="Season-input">Input Team Number</label>
      <input
        id="Season-input"
        value={season}
        type="text"
        onChange={(event) => setSeason(event.target.value)}
      />
      <button onClick={() => getTeamData()}>Get Team Info</button>
      <div>
        <p>Name: {response.name}</p>
      </div>
      <p className="read-the-docs">
        Please enter four digit Year value followed by "REG" for regular season,
        "PRE" for preseason, and "POST" for post season.
      </p>
      <p className="read-the-docs">Example 2024REG</p>
    </>
  );
};

export default Home;
