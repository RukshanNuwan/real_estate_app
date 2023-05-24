import {useState} from "react";
import {useRouter} from "next/router";
import {Box, Flex, Icon, Text} from "@chakra-ui/react";
import {BsFilter} from "react-icons/bs";

import SearchFilters from "@/components/SearchFilters";

const Search = () => {
  const [isSearchFilters, setIsSearchFilters] = useState(false);

  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor='pointer'
        bg='gray.100'
        borderbottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
        onClick={() => setIsSearchFilters(!isSearchFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter}/>
      </Flex>

      {isSearchFilters && (
        <SearchFilters/>
      )}
    </Box>
  )
}

export default Search;