import { Box, Image, Text } from "@chakra-ui/react";

const TeamMember = ({ imageUrl, name }) => {
  return (
    <Box textAlign="center" m="4">
      <Image src={imageUrl} alt={name} borderRadius="full" w="100px" h="100px" />
      <Text mt="2">{name}</Text>
    </Box>
  );
};

export default TeamMember;
