import {useState} from "react";
import {useRouter} from "next/router";
import {Box, Flex, Icon, Text} from "@chakra-ui/react";
import {BsFilter} from "react-icons/bs";
import Image from "next/image";

import SearchFilters from "@/components/SearchFilters";
import Property from "@/components/Property";
import noresult from '@/assets/images/noresult.svg';
import {BASE_URL, fetchApi} from "@/utils/fetchApi";

const Search = ({properties}) => {
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

      {isSearchFilters && <SearchFilters/>}

      <Text fontSize='2xl' p='4' fontWeight='bold'>
        properties {router.query.purpose}
      </Text>

      <Flex flexWrap='wrap'>
        {
          properties.map((property, index) => <Property key={index} property={property}/>)
        }
      </Flex>

      {properties.length === 0 && (
        <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
          <Image src={noresult} alt='no-result'/>
          <Text fontSize='2xl' marginTop='3'>No Results Found</Text>
        </Flex>
      )}
    </Box>
  )
}

export default Search;

export const getServerSideProps = async ({query}) => {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIds = query.locationExternalIds || '5002';
  const categoryExternalId = query.categoryExternalId || '4';

  const data = await fetchApi(`${BASE_URL}/properties/list?locationExternalIds=${locationExternalIds}&purpose=${purpose}&categoryExternalId=${categoryExternalId}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits
    }
  }
}