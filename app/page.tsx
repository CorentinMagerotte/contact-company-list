"use client";

import {useCallback, useEffect, useState} from "react";
import client from "@/app/lib/apollo-client";
import {GET_ENTITIES} from "@/app/queries/getEntities";
import ModalEdit from "@/app/modal/edit";
import CardComponentContact from "@/app/component/cardComponentContact";
import CardComponentCompany from "@/app/component/cardComponentCompany";
import {Button} from "@headlessui/react";
import ModalNew from "@/app/modal/new";
import ModalNewContact from "@/app/modal/newContact";

export default function Home() {
  const [data, setData] = useState<EntityUnion[]>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [entityToOpen, setEntityToOpen] = useState<EntityUnion | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [isNewHandled, setIsNewHandled] = useState<boolean>(false);
  const [isNewContact, setIsNewContact] = useState<boolean>(false);
  const [isNewCompany, setIsNewCompany] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData')
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

    const handleNewSelected = useCallback((selected: string) => {
      setIsNewHandled(false);
      if (selected === 'CONTACT') {
        setIsNewContact(true);
      } else if (selected === 'COMPANY') {
        setIsNewCompany(true)
      }
    }, []);

  return (
      <div
          className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {loading && <p>Loading...</p>}

          {error && <p>Error : {error.message}</p>}

          {(!loading && !error) && <Button
            type={"button"}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded self-end"
            onClick={handleNew}
            >Add</Button>
          }

          {data && (
              <div className="flex flex-wrap gap-4 justify-center w-full">
                  {data.map((entity: EntityUnion, index: number) => {
                    return entity.__typename === "Contact"
                        ? <CardComponentContact entity={entity as Contact} index={index} handleCardPress={handleCardPress}/>
                        : <CardComponentCompany entity={entity as Company} index={index} handleCardPress={handleCardPress}/>
                })}
              </div>
          )}
        </main>

        {entityToOpen !== null && <ModalEdit entity={entityToOpen} onClose={() => setEntityToOpen(null)} reload={() => setReload(!reload)} />}

        {isNewHandled && <ModalNew onClose={() => setIsNewHandled(false)} onSelect={handleNewSelected} />}

        {isNewContact && <ModalNewContact onClose={() => setIsNewContact(false)} reload={() => setReload(!reload)} />}

      </div>
  );
}
