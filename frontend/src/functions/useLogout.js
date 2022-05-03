import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {logout, resetAuth} from '../features/auth/authSlice';
import {resetRecords} from '../features/records/recordsSlice';
import {resetMUIComponents} from '../features/muiComponents/muiComponentsSlice';

function useLogout () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuth());
    navigate('/');
    dispatch(resetRecords());
    dispatch(resetMUIComponents());
  };
  return handleLogout;

};

export default useLogout;

