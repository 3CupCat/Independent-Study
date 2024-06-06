import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Input,
  Link,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types"; // 引入 PropTypes
import logo from "../assets/logo.svg";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      w="100%"
      bg="black"
      color="#FFFFF0"
      zIndex="1000"
      p="4"
      boxShadow="md"
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Logo />
          <Flex display={{ base: "none", md: "flex" }}>
            <NavLinks />
          </Flex>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }}>
          <Search />
        </Flex>
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          onClick={toggleMenu}
          bg="black"
          color="white"
          _hover={{ bg: "gray.700" }}
        />
      </Flex>
      {isOpen && (
        <VStack
          display={{ base: "flex", md: "none" }}
          bg="black"
          spacing="4"
          mt="4"
          align="start"
        >
          <NavLinks />
          <Search />
        </VStack>
      )}
    </Box>
  );
}

function Logo() {
  return (
    <Link as={RouterLink} to="/" display="flex" alignItems="center" mr="4">
      <Image src={logo} alt="Logo" height="2.5rem" />
    </Link>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  const searchBgColor = "gray.800";
  const placeholderColor = "#FFFFF0";
  const borderColor = "gray.800";
  const activeBorderColor = "#FFFFF0";

  return (
    <Input
      className="search-input"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      bg={searchBgColor}
      color="white"
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      width="15rem"
      _placeholder={{ color: placeholderColor }}
      _focus={{ borderColor: activeBorderColor }}
    />
  );
}

function NavLinks() {
  return (
    <Flex
      gap="1.5rem"
      ml="4"
      direction={{ base: "column", md: "row" }}
      align={{ base: "start", md: "center" }}
    >
      <NavLink to="/movies" label="電影資訊" />
      <NavLink to="/reviews" label="電影評論" />
      <NavLink to="/theaters" label="影城資訊" />
      <NavLink to="/login" label="會員中心" />
    </Flex>
  );
}

// 添加PropTypes驗證
NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function NavLink({ to, label }) {
  return (
    <Link
      as={RouterLink}
      to={to}
      fontSize="1rem"
      color="#FFFFF0"
      position="relative"
      textDecoration="none"
      _after={{
        content: '""',
        position: "absolute",
        width: "100%",
        borderBottom: "2px solid transparent",
        bottom: "0",
        left: "0",
        transform: "scaleX(0)",
        transformOrigin: "bottom right",
        transition: "transform 0.25s ease-out",
      }}
      _hover={{
        color: "white",
        _after: {
          transform: "scaleX(1)",
          borderBottomColor: "#FFFFF0",
        },
      }}
    >
      {label}
    </Link>
  );
}

export default NavBar;
