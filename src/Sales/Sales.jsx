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
import { AddIcon } from "@chakra-ui/icons";

import CustomBox from "../Components/customBox";

function Sales() {
  return (
    <>
   <CustomBox borderStyle="solid-black" borderWidth="5px">
        <Flex alignItems="center" gap={2}>
          <Heading as="h3" size="lg" >
            Sales
          </Heading>
          <Spacer />
          <Link to="/sales_form">
            <Button colorScheme="blue">
              <AddIcon w={4} h={4} pr={2} />
              Sales
            </Button>
          </Link>
        </Flex>
      </CustomBox>
      <CustomBox borderStyle="solid-black" borderWidth="5px">
        <TableContainer mt={8}>
          <Table variant="striped">
            {/* <TableCaption> No Items To Display</TableCaption> */}
            <Thead >
              <Tr>
                <Th> S.No</Th>
                <Th> Date</Th>
                <Th> Invoice Number </Th>
                <Th> Party Name </Th>
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

export default Sales;
