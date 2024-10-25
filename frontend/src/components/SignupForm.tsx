import React from 'react';
import { Layout, Button, Form, Input, Typography } from 'antd';
import { signup } from '../api/authApi'; // Assuming you have a signup function
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/UserSlice';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import { Formik } from 'formik';
import * as Yup from 'yup';

const { Content } = Layout;
const { Title } = Typography;

const SignupForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Please input your email!'),
        password: Yup.string().required('Please input your password!'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password!'),
    });

    const handleSignup = async (values: { email: string; password: string }) => {
        try {
            const response = await signup(values);
            dispatch(setUser(response.token));
            navigate('/dashboard');
            toast.success('Signup successful!');
        } catch (error) {
            console.error('Signup failed:', error);
            const errorMessage = (error as any).response?.data?.message || 'An unknown error occurred';
            toast.error(errorMessage);
        }
    };

    return (
        <Layout className="min-h-screen">
            <Content className="flex justify-center items-center p-4">
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignup}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <Form
                            onFinish={handleSubmit}
                            layout="vertical"
                            className="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
                        >
                            <Title level={3} className="text-center mb-4">TaskHive Signup</Title>
                            
                            <Form.Item label="Email" validateStatus={touched.email && errors.email ? 'error' : ''} help={touched.email && errors.email ? errors.email : ''}>
                                <Input name="email" placeholder="Enter your email" onChange={handleChange} value={values.email} />
                            </Form.Item>
                            <Form.Item label="Password" validateStatus={touched.password && errors.password ? 'error' : ''} help={touched.password && errors.password ? errors.password : ''}>
                                <Input.Password name="password" placeholder="Enter your password" onChange={handleChange} value={values.password} />
                            </Form.Item>
                            <Form.Item label="Confirm Password" validateStatus={touched.confirmPassword && errors.confirmPassword ? 'error' : ''} help={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}>
                                <Input.Password name="confirmPassword" placeholder="Confirm your password" onChange={handleChange} value={values.confirmPassword} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full">
                                    Signup
                                </Button>
                            </Form.Item>
                            <div className="text-center">
                                <span>Already have an account? </span><Link to="/">Login</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Content>
        </Layout>
    );
};

export default SignupForm;
