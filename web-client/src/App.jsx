import './App.css';
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout';
import IndexPage from './pages/IndexPage'
import Images from './pages/Images';


function App() {
  return (
<Routes>
  <Route path='/' element={<Layout />}>
    <Route index element={<IndexPage />} />
    <Route path='/images' element={<Images />} />
  </Route>
</Routes>
    
  );
}

export default App;
