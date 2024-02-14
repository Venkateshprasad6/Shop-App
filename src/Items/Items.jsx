import React from "react";

import { Link } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Button,
  Spacer,
  Heading,
  Flex,

} from "@chakra-ui/react";
import { AddIcon,ArrowBackIcon } from "@chakra-ui/icons";
import CustomBox from "../Components/customBox";

function Items() {
  return (
    <>
      <CustomBox borderStyle="solid-black" borderWidth="5px">
        <Flex alignItems="center" gap={2}>
        <Heading as="h3" size="lg">
          Items
          </Heading>
          <Spacer />
          <Link to="/item_form">
          <ArrowBackIcon w={6} h={6} />
            <Button colorScheme="blue">
              <AddIcon w={4} h={4} pr={2} />
              Create Items
            </Button>
          </Link>
        </Flex>
      </CustomBox>
     
      <CustomBox borderStyle="solid-black" borderWidth="5px">
        <TableContainer mt={8}>
          <Table variant="striped">
            {/* <TableCaption> </TableCaption> */}
            <Thead >
              <Tr>
                <Th> Item No</Th>
                <Th> Item Name</Th>
                <Th> Purchase Price </Th>
                <Th> Sales Price</Th>
                <Th> Amount </Th>
                <Th> Act </Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>
        </TableContainer>
      </CustomBox>
    </>
  );
}

export default Items;
