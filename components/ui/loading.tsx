import React from 'react';

type loadingProps = {
    title:string
    
};

const Loading:React.FC<loadingProps> = ({title}) => {
    
    return (
        <div>
            <div className="flex justify-center items-center h-full">
                <p className="text-2xl font-semibold">{title}</p>
            </div>
        </div>
    )
}
export default Loading;