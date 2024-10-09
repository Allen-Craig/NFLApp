import { useState } from "react";

interface TeamData {
  SeasonType: number;
  Season: number;
  Conference: string;
  Division: string;
  Team: string;
  Name: string;
  Wins: number;
  Losses: number;
  Ties: number;
  NetPoints: number;
  Touchdowns: number;
  DivisionWins: number;
  TeamID: number;
}

const Home = () => {
  const [season, setSeason] = useState("2024REG");
  const [team, setTeam] = useState<string>("");
  const [response, setResponse] = useState<TeamData>({} as TeamData);
  const [isLoading, setIsLoading] = useState(false);
  const key = "?key=1a241c5c61df493a988bd27f9d1048ec";
  const url =
    "https://api.sportsdata.io/v3/nfl/scores/json/Standings/2024REG" + key;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getTeamData = async (teamName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();

      console.log("Full JSON response:", json);

      const teamData = Object.values(json).find(
        (team: any) => team.Name.toLowerCase() === teamName.toLowerCase()
      );
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
      <h1>NFL Teams App</h1>
      <label htmlFor="Season-input">Input Season</label>
      <input
        id="Season-input"
        value={season}
        type="text"
        onChange={(event) => setSeason(event.target.value)}
        placeholder="(YYYYREG/PRE/POST)"
      />
      <select
        id="Team-input"
        value={team}
        onChange={(event) => setTeam(event.target.value)}
      >
        <option value="">Select a team</option>
        <option value="Buffalo Bills">Buffalo Bills</option>
        <option value="Miami Dolphins">Miami Dolphins</option>
        <option value="New York Jets">New York Jets</option>
        <option value="New England Patriots">New England Patriots</option>
        <option value="Pittsburgh Steelers">Pittsburgh Steelers</option>
        <option value="Baltimore Ravens">Baltimore Ravens</option>
        <option value="Cincinnati Bengals">Cincinnati Bengals</option>
        <option value="Cleveland Browns">Cleveland Browns</option>
        <option value="Arizona Cardinals">Arizona Cardinals</option>
        <option value="Los Angeles Chargers">Los Angeles Chargers</option>
      </select>

      <button onClick={() => getTeamData(team)}>Get Team Info</button>

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
        Select your team and season to view statistics.
      </p>
    </>
  );
};

export default Home;
