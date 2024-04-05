import { useState } from 'react';
import axios from 'axios';
import SearchForm from '../components/searchForm';
import GroupList from '../components/groupList';
import Map from './Map';

function Home() {
  const [groups, setGroups] = useState([]);

  const searchGroups = async (town, radius) => {
    try {
      const response = await axios.post('/search', { town, radius });
      setGroups(response.data.groups);
    } catch (error) {
      console.error('Error searching for groups:', error);
    }
  };

  return (
    <div>
      <h1>Facebook Group Search Tool</h1>
      <SearchForm onSearch={searchGroups} />
      <GroupList groups={groups} />
      <Map groups={groups} />
    </div>
  );
}

export default Home;
