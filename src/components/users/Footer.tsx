import { FaPhoneAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiPositionMarker } from "react-icons/gi";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-myBlack w-full h-64 text-myGray px-32 py-8">
      <div className="flex justify-center items-center gap-64">
        <div className="flex flex-col gap-4 mb-8">
          <div className="inline-flex gap-3 items-center">
            <FaPeopleGroup />
            <h2>Association GR</h2>
          </div>
          <div className="inline-flex gap-3 items-center">
            <GiPositionMarker />
            <h2>Lot 1M113 Andranovato Manakara</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <div className="inline-flex gap-3 items-center">
            <FaPhoneAlt />
            <h2>+261 34 98 994 56</h2>
          </div>
          <div className="inline-flex gap-3 items-center">
            <IoMail />
            <h2>Lot 1M113 Andranovato Manakara</h2>
          </div>
        </div>
      </div>
      <p className="text-center">
        Prestataire des service (Localisation des voitures, mise en place des
        système informatique, création des sites web), vente des marchandises
        générales, agro-businnes, des produits agricoles, traitement des
        données, éducation et formation professionnel, restauration et
        hôtellerie
      </p>
    </footer>
  );
}
