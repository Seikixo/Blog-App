import { useQuery } from "@tanstack/react-query"
import { getAllPost } from "../services/postService"


export const usePost = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey:['all-post'],
        queryFn: getAllPost
    })

    return{
        data,
        isLoading,
        isError
    }
}