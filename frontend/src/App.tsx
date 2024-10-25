import {Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const App: React.FC = () => {
    const isLoggedIn = useSelector((state: any) => !!state.user.userInfoTh);

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignupForm />} />
            <Route path="/dashboard" element={isLoggedIn ? <TaskList /> : <Navigate to="/" />} />
        </Routes>
    );
};

export default App;
