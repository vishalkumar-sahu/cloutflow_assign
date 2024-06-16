import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingConfirmation from './components/bookingConfirmation';
import { store } from './app/store';
import './App.css';
import { Provider } from 'react-redux';
import Home from './components/home';
import NotFound from './components/notFound';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingConfirmation />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
