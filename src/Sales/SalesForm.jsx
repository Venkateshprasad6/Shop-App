import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Grid,
  GridItem,
  InputGroup,
  Spacer,
  StackDivider,
  Textarea,
  InputRightAddon,

} from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { Select } from "chakra-react-select";
import { useGetDataQuery, useGetDataByIdQuery } from "../Services/studyFormApi";
import CustomBox from "../Components/customBox";

const Customer = [
  {
    value: "customer 1",
    label: "customer 1",
  },
  {
    value: "customer 2",
    label: "customer 2",
  },
  {
    value: "customer 3",
    label: "customer 3",
  },
];
const state = [
  {
    value: "TamilNadu",
    label: "TN",
  },
  {
    value: "Kerala",
    label: "KL",
  },
  {
    value: "Karnataka",
    label: "KL",
  },
];
const items = [
  {
    id: 1,
    itemName: "Item 1",
    hsn: "565656",
    mrp: 120.5,
    qty: "",
    price: 110,
    discount: "",
    tax: 12,
    amount: "",
  },
  {
    id: 2,
    itemName: "Item 2",
    hsn: "443322",
    mrp: 100,
    qty: "",
    price: 100,
    discount: "",
    tax: 10,
    amount: "",
  },
  {
    id: 3,
    itemName: "Item 3",
    hsn: "123456",
    mrp: 500,
    qty: "",
    price: 450,
    discount: "",
    tax: 18,
    amount: "",
  },
  {
    id: 4,
    itemName: "Item 4",
    hsn: "332165",
    mrp: 1200,
    qty: "",
    price: 1150,
    discount: "",
    tax: 18,
    amount: "",
  },
  {
    id: 5,
    itemName: "Item 5",
    hsn: "788955",
    mrp: 20,
    qty: "",
    price: 15,
    discount: "",
    tax: 6,
    amount: "",
  },
];

