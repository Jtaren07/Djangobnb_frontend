'use client'

import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";
import useSearchModel from "@/app/hooks/useSearchModel";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";

export type PropertyType = {
    
    id: string;
    title: string;
    price_per_night: number;
    image_url: string;
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ 
    landlord_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchModel = useSearchModel();
    const country = searchModel.query.country;
    const numGuests = searchModel.query.guests;
    const numBathrooms = searchModel.query.bathrooms;
    const numBedrooms = searchModel.query.bedrooms;
    const checkinDate = searchModel.query.checkIn;
    const checkoutDate = searchModel.query.checkOut;
    const category = searchModel.query.category;
    const [properties, setProperties] = useState<PropertyType[]>([]);

    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id === id) {
                property.is_favorite = is_favorite;

                if (is_favorite) {
                    console.log('Marked as favorite');
                } else {
                    console.log('Unmarked as favorite');
                }
            }
            return property;
        });
        setProperties(tmpProperties);
    };

    const getProperties = async () => {
    let url = '/api/properties/';
    if (landlord_id) {
        url += `?landlord_id=${landlord_id}`;
    } else if (favorites) {
            url += '?is_favorites=true'
        } else {
            let urlQuery = '';

            if (country) {
                urlQuery += '&country=' + country
            }

            if (numGuests) {
                urlQuery += '&numGuests=' + numGuests
            }

            if (numBedrooms) {
                urlQuery += '&numBedrooms=' + numBedrooms
            }

            if (numBathrooms) {
                urlQuery += '&numBathrooms=' + numBathrooms
            }

            if (category) {
                urlQuery += '&category=' + category
            }

            if (checkinDate) {
                urlQuery += '&checkin=' + format(checkinDate, 'yyyy-MM-dd')
            }

            if (checkoutDate) {
                urlQuery += '&checkout=' + format(checkoutDate, 'yyyy-MM-dd')
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery);

                urlQuery = '?' + urlQuery.substring(1);

                url += urlQuery;
            }
        }
     
    const tmpProperties = await apiService.get(url)
        
    setProperties(tmpProperties.data.map((property: PropertyType) => {
            if (tmpProperties.favorites.includes(property.id)) {
                property.is_favorite = true
            } else {
                property.is_favorite = false
            }

            return property
        }));

    };

   useEffect(() => {
        getProperties();
    }, [category, searchModel.query, params]);


    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem 
                        key={property.id} 
                        property={property}
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    );
}

export default PropertyList;