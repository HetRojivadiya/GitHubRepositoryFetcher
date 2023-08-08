import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      const updatedRepos = await Promise.all(
        data.map(async (repo) => {
          const imageUrl = await getRandomImageURL();
          return { ...repo, imageUrl };
        })
      );
      setRepos(updatedRepos);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const getRandomImageURL = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=J4N_SWFSDsx3NUG5NT0i910kVITqw_Gr0FJjn6lCqzU&query=landscape&fit=fill&w=300&h=200`
      );
      const data = await response.json();
      return data.urls.small;
    } catch (error) {
      console.error("Error fetching image:", error);
      return ""; // Return an empty string as the fallback image URL
    }
  };

  return (
    <div className="container">
      <div className="App">
        <h1>GitHub Repository Fetcher</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={fetchRepos}>Fetch Repositories</button>
        </div>
        <div className="repo-list">
          <h2>Repositories</h2>
          <ul>
            {repos.map((repo) => (
              <div key={repo.id} className="card">
                <img
                  src={repo.imageUrl}
                  className="card-img card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title py-2 text-center">{repo.name}</h5>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Go somewhere
                  </a>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
