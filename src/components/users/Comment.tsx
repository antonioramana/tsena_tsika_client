import { AiOutlineLike } from "react-icons/ai";
import { pdp } from "../../assets";
import { FaComment } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { Image } from "..";
export default function Comment() {
  return (
    <div className="w-[1200px] h-[400px] mb-12 bg-myWhite rounded-xl shadow-xl p-8 overflow-hidden">
      <div className="flex items-center gap-4">
        <Image src={pdp} taille={80} />
        <h2 className="font-bold text-myMarron">Eloi Jospin</h2>
        <h2 className="text-gray-600">26 min</h2>
      </div>
      <p className="mx-20 text-gray-600 text-lg max-h-[80px] overflow-auto scrollbar-hide mb-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque dolore
        odio vel beatae repellat necessitatibus commodi totam deleniti
        voluptatibus pariatur quas magni ipsam similique nulla, suscipit nihil
        sit neque? Aspernatur! Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Atque dolore odio vel beatae repellat necessitatibus
        commodi totam deleniti voluptatibus pariatur quas magni ipsam similique
        nulla, suscipit nihil sit neque? Aspernatur! Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Atque dolore odio vel beatae repellat
        necessitatibus commodi totam deleniti voluptatibus pariatur quas magni
        ipsam similique nulla, suscipit nihil sit neque? Aspernatur! Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Atque dolore odio
        vel beatae repellat necessitatibus commodi totam deleniti voluptatibus
        pariatur quas magni ipsam similique nulla, suscipit nihil sit neque?
        Aspernatur! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Atque dolore odio vel beatae repellat necessitatibus commodi totam
        deleniti voluptatibus pariatur quas magni ipsam similique nulla,
        suscipit nihil sit neque? Aspernatur! Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Atque dolore odio vel beatae repellat
        necessitatibus commodi totam deleniti voluptatibus pariatur quas magni
        ipsam similique nulla, suscipit nihil sit neque? Aspernatur!
      </p>
      <div className="border-t-2 border-myYellow h-[50px] mx-20 py-4 my-8">
        <div className="flex items-center justify-between">
          <div className="inline-flex gap-1">
            <div className="relative rounded-full overflow-hidden bg-black">
              <div className="opacity-50">
                <Image src={pdp} taille={50} />
              </div>
              <p className="text-white font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                +42
              </p>
            </div>
            <Image src={pdp} taille={50} />
            <Image src={pdp} taille={50} />
            <Image src={pdp} taille={50} />
          </div>
          <div className="inline-flex items-center text-2xl font-bold">
            <AiOutlineLike />
            <h2>45</h2>
          </div>
          <div className="inline-flex items-center text-2xl font-bold">
            <FaComment />
            <h2>36</h2>
          </div>
          <BsThreeDots className="text-2xl font-bold" />
        </div>
      </div>
      <div className="p-2 flex items-center gap-4">
        <Image />
        <div className="relative">
          <input
            type="text"
            placeholder="Votre commentaire"
            className="bg-myGray py-4 indent-4 outline-none rounded-full w-[400px]"
          />
          <IoSend className="text-2xl absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