function SalesForm() {
  const navi = useNavigate();
  const { data: studyData } = useGetDataQuery();
  console.log(studyData);
  const { data: studyDataById } = useGetDataByIdQuery(1);
  console.log(studyDataById);

  const [total, setTotal] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm({ mode: "onChange" });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "Items",
  });

  const onSubmit = async (data) => {
    console.log(data);

    navi("/sales");
  };
  const watchItems = watch("Items");

  if (itemFields.length === 0) {
    appendItem();
  }

  const itemChange = (e, index) => {
    setValue(`Items.${index}.item.itemName`, e.itemName);
    setValue(`Items.${index}.hsn`, e.hsn);
    setValue(`Items.${index}.mrp`, e.mrp);
    setValue(`Items.${index}.qty`, 1, { shouldValidate: true });
    setValue(`Items.${index}.price`, e.price, { shouldValidate: true });
    setValue(`Items.${index}.discount`, e.discount);
    setValue(`Items.${index}.tax`, e.tax);
    amountCalculation(index);
  };

  const itemPropChange = (index, propName, value) => {
    setValue(`Items.${index}.${propName}`, value);
    amountCalculation(index);
  };

  const amountCalculation = (index) => {
    let qty = Number(getValues(`Items.${index}.qty`));
    let price = Number(getValues(`Items.${index}.price`));
    let discount = Number(getValues(`Items.${index}.discount`));
    let tax = Number(getValues(`Items.${index}.tax`));

    let amount = qty * price - discount;
    let taxInRs = (tax / 100) * amount;
    let finalAmount = qty * price + taxInRs;

    setValue(`Items.${index}.amount`, finalAmount);
    setTotal(watchItems.reduce((acc, item) => acc + item.amount, 0));
  };

  return (
    <>
      <CustomBox borderStyle="solid-black" borderWidth="5px">
        <Flex alignItems="center" gap={2}>
          <Link to="/sales">
            <ArrowBackIcon w={6} h={6} />
          </Link>{" "}
          &nbsp;
          <Heading as="h3" size="lg">
            Sales Form
          </Heading>
        </Flex>
      </CustomBox>

      <CustomBox borderStyle="solid-black" borderWidth="5px">
        <Grid templateColumns="repeat(4, 1fr)" gap={5}>
          <GridItem colSpan={2} w="70%" p={5}>
            <Controller
              control={control}
              name="customer"
              rules={{
                required: "Please Select Customer.",
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <FormControl isInvalid={!!error}>
                  <FormLabel> Customer </FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    value={value}
                    options={Customer}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    placeholder="Select Customer"
                    closeMenuOnSelect={true}
                  />
                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </GridItem>
          <GridItem colSpan={2} p={5}>
            <Stack spacing={10}>
              <Grid templateColumns="repeat(2, 1fr)" gap={10}>
                <GridItem>
                  <FormControl isInvalid={errors.inv_num}>
                    <FormLabel> Invoice Number </FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter Invoice Number"
                      {...register("inv_num", {
                        required: " Invoice Number is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.inv_num && errors.inv_num.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={errors.inv_date}>
                    <FormLabel> Invoice Date </FormLabel>
                    <Input
                      type="date"
                      {...register("inv_date", {
                        required: "Invoice Date is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.inv_date && errors.inv_date.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={errors.pay_terms}>
                    <FormLabel> Payment Terms </FormLabel>

                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="Enter Payment Terms"
                        {...register("pay_terms", {
                          required: " Payment Terms is required",
                        })}
                      />
                      <InputRightAddon children="Days" />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.pay_terms && errors.pay_terms.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={errors.due_date}>
                    <FormLabel> Due Date </FormLabel>
                    <Input
                      type="date"
                      {...register("due_date", {
                        required: "Due Date is required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.due_date && errors.due_date.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
            </Stack>
          </GridItem>
        </Grid>
      </CustomBox>

      <CustomBox borderStyle="solid-black" borderWidth="5px">
        <Stack>
          <TableContainer
            style={{ overflowX: "visible", overflowY: "visible" }}
          >
            <Table variant="simple" size="sm">
              <Thead color="white">
                <Tr>
                  <Th> No </Th>
                  <Th w={300}> Items </Th>
                  <Th> HSN </Th>
                  <Th> MRP </Th>
                  <Th> QTY </Th>
                  <Th> Price </Th>
                  <Th> Discount (Rs) </Th>
                  <Th> Tax (%) </Th>
                  <Th> Amount </Th>
                  <Th> Act </Th>
                </Tr>
              </Thead>
              <Tbody>
                {itemFields &&
                  itemFields.map((item, index) => {
                    return (
                      <Tr key={item.id}>
                        <Td> {index + 1} </Td>
                        <Td>
                          <Controller
                            control={control}
                            name={`Items.${index}.item`}
                            rules={{
                              required: "Please Select Item.",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                              <FormControl
                                isInvalid={errors.Items?.[index]?.item}
                              >
                                <Select
                                  className="z-index"
                                  name={name}
                                  ref={ref}
                                  onChange={(e) => {
                                    onChange(e);
                                    itemChange(e, index);
                                  }}
                                  onBlur={onBlur}
                                  value={value}
                                  options={items}
                                  getOptionLabel={(e) => e.itemName}
                                  getOptionValue={(e) => e.id}
                                  placeholder="Select item"
                                  closeMenuOnSelect={true}
                                  size="sm"
                                />
                                <FormErrorMessage>
                                  {errors.Items?.[index]?.item?.message}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          />
                        </Td>

                        <Td>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="HSN"
                              {...register(`Items.${index}.hsn`)}
                              disabled={true}
                              size="sm"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="MRP"
                              {...register(`Items.${index}.mrp`)}
                              disabled={true}
                              size="sm"
                              className="textRight"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl isInvalid={errors.Items?.[index]?.qty}>
                            <Input
                              type="text"
                              placeholder="Qty"
                              {...register(`Items.${index}.qty`, {
                                required: "Qty is Empty",
                                onChange: (e) =>
                                  itemPropChange(index, "qty", e.target.value),
                              })}
                              size="sm"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.qty?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl isInvalid={errors.Items?.[index]?.price}>
                            <Input
                              type="text"
                              placeholder="Price"
                              {...register(`Items.${index}.price`, {
                                required: "Please Enter Price",
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "price",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                              className="textRight"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.price?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Discount"
                              {...register(`Items.${index}.discount`, {
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "discount",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Tax (%)"
                              {...register(`Items.${index}.tax`)}
                              disabled={true}
                              size="sm"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl
                            isInvalid={errors.Items?.[index]?.amount}
                          >
                            <Input
                              type="number"
                              placeholder="Amount"
                              {...register(`Items.${index}.amount`)}
                              size="sm"
                              className="textRight"
                              //disabled={true}
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.amount?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td>
                          <Button
                            colorScheme="blue"
                            onClick={() => removeItem(index)}
                            size="sm"
                          >
                            <DeleteIcon w={3} h={3} />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>

          <Button
            colorScheme="blue"
            onClick={() => appendItem()}
            mt={10}
            float="right"
          >
            Add New Item
          </Button>
        </Stack>
      </CustomBox>

      <CustomBox
        p={5}
        my={5}
        color="black"
        bg="white"
        style={{ borderRadius: "10px" }}
      >
        <TableContainer>
          <Table variant="striped" size="sm">
            <Tbody>
              <Tr color="white">
                <Td> </Td>
                <Td w={300}> </Td>
                <Td> </Td>
                <Td> </Td>
                <Td> </Td>
                <Td> </Td>
                <Td> Total</Td>
                <Td> {total} </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CustomBox>

      <CustomBox borderStyle="solid-black" borderWidth="5px">
        <Flex>
          <CustomBox flex="1" p={5}>
            <Stack spacing={6} divider={<StackDivider />}>
              <>
                <FormControl isInvalid={errors.notes} mb={5}>
                  <FormLabel> Notes </FormLabel>
                  <Textarea
                    type="text"
                    placeholder="Enter the Notes Here"
                    {...register("notes", {
                      required: "Notes is required",
                    })}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.notes && errors.notes.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.terms_condition}>
                  <FormLabel> Terms & Condition </FormLabel>
                  <Textarea
                    type="text"
                    placeholder="Enter Terms & Condition"
                    {...register("terms_condition", {
                      required: "Terms & Condition is required",
                    })}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.terms_condition && errors.terms_condition.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            </Stack>
          </CustomBox>
          <CustomBox flex="1" p={5}>
            <Stack spacing={5} divider={<StackDivider />}>
              <>
                <Flex>
                  <Button onClick={() => appendItem()}> Aditional Item</Button>{" "}
                  <Spacer />
                  <Heading as="h6" fontSize="13px">
                    {" "}
                    Rs{" "}
                  </Heading>
                </Flex>
                <Stack>
                  {itemFields &&
                    itemFields.map((item, indx) => {
                      return (
                        <>
                          <TableContainer mb={2}>
                            <Table>
                              <Tbody>
                                <Tr key={indx}>
                                  <Td>
                                    <FormControl
                                      isInvalid={errors.Item?.[indx]?.charge}
                                    >
                                      <Input
                                        type="text"
                                        placeholder="Addition Item"
                                        {...register(`Item.${indx}.charge`, {
                                          required: "Addition Item is Required",
                                        })}
                                        size="sm"
                                      />
                                      <FormErrorMessage>
                                        {errors.Item?.[indx]?.charge?.message}
                                      </FormErrorMessage>
                                    </FormControl>
                                  </Td>
                                  <Td>
                                    <FormControl
                                      isInvalid={errors.Item?.[indx]?.ch_amount}
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Item Charge"
                                        {...register(`Item.${indx}.ch_amount`, {
                                          required: "Item Charge is Required",
                                        })}
                                        size="sm"
                                      />
                                      <FormErrorMessage>
                                        {
                                          errors.Item?.[indx]?.ch_amount
                                            ?.message
                                        }
                                      </FormErrorMessage>
                                    </FormControl>
                                  </Td>
                                  <Td>
                                    <Button
                                      onClick={() => removeItem(indx)}
                                      colorScheme="red"
                                    >
                                      <DeleteIcon w={4} h={4} />
                                    </Button>
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </>
                      );
                    })}
                </Stack>
                <Flex mt={2} mb={2}>
                  <Button onClick={() => appendItem()}>
                    Aditional Discount{" "}
                  </Button>{" "}
                  <Spacer />
                  <Heading as="h6" fontSize="13px">
                    {" "}
                  </Heading>
                </Flex>
                <Stack>
                  {itemFields &&
                    itemFields.map((itm, indx) => {
                      return (
                        <>
                          <TableContainer mb={2}>
                            <Table>
                              <Tbody>
                                <Tr key={indx}>
                                  <Td>
                                    <FormControl
                                      isInvalid={errors.items?.[indx]?.disco}
                                    >
                                      <Input
                                        type="text"
                                        placeholder="Aditional Discount"
                                        {...register(`items.${indx}.disco`, {
                                          required:
                                            "Aditional Discount is Required",
                                        })}
                                        size="sm"
                                      />
                                      <FormErrorMessage>
                                        {errors.items?.[indx]?.disco?.message}
                                      </FormErrorMessage>
                                    </FormControl>
                                  </Td>

                                  <Td>
                                    <Button
                                      onClick={() => removeItem(indx)}
                                      colorScheme="red"
                                    >
                                      <DeleteIcon w={4} h={4} />
                                    </Button>
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </>
                      );
                    })}
                </Stack>
              </>
              <>
                <Flex mb={2}>
                  <Heading as="h6" fontSize="13px" colorScheme="yellow">
                    Total{" "}
                  </Heading>
                  <Spacer />
                  <Heading as="h6" fontSize="13px">
                    {" "}
                    0
                  </Heading>
                </Flex>
              </>
              <>
                <Flex mb={2}>
                  <FormLabel minWidth="150px"> Amount received </FormLabel>
                  <FormControl
                    isInvalid={errors.amount_received}
                    maxWidth="180px"
                    ml="150px"
                  >
                    <Input
                      type="number"
                      {...register("amount_received", {
                        required: "Notes is required",
                      })}
                      size="sm"
                    />
                    <FormErrorMessage>
                      {errors.amount_received && errors.amount_received.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </>
              <>
                <Flex mb={2}>
                  <FormLabel minWidth="150px"> Balance Amount </FormLabel>
                  <FormControl
                    isInvalid={errors.balance_amount}
                    maxWidth="180px"
                    ml="150px"
                  >
                    <Input
                      type="number"
                      {...register("balance_amount", {
                        required: "Notes is required",
                      })}
                      size="sm"
                    />
                    <FormErrorMessage>
                      {errors.balance_amount && errors.balance_amount.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </>
            </Stack>
          </CustomBox>
        </Flex>
      </CustomBox>

      <CustomBox p={5} bg="white" mt={3}>
        <Stack>
          <Button
            type="submit"
            size="md"
            colorScheme="teal"
            onClick={handleSubmit(onSubmit)}
          >
            {" "}
            SUBMIT{" "}
          </Button>
        </Stack>
      </CustomBox>
    </>
  );
}

export default SalesForm;
