import {React, useState} from 'react';
import GiveReview from "./GiveReview";
import {Button} from 'react-bootstrap'; 
function Dummy(){

    const [modalVisible,setModalVisible] = useState(false);
    <GiveReview
    show = {modalVisible}
    onClose = {()=>{
        setModalVisible(false);
    }}
    >
    </GiveReview>

    const handleReview = (e) =>{
        e.preventDefault();
        setModalVisible(true)
    }

    return (
        <div>
            {/* <div onClick = {handleReview}>
                click me!
            </div> */}

            <Button variant="primary" onClick={handleReview}>Hi</Button>
        </div>
    )
}

export default Dummy;