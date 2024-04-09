import { useState } from 'react';
import axios from 'axios';
import SearchForm from '../components/searchForm';
import GroupList from '../components/groupList';
// import Map from '../components/map';

const Dashboard = () => {
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
    <>
      {/* Dashboard content */}
      <h1>Facebook Group Search Tool</h1>
      <SearchForm onSearch={searchGroups} />
      <GroupList groups={groups} />
      {/* <Map groups={groups} /> */}
    </>
  );
}

export default Dashboard;

