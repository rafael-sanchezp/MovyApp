/* eslint-disable no-unused-vars */
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Loading from 'components/loading';
import { GET_MOVIES } from 'graphql/queries';
import Card, { ItemInterface } from 'components/card';

import Trailer from './trailer';
import Preview from './preview';
import About from './about';

type CardProps = {
  title: string;
  items: ItemInterface[];
  showPercentage?: boolean;
  type?: 'wide' | 'large';
  scale?: boolean;
  border?: boolean;
  openTrailer?: boolean;
};
const Home = () => {
  const history = useHistory();
  const [currentItem, setItem] = useState<ItemInterface>();

  const { data, loading } = useQuery(GET_MOVIES);

  if (loading) return <Loading />;

  const movies: ItemInterface[] = data.getMovies.items;

  const sectionCards = ({
    title,
    items,
    showPercentage = false,
    type = 'wide',
    scale = true,
    border = false,
    openTrailer = true,
  }: CardProps) => (
    <div>
      <div className="container text-2xl mx-auto">{title}</div>
      <div
        className={`flex mt-1 pb-6 relative  w-full container-movies overflow-x-scroll overflow-y-hidden  items-center container-card ${
          type === 'large' ? 'p-6' : 'py-0'
        }`}
      >
        {items.map((item, index) => (
          <div className="mx-1 z-0" key={item.id}>
            <Card
              item={item}
              scale={scale}
              type={type}
              index={index}
              onSelected={() => {
                if (openTrailer) history.push(`/trailer/${item.id}`);
                setItem(item);
              }}
              border={border}
              idSelected={currentItem?.id}
            />
            {showPercentage && (
              <div className="relative w-full h-1.5 bg-gray-200 rounded">
                <div
                  className="absolute h-full bg-blue-500 rounded"
                  style={{ width: `${Math.random() * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="bg-black flex flex-col text-white">
      {movies && <Trailer {...movies[0]} />}
      {sectionCards({ title: 'My List', items: movies })}
      {sectionCards({ title: 'Popular on Movy', items: movies })}
      {sectionCards({
        title: 'Continue Watching for John',
        items: movies,
        showPercentage: true,
      })}
      {currentItem && <Preview {...movies[1]} />}
      {sectionCards({
        title: 'Most Viewed',
        items: movies,
        type: 'large',
      })}
      {sectionCards({
        title: 'Recommended movies',
        items: movies,
        border: true,
        scale: false,
        openTrailer: false,
      })}
      <About item={currentItem || movies[0]} />
    </div>
  );
};

export default Home;
