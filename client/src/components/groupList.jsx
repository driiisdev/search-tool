
function GroupList({ groups }) {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
