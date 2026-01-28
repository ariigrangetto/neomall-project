import { useId, useRef } from "react";
import type { FiltersType } from "../utils/types.d.ts";
import "./SearchProducts.css";
import { Search } from "lucide-react";

interface SearchProductsProps {
  setFilter: React.Dispatch<React.SetStateAction<FiltersType>>;
  onChangeInputValue: (text: string) => void;
}

export default function SearchProducts({
  setFilter,
  onChangeInputValue,
}: SearchProductsProps) {
  const selectId = useId();
  let timeoutId = useRef<null | number>(null);
  const idText = useId();

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      onChangeInputValue(text);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className='search-section'>
        <div className='form-section'>
          <form onSubmit={handleSubmit} className='filter-form'>
            <input
              type='text'
              placeholder='Essence Mascara Lash Princess'
              onChange={handleChangeInputSearch}
              name={idText}
              className='filter-input'
            />
            <button type='submit' className='filter-search-btn'>
              <Search size={18} />
            </button>
          </form>
        </div>

        <div className='select-section'>
          <select name={selectId} id={selectId} onChange={handleSelectCategory}>
            <option value=''>Category</option>
            <option value='beauty'>Beauty</option>
            <option value='fragrances'>Fragrances</option>
            <option value='furniture'>Furniture</option>
            <option value='groceries'>Groceries</option>
            <option value='womens-watches'>Womens watches</option>
            <option value='womens-dresses'>Womens dresses</option>
            <option value='womens-jewellery'>Womens jewellery</option>
            <option value='womens-shoes'>Womens shoes</option>
            <option value='womens-bags'>Womens bags</option>
            <option value='vehicle'>Vehicle</option>
            <option value='tops'>Tops</option>
            <option value='tablets'>Tablets</option>
            <option value='sunglasses'>Sunglasses</option>
            <option value='sports-accessories'>Sports accessories</option>
            <option value='smartphones'>Smartphones</option>
            <option value='skin-care'>Skin care</option>
            <option value='motorcycle'>Motorcycle</option>
            <option value='mobile-accessories'>Mobile accessories</option>
            <option value='mens-watches'>Mens watches</option>
            <option value='mens-shoes'>Mens shoes</option>
            <option value='mens-shirts'>Mens shirts</option>
            <option value='laptops'>Laptops</option>
            <option value='kitchen-accessories'>kitchen accessories</option>
            <option value='home-decoration'>Home decoration</option>
          </select>
        </div>
      </div>
    </>
  );
}
