import { Dispatch } from 'redux';
import { authSlice } from './authReducers';
import { call } from '../../Network/services';
import { handleApiError } from '../../Config/ErrorHandleUtils';

export const userLoginAction = (queryParam: any): any => async (appDispatch: Dispatch) => {
  call.userLoginApi(queryParam).then((responseAxios: any) => {
    let data = {
      ...queryParam,
      userLoggedIn: true,
      token: responseAxios.token,
    };
    appDispatch(authSlice.actions.userLoginAction(data));
  }).catch((error: any) => {
    handleApiError(error, appDispatch);
  });
};
