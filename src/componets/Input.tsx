import {Input as GluestackInput, InputField, FormControl, FormControlErrorText , FormControlError} from "@gluestack-ui/themed"
import { ComponentProps } from "react"
type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}
export function Input({isReadOnly = false,errorMessage=null,isInvalid=false,...rest}:Props){
  const invalide = !!errorMessage || isInvalid
  return(
    <FormControl isInvalid={invalide} w="$full" mb="$4">

      <GluestackInput 
        h="$14"
        isInvalid={invalide} 
        borderWidth="$0" 
        borderRadius="$md"
        $focus={{
          borderWidth: "$1",
          borderColor: invalide ? "$red500":"$green500"
        }}
        $invalid={{
          borderWidth: "$1",
          borderColor: "$red500"
        }}
        isReadOnly ={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField 
          bg="$gray700"
          px="$4" 
          color="$white"
          fontFamily="$body"
          placeholderTextColor="$gray300"
          {...rest}
        />
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}