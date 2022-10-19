import logo from './logo.svg';
import './App.css';
import Form from '../src/components/contact';
import {BrowserRouter, Routes, Route} from 'react-router-dom' ;
import CardView from './components/cardview';
import TableView from './components/TableView';
import Edit from './components/Edit';
  
function App() {

  return (
      
      <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Form/>}/>
            <Route path="/CardView" element={<CardView/>}/>
            <Route path="/TableView" element={<TableView/>}/>
            <Route path="/Edit" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
      </>
   

  );
}


export default App;
