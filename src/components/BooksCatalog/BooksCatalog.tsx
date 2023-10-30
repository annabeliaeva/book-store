import { Button, Container, Form } from "react-bootstrap"
import BookList from "../BookList/BookList"
import { BooksList } from "@/interfaces/BooksList"
import styles from './BooksCatalog.module.css'
import { useState } from "react"

interface Props {
    handleSort: (criteria: string) => void,
    handleSearch: (query: string, books: BooksList[]) => void,
    data: BooksList[]
    initial_list: BooksList[]
}


const BooksCatalog = (props: Props) => {

    const [query, setQuery] = useState('')

    const { handleSort, handleSearch, initial_list, data } = props

    let searched_data = [...data]

    return (
        <>
            <h2 className={styles.header}>Каталог</h2>
            <div className='bookList' >
                <Container className='flex-col'>
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        handleSearch(query, initial_list)
                    }
                    } >
                        <Form.Group
                            className={`flex-row flex-align-center mb-3 ${styles.search_form}`}
                            controlId='searchField'>
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                }
                                }
                                value={query}
                                placeholder='Введите название книги или автора...' />
                            <Button
                                variant="secondary"
                                type="submit">Искать
                            </Button>
                        </Form.Group>
                    </Form>
                    <div className={`flex-row ${styles.sort_form} flex-align-center`}>
                        <div>Сортировать:</div>
                        <Form.Select
                            id='select-sort'
                            onChange={(e) => {
                                const selectedValue = e.target.value
                                handleSort(selectedValue)
                            }}>
                            <option value='price'>по цене</option>
                            <option value='popularity'>по популярности</option>
                        </Form.Select>
                    </div>
                </Container>
                <BookList data={data} />
            </div >
        </>
    )
}

export default BooksCatalog