import './App.css';
import Particle from './components/particles';
import Home from './pages/Home';
import Apod from './pages/Apod';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import StateDataContext from './context/StateDataContext';
function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#e8e8e8',
      },
    },
  });

  return (
    <StateDataContext>
    <ThemeProvider theme={theme}>
    <Particle />
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/apod" element={<Apod />}></Route>
    </ Routes>
    </ BrowserRouter>
    </ThemeProvider>
    </StateDataContext>
  );
}

export default App;
