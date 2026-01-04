use client
import { Button, Card, Input, Select, Table, Dialog, Form } from '@/components/ui/components.shadcn';
import { Dialog as RadixDialog, DropdownMenu, Tabs, Switch } from '@radix-ui/react-primitives';
import { ChevronRightIcon, PlusIcon, MinusIcon, TrashIcon, PencilIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'next/navigation';
import { DashboardWidget, AnalyticsChart } from '@/components/custom/components.custom';

interface Restaurant {
  id: number;
  name: string;
  status: string;
  rating: number;
}

const initialRestaurants: Restaurant[] = [
  { id: 1, name: 'Burger King', status: 'Open', rating: 4 },
  { id: 2, name: 'Pizza Hut', status: 'Closed', rating: 3 },
  { id: 3, name: 'KFC', status: 'Open', rating: 5 }
];

export default function RestaurantManagement() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const navigate = useNavigate();

  const handleAddRestaurant = () => {
    setRestaurants([...restaurants, { id: Math.floor(Math.random() * 100), name: '', status: 'Open', rating: 0 }]);
  }

  const handleDeleteRestaurant = (id: number) => {
    setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
  }

  const handleToggleStatus = (id: number) => {
    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === id) {
        return { ...restaurant, status: restaurant.status === 'Open' ? 'Closed' : 'Open' }
      }
      return restaurant;
    });
    setRestaurants(updatedRestaurants);
  }

  const handleUpdateRating = (id: number, rating: number) => {
    setRestaurants(restaurants.map(restaurant => {
      if (restaurant.id === id) {
        return { ...restaurant, rating: rating }
      }
      return restaurant;
    }));
  }

  return (
    <div className='flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white'>
      <header className='bg-primary p-4 flex justify-between items-center dark:bg-gray-800'>
        <h1 className='text-2xl font-bold'>Restaurant Management</h1>
        <Button variant='outline' onClick={() => navigate('/create-restaurant')}>Create New</Button>
      </header>
      <main className='flex-1 px-4 py-4 dark:bg-gray-800'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className='shadow-lg rounded-md overflow-hidden'>
              <div className='p-4'>
                <div className='flex items-center mb-2'>
                  <span className='mr-2'>{restaurant.name}</span>
                  <Switch checked={restaurant.status === 'Open'} onCheckedChange={handleToggleStatus.bind(null, restaurant.id)} className='relative inline-flex items-center h-6 w-12 rounded-full bg-gray-200 transition duration-200 ease-in-out group relative before:absolute before:inset-1/2 before:right-1/2 before:bg-primary before:content-[''] after:absolute after:inset-1/2 after:right-1/2 after:bg-white after:content-[''] after:opacity-0 hover:after:opacity-100 after:transition-all after:ease-in-out after:duration-200'>
                    <span className='sr-only'>Toggle switch</span>
                    <span className='absolute inset-0 flex items-center justify-center'>
                      <span className='relative inline-flex flex-shrink-0 h-5 w-5 rounded-full bg-white shadow-inner before:absolute before:inset-1/2 before:right-1/2 before:bg-primary before:content-[''] before:transition-all before:ease-in-out before:duration-200 before:opacity-0 before:hover:opacity-100 before:transform before:translate-x-4 before:transformOrigin-center before:transition-transform'></span>
                    </span>
                  </Switch>
                </div>
                <p className='text-xl font-semibold mb-2'>{restaurant.name}</p>
                <div className='flex items-center mb-2'>
                  <span className='mr-2'>Status: </span>
                  <span>{restaurant.status}</span>
                </div>
                <div className='flex items-center mb-2'>
                  <span className='mr-2'>Rating: </span>
                  <span>{restaurant.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <aside className='w-[25%] bg-secondary p-4 border-l-2 border-primary dark:bg-gray-700 dark:border-primary'>
        <button onClick={handleAddRestaurant} className='block w-full p-4 rounded-md bg-secondary text-white font-semibold dark:bg-gray-800 dark:text-secondary'>Add New Restaurant</button>
      </aside>
      <footer className='bg-primary p-4 flex justify-end items-center dark:bg-gray-800'>
        <span>Footer content here</span>
      </footer>
    </div>
  );
}
