import { Text } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
  name: string
  isActived: boolean
}

export function Group({name, isActived, ...rest}:Props) {
  return (
    <Button {...rest}
      mr="$3"
      minWidth="$24"
      h="$10"
      bg="$gray600"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderColor ="$green500"
      borderWidth={isActived ? 1 : 0}
      sx={{
        ":active":{
          borderWidth: 1
        }
      }}
    >
      <Text color={isActived? "$green500" : "$gray200"} textTransform="uppercase" fontSize="$xs" fontFamily="$heading" >{name}</Text>
    </Button>
  )
}