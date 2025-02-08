import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import { getBaseUrl } from "../../constants/AppConstants";
import { loginUrl } from "../../constants/ServiceUrl";
import { LoginRes } from "../../models/responseType/LoginRes";

const fetchUser = async ({ postData }: { postData: any }) => {
    return await axios.post<LoginRes>(`${getBaseUrl()}${loginUrl}`, { ...postData });
};

const useUserLogin = () => {
    return useMutation({
        mutationFn: fetchUser,
        mutationKey: [loginUrl]
    })
}

export { useUserLogin }