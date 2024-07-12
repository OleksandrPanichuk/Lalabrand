"use client"
import { useState } from 'react'

export const ResetPasswordForm = () => {
  // verification - перевірка токену, який надсилається на пошту
  // creation - створення нового паролю
  const [status, setStatus] = useState<'verification' | 'creation'>(
    'verification',
  );
 


  if(status === 'verification') {
    return <></>
  }


  return <></>
};

