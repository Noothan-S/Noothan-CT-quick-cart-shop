import { FC } from 'react';
import Logo from '../../constants/logo';
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Eye, Lock } from 'lucide-react';

const Login: FC = () => {
    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Logo />
                <div className="w-full !mt-5 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:tp-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <Input size="large" type='email' placeholder="Enter your email" prefix={<UserOutlined />} required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <Input size="large" type='password' placeholder="Enter your password" prefix={<Lock size={16} />} suffix={<Eye />} required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500">Remember me</label >
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                            </div>
                            <Button htmlType='submit' className='w-full' size='large' variant='solid' color='danger'>Sign in</Button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;