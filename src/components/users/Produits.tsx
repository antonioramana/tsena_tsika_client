type produitProps = {
  image: string;
  title: string;
};
export default function Produits({ image, title }: produitProps) {
  return (
    <div className="bg-myWhite w-64 h-[350px] rounded-xl overflow-hidden shadow-lg border-2 border-myYellow my-8">
      <img src={image} className="h-64 w-full object-cover" />
      <h2 className="font-bold text-2xl m-4">{title}</h2>
    </div>
  );
}
