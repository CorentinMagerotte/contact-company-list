"use client";

import {useEffect, useState} from "react";
import client from "@/app/lib/apollo-client";
import {GET_ENTITIES} from "@/app/queries/getEntities";
import ModalEdit from "@/app/modal/edit";
import CardComponentContact from "@/app/component/cardComponentContact";
import CardComponentCompany from "@/app/component/cardComponentCompany";

export default function Home() {
  const [data, setData] = useState<EntityUnion[]>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [entityToOpen, setEntityToOpen] = useState<EntityUnion | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_ENTITIES,
        });
        setData(data.getEntities);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData().then(() => setLoading(false));
  }, [reload]);

    const handleCardPress = (entity: EntityUnion) => {
        setEntityToOpen(entity)
    };

  return (
      <div
          className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {loading && <p>Loading...</p>}

          {error && <p>Error : {error.message}</p>}

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

      </div>
  );
}
