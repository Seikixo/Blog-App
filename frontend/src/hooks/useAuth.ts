import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { login as loginApi, register as registerApi } from "../services/authService";
import { getUserProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";
import type { Credentials, RegisterUserPayload } from "../types/types";
import { useEffect, useState } from "react";


export const useAuth = () => {
    const queryClient = useQueryClient();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);
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
            setToken(data.token);
            queryClient.setQueryData(['auth-user'], data.user);
            navigate('/home');
        }
    })

    const registerMutation = useMutation({
        mutationFn: (registerUserPayload: RegisterUserPayload) =>
            registerApi(registerUserPayload),
        onSuccess: () => {
            navigate('/login')
        }
    })

    const logout = () => {
        localStorage.removeItem('token'); 
        setToken(null);
        queryClient.removeQueries({ queryKey: ['auth-user'] });
        navigate('/login');
    };

    const login = async(credentials: Credentials) => {
        return loginMutation.mutateAsync(credentials);
    }

    const register = async(registerUserPayload: RegisterUserPayload) => {
        return registerMutation.mutateAsync(registerUserPayload);
    }

    return {
        user,
        login,
        logout,
        register,
        isLoading: isLoading || loginMutation.isPending
    }
}