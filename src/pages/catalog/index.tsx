
import { AppLayout } from '@/components/AppLayout/AppLayout'
import { useState } from 'react'

import books_catalog from '@/data/books_catalog.json' // Импортируем данные о книгах
import '@/styles/globals.css'
import { BooksList } from '@/interfaces/BooksList'
import BooksCatalog from '@/components/BooksCatalog/BooksCatalog'
import { PrismaClient } from '@prisma/client'

const Catalog = ({ books }) => {

  const [sortedBooks, setSortedBooks] = useState<BooksList[]>(books)

  const sortBooks = (criteria: string) => {
    const sorted = [...sortedBooks];
    if (criteria === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === 'popularity') {
      // sorted.sort((a, b) => a.author.localeCompare(b.author));
      sorted.sort((a, b) => a.popularity - b.popularity);
    }
    setSortedBooks(sorted);
    console.log(sorted)
  };

  // Search logic goes here
  const searchBooks = (query: string, books: BooksList[]): void => {
    let results = null
    const queryWords = query.toLowerCase().split(' ');
    if (query === '')
      results = [...books]
    else {
      results = books.filter((book) => {
        const titleWords = book.title.toLowerCase().split(' ');
        const authorWords = book.author.toLowerCase().split(' ');

        // Check if any query word partially matches the first word of title or author
        const titleMatch = titleWords.some((titleWord) =>
          queryWords.some((queryWord) => titleWord.startsWith(queryWord))
        );

        const authorMatch = authorWords.some((authorWord) =>
          queryWords.some((queryWord) => authorWord.startsWith(queryWord))
        );

        return titleMatch || authorMatch;
      });

    }
    setSortedBooks(results);
  };

  return (
    <AppLayout>
      <BooksCatalog handleSort={sortBooks} handleSearch={searchBooks} initial_list={books} data={sortedBooks} />
    </AppLayout>
  );
};

export async function getServerSideProps() {

  let prisma = new PrismaClient
  const books = await prisma.book.findMany()

  return {
    props: {
      books: JSON.parse(JSON.stringify(books)),
    },
  };
}


export default Catalog;
