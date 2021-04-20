import React, { useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud'

import './FeelingsCloud.css';

import getFormattedEmotions from './hooks/getFormattedEmotions'

function FeelingsCloud ({ feelings, setFeelings }) {

    const [emotions, setEmotions] = useState([])

    useEffect(() => {
        async function fetchEmotions() {
            const emos = await getFormattedEmotions(25);
            setEmotions(emos);
        }
        fetchEmotions();
    }, []);




    const customRender = (tag, size, color) => (
        <span
        key={tag.value}
        className={tag.isSelected ? 'selectedEmo' : ''}
        style={{
            margin: '4px',
            display: 'inline-block',
            transform: `rotate(${tag.angle}deg)`,
            fontSize: `${tag.count + size}px`,
            color: `${color}`,
            cursor: 'pointer'
        }}  
        >
            {tag.value}
        </span>
    )


    function handleClick(tag) {

        const feeling = tag.value;
        if (feelings.indexOf(feeling) === -1) {
            setFeelings(feelings => [...feelings, feeling])
        }   else {
            setFeelings(feelings.filter(f => f !== feeling));
        }
        emotions[tag.id].isSelected = !emotions[tag.id].isSelected; 

    }


    return (
        <div className="shadow m-4 p-4 bg-dark">
            <p className='text-light m-3'>click any of these emoptions you are feeling today:</p>
            <TagCloud tags={emotions} maxSize={20} minSize={10} renderer={customRender} onClick={handleClick} />
            
        </div>
    )
}


export default FeelingsCloud;