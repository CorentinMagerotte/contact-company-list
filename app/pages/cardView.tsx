import CardComponentContact from "@/app/component/cardComponentContact";
import CardComponentCompany from "@/app/component/cardComponentCompany";

const CardView = ({data, handleCardPress} : {data: EntityUnion[], handleCardPress: (entity: EntityUnion) => void}) => {
    return data.map((entity: EntityUnion, index: number) => {
                  return entity.__typename === "Contact"
                      ? <CardComponentContact entity={entity as Contact} index={index} handleCardPress={handleCardPress}/>
                      : <CardComponentCompany entity={entity as Company} index={index} handleCardPress={handleCardPress}/>
      }
    );
};

export default CardView;
