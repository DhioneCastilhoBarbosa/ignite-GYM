import { Heading, HStack, Text, VStack} from "@gluestack-ui/themed";
import { HomeHearder } from "../componets/HomeHearder";
import { Group } from "../componets/Group";
import { useState } from "react";
import { FlatList } from "react-native";

export function Home(){
  const [groups, setGroups] = useState<string[]>(["costas", "Bíceps","Tríceps","ombro"]);
  const[groupSelected, setGroupSelected] = useState<string | null>("costas");
  return (
    <VStack flex={1}>
      <HomeHearder/>
      <FlatList data={groups} keyExtractor={item =>item} renderItem={({item})=>
        <Group name={item} isActived={groupSelected === item} onPress={()=>setGroupSelected(item)}/>}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 32}}
        style={{marginVertical: 40, maxHeight:44, minHeight:44}}
      />

      <VStack px="$8">
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">4</Text>
        </HStack>
      </VStack>
    </VStack>
  )
}