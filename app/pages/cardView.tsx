import CardComponentContact from "@/app/component/cardComponentContact";
import CardComponentCompany from "@/app/component/cardComponentCompany";

/**
 * Display the card list and show the card according to the type of the entity
 * @param data The mixed list of Company and Contact
 * @param handleCardPress The function called when a click is made on the card
 */
const CardView = ({data, handleCardPress} : {data: EntityUnion[], handleCardPress: (entity: EntityUnion) => void}) => {
    return data.map((entity: EntityUnion, index: number) => {
                  return entity.__typename === "Contact"
                      ? <CardComponentContact entity={entity as Contact} index={index} handleCardPress={handleCardPress}/>
                      : <CardComponentCompany entity={entity as Company} index={index} handleCardPress={handleCardPress}/>
      }
    );
};

export default CardView;
