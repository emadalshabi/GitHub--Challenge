import React, { useState, useEffect } from 'react';

function GithubUserInfo() {
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/emadalshabi?client_id=a34c2a55a2f06482ef25&client_secret=ac3e4bc87ea20fc376ef7e1749770ed3b432bf0f');
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/emadalshabi/repos?client_id=a34c2a55a2f06482ef25&client_secret=ac3e4bc87ea20fc376ef7e1749770ed3b432bf0f&sort=created');
        const reposData = await reposResponse.json();
        setRepositories(reposData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {userData && (
        <div>
          <h2>User Information</h2>
          <p>Username: {userData.login}</p>
          <p>Name: {userData.name}</p>
          <p>Location: {userData.location}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repositories: {userData.public_repos}</p>
        </div>
      )}
      <h2>Repositories</h2>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GithubUserInfo;
