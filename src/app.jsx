const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const { number, item } = e.target
    console.log(number.value, item.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="number" type="Number" />
      <input name="item" type="text" />
      <button type="submit">Adicionar</button>
    </form>
  )
}

const App = () => (
  <main className="max-w-7xl h-screen mx-auto">
    <Form />
  </main>
)

export { App }
