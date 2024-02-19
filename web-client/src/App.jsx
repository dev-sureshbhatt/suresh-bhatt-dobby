
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout';
import IndexPage from './pages/IndexPage'
import Images from './pages/Images';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
<Routes>
  <Route path='/' element={<Layout />}>
    <Route index element={<IndexPage />} />
    <Route path='/images' element={<Images />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    
  </Route>
</Routes>
    
  );
}

export default App;
