import React, { useEffect, useState } from 'react';

import SearchBar from './SearchBar';
import useFetchData from '../hooks/useFetchData';
import loadingAnimation from './LoadingAnimation';
import ItemCard from './ItemCard';
import { DeleteIcon } from '@chakra-ui/icons';
import { SimpleGrid, VStack, Container } from '@chakra-ui/react';
import PageTitle from './PageTitle';

type Item = {
    id: string,
    name: string,
    description: string,
    imageUrl: string
}

function ItemList() {
  // TODO: Replace URL with actual API endpoint
  const { data: items, isLoading } = useFetchData<Item>('https://dummyjson.com/products/category/smartphones?limit=8', 'products');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  // Update `filteredItems` list whenever `items` updated
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  // Filter function for Item Search Bar
  const handleItemSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filteredQueries = items.filter(item => item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery));
    setFilteredItems(filteredQueries);
  };

  const button = {
    label: 'Delete Item',
    icon: <DeleteIcon />,
    variant: 'solid',
    colorScheme: '',
    onClick: () => console.log('Deleting item from list...'),

  };

  // Create a list of ItemCards based on filteredItems
  const renderItemList = (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {filteredItems.length <= 0 ? <p>No items found</p>
        : filteredItems.map(item => (
          <ItemCard
            key={item.id}
            itemData={{ title: item.name, description: item.description, itemImage: item.imageUrl }}
            button={button}
          />
        ))
      }
    </SimpleGrid>
  );

  // Display ItemCards in a grid format
  return (
    <Container maxW="container.xl" centerContent p={'0'}>
      <VStack bg={'background'} px={10} pt={14} alignItems={'center'} pb={10} spacing={4}>

        <PageTitle title={'Your Wishlist'}></PageTitle>
        <SearchBar onSearch={handleItemSearch} />

        {isLoading ? loadingAnimation : renderItemList}

      </VStack>
    </Container>
  );
}

export default ItemList;
