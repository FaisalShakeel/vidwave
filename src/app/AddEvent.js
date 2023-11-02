import { Box, HStack,VStack, Input, Radio, RadioGroup, Button, Tag, Avatar, Text, Card, AvatarGroup } from "@chakra-ui/react";
function AddEvent()
{
    return(
        
        <Box   height="350px" width="40%" backgroundColor="white" margin="auto" display="flex" alignContent="center" alignItems="center" flexDirection="column"> 
        <Card height="100%" width="100%">       
            <Input className="font-semibold" placeholder="Oraganizer" fontFamily="Print Clearly" borderRadius="10px" borderColor="black" />
            <Input className="font-semibold" placeholder="Title" fontFamily="Print Clearly" borderRadius="10px" borderColor="black" />
            <Input className="font-semibold" placeholder="Description" fontFamily="Print Clearly" borderRadius="10px" height="100px" borderColor="black" />
            <RadioGroup defaultValue="none" fontFamily="Print Clearly" className="font-semibold" >
                <HStack >
                <Radio value="remote">Remote</Radio>
                <Radio value="onSite">OnSite</Radio>
                </HStack>                
            </RadioGroup>
            <HStack>
                <Tag fontFamily="Print Clearly" fontSize="20px" fontWeight="bold" backgroundColor="black" color="white">Web3</Tag>
                <Tag fontFamily="Print Clearly" fontSize="20px" fontWeight="bold" backgroundColor="black" color="white" >Blockchain</Tag>
                <Tag fontFamily="Print Clearly" fontSize="20px" fontWeight="bold" backgroundColor="black" color="white" >React</Tag>
                <Tag fontFamily="Print Clearly" fontSize="20px" fontWeight="bold" backgroundColor="black" color="white" >Solidity</Tag>
            </HStack>
            <Box marginRight="400px">
                <VStack>
                    <Text fontFamily="Print Clearly" marginRight="135px" fontSize="20px" className="font-semibold">Contributors</Text>
                    <HStack>
                        <AvatarGroup marginRight="135px" max="3" fontFamily="Print Clearly">
            <Avatar size="sm" name="Faisal"  color="white" backgroundColor="black" fontWeight="bold" />
            <Avatar size="sm" name="Ali"  color="white" backgroundColor="black"  fontWeight="bold" />
            <Avatar size="sm" name="James"  color="white" backgroundColor="black" fontWeight="bold" />
            <Avatar size="sm" name="Chris"  color="white" backgroundColor="black" fontWeight="bold" />
            </AvatarGroup>
            </HStack>
            </VStack>
            </Box>
            <Button size="lg" fontFamily="Print Clearly" color="black" backgroundColor="lightgray" fontWeight="black">Add</Button>
            </Card>
        </Box>
    
    );
}
export default AddEvent
