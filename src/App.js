import './App.css';
import Homepage from './component/homepage';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Details from './component/product/product.details/details';

function App() {
  return (
    <>
     <BrowserRouter>
       <Routes>
        

       <Route path='/' element ={<Homepage/>}/>
       <Route path='/data/:id'element={<Details/>}/>
     
       </Routes>
              
     </BrowserRouter>
    
    
    </>
  );
}

export default App;
