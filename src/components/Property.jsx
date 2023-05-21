import Link from 'next/link';
import Image from 'next/image';
import {Box, Flex, Text} from '@chakra-ui/react';
import millify from "millify";
import {GoVerified} from "react-icons/go";

import defaultImage from '../assets/images/house.jpg';

const Property = ({
                    property: {
                      coverPhoto,
                      price,
                      rentFrequency,
                      rooms,
                      title,
                      baths,
                      area,
                      agency,
                      isVerified,
                      externalId
                    }
                  }) => {
  return (
    <Link href={`/property/${externalId}`} passHref>
      <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0' justifyContent='flex-start' cursor='pointer'>
        <Box>
          <Image src={coverPhoto ? coverPhoto.url : defaultImage} alt='house' width={400} height={260}/>
        </Box>

        <Box w='full'>
          <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Box paddingRight='3' color='green.400'>
                {isVerified && <GoVerified/>}
              </Box>

              <Text fontWeight='bold' fontSize='lg'>AED {price}{rentFrequency && `/${rentFrequency}`}</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
}

export default Property;