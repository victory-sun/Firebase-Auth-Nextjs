import { Container, } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
import { useAuth } from '../lib/auth';
import { 
  Image,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import Modal from 'react-modal';
import Card from '../components/Card'
import firebase from '../lib/firebase';

const Blog = () => {
  const { auth, } = useAuth();
  const router = useRouter();
  useEffect(()=>{
    if(!auth){
      router.push('/signin')
    }
  },[auth])
  if(auth){
    const [data,setData] = useState([])
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [currentInfo,setCurrentInfo]=useState(null)

    useEffect(()=>{
      const runEffect = async () => {
        const dbrespose  = await firebase
        .firestore()
        .collection('blogs')
        .get();
        
        //first get blog data from firebase(once)
        setBlogData(dbrespose.docs)
      
        //get blog data whenever firebase database is changed.
        firebase.firestore().collection("blogs")
        .onSnapshot((doc) => {
          setBlogData(doc.docs)
        });
      }
      runEffect();
    },[])

    const setBlogData = (docs)=>{
      let blogData = [];
      docs.forEach((item)=>{
        blogData = [
          {
            id:item.id,
            ...item.data()
          },
          ...blogData
        ]
      })
      setData(blogData);
    }

    const showModal = (id)=>{
      let current = data.filter((item)=>{
        return item.id == id
      })
      setCurrentInfo({
        img: current[0].img,
        title: current[0].title,
        article: current[0].article,
      })
      setIsModalOpen(true)
    }

    return (
      <>
        <Container maxW="container.lg">
          <SimpleGrid minChildWidth="250px" spacing="10px">
            {data.map((data)=> {
              const { img, title, id} = data;
              return (
                <Card
                  key={id}
                  id={id}
                  img={img}
                  title={title}
                  showModal={showModal}
                />
              );
            })}
          </SimpleGrid>
          <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            onRequestClose={()=>{setIsModalOpen(false)}}
            style={{content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            }}}
            contentLabel="Example Modal"
          >
            {currentInfo && (
              <>
                <Text my={2} align="center" color="gray.500">
                  {currentInfo.article}
                </Text>
              </>
            )}
          
          </Modal>
        </Container>
      </>
    );
  }
  else {
    return (
      <></>
    )
  }
};
export default Blog;
