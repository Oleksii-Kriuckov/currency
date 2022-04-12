import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Header />
        <Main />
      </div>
    </RecoilRoot>
  );
}

export default App;
