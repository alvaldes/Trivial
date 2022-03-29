import { FormControl, Radio, RadioGroup, Stack } from "@chakra-ui/react";

const radioForm = (props) => {
  const { options } = props;
  const makeOptions = () => {
    console.log(options);
    const radioGroup = options.map((option) => {
      [
        <Radio
          size="lg"
          colorScheme={option.correct ? "green" : "red"}
          value={option.answer}
          onClick={() => props.onClick(option.answer)}
        >
          {option.answer}
        </Radio>,
      ];
    });
    return radioGroup;
  };

  return (
    <FormControl>
      <RadioGroup ml={12}>
        <Stack spacing={[1, 5]} direction="column">
          {makeOptions()}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default radioForm;
