import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { login as loginApi } from "../services/authService";
import { getUserProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";

interface Credentials {
    email: string; 
    password: string;
}

export const useAuth = () => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const {data: user, isLoading} = useQuery({
        queryKey:['auth-user'],
        queryFn: getUserProfile,
        enabled: !!token,
        retry: false,
        staleTime: 5 * 60 * 1000,        
    });

    const loginMutation = useMutation({
        mutationFn: (credentials: Credentials) => 
            loginApi(credentials),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            queryClient.setQueryData(['auth-user'], data.user);
            navigate('/home');
        }
    })

    const logout = () => {
        localStorage.removeItem('token'); 
        queryClient.removeQueries({ queryKey: ['auth-user'] });
        navigate('/login');
    };

    const login = async(credentials: Credentials) => {
        return loginMutation.mutateAsync(credentials);
    }

    return {
        user,
        login,
        logout,
        isLoading: isLoading || loginMutation.isPending
    }
}