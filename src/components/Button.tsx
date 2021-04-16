import {useState} from 'react';


interface ButtonType {
    color: string,
    children: string
}

export default function Button(props: ButtonType) {

    const [counter, setCounter] = useState(1)
    

    function incrementCounter() {

        setCounter(counter + 1)
    }
    return (

        <div>

            <button style={{backgroundColor: props.color}} onClick={incrementCounter}>
                {props.children} você clicou: {counter}
            </button>
        </div>
    );
}

