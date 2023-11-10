// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useBoundStore from "../../store/Store";
// import {
//   TextInput,
//   Text,
//   PasswordInput,
//   Paper,
//   Title,
//   Container,
//   Button,
// } from '@mantine/core';
// import classes from './AuthenticationTitle.module.css';


// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { loginService, authLoading, user } = useBoundStore((state) => state);

//   useEffect(() => {
//     if (!!user) {
//       navigate("/posts");
//     }
//   }, [user]);

//   const onLogin = async (e) => {
//     e.preventDefault();
//     let email = e.target.email?.value;
//     let password = e.target.password?.value;
//     if (!email || !password) return;
//     loginService(email, password);
//   };
//   return (
//     <Container size={420} my={40} style={{ display: "flex", justifyContent: "center" }}>
//       <form onSubmit={onLogin}>
//       <Paper radius="md" p="xl" withBorder 
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gridGap: "20px",
//             background: "#d3d3d3",
//             padding: "50px",
//           }}
//         >
//           <Text size="lg" fw={500}>Welcome</Text>
//           <TextInput 
//             placeholder="email"
//             name="email"
//             type="email"
//             required
//             style={{ minWidth: "320px", height: "26px" }}
//           />
//           <PasswordInput
//             placeholder="password"
//             name="password"
//             type="password"
//             required
//             style={{ minWidth: "320px", height: "26px" }}
//           />
//           <Button type="submit">login</Button>
//           {authLoading ? <h2>Loading...</h2> : null}
//         </Paper>
//       </form>
//       </Container>
//   );
// };

// export default LoginPage;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';




const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
  <Container size={420} my={40}>
    
    <Title ta="center" className={classes.title}>Welcome back!</Title>
      <form onSubmit={onLogin}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gridGap: "50px",
            padding: "50px",
          }}
        >
          
          <TextInput 
            label = "Email"
            placeholder="email"
            name="email"
            type="email"
            required
            style={{ minWidth: "320px", height: "26px" , color:"black"}}
          />
          <PasswordInput
            label = "password"
            placeholder="password"
            name="password"
            type="password"
            required
            style={{ minWidth: "320px", height: "26px" }}
          />
          <Button fullWidth mt="xl" type="submit">login</Button>
          {authLoading ? <h2>Loading...</h2> : null}
          </Paper>
      </form>
    
      </Container>
  );
};

export default LoginPage;
