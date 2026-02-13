import { Preloader } from '@ui';
import { ReactElement, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

export type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const { user, isInit, isLoading } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isInit || isLoading) {
    return <Preloader />;
  }

  if (user && onlyUnAuth) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
