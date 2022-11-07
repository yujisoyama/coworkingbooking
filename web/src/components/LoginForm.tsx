import { BriefcaseMetal, EnvelopeSimple, Lock } from "phosphor-react"
import { FormEvent, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { Input } from "./Input"

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const LoginForm = () => {
    const { user, token, login, getProfile } = useUser();
    const [loginInvalid, setLoginInvalid] = useState<boolean>(false);
    const [loginActivate, setLoginActivate] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    let timer: number;

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        const loginData = new FormData(event.target as HTMLFormElement);
        const loginForm = Object.fromEntries(loginData);
        try {
            timer = setTimeout(async () => {
                const loginStatusCode: number = await login(loginForm);
                setIsSubmitting(false);
                if (loginStatusCode === 401) {
                    setLoginInvalid(true);
                }
                if (loginStatusCode === 405) {
                    setLoginActivate(true);
                }
                if (loginStatusCode === 200) {
                    navigate('/dashboard');
                }
                if (loginStatusCode === 500) {
                    toast.error('Something went wrong, try again later.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                }
                clearTimeout(timer);
            }, 1000);
        } catch (error) {
            setIsSubmitting(false);
            clearTimeout(timer);
            console.log(error);
        }
    }

    const handleForgotPass = (event: FormEvent) => {
        event.preventDefault();
        toast.error('Not implemented yet!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    return (
        <div className="w-[400px] p-8 opacity-95 rounded-[30px] bg-backgroundLight relative before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileHome:mt-10 mobileHome:mb-[90px] mobileHome:w-[350px]">
            <div className="">
                <BriefcaseMetal className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5">Log in</h1>
                <p className="font-open text-secondary text-center font-bold mt-3">Please login to use the platform</p>
            </div>
            <div>
                <form onSubmit={handleLogin} className="mt-5 flex flex-col gap-4 relative">
                    <div className="relative mx-auto">
                        <span><EnvelopeSimple className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="email" id="email" type='text' placeholder="Email" warning={'false'} />
                    </div>
                    <div className="relative mx-auto">
                        <span><Lock className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="password" id="password" type='password' placeholder="Password" warning={'false'} />
                    </div>
                    {loginInvalid && (<div className="text-center rounded-lg text-buttonText w-64 h-9 mx-auto bg-[#e7b3b3] border-attention border-2 font-open font-bold text-sm pt-[0.4rem]">
                        Email or Password is invalid.
                    </div>)}
                    {loginActivate && (<div className="text-center rounded-lg text-buttonText w-64 h-12 mx-auto bg-[#e7b3b3] border-attention border-2 font-open font-bold text-sm pt-[0.2rem]">
                        Account needs to be activated. Check your email.
                    </div>)}
                    <div className="w-40 ml-[11.5rem] mobileHome:ml-[10rem]">
                        <a onClick={handleForgotPass} className="font-open font-semibold text-sm hover:underline text-main" href="#">Forgot password?</a>
                    </div>
                    <button disabled={isSubmitting} className={`w-36 mx-auto h-12 rounded-full font-extrabold from-buttonText ${isSubmitting ? 'bg-disabled scale-105' : 'bg-highlight hover:bg-[#FFB340] hover:scale-105 duration-300'}`} type="submit">
                        {isSubmitting ? <ThreeDots
                            height="20"
                            width="40"
                            radius="2"
                            color="#001e1d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{ justifyContent: "center" }}
                            visible={true}
                        /> : 'Log in'}
                    </button>
                </form>
                <div className="mt-5 text-sm text-secondary font-semibold ml-9 font-open mobileHome:ml-3">
                    <p className="inline">New to the platform?</p> <Link to="/signup" className="text-main hover:underline">Sign Up for free!</Link>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}
