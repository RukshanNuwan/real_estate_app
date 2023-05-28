import {useContext} from "react";
import {ScrollMenu, VisibilityContext} from "react-horizontal-scrolling-menu";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/all";
import {Box, Flex, Icon} from "@chakra-ui/react";
import Image from "next/image";

const LeftArrow = () => {
  const {scrollPrev} = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        fontSize='2xl'
        cursor='pointer'
        onClick={() => scrollPrev()}
      />
    </Flex>
  )
}

const RightArrow = () => {
  const {scrollNext} = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Icon
        as={FaArrowAltCircleRight}
        fontSize='2xl'
        cursor='pointer'
        onClick={() => scrollNext()}
      />
    </Flex>
  )
}

const ImageScrollbar = ({data}) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overflow: 'hidden'}}>
      {data.map((image, index) => (
        <Box
          width='910px'
          itemId={image.id}
          overflow='hidden'
          p='1'
          key={index}
        >
          <Image
            src={image.url}
            alt='property'
            placeholder='blur'
            blurDataURL={image.url}
            width={1000}
            height={500}
            sizes='(max-width):500px 100px, (max-width):1024px 400px, 1000px'
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}

export default ImageScrollbar;