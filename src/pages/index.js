import Link from 'next/link';
import Image from 'next/image';
import {Flex, Box, Text, Button} from '@chakra-ui/react';

import {BASE_URL, fetchApi} from "@/utils/fetchApi";
import Property from "@/components/Property";

const Banner = ({purpose, imageUrl, title_1, title_2, desc_1, desc_2, linkName, buttonText}) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image
      src={imageUrl}
      priority
      alt='banner'
      width={500}
      height={300}
    />

    <Box p='5'>
      <Text
        color='gray.500'
        fontSize='sm'
        fontWeight='medium'
      >
        {purpose}
      </Text>

      <Text fontSize='3xl' fontWeight='bold'>{title_1} <br/> {title_2}</Text>

      <Text
        fontSize='lg'
        fontWeight='medium'
        paddingTop='3'
        paddingBottom='3'
        color='gray.700'
      >
        {desc_1} <br/> {desc_2}
      </Text>

      <Button fontSize='xl'>
        <Link href={linkName}>
          {buttonText}
        </Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({propertiesForSale, propertiesForRent}) {
  return (
    <Box>
      <Banner
        purpose='RENT A HOME'
        title_1='Rental Homes for'
        title_2='Everyone'
        desc_1='Explore Apartments, Villas, Homes'
        desc_2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />

      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property, index) => (
          <Property property={property} key={index}/>
        ))}
      </Flex>

      <Banner
        purpose='BUY A HOME'
        title_1='Find, Buy & Own Your'
        title_2='Dream Home'
        desc_1='Explore Apartments, Villas, Homes'
        desc_2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />

      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property, index) => (
          <Property property={property} key={index}/>
        ))}
      </Flex>
    </Box>
  )
}

export const getStaticProps = async () => {
  const propertyForSale = await fetchApi(`${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits
    }
  }
}