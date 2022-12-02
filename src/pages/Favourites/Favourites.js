//Page showing your favourite books categorized by author

import React, { useEffect, useState } from "react";
import Book from '../../components/book/Book'
import { Row, Col, Drawer } from "antd";
import bookCover from '../../assets/BookCover.jpg'



const Favourites = (props) => {
    const [title, setTitle] = useState([]);
    const [favourites, setFavourites] = useState([]);
    useEffect(() => {
        props.favourites(favourites);
        showBooks();
    }, [favourites]);

    useEffect(() => {
        getFavourites();
    }, []);

    const [rows, setRows] = useState([]);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [bookDetails, setBookDetails] = useState([]);


    //Getting favourites as a prop from parent component (Main.js)
    const getFavourites = () => {
        setFavourites(props.myFavourites);
    }

    //Handling removing favourites from the favourite page
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

    const groupBy = (arr, property) => {
        return arr.reduce(function (memo, x) {
            if (!memo[x[property]]) { memo[x[property]] = []; }
            memo[x[property]].push(x);
            return memo;
        }, {});
    }

    //Showing favourite books on this page categorized by author
    //Grouping favourites by the authors key
    const showBooks = () => {
        const colCount = 6;
        let tempRows = [];
        let cols = [];
        let tempFavourites = groupBy(favourites, 'authors');
        let count = 0;
        try {
            Object.keys(tempFavourites).forEach(key => {
                cols = [];
                tempRows.push(
                    <Col key={key.toString()} span={24}>
                        <strong>{key}</strong>
                    </Col>
                )
                if (count % colCount == 0) {
                    cols = [];
                }
                tempFavourites[key].forEach(book => {
                    cols.push(
                        <Col key={book.id.toString()} span={24 / colCount}>
                            <Book
                                book={book}
                                isChecked={favourites.some(e => e.id === book.id)}
                                isFavourite={handleFavourites}
                                clicked={handleClick}
                            ></Book>
                        </Col>,
                    );
                    count++;
                })
                tempRows.push(cols);

            });
            setRows(tempRows);
        } catch (error) {

        }
    }

    const DescriptionItem = ({ title, content }) => (
        <div>
            <strong style={{ fontSize: '16px' }}>{title}: </strong>
            <p style={{ fontSize: '16px' }}>{content}</p>
        </div>
    );

    //Handling clicking on the book component to show book details
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

    if (favourites.length < 1) {
        return (<div></div>)
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {rows}
            </Row>
            <Drawer height="100%" title={title} placement="bottom" onClose={onClose} open={open}>
                {bookDetails}
            </Drawer>
        </div>
    );
}

export default Favourites;
