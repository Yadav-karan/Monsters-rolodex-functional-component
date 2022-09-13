import './App.css';
import SearchBox from './Components/search-box/search-box.compenent';
import { useState,useEffect} from 'react';

import CardList from './Components/card-list/card-list.component';

function App() {

  const[searchField , setSerchField]=useState('');
  const[monsters,setMonsters] = useState([]);
  const[filteredMonsters,setFilteredMonsters]= useState(monsters);

  

  useEffect(()=>{
    const newfilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newfilteredMonsters);
  },[monsters,searchField]);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        setMonsters(users)
      );
  },[]);

  console.log(searchField);
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSerchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
          onChangeHandler={onSearchChange}
          placeholder={"search monsters"}
          className={"monsters-search-box"}
        />
        <CardList monsters={filteredMonsters}/>
    </div>
  );
}

export default App;
