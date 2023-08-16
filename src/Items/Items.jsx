import React from "react";

import { Link } from "react-router-dom";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Button,
    Spacer,
    Heading,
    Flex, TableCaption,
} from '@chakra-ui/react'
import { ArrowBackIcon,AddIcon, DeleteIcon,  } from "@chakra-ui/icons";





function Items() {



    return (
        <>
            <Box bg="white" p={5} mb={5} style={{ borderRadius: "10px" }}>
                <Flex alignItems='center' gap={2}  >
                    
                    <Heading as="h3" size="lg" color="gray.600">
                        Items
                    </Heading>
                    <Spacer />
                    <Link to="/item_form">
                   
                    <Button colorScheme="blue" >
                     
                    <AddIcon w={4} h={4} pr={2} />
                  Create Items
                </Button>
                </Link>
                </Flex>
            </Box>
            < Box p={5} color="black" bg="white" style={{ borderRadius: "10px" }}>

                <TableContainer mt={8}>
                    <Table variant='striped' >
                    <TableCaption>  </TableCaption>
                        <Thead bg="#f2f2f2">
                        
  
                            <Tr>
                                <Th>  Item No</Th>
                                <Th> Item Name</Th>
                                <Th> Purchase Price </Th>
                                <Th> Sales Price</Th>
                                <Th> Amount </Th>
                                <Th> Act  </Th>


                            </Tr>
                           
                        </Thead>
                        <Tbody>

                        </Tbody>
                    </Table>

                </TableContainer>

            </Box>
        </>

    )
}

export default Items;