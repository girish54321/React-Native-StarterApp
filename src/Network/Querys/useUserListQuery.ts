import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { usersUrl } from '../../constants/ServiceUrl';
import { UserListResponse } from '../../models/responseType/UserListResponse';

const fetchUser = async ({ pageParam }: { pageParam: number }) => {
    return await axios.get<UserListResponse>(`${getBaseUrl()}${usersUrl}?page=${pageParam}`);
};

const useUserList = () => {
    return useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUser,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < lastPage.data.total_pages) {
                return allPages.length + 1;
            } else {
                return undefined;
            }
        },
    });
};

export { useUserList };
