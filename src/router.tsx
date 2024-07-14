import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Index from './pages/index';
import { useLayoutEffect } from 'react';
import Login from './pages/Login';
import Land from './pages/Land';

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/land" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/land" element={<Land />} />
      <Route
        path="/home"
        element={
          <ConfigProvider
            // 个性化antd组件样式
            theme={{
              token: {
                // colorPrimary: "#00b96b"
              },
            }}
          >
            <Index />
          </ConfigProvider>
        }
      />
    </Routes>
  );
}

const AuthRoute = ['/home'];
const RouterBeforeEach = ({ children }: any) => {
  const location = useLocation();
  const navigator = useNavigate();
  useLayoutEffect(() => {
    if (
      AuthRoute.includes(location.pathname) &&
      !localStorage.getItem('token')
    ) {
      navigator('/login');
      return;
    }
  }, [location.pathname]);
  return <RouterConfig />;
};

export { RouterBeforeEach };
