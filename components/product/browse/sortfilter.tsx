import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SortFilterProps = {
  sortFilterHandler: (sort: string) => void;
};

const SortFilter = ({ sortFilterHandler }: SortFilterProps) => {
  const searchParams = useSearchParams();
  let selectedSort = searchParams.get("sort") || "";
  const handleSelectChange = (value: string) => {
    console.log(value);
    sortFilterHandler(value);
  };
  return (
    <Select value={selectedSort} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="newest">New Arrivals</SelectItem>
          <SelectItem value="topSelling">Top Selling</SelectItem>
          <SelectItem value="topreviewed">Top reviewed</SelectItem>
          <SelectItem value="priceLowToHigh">Price (low to high)</SelectItem>
          <SelectItem value="priceHighToLow">Price (high to low)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortFilter;
