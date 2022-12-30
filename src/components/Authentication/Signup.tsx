import {Box, FormControl, Stack, Input, Button, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../fireBaseApp';

const Signup = () => {
    const [email, emailSet] = useState<string>('');
    const [password, passwordSet] = useState<string>('');
    const [confirmPswd, confirmPswdSet] = useState<string>('');
     const toast = useToast();
     const navigate = useNavigate()

    const handleSubmit =async() => {
        if(password !== confirmPswd){
            toast({
                title: 'password do not match.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
              return
        } 

        try{
            const result: UserCredential =await createUserWithEmailAndPassword(auth, email, password);
            console.log(result)
            toast({
                title: `signup successful. welcome ${result.user.email}`,
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
        confirmPswdSet('')       
    };     
   
  return (
    <Box>

        <FormControl >
           <Stack spacing={3}>
           <Input type={'email'} id='email' 
            size={'lg'}
            value={email}
            onChange={(e) => emailSet(e.target.value)}
            placeholder={'Enter email'} 
            />

            <Input type={'password'} id='passord'
            size={'lg'}
            value={password}
            onChange={(e) => passwordSet(e.target.value)}
            placeholder={'Enter password'} 
            />

            <Input type={'password'} id='confirmpwsd'
            size={'lg'}
            value={confirmPswd}
            onChange={(e) => confirmPswdSet(e.target.value)}
            placeholder={'confrim password'} 
            />
            <Button size={'lg'}
            type={'submit'}
            onClick={handleSubmit}
            color='black' 
            colorScheme='yellow'>
                Sign up
            </Button>
           </Stack>
        </FormControl>
   </Box>
  )
}

export default Signup
