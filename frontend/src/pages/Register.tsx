
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Alert, Button, Label, TextInput, Toast } from "flowbite-react";
import { HiCheck, HiInformationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Register() {
    const [error, setError] = useState('')
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
    })
    const {register} = useAuth();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await register(credentials);
            setShowSuccessToast(true)
        }
        catch(error: any) {
            setError(error?.response?.data?.message || 'Register failed');
        }
    }

    return(
        <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <h2 className="text-2xl font-semibold text-center">Register</h2>
            {error && (<Alert className='flex w-full' color="failure" icon={HiInformationCircle}>{error}</Alert>)}

            <div>
            <Label htmlFor="name">Name</Label>
            <TextInput id="name" type="text" value={credentials.name} onChange={(e) => setCredentials({...credentials, name:e.target.value})} required />
            </div>
            <div>
            <Label htmlFor="email">Email</Label>
            <TextInput id="email" type="email" value={credentials.email} onChange={(e) => setCredentials({...credentials, email:e.target.value})} required />
            </div>
            <div>
            <Label htmlFor="password">Password</Label>
            <TextInput id="password" type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
            </div>
            <Link className="text-blue-500" to={"/login"}>Already have an account?</Link>
            <Button type="submit" className="w-full cursor-pointer mt-10">Register</Button>
        </form>
        {showSuccessToast && (
            <Toast>
            <HiCheck className="h-5 w-5 text-green-500" />
            <div className="ml-3 text-sm font-normal">User registration successfully.</div>
            </Toast>
        )}
        </div>        
    )
}