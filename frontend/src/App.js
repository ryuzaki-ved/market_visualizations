import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/Navbar';
import MinuteData from './pages/MinuteData';
import TickData from './pages/TickData';
import './styles/animations.css';
import './styles/styles.css';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark', !isDarkMode);
        document.body.classList.toggle('light', isDarkMode);
    };

    return (
        <Router>
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Route render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={300}>
                        <Switch location={location}>
                            <Route path="/minute-data" component={MinuteData} />
                            <Route path="/tick-data" component={TickData} />
                            <Route path="/" exact>
                                <h1>Welcome to the Data Visualization Dashboard</h1>
                            </Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />
        </Router>
    );
};

export default App;
