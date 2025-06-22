import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl, getDefaultHeader } from '../../constants/AppConstants';
import { loginUrl } from '../../constants/ServiceUrl';
import { LoginRes } from '../../models/responseType/LoginRes';

const fetchUser = async ({ postData }: { postData: any }) => {
    return await axios.post<LoginRes>(`${getBaseUrl()}${loginUrl}`, { ...postData }, {
        headers: getDefaultHeader(),
    });
};

const useUserLogin = () => {
    return useMutation({
        mutationFn: fetchUser,
        mutationKey: [loginUrl],
    });
};

export { useUserLogin };
