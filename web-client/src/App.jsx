
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout';
import IndexPage from './pages/IndexPage'
import Images from './pages/Images';
import Login from './components/Login';
import Register from './components/Register';
import UploadImage from './components/UploadImage';


function App() {
  return (
<Routes>
  <Route path='/' element={<Layout />}>
    <Route index element={<IndexPage />} />
    {/* <Route path='/images' element={<Images />} /> */} // route no longer needed
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/upload' element={<UploadImage />} />
    
  </Route>
</Routes>
    
  );
}

export default App;
