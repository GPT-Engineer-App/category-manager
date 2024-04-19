import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const initialCategories = Array.from({ length: 11 }, (_, i) => ({
  id: i - 3,
  bottomThreshold: Math.floor(Math.random() * 1000),
  topThreshold: Math.floor(Math.random() * 1000 + 1000),
  portionSize: `size ${Math.floor(Math.random() * 6 + 1)}`,
  company: ["Adam Mattkasse", "Godlevert", "Linas"][Math.floor(Math.random() * 3)],
  salesPrice: Math.floor(Math.random() * 500 + 100),
}));

const Index = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [formData, setFormData] = useState({
    id: "",
    bottomThreshold: "",
    topThreshold: "",
    portionSize: "",
    company: "",
    salesPrice: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedCategories = categories.map((category) => (category.id === formData.id ? { ...formData, id: Number(formData.id) } : category));
      setCategories(updatedCategories);
      toast({
        title: "Category updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setCategories([...categories, { ...formData, id: Number(formData.id) }]);
      toast({
        title: "Category added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    setFormData({
      id: "",
      bottomThreshold: "",
      topThreshold: "",
      portionSize: "",
      company: "",
      salesPrice: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (category) => {
    setFormData(category);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
    toast({
      title: "Category deleted",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" mb={5}>
        <Box flex="1" mr={2}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Category ID</FormLabel>
              <Input type="number" name="id" value={formData.id} onChange={handleInputChange} placeholder="Enter category ID" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Bottom Threshold</FormLabel>
              <Input type="number" name="bottomThreshold" value={formData.bottomThreshold} onChange={handleInputChange} placeholder="Enter bottom threshold" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Top Threshold</FormLabel>
              <Input type="number" name="topThreshold" value={formData.topThreshold} onChange={handleInputChange} placeholder="Enter top threshold" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Portion Size</FormLabel>
              <Select name="portionSize" value={formData.portionSize} onChange={handleInputChange}>
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i} value={`size ${i + 1}`}>
                    size {i + 1}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Company</FormLabel>
              <Select name="company" value={formData.company} onChange={handleInputChange}>
                <option value="Adam Mattkasse">Adam Mattkasse</option>
                <option value="Godlevert">Godlevert</option>
                <option value="Linas">Linas</option>
                <option value="Retnemt">Retnemt</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Sales Price</FormLabel>
              <Input type="number" name="salesPrice" value={formData.salesPrice} onChange={handleInputChange} placeholder="Enter sales price" />
            </FormControl>
            <Button mt={4} colorScheme="blue" type="submit">
              {isEditing ? "Update Category" : "Add Category"} <FaPlus />
            </Button>
          </form>
        </Box>
        <Box flex="2">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Bottom Threshold</Th>
                <Th>Top Threshold</Th>
                <Th>Portion Size</Th>
                <Th>Company</Th>
                <Th>Sales Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map((category) => (
                <Tr key={category.id}>
                  <Td>{category.id}</Td>
                  <Td>{category.bottomThreshold}</Td>
                  <Td>{category.topThreshold}</Td>
                  <Td>{category.portionSize}</Td>
                  <Td>{category.company}</Td>
                  <Td>{category.salesPrice}</Td>
                  <Td>
                    <Button size="sm" mr={2} onClick={() => handleEdit(category)}>
                      <FaEdit />
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(category.id)}>
                      <FaTrash />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
};

export default Index;
