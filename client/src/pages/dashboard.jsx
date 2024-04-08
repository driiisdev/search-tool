import { useState } from 'react';
import axios from 'axios';
import SearchForm from '../components/searchForm';
import GroupList from '../components/groupList';
// import Map from '../components/map';

import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const message = location.state?.message; // Access success message from state
  const [groups, setGroups] = useState([]);

  const searchGroups = async (town, radius) => {
    try {
      const response = await axios.post('/search', { town, radius });
      setGroups(response.data.groups);
    } catch (error) {
      console.error('Error searching for groups:', error);
    }
  }
  return (
    <div>
      {message && <p className="success">{message}</p>}
      {/* Dashboard content */}
      <h1>Facebook Group Search Tool</h1>
      <SearchForm onSearch={searchGroups} />
      <GroupList groups={groups} />
      {/* <Map groups={groups} /> */}
    </div>
  );
}

export default Dashboard;

