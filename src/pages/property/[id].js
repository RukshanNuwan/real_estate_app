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

