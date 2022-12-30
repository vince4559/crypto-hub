import { Box, Button, FormControl, Input, Stack, useToast } from '@chakra-ui/react'
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../fireBaseApp';

const Login = () => {
    const [email, emailSet] = useState<string>('');
    const [password, passwordSet] = useState<string>('');
    const toast = useToast();
    const navigate = useNavigate()
    
    const handleSubmit =async(e:React.FormEvent) => {
       
        try{
            const result:UserCredential =await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: `login successful ${result.user.email}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              navigate(-1)
        }catch(error:any) {
            toast({
                title: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        } 
        emailSet('')
        passwordSet('')
    };

  return (
   <Box>
        <FormControl isRequired>
           <Stack spacing={3}>
           <Input type={'email'} id='log-email'
           size={'lg'}
            value={email}
            onChange={(e) => emailSet(e.target.value)}
            placeholder={'Enter email'} 
            />

            <Input type={'password'} id='log-passord' 
            size={'lg'}
            value={password}
            onChange={(e) => passwordSet(e.target.value)}
            placeholder={'Enter password'} 
            />

            <Button size={'lg'}
            color='black' 
            colorScheme='yellow'
            type='submit'
            onClick={handleSubmit}
            >
                Login
            </Button>
           </Stack>
        </FormControl>
   </Box>
  )
}

export default Login
