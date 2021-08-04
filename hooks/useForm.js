import { useState } from 'react'

const useForm = (callback, initialFormFields = {}) => {
  const [values, setValues] = useState(initialFormFields)

  const handleSubmit = (evt) => {
    if (evt) {
      evt.preventDefault()
    }
    callback()
  }
  const handleChange = (evt) => {
    evt.persist()
    setValues((FormValues) => ({
      ...FormValues,
      [evt.target.name]: evt.target.value
    }))
  }
  const updateValue = ({ key, val }) => {
    setValues({ ...values, [key]: val })
  }
  const updateAllValues = (formValues) => {
    setValues(formValues)
  }
  return { handleChange, updateValue, handleSubmit, updateAllValues, values }
}

export default useForm
