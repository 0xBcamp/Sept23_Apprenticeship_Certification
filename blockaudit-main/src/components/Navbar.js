import { Flex, Box, Image, Text, Button } from "@chakra-ui/react";
import Link from 'next/link';

const Navbar = () => {
    return (
      <Flex
        as="nav"
        position="fixed"
        top="0"
        right="0"
        p="4"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        bg="blackAlpha.700"
      >
        <Flex alignItems="center" fontSize="xl" fontWeight="bold" color="white">
          <Image src="/logo.png" alt="Company Logo" h="12" ml="4" />
          <Text ml="2">blockAudit</Text>
        </Flex>
        <Flex>
          <Link href="/page" passHref>
            <Button as="a" mr="4" bg="gray.800" color="white" _hover={{ bg: "gray.700" }}>
              About Team
            </Button>
          </Link>
          <Link href="/exampleAudit" passHref>
            <Button as="a" mr="4" bg="gray.800" color="white" _hover={{ bg: "gray.700" }}>
              Example Audit
            </Button>
          </Link>
          <Link href="/liveAudit" passHref>
            <Button as="a" mr="4" bg="gray.800" color="white" _hover={{ bg: "gray.700" }}>
              Live Audit
            </Button>
          </Link>
        </Flex>
      </Flex>
    );
};

export default Navbar;
