import Head from "next/head";
import {useEffect} from 'react';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';
import Navbar from "../common/Navbar";

const Home = () => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if(!auth){
      router.push('/signin')
    }
  },[auth])
  if(auth){
    return (
      <>
        <Head>
          <title>Coding Test</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
        <Text>This is first page(index.tsx).</Text>
      </>
   );
  }else{
    return(
      <></>
    )
  }
}

export default Home
