type imageProps = {
  src?: string;
  taille?: number;
};
export default function Image({ src, taille = 50 }: imageProps) {
  return (
    <img
      src={src}
      style={{ width: `${taille}px` }}
      className={`aspect-square object-cover rounded-full border-2 border-myYellow`}
    />
  );
}
