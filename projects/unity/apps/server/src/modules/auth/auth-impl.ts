import { auth, Hash } from '@colyseus/auth';
import { ENV, ENV_KEY } from '@modules/utils/env';

auth.backend_url = `http://localhost:${ENV.get(ENV_KEY.PORT)}`;

export type UserData = {
  id: string;
  email: string;
};

const fakeDatabase: any[] = [
  {
    id: 'test1@gmail.com',
    email: 'test1@gmail.com',
    password: '',
  },
  {
    id: 'test2@gmail.com',
    email: 'test2@gmail.com',
    password: '',
  },
];

// https://docs.colyseus.io/auth/module#sign-in-with-email-and-password
auth.settings.onFindUserByEmail = async (email) => {
  // console.log('findUserByEmail', email);
  const user = fakeDatabase.find((entry) => entry.email === email);
  user.password = await Hash.make('test123456');
  // console.log('found user', user);

  /*
   * Server return gì thì client sẽ gửi thông tin này ở trong token
   * */
  return user;
};

auth.settings.onRegisterWithEmailAndPassword = async (
  email,
  password,
  options,
) => {
  const entry = { email, password, ...options };
  fakeDatabase.push(entry);
  return entry;
};

auth.settings.onRegisterAnonymously = async (options) => {
  const anonymousEntry = { anonymous: true, ...options };
  return anonymousEntry;
};

// Hash algorithm must be the same
auth.settings.onHashPassword = async (password: string) => Hash.make(password);

/*
 * https://docs.colyseus.io/auth/module#get-user-data
 * Có thể thêm các thông tin khác vào khi parse token
 * Có vẻ như chỉ thêm vào phía client
 * */
auth.settings.onParseToken = async (userdata) => {
  userdata['additional_data'] = 123;
  return userdata;
};

// auth.settings.onForgotPassword = async (
//   email: string,
//   html: string /* , resetLink: string */,
// ) => {
//   await resend.emails.send({
//     to: email,
//     subject: '[Your project]: Reset password',
//     from: 'xxx@your-game.io',
//     html,
//   });
// };

// auth.settings.onResetPassword = async (email: string, password: string) => {
//   const entry = fakeDatabase.find((entry) => entry.email === email);
//   entry.password = password;
//   return true;
// };

// auth.settings.onSendEmailConfirmation = async (email, html, link) => {
//   await resend.emails.send({
//     to: email,
//     subject: '[Your project]: Confirm your email address',
//     from: 'no-reply@your-game.io',
//     html,
//   });
// };

// auth.settings.onEmailConfirmed = async (email) => {
//   const entry = fakeDatabase.find((entry) => entry.email === email);
//   entry.verified = true;
//   return true;
// };

// auth.oauth.addProvider('discord', {
//   key: 'XXXXXXXXXXXXXXXXXX', // Client ID
//   secret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Client Secret
//   scope: ['identify', 'email'],
// });

export const authConfig = () => {
  console.log('Auth config');
};
