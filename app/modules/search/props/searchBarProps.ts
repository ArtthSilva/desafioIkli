interface ISearchBarProps {
    searchQuery: string;
    handleSearch: (query: string) => void;
    openFilterModal: () => void;
  }