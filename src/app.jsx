const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const { number, item } = e.target
    console.log(number.value, item.value)
  }

  return (
    <div className="w-full bg-[#4B527E]">
      <form
        className="flex justify-center items-center gap-3 mx-auto max-w-7xl text-white h-28"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl text-center font-semibold">
          O que você precisa guardar?
        </p>
        <input
          className="bg-[#7D81AE] py-3 px-2 w-20 rounded-lg outline-none text-center text-lg placeholder-gray-200"
          name="number"
          type="Number"
          min={1}
          placeholder="2"
        />
        <input
          className="bg-[#7D81AE] py-3 px-2 w-52 rounded-lg outline-none text-left text-lg placeholder-gray-200"
          name="item"
          type="text"
          placeholder="Nome do item"
        />
        <button
          className="py-3 px-2 w-36 bg-[#FF6086] rounded-lg hover:bg-[#fc446f] text-lg font-bold"
          type="submit"
        >
          Adicionar
        </button>
      </form>
    </div>
  )
}

const App = () => (
  <main>
    <Form />
  </main>
)

export { App }
