import React, { useEffect, useState } from "react";
import Book from '../../components/book/Book'
import { Row, Col, Pagination, Drawer } from "antd";
import bookCover from '../../assets/BookCover.jpg'



const Favourites = (props) => {
    const [title, setTitle] = useState([]);
    const [favourites, setFavourites] = useState([]);
    useEffect(() => {
        // console.log(favourites);
        props.favourites(favourites);
        showBooks();
    }, [favourites]);

    useEffect(() => {
        getFavourites();
    }, []);

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

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [bookDetails, setBookDetails] = useState([]);



    const getFavourites = () => {
        setFavourites(props.myFavourites);
    }

    const handleFavourites = (data) => {
        let tempFavourites = [];
        Object.assign(tempFavourites, favourites);
        if (data.isChecked) tempFavourites.push(data.book);
        else
            tempFavourites = tempFavourites.filter(book => {
                return book.id !== data.book.id;
            });
        setFavourites(tempFavourites);
    };

    const showBooks = () => {
        const colCount = 4;
        let tempRows = [];
        for (let j = 0; j < Math.ceil(50 / 4); j++) {
            let cols = [];
            for (let i = 0; i < colCount; i++) {
                if (4 * j + i < 50 && 4 * j + i + ((currentPage - 1) * 50) < favourites.length) {
                    cols.push(
                        <Col style={{ "backgroundColor": "white" }} key={(4 * j + i + ((currentPage - 1) * 50)).toString()} span={24 / colCount}>
                            <Book
                                book={favourites[4 * j + i + ((currentPage - 1) * 50)]}
                                isChecked={favourites.some(e => e.id === favourites[4 * j + i + ((currentPage - 1) * 50)].id)}
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

    if (favourites.length < 1) {
        return (<div></div>)
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {rows}
            </Row>
            <Pagination
                current={currentPage}
                total={favourites.length}
                defaultPageSize={50}
                showSizeChanger={false}
                onChange={pageChange} />
            <Drawer height="100%" title={title} placement="bottom" onClose={onClose} open={open}>
                {bookDetails}
            </Drawer>
        </div>
    );
}

export default Favourites;
