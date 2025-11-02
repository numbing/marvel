import { FormEvent, useEffect, useState } from 'react';
import { Button, Form, Input, InputGroup, InputGroupText } from 'reactstrap';

interface SearchBarProps {
  initialQuery?: string;
  isLoading?: boolean;
  onSearch: (query: string) => void;
}

const SearchBar = ({ initialQuery = '', isLoading = false, onSearch }: SearchBarProps) => {
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value);
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <InputGroup size="lg">
        <InputGroupText aria-hidden="true">🔍</InputGroupText>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search for a comic issue, e.g. “Hulk” or “Spider-Man”"
          aria-label="Search comic issues"
        />
        <Button color="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
