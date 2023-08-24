import './styles.css';
import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '../Input';
import { getCityByNameService, ICityProps } from '../../services/getCityByNameService';

interface IProps {
  onSelect: (item: ICityProps) => void
}

export function SelectCity({ onSelect }: IProps) {
  const [city, setCity] = useState<ICityProps | null>(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function getCities(name: string) {
    setIsLoading(true);

    const response = await getCityByNameService(name);

    if (response)
      setCity(response);

    setIsLoading(false);
  }

  useEffect(() => {
    if (search.trim().length === 0) {
      return;
    }

    const debounce = setTimeout(() => getCities(search), 800);
    return () => clearInterval(debounce);
  }, [search]);

  return (
    <div className="select">
      <Input
        isLoading={isLoading}
        placeholder="Buscar local"
        onChange={(e) => setSearch(e.target.value )}
      />

      <div className='select-list'>
        {
          city &&
          <button type="button" key={city.id} onClick={() => onSelect(city)}>
            <p>{city.name}</p>
          </button>
        }
      </div>
    </div>
  )
}
