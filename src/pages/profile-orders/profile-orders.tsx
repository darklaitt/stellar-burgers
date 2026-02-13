import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { data } = useSelector((state) => state.orders);
  const orders = data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  });

  return <ProfileOrdersUI orders={orders} />;
};
