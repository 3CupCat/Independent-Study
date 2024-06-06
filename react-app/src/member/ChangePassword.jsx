import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from '@chakra-ui/react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 處理更改密碼的邏輯
    console.log({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <Box
      maxWidth="600px"
      margin="50px auto"
      padding="20px"
      boxShadow="lg"
      backgroundColor="white"
      borderRadius="8px"
      color="black"
    >
      <Heading as="h2" size="lg" marginBottom="20px">
        更改密碼
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl marginBottom="20px">
          <FormLabel htmlFor="old-password" fontWeight="bold">
            舊密碼
          </FormLabel>
          <Input
            type="password"
            id="old-password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="20px">
          <FormLabel htmlFor="new-password" fontWeight="bold">
            新密碼
          </FormLabel>
          <Input
            type="password"
            id="new-password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="20px">
          <FormLabel htmlFor="confirm-password" fontWeight="bold">
            確認新密碼
          </FormLabel>
          <Input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          width="100%"
          padding="12px"
          backgroundColor="#007bff"
          color="white"
          borderRadius="4px"
          cursor="pointer"
          fontSize="16px"
          fontWeight="bold"
          _hover={{ backgroundColor: '#0056b3' }}
        >
          保存更改
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
