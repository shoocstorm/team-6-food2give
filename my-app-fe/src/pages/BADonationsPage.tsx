import { Button, Card, Typography } from "@mui/material";
import Header from "../parts/Header";
import "../assets/css/donorPage.css";
import { AddCircleOutline } from "@mui/icons-material";
import FoodPosting from "../parts/donors/FoodPosting";
import { FoodPostingProps } from "@interfaces/FoodPosting";
import { useState } from "react";
import AddFoodPostingModal from "../parts/donors/AddFoodPostingModal";
import dayjs from "dayjs";
import { BeneficiaryViewModel } from "../parts/beneficiaries/BeneficiaryPosting";
import FilterBar from "../parts/beneficiaries/FilterBar";
import { useLocation } from 'react-router-dom';
import SearchBar from "../parts/components/SearchBar";
import { Link } from "react-router-dom";
import BeneficiaryPosting from "../parts/beneficiaries/BeneficiaryPosting";
import Profile from "../parts/components/Profile";

interface BaPageProps {
  baId: string;
}

const SECTIONS = ["Home", "Find Donations"]

// Keep for reference
const DUMMY_CARDS: BeneficiaryViewModel[] = [
  {
    foodPosting: {
      orderId: "ord3",
      name: "Mee Rebus",
      numOfMeals: 20,
      preparedAt: dayjs("22 August 2024 14:20"),
      consumeBy: dayjs("22 August 2024 18:20"),
      tags: ["halal", "soy"],
      recurring: false,
      image: null,
      imagePreview: "/beneficiary/food_3.png",
      selectedDays: [],
      numMealsTaken: 0,
      requests: [
        {
          orderId: "ord1",
          beneficiaryName: "Woodlands FSC",
          numOfMealsRequested: 2,
          subtitles: ["Finding driver..."],
        },
      ],
    },
    donorId: "donor1",
    donorLocation: "Location1",
    driverId: 1,
    driverName: "Driver1",
    status: "Not acquired",
  },
  {
    foodPosting: {
      orderId: "ord4",
      name: "Fried Rice",
      numOfMeals: 10,
      preparedAt: dayjs("22 August 2024 14:20"),
      consumeBy: dayjs("22 August 2024 18:20"),
      tags: ["halal", "soy"],
      recurring: false,
      image: null,
      imagePreview: "/beneficiary/food_4.jpeg",
      selectedDays: [],
      numMealsTaken: 0,
      requests: [
        {
          orderId: "ord1",
          beneficiaryName: "Woodlands FSC",
          numOfMealsRequested: 2,
          subtitles: ["Finding driver..."],
        },
      ],
    },
    donorId: "donor1",
    donorLocation: "Location1",
    status: "Listed",
    storageVolunteerName:"Loh Chee Keng",
    storageVolunteerId: 1
  },
  {
    foodPosting: {
      orderId: "ord5",
      name: "Bento",
      numOfMeals: 10,
      preparedAt: dayjs("22 August 2024 14:20"),
      consumeBy: dayjs("22 August 2024 18:20"),
      tags: ["halal", "soy"],
      recurring: false,
      image: null,
      imagePreview: "/beneficiary/food_5.png",
      selectedDays: [],
      numMealsTaken: 0,
      requests: [
        {
          orderId: "ord1",
          beneficiaryName: "Woodlands FSC",
          numOfMealsRequested: 2,
          subtitles: ["Finding driver..."],
        },
      ],
    },
    donorId: "donor1",
    donorLocation: "Location1",
    status: "Listed",
    storageVolunteerName:"Loh Chee Keng",
    storageVolunteerId: 1
  },
];
const BADonations: React.FC<BaPageProps> = ({ baId }: BaPageProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [foodDonations, setFoodDonations] = useState<BeneficiaryViewModel[]>(DUMMY_CARDS);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const filterData = (query: string, data: BeneficiaryViewModel[], filter: string): BeneficiaryViewModel[] => {
    let filteredData = data;
  
    if (query) {
      filteredData = filteredData.filter((d) =>
        d.foodPosting.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    if (filter === "Food Requests") {
      filteredData = filteredData.filter((d) => d.foodPosting.requests!.length > 0);
    } else if (filter === "Storage Required") {
      filteredData = filteredData.filter((d) => d.foodPosting.tags.includes("storage-required"));
    }
  
    return filteredData;
  };
  
  const dataFiltered = filterData(searchQuery, foodDonations, selectedFilter);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data: FoodPostingProps[] = await getFoodPosting(donorId);

  //     setFoodDonations(data);
  //   };

  //   if (!isAddModalOpen) {
  //     fetchData();
  //   }
  // }, [donorId, isAddModalOpen]);

  return (
    <>
      <Header/>

        <Profile name="Woodlands Community Center" imageUrl="/profile/woodlandsCC.jpg"/>
        
          <ul className="w-screen flex flex-row justify-around">
              {SECTIONS.map((section, idx) => {
                const word = section.toLowerCase().replace(" ", "-");
                const formattedLink = word === "home" ? "/beneficiary" : ``;

                return (
                  <li key={idx} className="relative text-lg">
                  <Link 
                    to={formattedLink} 
                    className={` no-underline ${word === "find-donations" ? 'text-white font-semibold': 'text-white/80'} `}>
                    {section}
                  </Link>
                  <hr className={`absolute left-0 right-0 top-8 ${word === "find-donations" ? 'bg-white h-1 border-0': 'hidden'}`}></hr>
                </li>
                )}
              )}

          </ul>
        <div className="w-full border-t border-2 relative top-1 bg-slate-800 border-b border-white border-opacity-10"/>
      
      <div className="flex flex-row justify-around">
        <SearchBar 
          setSearchQuery={setSearchQuery} 
          className="mt-4 w-60"
          />
        <FilterBar setFilter={setSelectedFilter} className="mt-4"/>
      </div>
      
      <div className="w-full grid grid-cols-2" >
          {dataFiltered.map((post: BeneficiaryViewModel, idx: number) => (
            <BeneficiaryPosting key={idx}  beneficiaryPosting={post} />
          ))}
      </div>
        {/* <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              style={{ height: "fit-content" }}
              onClick={() => setIsAddModalOpen(true)}
            > */}
     
        {/* <AddFoodPostingModal
          donorId={baId}
          isModalOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        /> */}
          
     
    </>
  );
};

export default BADonations;
