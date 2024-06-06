import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Link, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="black" color="#FFFFF0" py="4" px="8">
      {/* 提供上方的間距 */}
      <Box bg="black" height="40px" />
      <Flex
        justify="flex-start" // 讓三個小區塊靠左對齊
        align="flex-start"
        wrap="wrap"
        maxW="1200px"
        mx="auto"
      >
        <FooterSection title="Movie Theatre">
          <FooterLink href="#">爆米花影城</FooterLink>
          <FooterLink href="#">吉拿棒影城</FooterLink>
        </FooterSection>

        <FooterSection title="Quick Links">
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/overview">Overview</FooterLink>
          <FooterLink href="/reviews">Reviews</FooterLink>
          <FooterLink href="/cinemas">Cinemas</FooterLink>
          <FooterLink href="/member">Member Center</FooterLink>
        </FooterSection>

        <FooterSection title="Follow Us">
          <FooterLink href="#">Facebook</FooterLink>
          <FooterLink href="#">Twitter</FooterLink>
          <FooterLink href="#">Instagram</FooterLink>
          <FooterLink href="#">YouTube</FooterLink>
        </FooterSection>
      </Flex>
    </Box>
  );
};

const FooterSection = ({ title, children }) => (
  <VStack align="flex-start" m="2" w="100%" maxW="200px" textAlign="left">
    <Text fontSize="1.25rem" mb="2" textAlign="center" w="100%">
      {title}
    </Text>
    <VStack as="ul" align="center" spacing="1" w="100%">
      {children}
    </VStack>
  </VStack>
);

FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    color="#FFFFF0"
    fontSize="0.875rem" // 縮小文字大小
    _hover={{ textDecoration: "underline" }}
  >
    {children}
  </Link>
);

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Footer;
