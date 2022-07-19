import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import { Container } from '@chakra-ui/react';
import HourlyStat from './pages/HourlyStat';


const App:React.FC = () => {
  return (
    <Container maxW='container.2xl'>
      <Container as="main" pt="20" maxW='container.2xl'>
        <Routes>
          <Route path="/"  element={ <HourlyStat/> } />
          <Route path="/table"  element={ <Home/> } />
        </Routes>
      </Container>
     </Container>
  );
}

export default App;
