import {Avatar, Box, Flex, Text} from '@chakra-ui/react';
import millify from "millify";
import {GoVerified} from "react-icons/go";
import {FaBath, FaBed} from "react-icons/fa";
import {BsGridFill} from "react-icons/bs";

import {BASE_URL, fetchApi} from "@/utils/fetchApi";
import ImageScrollbar from "@/components/ImageScrollbar";

const PropertyDetails = ({
                           propertyDetails: {
                             price,
                             rentFrequency,
                             rooms,
                             title,
                             baths,
                             area,
                             agency,
                             isVerified,
                             description,
                             type,
                             purpose,
                             furnishingStatus,
                             amenities,
                             photos
                           }
                         }) => {
  return (
    <Box maxWidth='1000px' margin='auto' p='4'>
      {photos && <ImageScrollbar data={photos}/>}

      <Box w='full' p='6'>
        <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box paddingRight='3' color='green.400'>
              {isVerified && <GoVerified/>}
            </Box>

            <Text fontWeight='bold' fontSize='lg'>AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
          </Flex>

          <Box>
            <Avatar size='sm' src={agency?.logo?.url}/>
          </Box>
        </Flex>

        <Flex
          w='250px'
          p='1'
          alignItems='center'
          justifyContent='space-between'
          color='blue.400'
        >
          {rooms} <FaBed/> | {baths} <FaBath/> | {millify(area)} sqft <BsGridFill/>
        </Flex>

        <Box marginTop='2'>
          <Text fontSize='lg' marginBottom='2' fontWeight='bold'>
            {title}
          </Text>

          <Text lineHeight='2' color='gray.600'>
            {description}
          </Text>
        </Box>

        <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
          <Flex
            justifyContent='space-between'
            w='400px'
            borderBottom='1px'
            borderColor='gray.100'
            p='3'
          >
            <Text>Type</Text>
            <Text fontWeight='bold'>{type}</Text>
          </Flex>

          <Flex
            justifyContent='space-between'
            w='400px'
            borderBottom='1px'
            borderColor='gray.100'
            p='3'
          >
            <Text>Purpose</Text>
            <Text fontWeight='bold'>{purpose}</Text>
          </Flex>

          {furnishingStatus && (
            <Flex
              justifyContent='space-between'
              w='400px'
              borderBottom='1px'
              borderColor='gray.100'
              p='3'
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight='bold'>{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>

        <Box>
          {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Amenities</Text>}

          <Flex flexWrap='wrap'>
            {amenities.map((amenity) => (
              amenity.amenities.map((item, i) => (
                <Text
                  key={i}
                  p='2'
                  m='1'
                  fontWeight='bold'
                  fontSize='1'
                  color='blue.400'
                  bg='gray.200'
                  borderRadius='5'
                >
                  {item.text}
                </Text>
              ))
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default PropertyDetails;

export async function getServerSideProps({params: {id}}) {
  const data = await fetchApi(`${BASE_URL}/properties/detail?externalId=${id}`);

  return {
    props: {
      propertyDetails: data
    }
  }
}

