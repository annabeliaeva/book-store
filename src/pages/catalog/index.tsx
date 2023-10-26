// pages/books.js

import { AppLayout } from '@/components/AppLayout/AppLayout';
import { useState } from 'react';

import books_catalog from '@/data/books_catalog.json'; // Импортируем данные о книгах

interface BooksList {
  id: number,
  title: string,
  author: string,
  description: string,
  cover: string
}

interface ISortState {
  sortBy: string;
  sortOrder: string;
}

const booksData = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  // Add more books here
];

const BooksCatalog = () => {
  const [books, setBooks] = useState<BooksList[]>(books_catalog);
  const [sortState, setSortState] = useState<ISortState>({
    sortBy: 'title',
    sortOrder: 'asc',
  });

  // Function to handle sorting
  const handleSort = (criteria: string) => {
    if (criteria === sortState.sortBy) {
      // If the same criteria is selected again, toggle sorting order
      setSortState({
        ...sortState,
        sortOrder: sortState.sortOrder === 'asc' ? 'desc' : 'asc'
      });
    } else {
      // If a new criteria is selected, reset sorting order to ascending
      setSortState({
        sortBy: criteria,
        sortOrder: 'asc',
      });
    }
  };

  // Sorting function
  const sortBooks = (a: BooksList, b: BooksList): number => {
    const order = sortState.sortOrder === 'asc' ? 1 : -1;

    if (sortState.sortBy === 'title') {
      return a.title.localeCompare(b.title) * order;
    } else if (sortState.sortBy === 'author') {
      return a.author.localeCompare(b.author) * order;
    }

    return 0;
  };

  // Apply sorting to the books array
  const sortedBooks = [...books].sort(sortBooks);

  // Search logic goes here

  return (
    <AppLayout>
      <div>
        <h1>Books Catalog</h1>
        {/* Sorting controls */}
        <div>
          <button onClick={() => handleSort('title')}>Sort by Title</button>
          <button onClick={() => handleSort('author')}>Sort by Author</button>
        </div>
        {/* Book list */}
        <ul>
          {sortedBooks.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};

export default BooksCatalog;
