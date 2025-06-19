
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

interface FilterState {
  carType: string[];
  priceRange: string;
  brand: string[];
  status: string[];
}

interface CarFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const CarFilters = ({ onFiltersChange, isOpen, onToggle }: CarFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    carType: [],
    priceRange: '',
    brand: [],
    status: []
  });

  const carTypes = ['Sports Car', 'Luxury', 'SUV', 'Supercar', 'Electric'];
  const brands = ['Lamborghini', 'Porsche', 'BMW', 'Ferrari', 'McLaren', 'Aston Martin'];
  const priceRanges = ['Under $100k', '$100k - $200k', '$200k - $500k', 'Over $500k'];
  const statuses = ['Active', 'Ending Soon'];

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    let newFilters = { ...filters };
    
    if (category === 'priceRange') {
      newFilters.priceRange = newFilters.priceRange === value ? '' : value;
    } else {
      const currentArray = newFilters[category] as string[];
      if (currentArray.includes(value)) {
        newFilters[category] = currentArray.filter(item => item !== value);
      } else {
        newFilters[category] = [...currentArray, value];
      }
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      carType: [],
      priceRange: '',
      brand: [],
      status: []
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = filters.carType.length > 0 || filters.priceRange || filters.brand.length > 0 || filters.status.length > 0;

  if (!isOpen) {
    return (
      <Button 
        onClick={onToggle}
        variant="outline" 
        className="text-white border-white/20 bg-black/20"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
        {hasActiveFilters && (
          <Badge className="ml-2 bg-blue-600 text-white">
            {filters.carType.length + filters.brand.length + filters.status.length + (filters.priceRange ? 1 : 0)}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="bg-black/20 border-white/10 w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Filters</CardTitle>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button 
              onClick={clearAllFilters}
              variant="outline" 
              size="sm"
              className="text-white border-white/20"
            >
              Clear All
            </Button>
          )}
          <Button 
            onClick={onToggle}
            variant="outline" 
            size="sm"
            className="text-white border-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-white font-medium mb-3">Car Type</h4>
          <div className="flex flex-wrap gap-2">
            {carTypes.map(type => (
              <Badge
                key={type}
                onClick={() => handleFilterChange('carType', type)}
                className={`cursor-pointer ${
                  filters.carType.includes(type) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Brand</h4>
          <div className="flex flex-wrap gap-2">
            {brands.map(brand => (
              <Badge
                key={brand}
                onClick={() => handleFilterChange('brand', brand)}
                className={`cursor-pointer ${
                  filters.brand.includes(brand) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {brand}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Price Range</h4>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map(range => (
              <Badge
                key={range}
                onClick={() => handleFilterChange('priceRange', range)}
                className={`cursor-pointer ${
                  filters.priceRange === range 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {range}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Status</h4>
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <Badge
                key={status}
                onClick={() => handleFilterChange('status', status)}
                className={`cursor-pointer ${
                  filters.status.includes(status) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarFilters;
