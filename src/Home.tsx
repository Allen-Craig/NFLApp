import { useState } from "react";

type TeamData = {
  SeasonType: number;
  Season: number;
  Conference: "";
  Division: "";
  Team: "";
  Name: "";
  Wins: number;
  Losses: number;
  Ties: number;
  Percentage: Float32Array;
  PointsFor: number;
  PointsAgainst: number;
  NetPoints: number;
  Touchdowns: number;
  DivisionWins: number;
  DivisionLosses: number;
  ConferenceWins: number;
  ConferenceLosses: number;
  TeamID: number;
  DivisionTies: number;
  ConferenceTies: number;
  GlobalTeamID: number;
  DivisionRank: number;
  ConferenceRank: number;
  HomeWins: number;
  HomeLosses: number;
  HomeTies: number;
  AwayWins: number;
  AwayLosses: number;
  AwayTies: number;
  Streak: number;
};

const Home = () => {
  const [season, setSeason] = useState("");
  const [response, setResponse] = useState<TeamData>({} as TeamData);

  const key = "?key=1a241c5c61df493a988bd27f9d1048ec";
  const url =
    "https://api.sportsdata.io/v3/nfl/scores/json/Standings/" + season + key;

  const getTeamData = async () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setResponse(json);

        console.log(response);
      });
  };

  return (
    <>
      <h1>Welcome to NFL App</h1>
      <label htmlFor="Season-input">Input Season</label>
      <input
        id="Season-input"
        value={season}
        type="text"
        onChange={(event) => setSeason(event.target.value)}
        placeholder="(YYYYREG/PRE/POST)"
      />
      <button onClick={() => getTeamData()}>Get Team Info</button>
      <div>
        <p>Name: {response.Name}</p>
      </div>
      <p className="info-text">
        Please enter four digit Year value followed by "REG" for regular season,
        "PRE" for preseason, and "POST" for post season.
      </p>
    </>
  );
};

export default Home;
