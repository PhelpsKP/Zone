import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Main from './components/Main';
import VideoGallery from './components/VideoGallery';
import Footer from './components/Footer';
import './reset.css';
import './zone.css';
import Ranker from './components/Ranker';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Header />
        <Banner />
        <Nav />
        <Main />
        <Ranker />
        <Footer />
      </div>
    </DndProvider>
  );
}

export default App;