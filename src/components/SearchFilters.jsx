import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Box, Flex, Select} from "@chakra-ui/react";

import {filterData, getFilterValues} from "@/utils/filterData";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);

  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const {query} = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      query[item.name] = item.value;
    });

    router.push({pathname: path, query})
      .then(r => console.log(r));
  }

  return (
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
      {filters.map((filter, index) => (
        <Box key={index}>
          <Select
            placeholder={filter.placeholder}
            w='fit-content'
            p='2'
            onChange={(e) => searchProperties({[filter.queryName]: e.target.value})}
          >
            {filter?.items?.map((item, ind) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
}

export default SearchFilters;