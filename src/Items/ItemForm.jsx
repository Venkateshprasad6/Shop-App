import React from "react";
import { useForm, Controller } from "react-hook-form";

import { Link } from "react-router-dom";

import {
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Flex,
  Heading,
  RadioGroup,
  Radio,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Spacer,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Select } from "chakra-react-select";
import CustomBox from "../Components/customBox";
const Category = [
  {
    value: "cat1",
    label: "cat1",
  },
  {
    value: "cat2",
    label: "cat2",
  },
  {
    value: "cat3",
    label: "cat3",
  },
];

function ItemForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
   <CustomBox borderStyle="solid-black" borderWidth="5px">
        <Flex alignItems="center" gap={2}>
          <Link to="/items">
            <ArrowBackIcon w={6} h={6} />
          </Link>{" "}
          &nbsp;
          <Heading as="h3" size="lg">
            create Items
          </Heading>
          <Spacer />
          <Button
            type="submit"
            size="md"
            colorScheme="teal"
            onClick={handleSubmit(onSubmit)}
          >
            {" "}
            save{" "}
          </Button>
        </Flex>
      </CustomBox>

      <Flex gap={1} bg="white" style={{ borderRadius: "10px" }}>
        <CustomBox flex="1">
          <Card>
            <CardHeader pb={0} px={2} pt={3}>
              <Heading as="h6" p={5} size="sm" borderStyle="solid-black" borderWidth="5px" >
                {" "}
                General Details{" "}
              </Heading>
            </CardHeader>
            <CardBody>
              <CustomBox
                // color="black"
                // bg="white"
                style={{ borderRadius: "10px" }}
              >
                <Stack spacing={10}>
                  <FormControl isInvalid={errors.item_type}>
                    <FormLabel> Item Type </FormLabel>
                    <RadioGroup>
                      <Stack direction="row" spacing="20%">
                        <Radio
                          value="product"
                          {...register("item_type", {
                            required: "Item Type is Required",
                          })}
                        >
                          Product{" "}
                        </Radio>
                        <Radio
                          value="service"
                          {...register("item_type", {
                            required: "Item Type is Required",
                          })}
                        >
                          service
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>
                      {errors.item_type && errors.item_type.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Grid templateColumns="repeat(2, 2fr)" gap={4}>
                    <GridItem>
                      <FormControl isInvalid={errors.item_name}>
                        <FormLabel> Item Name </FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter Item Name"
                          {...register("item_name", {
                            required: "Item Name is Required",
                          })}
                        />
                        <FormErrorMessage>
                          {errors.item_name && errors.item_name.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <Controller
                        control={control}
                        name="category"
                        rules={{
                          required: "Category is Required",
                        }}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { error },
                        }) => (
                          <FormControl isInvalid={!!error}>
                            <FormLabel> Category </FormLabel>
                            <Select
                              name={name}
                              ref={ref}
                              onChange={(e) => {
                                onChange(e);
                              }}
                              onBlur={onBlur}
                              value={value}
                              options={Category}
                              getOptionLabel={(e) => e.label}
                              getOptionValue={(e) => e.value}
                              placeholder="Select Category"
                              closeMenuOnSelect={true}
                            />
                            <FormErrorMessage>
                              {error && error.message}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      />
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.item_code}>
                        <FormLabel>Item Code </FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter Item Code"
                          {...register("item_code", {
                            required: "Item Code is Required",
                          })}
                        />
                        <FormErrorMessage>
                          {errors.item_code && errors.item_code.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <FormControl isInvalid={errors.description}>
                    <FormLabel> Description </FormLabel>
                    <Textarea
                      type="text"
                      placeholder="Enter Description"
                      {...register("description", {
                        required: "Description Code is Required",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.description && errors.description.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </CustomBox>
            </CardBody>
          </Card>
        </CustomBox>

        <CustomBox flex="1">
          <Card>
            <CardHeader pb={0} px={2} pt={3}>
              <Heading as="h6" p={5} size="sm" borderStyle="solid-black" borderWidth="5px" >
                {" "}
                stock Details{" "}
              </Heading>
            </CardHeader>
            <CardBody>
              <CustomBox
               
                style={{ borderRadius: "10px" }}
              >
                <Stack spacing={10}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                    <GridItem>
                      <FormControl isInvalid={errors.pri_unit}>
                        <FormLabel> Primary Unit </FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter Primary Unit "
                          {...register("pri_unit", {
                            required: "Primary Unit is Required",
                          })}
                        />
                        <FormErrorMessage>
                          {errors.pri_unit && errors.pri_unit.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.conv_rate}>
                        <FormLabel> Conversation Rate </FormLabel>
                        <InputGroup>
                          <InputLeftAddon children="+1JAR" />

                          <Input
                            type="text"
                            placeholder="Enter Conversation Rate"
                            {...register("conv_rate", {
                              required: "Conversation Rate is Required",
                            })}
                          />
                          <InputRightAddon children="LAD" />
                        </InputGroup>

                        <FormErrorMessage>
                          {errors.conv_rate && errors.conv_rate.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.sec_unit}>
                        <FormLabel> Secondary Unit </FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter Secondary Unit"
                          {...register("sec_unit", {
                            required: " Secondary Unit is Required",
                          })}
                        />
                        <FormErrorMessage>
                          {errors.sec_unit && errors.sec_unit.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.stk_date}>
                        <FormLabel> As Of Date </FormLabel>
                        <Input
                          type="date"
                          {...register("stk_date", {
                            required: "Date is Required",
                          })}
                        />
                        <FormErrorMessage>
                          {errors.stk_date && errors.stk_date.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.open_stk}>
                        <FormLabel> Opening Stocks </FormLabel>
                        <InputGroup>
                          <Input
                            type="text"
                            {...register("open_stk", {
                              required: " Opening Stocks is Required",
                            })}
                          />
                          <InputRightAddon children="JAR" />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.open_stk && errors.open_stk.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.low_stk_unit}>
                        <FormLabel> Low Stock Unit </FormLabel>
                        <InputGroup>
                          <Input
                            type="text"
                            placeholder=""
                            {...register("low_stk_unit", {
                              required: "Low Stock Unit is Required",
                            })}
                          />
                          <InputRightAddon children="JAR" />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.low_stk_unit && errors.low_stk_unit.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>
              </CustomBox>
            </CardBody>
          </Card>
          <Card>
            <CardHeader pb={0} px={2} pt={3}>
              <Heading as="h6" p={5} size="sm"  borderStyle="solid-black" borderWidth="5px">
                {" "}
                Pricing Details{" "}
              </Heading>
            </CardHeader>
            <CardBody>
              <CustomBox
              
                style={{ borderRadius: "10px" }}
              >
                <Stack spacing={10}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                    <GridItem>
                      <FormControl isInvalid={errors.sale_price}>
                        <FormLabel> Sales Price </FormLabel>
                        <InputGroup>
                          <Input
                            type="text"
                            {...register("sale_price", {
                              required: "Sales Price is Required",
                            })}
                          />
                          <InputRightAddon children="Without Tax" />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.sale_price && errors.sale_price.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.pur_price}>
                        <FormLabel> Purchase Price </FormLabel>
                        <InputGroup>
                          <Input
                            type="text"
                            {...register("pur_price", {
                              required: "Purchase Price is Required",
                            })}
                          />
                          <InputRightAddon children="Without Tax" />
                        </InputGroup>

                        <FormErrorMessage>
                          {errors.pur_price && errors.pur_price.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.hsn_code}>
                        <FormLabel> HSN Code </FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter HSN Code"
                          {...register("hsn_code", {
                            required: " HSN Code is Required",
                          })}
                        />
                        <FormErrorMessage>
                          {errors.hsn_code && errors.hsn_code.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={errors.gst_tax}>
                        <FormLabel> GST Tax Rate </FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter GST Tax Rate"
                          {...register("gst_tax", {
                            required: "GST Tax Rate is Required",
                          })}
                        />
                        <FormErrorMessage>
                          {errors.gst_tax && errors.gst_tax.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>
              </CustomBox>
            </CardBody>
          </Card>
        </CustomBox>
      </Flex>
    </>
  );
}

export default ItemForm;
