import React from 'react'

export const Button = (props) => {
    const { text } = props;
    return(
    <div>
        <button className="bg-main text-white text-xs font-bold py-3 px-4 rounded-md hover:bg-secondary">
            {text}
        </button>
    </div>
    )
}

