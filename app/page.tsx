"use client";

import {useEffect, useState} from "react";
import client from "@/app/lib/apollo-client";
import {GET_ENTITIES} from "@/app/queries/getEntities";
import { MdApartment, MdContacts } from 'react-icons/md';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ModalEdit from "@/app/modal/edit";
export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [entityToOpen, setEntityToOpen] = useState(false);

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
  }, []);

    const handleCardPress = (entity) => {
        setIsOpen(true);
        setEntityToOpen(entity)
    };

  return (
      <div
          className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {loading && <p>Loading...</p>}

          {error && <p>Error : {error.message}</p>}

          {data && (
              <div className="list-disc flex flex-row space-x-10">
                {data.map((entity, index) => {
                    const isContact = entity.__typename === "Contact";
                    return (
                        <Card key={index} onClick={() => handleCardPress(entity)} style={{ cursor: 'pointer' }}>
                            <CardHeader>
                                <CardTitle>{entity.name}</CardTitle>
                                <CardDescription>
                                    {isContact
                                        ? <div className="flex flex-row items-center"><MdContacts size={20} color="black" style={{marginRight: 5}}/><span>Contact</span></div>
                                        : <div className="flex flex-row items-center"><MdApartment size={20} color="black" style={{marginRight: 5}}/><span>Company</span></div>
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{isContact ? `Email: ${entity.email}` : `Industry: ${entity.industry}`}</p>
                            </CardContent>
                        </Card>
                    )
                })}
              </div>
          )}
        </main>

        {isOpen && <ModalEdit entity={entityToOpen} onClose={() => setIsOpen(false)} />}

      </div>
  );
}
