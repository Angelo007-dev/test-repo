import { Route, Routes, useLocation } from 'react-router-dom';
import List from '../pages/List';
import { LINKS } from '../constants/menu';
import Create from '../pages/Create';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../components/MainLayouts';
export default function AppRouter() {
    const location = useLocation()
    return (

        <Routes location={location} key={location.pathname}>
            <Route element={<MainLayout />}>
                <Route path={LINKS.LIST} element={<List />} ></Route>
                <Route path={LINKS.CREATE} element={<Create />} ></Route>
                <Route path={LINKS.DASHBOARD} element={<Dashboard />} ></Route>
            </Route>
        </Routes>
    )
}
