import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import SecurityAuditPage from './SecurityAuditPage';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/security-audit">Example Security Audit</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/security-audit">
                        <SecurityAuditPage />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;