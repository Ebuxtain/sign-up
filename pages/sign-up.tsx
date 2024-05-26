import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { z, ZodError } from "zod";
import lightBrownInJacket from "../src/assets/Light-brown-in-Jacket10.svg";
import WhatsAppImage from "../src/assets/WhatsApp Image 2024-02-22 at 08.00 1.svg";
import styled from "styled-components";
import Shape from "../src/assets/Shape.svg";
import info from "../src/assets/info.png";
import chevon from "../src/assets/chevron-left.svg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
// import icon from "../src/assets/icon-user.svg";
import axios from 'axios';

const signupSchema = z.object({
    fullname: z
        .string()
        .min(3, "Name is too short")
        .max(100, "Name is too long")
        .nonempty("Name is required"),
    email: z
        .string()
        .nonempty("Email is required"),
    // .refine(email => email.endsWith('@example.com'), {
    //     message: "Email must be from yahoo or gmail domain"
    // })
    password: z
        .string()
        .min(6, "Password is too short")
        .max(100, "Password is too long")
        .nonempty("Password is required"),
});

export type SignupData = {
    fullname: string;
    email: string;
    password: string;
};
const initialFormData: SignupData = {
    fullname: '',
    email: '',
    password: '',
};

const Signup = () => {
    const [formData, setFormData] = useState<SignupData>(initialFormData);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(true);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            signupSchema.parse(formData)

            const response = axios.post('/users/sign-up', formData).then((res: { status: number; }) => {
                if (res.status == 201) {
                    setLoading(!loading)

                    console.log("User Created Successfuly")
                }
            }).catch((err: { response: { data: { error: any; }; }; }) => {
                setLoading(false);

                console.log(err.response.data.error)
            })
            console.log(response)
        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error instanceof ZodError) {

                // Handle Zod validation errors

                const errors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    const field = err.path.join(".");
                    errors[field] = err.message;
                });
                setFormErrors(errors);
            }
        }
    }

    return (
        <Background>
            <Container>
                <div>
                    <Div>
                        <A>
                            <img src={WhatsAppImage} alt="WhatsApp Image" />
                        </A>
                        <GradientDiv>
                            <Image>
                                <img src={lightBrownInJacket} alt="Light Brown in Jacket" />
                            </Image>
                            <Text>
                                Partnership for <br />
                                Business Growth
                            </Text>
                            <Test>
                                Partnerships are pivotal for business growth, enabling companies
                                to leverage mutual strengths, share risks, and capitalize on
                                opportunities.
                            </Test>
                        </GradientDiv>
                    </Div>
                </div>
            </Container>
            <C>
                <Home><a href="#"><img src={chevon} alt="chevron.svg" />Return  Home</a></Home>
                <K>
                    Already a Member? <Span><a href="#">LOG IN NOW</a></Span>
                </K>
            </C>
            <Heading>
                <B> BECOME AN EXCLUSIVE MEMBERS</B>
                <Small>SIGN UP AND JOIN THE PARTNERSHIP</Small>
            </Heading>
            <Formdiv onSubmit={handleSubmit}>
                <div>
                    <Input
                        type="text"
                        placeholder="Johnson Doe"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        required
                    />
                    {formErrors.fullname && <ErrorMessage>{formErrors.fullname}</ErrorMessage>}
                </div>
                <br />
                <div>
                    <Input
                        type="email"
                        placeholder="example@gmail.com"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
                </div>
                <br />
                <div style={{ position: "relative" }}>
                    <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="***********"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <span
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                        }}
                        onClick={togglePasswordVisibility}>
                        {passwordVisible ? <BsEye /> : <BsEyeSlash />}
                    </span>
                    {formErrors.password && <ErrorMessage>{formErrors.password}</ErrorMessage>}
                </div>
                <br />

                <Button type="submit">
                    {!loading} <Img src={Shape} alt="arrow.png" />
                    <ButtonText>Become a Member</ButtonText>
                </Button>
            </Formdiv>
            <M>
                <Copyright> Copyright 2021 - 2022 5Starcompany. All rights Reserved</Copyright>
                <P><a href="#"><img src={info} alt="" />Need help?</a></P>
            </M>
        </Background>
    );
};

export default Signup;

const Background = styled.div`
  background: rgba(249, 249, 250, 1);
  display: flex;
  margin: 0;   
  padding: 0;
`;

const Container = styled.div`
  display: flex;
  height: 100vh; 
`;

const Div = styled.div`
  position: relative;
  width: 470px;
  height: 100%;
  gap: 0px;
`;

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #59599b 0%, #24243e 59.38%, #0f0c29 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.div`
  width: 1259.78px;
  height: 708.63px;
  left: -395px;
  gap: 0px;
  opacity: 0px;
  margin-top: -180px;
