import { Center, Heading, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed"
import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "../componets/Input"
import { Button } from "../componets/button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import { yupResolver } from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import * as yup from 'yup'

type formDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().email('E-mail inválido.').required('Informe o email.'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres.').required('Informe a senha.'),
  password_confirm: yup.string().oneOf([yup.ref('password'), undefined], 'As senhas não conferem.').required('Confirme a senha.'),
})

export function SignUp(){
  const{control, handleSubmit, formState:{errors}} = useForm<formDataProps>({
   resolver: yupResolver(signUpSchema)
    
  })
  const navigator = useNavigation<AuthNavigatorRoutesProps>()
  
    function handleGoBack(){
      navigator.goBack();
    }

    function handleSignUp({name,email,password,password_confirm}: formDataProps){
      
    }

  return(
    <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator = {false}>
    <VStack flex={1}>
      <Image 
      source={BackgroundImg} 
      alt="pessoas treinando"
      w = "$full"
      h={624} 
      defaultSource={BackgroundImg}
      position="absolute"
      />

      <VStack flex={1} px="$10" pb="$16">
        <Center my="$24">
          <Logo/>
          <Text color="$gray100" fontSize="$sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>
        <Center gap="$2" flex={1}>
          <Heading color="$gray100">Crie sua conta</Heading>

          <Controller 
            control={control} 
            name="name"
            
            render={({field:{onChange, value}})=>(
              <Input 
              placeholder="Nome" 
              onChangeText={onChange} 
              value={value}
              errorMessage={errors.name?.message}
              />
          )}/>
          
          <Controller 
            control={control} 
            name="email" 
            render={({field:{onChange, value}})=>(
              <Input 
              placeholder="E-mail" 
              keyboardType="email-address" 
              autoCapitalize="none" 
              onChangeText={onChange} 
              value={value}
              errorMessage={errors.email?.message}
              />
          )}/>
          
          <Controller 
            control={control} 
            name="password" 
            render={({field:{onChange, value}})=>(
            <Input 
            placeholder="Senha" 
            secureTextEntry  
            onChangeText={onChange} 
            value={value}
            errorMessage={errors.password?.message}
            />
          )}/>
          <Controller 
            control={control} 
            name="password_confirm" 
            render={({field:{onChange, value}})=>(
              <Input 
              placeholder="Confirmar a Senha" 
              secureTextEntry  
              onChangeText={onChange} 
              value={value} 
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              errorMessage={errors.password_confirm?.message}
            />
          )}/>
          
          <Button 
            title="Criar e acessar"  
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

       
          
          <Button title="Voltar para o login" variant="outline" mt='$12' onPress={handleGoBack}/>
        
      </VStack>
    </VStack>
    </ScrollView>
  )
}