import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed";
import { ScreenHeader } from "../componets/ScreenHeader";
import { ScrollView, TouchableOpacity } from "react-native";
import { UserPhoto } from "../componets/UserPhoto";
import { Input } from "../componets/Input";
import { Button } from "../componets/button";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useState } from "react";
import { ToastMessage } from "../componets/ToastMessage";

export function Profile(){
  const [userPhoto, setUserPhoto] = useState("https://github.com/dhionecastilhobarbosa.png")
  const toast = useToast()
  async function handleUserPhotoSelect(){
    try{
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4,4],
        quality: 1
      })

      if(photoSelected.canceled){
        return
      }
      const photoUri = photoSelected.assets[0].uri
      
      if(photoUri){
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {size: number}
      
        if(photoInfo.size && photoInfo.size/1024/1024 > 6){
          return toast.show({
            placement: "top",
            render:({id})=>(
              <ToastMessage id={id} title="Esta imagem e muito grande." description="Escolha uma de até 5MB." action="error" onClose={()=>{toast.close(id)}}/>
            )
          })
        }
        setUserPhoto(photoUri)
      }
    
    }catch(error){
      console.log(error)
    }
    
  }
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>
      
      <ScrollView contentContainerStyle={{padding: 36}}>
        <Center mt="$6" px="$4">
          <UserPhoto source={{uri: userPhoto}} alt="foto do usuário" size="xl"/>
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8">Alterar Foto</Text>
          </TouchableOpacity>
          
        <Center w="$full" gap="$4">
          <Input placeholder="Nome" bg="$gray600"/>
          <Input value="exemplo@email.com" bg="$gray600" isReadOnly/>
        </Center>

        <Heading alignSelf="flex-start"  fontFamily="$heading" color="$gray200" fontSize="$lg" mt="$12" mb="$2">
          Alterar senha
        </Heading>
        <Center w="$full" gap="$4">
          <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry/>
          <Input placeholder="Nova senha" bg="$gray600" secureTextEntry/>
          <Input placeholder="Confrime a nova senha" bg="$gray600" secureTextEntry/>
          <Button title="Atualizar"/>
        </Center>

      </Center>
      </ScrollView>
    </VStack>
  )
}
