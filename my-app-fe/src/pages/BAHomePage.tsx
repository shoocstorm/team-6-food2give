import { Button, Card, Typography } from "@mui/material";
import Header from "../parts/Header";
import "../assets/css/donorPage.css";
import { AddCircleOutline, Search } from "@mui/icons-material";
import FoodPostingViewModal from "../parts/donors/FoodPostingViewModal";
import BeneficiaryPosting from "../parts/beneficiaries/BeneficiaryPosting";
import { BeneficiaryViewModel } from "../parts/beneficiaries/BeneficiaryPosting";
import { useState } from "react";
import AddFoodPostingModal from "../parts/donors/AddFoodPostingModal";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import SearchBar from "../parts/components/SearchBar";
import { useLocation } from 'react-router-dom';
import FilterBar from "../parts/beneficiaries/FilterBar";

interface BaPageProps {
  baId: string;
}

const SECTIONS = ["Home", "Find Donations"]

// Keep for reference
const DUMMY_CARDS: BeneficiaryViewModel[] = [
  {
    foodPosting: {
      orderId: "ord1",
      name: "Nasi Lemak",
      numOfMeals: 20,
      preparedAt: dayjs("22 August 2024 14:20"),
      consumeBy: dayjs("22 August 2024 18:20"),
      tags: ["halal", "soy"],
      recurring: false,
      image: null,
      imagePreview: "/beneficiary/food_1.jpeg",
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
    status: "Delivering",
    location: "Ang Mokio",
  },
  {
    foodPosting: {
      orderId: "ord1",
      name: "Chicken Rice",
      numOfMeals: 10,
      preparedAt: dayjs("22 August 2024 14:20"),
      consumeBy: dayjs("22 August 2024 18:20"),
      tags: ["halal", "soy"],
      recurring: false,
      image: null,
      imagePreview: "/beneficiary/food_2.jpeg",
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
    location: "Pasir ris CP",
    status: "Listed",
    storageVolunteerName:"Loh Chee Keng",
    storageVolunteerId: 1
  },
  {
    foodPosting: {
      orderId: "ord1",
      name: "Chicken Rice",
      numOfMeals: 10,
      preparedAt: dayjs("22 August 2024 14:20"),
      consumeBy: dayjs("22 August 2024 18:20"),
      tags: ["halal", "soy"],
      recurring: false,
      image: null,
      imagePreview: "/beneficiary/food_2.jpeg",
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
    status: "Not acquired",
    storageVolunteerName:"Loh Chee Keng",
    storageVolunteerId: 1,
    location: "Changi Airport"
  },
];

const BAHomePage: React.FC<BaPageProps> = ({ baId }: BaPageProps) => {
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
      <Header title={`Food Hero`} />
        <Typography variant="h5" fontWeight="semibold" align="left" className="p-4">
            Welcome {baId}
        </Typography>
        
          <ul className="w-screen flex flex-row justify-around">
              {SECTIONS.map((section, idx) => {
                const word = section.toLowerCase().replace(" ", "-");
                const formattedLink = word == "home" ? "" : section.toLowerCase().replace(" ", "-");

                return (
                  <li key={idx} className="relative text-xl text-white">
                  <Link to={`${location.pathname}${formattedLink ? `/${formattedLink}` : ""}`} className="text-white no-underline">
                    {section}
                  </Link>
                  <hr className={`absolute left-0 right-0 top-8 ${word === "home" ? 'bg-white h-1 border-0': 'hidden'}`}></hr>
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

export default BAHomePage;
