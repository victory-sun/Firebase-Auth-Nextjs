import React from "react";
import {
  Box,
  Image,
  Text,
} from "@chakra-ui/react";

function Card(props) {
  const { id, img, title, showModal } = props;

  return (
    <Box
      p={4}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
      onClick={()=>{
        showModal(id)
      }}
    >     
        <Image
          maxWidth="200px"
          margin="auto"
          src={img}
          alt="Pet Image"
        />
        <Text my={2} align="center" color="gray.500">
          {title}
        </Text>
      
    </Box>
  );
}

export default Card;
