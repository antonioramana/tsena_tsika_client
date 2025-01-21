import { FaStar } from "react-icons/fa6";
import { Image } from "..";
type temoignageProps = {
  nom: string;
  pdp: string;
};
export default function Temoignage({ nom, pdp }: temoignageProps) {
  return (
    <div className="bg-myYellowLin w-72 h-[350px] rounded-lg overflow-hidden shadow-lg flex flex-col items-center p-5">
      <Image src={pdp} taille={80} />
      <h2 className="font-bold text-xl text-myGray">{nom}</h2>
      <div className="flex gap-2">
        <FaStar className="text-myYellow text-4xl" />
        <FaStar className="text-myYellow text-4xl" />
        <FaStar className="text-myYellow text-4xl" />
        <FaStar className="text-myYellow text-4xl" />
        <FaStar className="text-myYellow text-4xl" />
      </div>
      <p className="text-myGray">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
        dolores nisi voluptatum omnis, alias explicabo earum eum odit a aut
        placeat quibusdam, unde distinctio cupiditate quis quas officia dolor
        libero.
      </p>
    </div>
  );
}
