

import SearchAndChart from "./components/SearchAndChart";
import stateDictionary from "./data/States";
import "./App.css";


const App = () => {

	return (
		<SearchAndChart suggestions={ stateDictionary } />
	);

}


export default App;
