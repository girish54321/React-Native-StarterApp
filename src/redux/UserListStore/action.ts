import { Dispatch } from 'redux';
import { userListSlice } from './userListReducer';
import { appSlice } from '../appStore/AppReducers';
import { call } from '../../Network/services';
import { handleApiError } from '../../Config/ErrorHandleUtils';


export const getServiceResponse = (queryParam: any): any => async (appDispatch: Dispatch) => {
  appDispatch(appSlice.actions.showLoaderAction())
  call.getService(queryParam).then((responseAxios: any) => {
    appDispatch(userListSlice.actions.setUserDataAction(responseAxios.data))
    appDispatch(appSlice.actions.hideLoaderAction())
  }).catch((error: any) => {
    appDispatch(appSlice.actions.hideLoaderAction())
    handleApiError(error, appDispatch);
  });
};
