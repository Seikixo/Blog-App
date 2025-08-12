import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { HiInformationCircle, HiLockClosed, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Login() {

    const [error, setError] = useState('')
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const {login, isLoading} = useAuth();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(credentials);
        }
        catch(error: any) {
            setError(error?.response?.data?.message || 'Login failed');
        }
    }

    return(
        <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <h2 className="text-2xl font-semibold text-center">Login</h2>
            {error && (<Alert className='flex w-full' color="failure" icon={HiInformationCircle}>{error}</Alert>)}

            <div>
            <Label htmlFor="email">Email</Label>
            <TextInput id="email" icon={HiMail} type="email" value={credentials.email} onChange={(e) => setCredentials({...credentials, email:e.target.value})} required />
            </div>
            <div>
            <Label htmlFor="password">Password</Label>
            <TextInput id="password" icon={HiLockClosed} type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
            </div>
            <Button type="submit" className="w-full cursor-pointer mt-14">{isLoading ? <Spinner/> : "Login"}</Button>
            <Link to={"/register"}>Register</Link>
        </form>
        </div>        
    )
}