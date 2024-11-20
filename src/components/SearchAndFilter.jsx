import React from "react";
import { Input, Select, Flex } from "@chakra-ui/react";

const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categoryList,
}) => {
  return (
    <Flex gap={4} mb={6} flexWrap="wrap" justify="center" align="center">
      <Input
        bg="white"
        placeholder="Search events"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        width="300px"
      />

      <Select
        bg="white"
        placeholder="Filter by category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        width="200px"
      >
        <option value="">All Categories</option>
        {categoryList.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default SearchAndFilter;
