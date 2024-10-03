"use client";

import React, {useCallback, useEffect, useState} from "react";
import client from "@/app/lib/apollo-client";
import {GET_ENTITIES} from "@/app/queries/getEntities";
import ModalEdit from "@/app/modal/edit";
import {Button} from "@headlessui/react";
import ModalNew from "@/app/modal/new";
import dynamic from "next/dynamic";
import {MdGridView, MdViewList, MdSunny, MdNightlight} from 'react-icons/md';
import {useTheme} from "@/app/hooks/useTheme";
import {Toggle} from "@/components/ui/toggle";
const CardView = dynamic(() => import('./pages/cardView'));
const GridView = dynamic(() => import('./pages/gridView'));
export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState<EntityUnion[]>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [entityToOpen, setEntityToOpen] = useState<EntityUnion | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [isNewHandled, setIsNewHandled] = useState<boolean>(false);
  const [view, setView] = useState<'card' | 'grid'>('card');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_ENTITIES,
        });
        console.log(data.getEntities)
        setData(data.getEntities);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData().then(() => setLoading(false));
  }, [reload]);

    const handleCardPress = useCallback((entity: EntityUnion) => {
        setEntityToOpen(entity)
    }, []);

    const handleNew = () => {
      setIsNewHandled(true);
    }

    const handleSwitchView = () => {
      setView((prevState) => prevState === 'card' ? 'grid' : 'card')
    }

  return (
      <div
          className="items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] ">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {loading && <p>Loading...</p>}

          {error && <p>Error : {error.message}</p>}

          {(!loading && !error) && (
              <div className="flex flex-wrap justify-between w-full">
                <div  className="flex flex-row gap-5">
                  <Toggle onClick={toggleTheme} className="gap-2">
                    {theme === 'light'
                        ? <MdNightlight size={20} color={'black'} />
                        : <MdSunny size={20} color={'white'} />
                    }
                    Dark Mode
                  </Toggle>
                  <Button
                      type={"button"}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded self-end flex flex-row gap-2 items-center"
                      onClick={handleSwitchView}>
                    {view === 'grid' ? <MdGridView size={20}/> : <MdViewList size={20}/>}
                    Switch view
                  </Button>
                </div>
                <Button
                    type={"button"}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNew}>
                  Create contact/company
                </Button>
              </div>
          )}

          {data && (
              <div className="flex flex-wrap gap-4 justify-center w-full">
                {view === 'grid' && <GridView data={data} handleCardPress={handleCardPress} reload={() => setReload(!reload)}/>}
                {view === 'card' && <CardView data={data} handleCardPress={handleCardPress} />}
              </div>
          )}
        </main>

        {entityToOpen !== null &&
            <ModalEdit entity={entityToOpen} onClose={() => setEntityToOpen(null)} reload={() => setReload(!reload)}/>
        }

        {isNewHandled && <ModalNew onClose={() => setIsNewHandled(false)} reload={() => setReload(!reload)}/>}

      </div>
  );
}
