import { ItemHoverProps } from "@/lib/types";

const ItemHover = ({ itemName, level, quality }: ItemHoverProps) => {
  return (
    <div>
      <h4>{itemName}</h4>
      <p>Level: {level?.value}</p>
      <p>Quality:{quality?.name}</p>
    </div>
  );
};

export default ItemHover;
