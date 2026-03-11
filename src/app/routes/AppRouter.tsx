import { Route, Routes, useLocation } from 'react-router-dom';
import List from '../pages/List';
import { LINKS } from '../constants';
import Create from '../pages/Create';
import Dashboard from '../pages/Dashboard';
export default function AppRouter() {
    const location = useLocation()
    return (
        <Routes location={location} key={location.pathname}>
            <Route path={LINKS.LIST} element={<List />} ></Route>
            <Route path={LINKS.CREATE} element={<Create />} ></Route>
            <Route path={LINKS.DASHBOARD} element={<Dashboard />} ></Route>
        </Routes>
    )
}
