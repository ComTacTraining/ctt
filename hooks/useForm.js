import { useState } from 'react'

const useForm = (callback, initialFormFields = {}) => {
  const [values, setValues] = useState(initialFormFields)
  const handleSubmit = evt => {
    if (evt) {
      evt.preventDefault()
    }
    callback()
  }
  const handleChange = evt => {
    evt.persist()
    setValues(FormValues => ({
      ...FormValues,
      [evt.target.name]: evt.target.value
    }))
  }
  return { handleChange, handleSubmit, values }
}

export default useForm