`;

const A = styled.div`
  position: absolute;
  top: 100px; 
  left: 50%; 
  transform: translateX(-50%);
  z-index: 1; 
  img {
    width: 146px;
    height: 82px;
    top: 99px;
    left: 163px;
  }
`;

const Text = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 120%;
  transform: translate(-50%, -50%);
  font-size: 39.06px;
  font-weight: 700;
  line-height: 46.87px;
  color: #fff;
  text-align: center;
  z-index: 1;
  font-family: Zen Kaku Gothic Antique;
  text-align: center;
  margin-top: -42px;
`;

const Test = styled.div`
  position: absolute;
  font-family: Zen Kaku Gothic Antique;
  font-size: 16px;
  font-weight: 400;
  line-height: 28.16px;
  text-align: center;
  width: 380px;
  height: 61px;
  gap: 0px;
  opacity: 0px;
  color: rgba(189, 189, 189, 1);
  top: 80%;
  margin-top: -10px;
`;

const Heading = styled.div`
  text-align: center;
  font-family: Zen Kaku Gothic Antique, sans-serif;
  font-size: 25px;
  font-weight: bold;
  line-height: 44px;
  color: rgba(33, 33, 33, 1);
  margin-top: 150px;
`;

const Small = styled.div`
  font-family: Zen Kaku Gothic Antique;
  font-size: 16px;
  font-weight: 400;
  line-height: 28.16px;
  text-align: center;
  color: rgba(66, 66, 66, 1);
  margin-top: 15px;
`;

const Formdiv = styled.form`
margin: 280px 5px;
margin-left: -420px;
margin-bottom: 50px;
`;


const ButtonText = styled.text`
  font-family: Zen Kaku Gothic Antique;
  font-size: 16px;
  font-weight: 400;
  line-height: 28.16px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  height: 29px;
  top: 292px;
  margin-left: -150px;
`;

const Input = styled.input`
  width: 420px;
  height: 72px;
  gap: 18%;
  border: 1px solid rgba(117, 117, 117, 1);
  font-family: Zen Kaku Gothic Antique;
  font-size: 16px;
  font-weight: 400;
  line-height: 28.16px;
  text-align: left;
  color: rgba(66, 66, 66, 1);
  &::placeholder {
    padding: 30px;
    align-items: center;
  }
  
 
`;

const M = styled.div`
  margin-top: 720px;
  margin-left: -680px;
  display: flex;
`;


const B = styled.b`
  font-family: Zen Kaku Gothic Antique;
  font-size: 25px;
  font-weight: 900;
  line-height: 44px;
  text-align: center;
  color: rgba(33, 33, 33, 1);
  width: 401px;
  height: 44px;
  margin-left: 40px;
`;

const C = styled.div`
gap: 0px;
display: flex;
 white-space: nowrap;

`;

const Span = styled.span`
  font-family: 'Zen Kaku Gothic Antique', sans-serif;
  font-size: 12.8px;
  font-weight: 700;
  text-align: center;
  color: #060606;
  white-space: nowrap

  a {
    text-decoration: none;
    color: inherit;
    white-space: nowrap
  }
`;
const Home = styled.div`
  font-family: Zen Kaku Gothic Antique;
  font-size: 12.8px;
  font-weight: 400;
  line-height: 22.53px;
  text-align: center;
  margin-right: -17%;
  white-space: nowrap;

    a {
        text-decoration: none;
        color: inherit;
    }
    img{
        margin-bottom: -7px;
    }



`;

const P = styled.div`
  font-family: Zen Kaku Gothic Antique;
  font-size: 12.8px;
  font-weight: 400;
  line-height: 22.53px;
  letter-spacing: -0.5px;
  text-align: left;
  color: rgba(158, 158, 158, 1);
  margin-left: 550px;
  a {
        text-decoration: none;
        color: inherit;
    }
    img{
        margin-right: 6px;
    }

`;

const Copyright = styled.div`
font-family: Zen Kaku Gothic Antique;
font-size: 12.8px;
font-weight: 400;
line-height: 22.53px;
letter-spacing: -0.5px;
text-align: left;
color: rgba(158, 158, 158, 1);
`;


const K = styled.div`
  font-family: Zen Kaku Gothic Antique, sans-serif;
  font-size: 12.8px;
  font-weight: 400;
  margin-left: 250%;
  white-space: nowrap;
`;

const Button = styled.button`
    width: 420px;
    height: 72px;
    cursor: pointer;
    opacity: 0px;
    background: rgba(36, 36, 62, 1);
    border: none;
    img{
         margin-left: 120px;
      
    }
   
`;

const ErrorMessage = styled.span`
	color: red;
	font-size: 12px;
	margin-bottom: -1px;
    margin-top: -5px;
	display: block;
`;

const Img = styled.img`
 margin-right: -200px; 

`;
