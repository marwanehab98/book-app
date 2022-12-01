import React, { useEffect, useState } from "react";
import "./Book.scss";
import { Card, Checkbox } from 'antd';
import bookCover from '../../assets/BookCover.jpg'

const { Meta } = Card;



const Book = (props) => {
    const [checked, setChecked] = useState(props.isChecked);
    useEffect(() => {
        // console.log(checked);
    }, [checked]);

    const handleCheckbox = (e) => {
        setChecked(e.target.checked);
        props.isFavourite({
            "book": props.book,
            "isChecked": e.target.checked
        });
    }

    const click = (e) => {
        props.clicked(props.book);
    }

    return (
        <>
            <div style={{ margin: '10px' }}>
                <Card
                    hoverable
                    style={{
                        margin: '5px',
                        width: '100%',
                        // height: '600px'
                    }}
                    cover={
                        <a 
                            onClick={(e) => click(e)}
                            style={{margin: '0px', padding: '0px'}}
                        >
                            <img alt={'noImg'} src={
                                props.book.image_url ? props.book.image_url : bookCover
                            }
                                style={{
                                    padding: '5px',
                                    maxHeight: '50vh',
                                    width: '100%'
                                }} />
                        </a>
                    }
                >
                    <Checkbox
                        style={{ marginBottom: '15px' }}
                        key={Math.random()}
                        id={checked.toString()}
                        name={checked.toString()}
                        checked={checked}
                        onChange={(e) => handleCheckbox(e)}
                    >
                        Favourite
                    </Checkbox>
                    <a onClick={(e) => click(e)}>
                        <Meta title={props.book.title} description={props.book.authors} />
                    </a>
                </Card>
            </div>
        </>
    );
};

export default Book;