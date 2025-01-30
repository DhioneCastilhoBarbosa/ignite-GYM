import { Heading, HStack, Text, VStack} from "@gluestack-ui/themed";
import { HomeHearder } from "../componets/HomeHearder";
import { Group } from "../componets/Group";
import { useState } from "react";
import { FlatList } from "react-native";
import { ExerciseCard } from "../componets/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home(){
  const [exercises, setExercises] = useState<string[]>(["Agachamento","Supino reto", "Supino inclinado","Supino declinado","Supino com halteres","Pernas"]); 
  const [groups, setGroups] = useState<string[]>(["costas", "Bíceps","Tríceps","ombro"]);
  const[groupSelected, setGroupSelected] = useState<string | null>("costas");

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(){
    navigation.navigate("exercise")
  }

  return (
    <VStack flex={1}>
      <HomeHearder/>
      <FlatList data={groups} keyExtractor={item =>item} renderItem={({item})=>
        <Group name={item} isActived={groupSelected?.toLocaleLowerCase() === item.toLocaleLowerCase()} onPress={()=>setGroupSelected(item)}/>}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 32}}
        style={{marginVertical: 40, maxHeight:44, minHeight:44}}
      />

      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">{exercises.length}</Text>
        </HStack>
        <FlatList 
        data={exercises} 
        keyExtractor={item =>item} 
        renderItem={()=> <ExerciseCard onPress={handleOpenExerciseDetails} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        />
        
      </VStack>
    </VStack>
  )
}