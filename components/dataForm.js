import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  ButtonGroup,
  Center,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Nextlink from "next/link";
import countries from "../libs/countries";

function HookForm(props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    props.onSaveUser(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={errors.name}
        isRequired
        width="90%"
        mx="auto"
        mb={4}
      >
        <FormLabel htmlFor="name">Full name</FormLabel>
        <Input
          id="name"
          placeholder="Jane Doe"
          _placeholder={{ opacity: 1, color: "gray" }}
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
            maxLength: { value: 18, message: "Maximum length should be 18" },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={errors.age}
        isRequired
        width="90%"
        mx="auto"
        mb={4}
      >
        <FormLabel htmlFor="age">Age</FormLabel>
        <NumberInput max={110} min={5}>
          <NumberInputField
            id="age"
            placeholder="5"
            _placeholder={{ opacity: 1, color: "gray" }}
            {...register("age", {
              required: "This is required",
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errors.age && errors.age.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={errors.country}
        isRequired
        width="90%"
        mx="auto"
        mb={4}
      >
        <FormLabel htmlFor="country">Country</FormLabel>
        <Select
          id="country"
          placeholder="Select Country"
          _placeholder={{ opacity: 1, color: "gray" }}
          {...register("country", {
            required: "This is required",
          })}
        >
          {countries.map((country) => (
            <option key={country.id} value={country.iso}>
              {country.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {errors.country && errors.country.message}
        </FormErrorMessage>
      </FormControl>

      <Center>
        <ButtonGroup mt={4} mb={2} variant="solid" spacing="6">
          <Button colorScheme="telegram" isLoading={isSubmitting} type="submit">
            Save
          </Button>
          <Nextlink href="/" colorScheme="gray">
            <Button variant="outline" color="gray">
              Cancel
            </Button>
          </Nextlink>
        </ButtonGroup>
      </Center>
    </form>
  );
}

export default HookForm;
