import { useEffect, useState } from "react";
import { TeamData } from "./data-types";
import { Combobox } from "./components/ui/Combobox";

export const Home = () => {
  const [season, setSeason] = useState("2024REG");
  const [team, setTeam] = useState<string>("");
  const [response, setResponse] = useState<TeamData>({} as TeamData);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const key = "?key=1a241c5c61df493a988bd27f9d1048ec";
  const url =
    "https://api.sportsdata.io/v3/nfl/scores/json/Standings/2024REG" + key;

  const getTeamData = async (teamName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();

      setTeams(json);

      const teamData = Object.values(json).find(
        (team: any) => team.Name.toLowerCase() === teamName.toLowerCase()
      );
      if (teamData) {
        setResponse(teamData as TeamData);
      } else {
        console.error("Team data not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setTeams(json);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

      <Combobox>
        {teams.map((team) => (
          <Combobox
            placeholder="Select a team"
            onChange={(event) => setTeam(event.value)}
            key={team.Name}
            value={team.Name}
          >
            {team.Name}
          </Combobox>
        ))}
      </Combobox>

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
