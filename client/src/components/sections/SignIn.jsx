import React from 'react'
import LoginForm from '../LoginForm';
import RegForm from '../RegForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const SignIn = ({setLoggedIn, setViewSignIn, viewSignIn, user, setUser}) => {

  return (
    viewSignIn ? 
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-5 bg-slate-300/95 dark:bg-zinc-900/95 text-black dark:text-white'>
      <Tabs>
        <TabList>
          <Tab>Register</Tab>
          <Tab>Log in</Tab>
        </TabList>
        <TabPanel>
          <RegForm setLoggedIn={setLoggedIn} setViewSignIn={setViewSignIn} user={user} setUser={setUser} />
        </TabPanel>
        <TabPanel>
          <LoginForm setLoggedIn={setLoggedIn} setViewSignIn={setViewSignIn} user={user} setUser={setUser} />
        </TabPanel>
      </Tabs>
    </div> :
    <div></div>
  )
}
export default SignIn;