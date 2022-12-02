// import classes from "./Books.scss";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Book from '../../components/book/Book'
import { Row, Col, Pagination, Drawer } from "antd";
import bookCover from '../../assets/BookCover.jpg'




const Books = (props) => {
    const [title, setTitle] = useState([]);
    const [bookDetails, setBookDetails] = useState([]);

    let [favourites, setFavourites] = useState([]);
    useEffect(() => {
        props.favourites(favourites);
    }, [favourites]);

    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        // console.log(currentPage);
        try {
            showBooks();
        } catch (error) {
            // console.log(error);
        }
    }, [currentPage])


    const [allBooks, setAllBooks] = useState(null);
    useEffect(() => {
        try {
            // console.log("image", (allBooks[255].image_url));
            props.allBooks(allBooks);
            showBooks();
        } catch (error) { }
    }, [allBooks]);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const showBooks = () => {
        const colCount = 4;
        let tempRows = [];
        for (let j = 0; j < Math.ceil(50 / 4); j++) {
            let cols = [];
            for (let i = 0; i < colCount; i++) {
                if (4 * j + i < 50 && 4 * j + i + ((currentPage - 1) * 50) < allBooks.length) {
                    cols.push(
                        <Col style={{ "backgroundColor": "white" }} key={(4 * j + i + ((currentPage - 1) * 50)).toString()} span={24 / colCount}>
                            <Book
                                book={allBooks[4 * j + i + ((currentPage - 1) * 50)]}
                                isChecked={favourites.some(e => e.id === allBooks[4 * j + i + ((currentPage - 1) * 50)].id)}
                                isFavourite={handleFavourites}
                                clicked={handleClick}
                            ></Book>
                        </Col>,
                    );
                }
            }
            tempRows.push(cols);
        }
        setRows(tempRows);
    }

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = () => {
        if (props.myBooks.length < 1) {
            // console.log("test")
            fetch(process.env.REACT_APP_BASE_URL, {
                method: 'GET'
            })
                .then((response) => {
                    response.json().then(res => {
                        setAllBooks(res);
                    })
                })
                .catch((error => {
                    // console.log(error);
                }));
        }
        else {
            setAllBooks(props.myBooks)
        }
        setFavourites(props.myFavourites);
    };

    const handleFavourites = (data) => {
        // let tempFavourites = [];
        // Object.assign(tempFavourites, favourites);
        if (data.isChecked) favourites.push(data.book);
        else
            favourites = favourites.filter(book => {
                return book.id !== data.book.id;
            });
        // console.log(favourites);
        setFavourites(favourites);
    };


    const DescriptionItem = ({ title, content }) => (
        <div>
            <strong style={{ fontSize: '16px' }}>{title}: </strong>
            <p style={{ fontSize: '16px' }}>{content}</p>
        </div>
    );
    const handleClick = (data) => {
        setTitle(data.title);
        let tempBookDetails = []
        let tempCols = [];
        tempCols.push(
            <div >
                <div>
                    <img style={{ height: '300px', width: 'auto', borderRadius: "10px" }} alt={'noImg'} src={
                        data.image_url ? data.image_url : bookCover
                    } />
                </div>
            </div>
        );
        Object.keys(data).forEach(key => {
            if (key !== "id")
            tempCols.push(
                <DescriptionItem key={key} title={key.replace(/^./, key[0].toUpperCase())} content={data[key]} />
            )
        })
        tempBookDetails.push(tempCols);
        setBookDetails(tempBookDetails);

        showDrawer();
    }

    const pageChange = (page) => {
        setCurrentPage(page);
    }


    if (allBooks == null) {
        return (<div></div>)
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {rows}
            </Row>
            <Pagination
                current={currentPage}
                total={allBooks.length}
                defaultPageSize={50}
                showSizeChanger={false}
                onChange={pageChange} />
            <Drawer height="100%" title={title} placement="bottom" onClose={onClose} open={open}>
                {bookDetails}
            </Drawer>
        </div>
    );
};

export default Books;
