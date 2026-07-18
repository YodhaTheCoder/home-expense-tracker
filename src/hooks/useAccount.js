// import { useState, useEffect } from 'react';

// import { updateProfile, changePassword } from '../services/accountService';

// export function useAccount(user, setUser) {

//   const [accountView, setAccountView] = useState(null);

//   const [profileForm, setProfileForm] = useState({
//     full_name: user?.fullname || '',
//   });

//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const [message, setMessage] = useState('');

//   async function saveProfile(event) {

//     event.preventDefault();

//     try {

//       const name = profileForm.full_name || profileForm.fullname;

//       const updatedUser = await updateProfile(
//         user.username,
//         name
//       );

//        const newUser = {
//             ...user,
//             fullname: updatedUser.fullname || updatedUser.full_name,
//         };

//       setUser(newUser);

//       setProfileForm({
//         full_name: updatedUser.full_name || updatedUser.fullname || ""
//       });

//       setMessage('Profile updated.');

//       setAccountView(null);

//     } catch(error) {

//       setMessage(error.message);

//     }

//   }

//   async function savePassword(event) {

//     event.preventDefault();

//     if(passwordForm.newPassword !== passwordForm.confirmPassword){

//       setMessage('Passwords do not match.');

//       return;

//     }

//     try {

//       await changePassword(
//         user.username,
//         passwordForm.currentPassword,
//         passwordForm.newPassword
//       );

//       setMessage('Password updated.');

//       setPasswordForm({
//         currentPassword:'',
//         newPassword:'',
//         confirmPassword:''
//       });

//       setAccountView(null);

//     } catch(error){

//       setMessage(error.message);

//     }

//   }

//   useEffect(()=>{

//     if(user){

//       setProfileForm({
//         full_name: user.fullname || ""
//       });

//     }

//   },[user]);

//   return {

//     accountView,
//     setAccountView,

//     profileForm,
//     setProfileForm,

//     passwordForm,
//     setPasswordForm,

//     saveProfile,
//     savePassword,

//     message

//   };

// }
