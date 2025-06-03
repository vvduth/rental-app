import Card from '@/components/Card'
import { useAddFavoritePropertyMutation, useGetAuthUserQuery, useGetPropertiesQuery, useRemoveFavoritePropertyMutation } from '@/state/api'
import { useAppSelector } from '@/state/redux'
import { Property } from '@/types/prismaTypes'
import React from 'react'

const Listings = () => {
    const {data:authUser} = useGetAuthUserQuery()
    const[addFav] = useAddFavoritePropertyMutation()
    const [removeFav] = useRemoveFavoritePropertyMutation()
    const viewMode = useAppSelector((state) => state.global.viewMode)
    const filters = useAppSelector((state) => state.global.filters)

    const {
        data: properties,
        isLoading,
        isError,
    } = useGetPropertiesQuery(filters);

    const handleFavoriteToggle = async (propertyId: number) => {
        if (!authUser) return 
        const isFavorite = authUser.userInfo.favorites.some(
            (fav: Property) => fav.id === propertyId
        )
        if (isFavorite) {
            await removeFav({ cognitoId: authUser.cognitoInfo.userId, propertyId });
        } else {
            await addFav({ cognitoId: authUser.cognitoInfo.userId, propertyId });
        }

        if (isLoading) {
            return <div>Loading...</div>;
        }
        if (isError || !properties) {
            return <div>Error loading properties</div>;
        }
    }
  return (
    <div className='w-full'>
        <h3 className='text-sm px-4 font-bold'>
            {properties?.length}{' '}
            <span className='text-gray-700 font-normal'>
                Places in {filters.location}
            </span>
        </h3>
        <div className='flex'>
            <div className="p-4 w-full">
                {properties?.map((property: Property) => (
                    viewMode === 'grid' ? (
                        <Card 
                            key={property.id}
                            property={property}
                            isFavorite={authUser?.userInfo.favorites.some((fav:Property) => fav.id === property.id) || false}
                            onFavoriteToggle={() => handleFavoriteToggle(property.id)}

                        />
                    ) :(<>
                        listcard
                    </>)
                ))}
            </div>
        </div>
    </div>
  )
}

export default Listings