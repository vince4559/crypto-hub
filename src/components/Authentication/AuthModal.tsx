import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import GoogleButton from 'react-google-button'
import { auth } from '../../fireBaseApp'
import Login from './Login'
import Signup from './Signup'

export const  AuthModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const googleProvider = new GoogleAuthProvider()
    const signWithGoogle = () => {
      signInWithPopup(auth, googleProvider).then(res => {
        toast({
          title: `Login successfully ${res.user.email}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }).catch((error) => {
        toast({
          title: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return;
      })
    }
    return (
      <>
        <Button onClick={onOpen}>login</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
            <Tabs isFitted variant='enclosed'>
            <TabList>
                <Tab>Login</Tab>
                <Tab>Sign up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <Login />
                </TabPanel>
                <TabPanel>
                <Signup />
                </TabPanel>
            </TabPanels>
            </Tabs>
            <Box p={3} >
              <Text textAlign={'center'} m={2} p={2} color='black'>
                OR
              </Text>
              <GoogleButton 
              style={{width: 'full'}}
              onClick={signWithGoogle}
              />
            </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }