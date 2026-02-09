import { useId, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useFilters } from "../hooks/useFilters.tsx";

export default function SearchProducts() {
  const { setFilter } = useFilters();
  const selectId = useId();
  let timeoutId = useRef<null | number>(null);
  const idText = useId();
  const [text, setText] = useState("");

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setText(title);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      setFilter((prev) => ({
        ...prev,
        title,
      }));
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className='search-section flex justify-center m-auto mt-16'>
        <div className='form-section flex justify-center m-auto'>
          <form
            onSubmit={handleSubmit}
            className='filter-form flex rounded-2xl px-2 border-blue-500 border'
          >
            <input
              type='text'
              value={text}
              placeholder='Essence Mascara Lash Princess'
              onChange={handleChangeInputSearch}
              name={idText}
              className='filter-input text-white w-2xs  p-2 rounded outline-none bg-black'
            />
            <button type='submit' className='filter-search-btn'>
              <Search size={18} color='white' />
            </button>
          </form>
        </div>

        <div className='select-section flex justify-center m-auto  rounded-2xl px-2 border-blue-500 border py-2 text-white'>
          <select
            name={selectId}
            id={selectId}
            onChange={handleSelectCategory}
            className='bg-black'
          >
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
