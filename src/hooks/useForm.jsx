import React, { useState } from 'react'

export const useForm = (IntialObj = {}) => {
    
    const [form, setForm] = useState(IntialObj);

    const changed = ({target}) => {
        const {name, value} = target;

        setForm({
            ...form,
            [name]: value
        });        
    }

    return {
        form,
        changed
    }
}
