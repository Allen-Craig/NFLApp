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
  NetPoints: number;
  Touchdowns: number;
  DivisionWins: number;
  TeamID: number;
};

const Home = () => {
  const [season, setSeason] = useState("2024REG");
  const [team, setTeam] = useState("");
  const [response, setResponse] = useState<TeamData>({} as TeamData);
  const [isLoading, setIsLoading] = useState(false);
  const key = "?key=1a241c5c61df493a988bd27f9d1048ec";
  const url =
    "https://api.sportsdata.io/v3/nfl/scores/json/Standings/2024REG" + key;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();

      // Find the team data by name
      console.log("Full JSON response:", json);
      const teamData = Object.values(json).find(
        (team: any) => team.Name.toLowerCase() === team.Name.toLowerCase()
      );
      console.log("Team Data check1", teamData);
      if (teamData) {
        setResponse(teamData as TeamData);
        console.log("Team Data check2", teamData);
      } else {
        console.error("Team data not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
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
      <input
        id="Team-input"
        value={team}
        type="text"
        onChange={(event) => setTeam(event.target.value)}
        placeholder="(Miami Dolphins)"
      />
      <button onClick={() => getTeamData()}>Get Team Info</button>

      {console.log("Team Data check3", response.Name)}

      {response && Object.keys(response).length > 0 ? (
        <div className="team-info">
          <h2>Team Information:</h2>
          <p>Name: {response.Name}</p>
          <p>Wins: {response.Wins}</p>
          <p>Losses: {response.Losses}</p>
          <p>Ties: {response.Ties}</p>
        </div>
      ) : (
        <p>No team data available.</p>
      )}

      <p className="info-text">
        Please enter four digit Year value followed by "REG" for regular season,
        "PRE" for preseason, and "POST" for post season.
      </p>
    </>
  );
};

export default Home;
