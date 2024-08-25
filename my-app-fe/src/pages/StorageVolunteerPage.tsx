import React, { useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import Header from '../parts/Header';
import InventoryPosting from '../parts/s_volunteers/InventoryPosting';
import BaPosting from '../parts/s_volunteers/BaPosting';
import Profile from "../parts/components/Profile";
import SearchBar from "../parts/components/SearchBar"

interface InventoryItem {
    name: string;
    consumeBy: string;
    tags: string[];
    quantity: number;
    image?: string;
}

interface BaItem extends InventoryItem {
    location: string;
    distance: number;
}

const StorageVolunteerPage: React.FC = () => {
    const [flag, setFlag] = useState(true);
    const [inventoryDataList, setInventoryDataList] = useState<InventoryItem[]>([
        {
            name: "Mee Rubus",
            consumeBy: "2024-09-15",
            tags: ["Dairy", "Perishable", "Refrigerated"],
            quantity: 10,
            image: "beneficiary/food_3.png",
        },
        {
            name: "Chicken Rice",
            consumeBy: "2024-09-10",
            tags: ["Protein", "Perishable", "Refrigerated"],
            quantity: 30,
            image: "beneficiary/food_2.jpeg",
        },
        {
            name: "Nasi Lemak",
            consumeBy: "2024-09-05",
            tags: ["Bakery", "Perishable"],
            quantity: 15,
            image: "beneficiary/food_1.jpeg",
        }
    ]);

    const [baDataList, setBaDataList] = useState<BaItem[]>([
        {
            name: "Mee Rubus",
            location: "Social Bakery @ 97 Main St",
            distance: 0,
            consumeBy: "2024-09-04",
            tags: ["Bakery", "Perishable"],
            quantity: 15,
            image: "beneficiary/food_3.png",
        },
        {
            name: "Chicken Rice",
            location: "ElderFoods @ 96 Main St",
            distance: 150,
            consumeBy: "2024-09-15",
            tags: ["Dairy", "Perishable", "Refrigerated"],
            quantity: 10,
            image: "beneficiary/food_2.jpeg",
        },
        {
            name: "Nasi Lemak",
            location: "EderFoods @ 96 Main St",
            distance: 150,
            consumeBy: "2024-09-10",
            tags: ["Protein", "Perishable", "Refrigerated"],
            quantity: 30,
            image: "beneficiary/food_1.jpeg",
        }
    ]);

    const handleOrder = (orderedItem: BaItem, orderQuantity: number) => {
        // Update BA item quantity
        setBaDataList(prevList =>
            prevList.map(item =>
                item.name === orderedItem.name
                    ? { ...item, quantity: item.quantity - orderQuantity }
                    : item
            )
        );

        // Add or update inventory item
        setInventoryDataList(prevList => {
            const existingItemIndex = prevList.findIndex(item => item.name === orderedItem.name);
            if (existingItemIndex !== -1) {
                // Update existing item
                return prevList.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + orderQuantity }
                        : item
                );
            } else {
                // Add new item
                return [...prevList, {
                    name: orderedItem.name,
                    consumeBy: orderedItem.consumeBy,
                    tags: orderedItem.tags,
                    quantity: orderQuantity
                }];
            }
        });
    };

    const handleGiveaway = (itemName: string, giveawayAmount: number) => {
        setInventoryDataList(prevList =>
            prevList.map(item =>
                item.name === itemName
                    ? { ...item, quantity: item.quantity - giveawayAmount }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    return (
        <>
            <Header />
            <Profile name="John" imageUrl="/profile/john.jpg" />
            <div>

                <div className="grid grid-cols-2 md:px-48 mt-5 md:mt-16">
                    <button>
                        <Typography variant="h5"
                            className={`${flag ? 'border-b-4 border-highlight !font-bold' : 'border-b-2 border-white'} `} onClick={() => setFlag(true)}>
                            Inventory
                        </Typography>
                    </button>
                    <button>
                        <Typography variant="h5" className={`${flag ? 'border-b-2 border-white' : 'border-b-4 border-highlight !font-bold'}`} onClick={() => setFlag(false)}>
                            Food nearby
                        </Typography>
                    </button>
                </div>


                <Card className="p-5">
                    <SearchBar setSearchQuery={() => { }} className="w-full" />

                    <div className={`${flag ? '' : 'hidden'} md:px-48 mt-5 md:mt-16`}>
                        <div className="grid md:grid-cols-4 grid-cols-2">
                            {inventoryDataList.map((inventoryData, idx) => (
                                <InventoryPosting key={idx} {...inventoryData} onGiveaway={handleGiveaway} />
                            ))}
                        </div>
                    </div>
                    <div className={`${flag ? 'hidden' : ''} md:px-48 mt-5 md:mt-16`}>
                        <div className="grid md:grid-cols-4 grid-cols-2">
                            {baDataList.map((baData, idx) => (
                                <BaPosting key={idx} {...baData} onOrder={handleOrder} />
                            ))}
                        </div>
                    </div>
                </Card>

            </div>
        </>
    );
};

export default StorageVolunteerPage;