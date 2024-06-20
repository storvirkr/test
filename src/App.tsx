import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import styles from "./App.module.css"

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className={styles.body}>
                <nav className={styles.nav}>
                    <div className={styles.link}>
                        <NavLink to="/" className={({isActive, isPending}) =>
                            isActive
                                ? "active"
                                : isPending
                                    ? "pending"
                                    : ""
                        }>Каталог</NavLink>
                    </div>
                    <div className={styles.link}>
                        <NavLink to="/favorites" className={({isActive, isPending}) =>
                            isActive
                                ? "active"
                                : isPending
                                    ? "pending"
                                    : ""
                        }>Избранное</NavLink>
                    </div>
                </nav>
                <Outlet/>
            </div>
        </Provider>
    );
};

export default App;


